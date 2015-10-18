package com.base.action.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base.dao.service.MenuService;
import com.base.domain.ManagerAccount;
import com.base.util.SysConstant;

@Controller
public class MenuController extends BaseController {
	@Resource
	private MenuService menuService;
	
	@RequestMapping(value="loadMenuTree.do",method = RequestMethod.POST)
	public void loadMenuTree(HttpSession session,HttpServletResponse response,String menuType) throws Exception {
		ManagerAccount account = (ManagerAccount)session.getAttribute(SysConstant.Login.LOGIN_USER);
		
		String treeStr = menuService.loadTree(account,menuType);
		response.setCharacterEncoding("UTF-8"); 
		response.getWriter().write(treeStr);
		response.getWriter().flush();
	}

	@RequestMapping(value="queryMenuPath.do",method = RequestMethod.POST)
	public String getMenuPath(int menuid , HttpServletResponse response) throws Exception {
		String menuPath = menuService.getMenuPathById(menuid);
		response.getWriter().write(menuPath);
		response.getWriter().flush();
		return null;
	}
}
