package com.base.dao.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.base.dao.MenuDao;
import com.base.domain.ManagerAccount;

@Component
public class MenuService {
	@Resource
	private MenuDao menuDao;
	
	
	public String loadTree(ManagerAccount account) {
		return loadTree(account,null);
	}

	public String loadTree(ManagerAccount account, String menuType) {
		return menuDao.loadTree(account,menuType);
	}
	
	public String getMenuPathById(int menuid) {
		return menuDao.getMenuPathById(menuid);
	}
}
