package com.base.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.base.dao.ManagerAccountDao;
import com.base.domain.ManagerAccount;
import com.base.domain.ManagerAccountSchema;
import com.base.mapper.ManagerAccountMapper;
@Component("managerAccountDao")
public class ManagerAccountDaoImpl implements ManagerAccountDao {
	@Resource
	private ManagerAccountMapper managerAccountMapper;

	public ManagerAccountMapper getManagerAccountMapper() {
		return managerAccountMapper;
	}

	public void setManagerAccountMapper(ManagerAccountMapper managerAccountMapper) {
		this.managerAccountMapper = managerAccountMapper;
	}

	public ManagerAccount login(String userCode, String password) {
		ManagerAccountSchema schema = new ManagerAccountSchema();
		schema.createCriteria().andUsercodeEqualTo(userCode).andPasswordEqualTo(password);
		List<ManagerAccount> list = managerAccountMapper.selectByExample(schema);
		if (list == null || list.size() == 0 ) {
			return null;
		}
		return list.get(0);
	}
}
