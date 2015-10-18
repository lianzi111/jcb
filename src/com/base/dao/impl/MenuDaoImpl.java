package com.base.dao.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.base.dao.MenuDao;
import com.base.domain.ManagerAccount;
import com.base.domain.Menu;
import com.base.domain.MenuSchema;
import com.base.domain.MenuSchema.Criteria;
import com.base.mapper.MenuMapper;

@Component("menuDao")
public class MenuDaoImpl implements MenuDao {
	@Resource
	private MenuMapper menuMapper;
	private ManagerAccount managerAccount;
	private String menuType;
	
	public String loadTree(ManagerAccount account,String menuType) {
		this.menuType = menuType;
		this.managerAccount = account;
		StringBuffer sb = new StringBuffer("");
//		roleMenus = logonMenuMapper.getRoleMenu(account.getEmpno());
		
		MenuSchema menuSchema = new MenuSchema();
		Criteria criteria = menuSchema.createCriteria();
		if(this.menuType!=null){
			criteria.andMenutypeEqualTo(this.menuType);
		}
		criteria.andParentidEqualTo(0).andStateEqualTo("1");
		List<Menu> menus = menuMapper.selectByExample(menuSchema);
		Menu menu = null;
		Map<Menu, List<Menu>> map = new HashMap<Menu, List<Menu>>();
		Map<Integer,String> levelMap = new HashMap<Integer, String>();
		
		for(int i=0;i<menus.size();i++){
			menu = menus.get(i);
			levelMap.put(menu.getId(), (i+1)+"");
			if(!addTree(menu,sb,0,i+1)){
				continue;
			}else{
				List<Menu> firstChild = getChild(menu);
				List<Menu> firstChildSet = new ArrayList<Menu>();
				for(int j=0;j<firstChild.size();j++){
					levelMap.put(firstChild.get(j).getId(), (j+2)+"");
					if(addTree(firstChild.get(j),sb,1,j+2)){
						map.put(firstChild.get(j), getChild(firstChild.get(j))); 
						if(this.menuType==null){
							firstChildSet.add(firstChild.get(j));
						}else {
							if(this.menuType.equals(firstChild.get(j).getMenutype())){
								firstChildSet.add(firstChild.get(j));
							}
						}
					}
				}
				List<Menu> secondChild = null;
				List<Menu> secondChildSet = new ArrayList<Menu>();
				
				for(int j=0;j<firstChildSet.size();j++){
					secondChild = map.get(firstChildSet.get(j));
					if(secondChild==null){
						continue;
					}
					for(int s=0;s<secondChild.size();s++){
						levelMap.put(secondChild.get(s).getId(), levelMap.get(secondChild.get(s).getParentid())+""+((s+1)>=10?(s+1):"0"+(s+1)));
						if(addTree(secondChild.get(s),sb,levelMap.get(secondChild.get(s).getParentid())+"",levelMap.get(secondChild.get(s).getParentid())+""+((s+1)>=10?(s+1):"0"+(s+1)))){
							map.put(secondChild.get(s), getChild(secondChild.get(s))); 
							if(this.menuType==null){
								secondChildSet.add(secondChild.get(s));
							}else {
								if(this.menuType.equals(secondChild.get(s).getMenutype())){
									secondChildSet.add(secondChild.get(s));
								}
							}
						}
					}
				}
				if(secondChildSet.size()==0){
					continue;
				}
				
				List<Menu> thridChild = null;
				List<Menu> thridChildSet = new ArrayList<Menu>();
				for(int s=0;s<secondChildSet.size();s++){
					thridChild = map.get(secondChildSet.get(s));
					if(thridChild==null){
						continue;
					}
					for(int t=0;t<thridChild.size();t++){
						levelMap.put(thridChild.get(t).getId(), levelMap.get(thridChild.get(t).getParentid())+""+((t+1)>=10?(s+1):"0"+(t+1)));
						if(addTree(thridChild.get(t),sb,levelMap.get(thridChild.get(t).getParentid())+"",levelMap.get(thridChild.get(t).getParentid())+""+((t+1)>=10?(t+1):"0"+(t+1)))){
							map.put(thridChild.get(t), getChild(thridChild.get(t))); 
							if(this.menuType==null){
								thridChildSet.add(thridChild.get(t));
							}else {
								if(this.menuType.equals(thridChild.get(t).getMenutype())){
									thridChildSet.add(thridChild.get(t));
								}
							}
							
						}
					}
				}
				if(thridChildSet.size()==0){
					continue;
				}
				List<Menu> fourChild = null;
				for(int t=0;t<thridChildSet.size();t++){
					fourChild = map.get(thridChildSet.get(t));
					if(fourChild==null){
						continue;
					}
					for(int f=0;f<fourChild.size();f++){
						levelMap.put(fourChild.get(f).getId(), levelMap.get(fourChild.get(f).getParentid())+""+((f+1)>=10?(f+1):"0"+(f+1)));
						if(addTree(fourChild.get(f),sb,levelMap.get(fourChild.get(f).getParentid())+"",levelMap.get(fourChild.get(f).getParentid())+""+((f+1)>=10?(f+1):"0"+(f+1)))){
							map.put(fourChild.get(f), getChild(fourChild.get(f))); 
						}
					}
				}				
			}
		}
		System.out.println(sb.toString());
		return sb.toString();
	}
	
