package com.base.dao;

import com.base.domain.ManagerAccount;

public interface ManagerAccountDao {

	ManagerAccount login(String userCode, String password);

}
