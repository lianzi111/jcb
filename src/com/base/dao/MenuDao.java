package com.base.dao;

import com.base.domain.ManagerAccount;

public interface MenuDao {

	public String loadTree(ManagerAccount account,String menuType);

	public String getMenuPathById(int menuid); 
	
}