	public boolean addTree(Menu menu,StringBuffer sb,int levelDetail,int level){
		if(!sb.toString().equals("")){
			sb.append("^");
		}
		sb.append("tree.nodes['").append(levelDetail+"_"+level).append("'] = \"text:"+menu.getMenuname()+";url:"+menu.getMenupage()+"; target:MainBuss;method:getMenuPath('"+menu.getId()+"'); \"");
		if(menu.getChildnum()>0){
//			sb.append("tree.nodes['").append(levelDetail+"_"+level).append("'] = \"text:"+menu.getMenuname()+";method:getMenuPath('"+menu.getId()+"'); \"");
			return true;
		}else{
			return false;
		}
	}
	
	public boolean addTree(Menu menu,StringBuffer sb,String levelDetail,String level){
		if(!sb.equals("")){
			sb.append("^");
		}
		sb.append("tree.nodes['").append(levelDetail+"_"+level).append("'] = \"text:"+menu.getMenuname()+";url:"+menu.getMenupage()+"; target:MainBuss;method:getMenuPath('"+menu.getId()+"');\"");
		if(menu.getChildnum()>0){
//			sb.append("tree.nodes['").append(levelDetail+"_"+level).append("'] = \"text:"+menu.getMenuname()+";method:getMenuPath('"+menu.getId()+"');  \"");
			return true;
		}else{
			return false;
		}
	}	
	public List<Menu> getChild(Menu menu){
		MenuSchema menuScheme = new MenuSchema();
		menuScheme.setOrderByClause(" menuorder asc ");
		com.base.domain.MenuSchema.Criteria criteria =  menuScheme.createCriteria();
		criteria.andParentidEqualTo(menu.getId()).andStateEqualTo("1");
		if(this.menuType!=null){
			criteria.andMenutypeEqualTo(this.menuType);
		}
		if(this.managerAccount.getUsercode().equalsIgnoreCase("admin")){
			return menuMapper.selectByExample(menuScheme);
		}else{
			return dealMenu(menuMapper.selectByExample(menuScheme));
		}
	}
	
	public List<Menu> dealMenu(List<Menu> allMenu){
		List<Menu> newMenus = new ArrayList<Menu>();
		for(int i=0;i<allMenu.size();i++){
//			for(Menu m : this.roleMenus){
//				if(allMenu.get(i).getId()==m.getId()){
					newMenus.add(allMenu.get(i));
//				}
//			}
		}
		return newMenus;
	}
	
	public String getMenuPathById(int menuid) {
		StringBuffer menuPath = new StringBuffer();
		recursionMenu(menuid,menuPath);
		if(menuPath.indexOf(";")!=-1){
			String[] menuNames = menuPath.toString().split(";");
			menuPath.delete(0, menuPath.length());
			for(int i = menuNames.length-1;i>=0;i--){
				if(i==0){
					menuPath.append(menuNames[i]);
				}else{
					menuPath.append(menuNames[i]).append(" -> ");
				}
			}
		}
		System.out.println(menuPath);
		return menuPath.toString();
	}
	
	private void recursionMenu(int menuid,StringBuffer menuPath){
		Menu menu = menuMapper.selectByPrimaryKey(menuid);
		menuPath.append(menu.getMenuname()).append(";");
		if(menu.getParentid()==0){
			return;
		}
		recursionMenu(menu.getParentid(),menuPath);
	}
	
	public MenuMapper getMenuMapper() {
		return menuMapper;
	}

	public void setMenuMapper(MenuMapper menuMapper) {
		this.menuMapper = menuMapper;
	}
}
