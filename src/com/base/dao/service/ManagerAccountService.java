package com.base.dao.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.base.dao.ManagerAccountDao;
import com.base.domain.ManagerAccount;
import com.base.util.PubFun;

@Component
public class ManagerAccountService {
	@Resource
	private ManagerAccountDao managerAccountDao;

	public ManagerAccountDao getManagerAccountDao() {
		return managerAccountDao;
	}

	public void setManagerAccountDao(ManagerAccountDao managerAccountDao) {
		this.managerAccountDao = managerAccountDao;
	}

	public ManagerAccount login(String userCode, String password) {
		password = PubFun.mD5Encrypt(password);
		return managerAccountDao.login(userCode,password);
	}
	
	
	
}
