/**
 * �๦������:{}
 * date:Dec 2, 2013 3:11:34 PM
 * author:wubangjun
 * version:1.0
 */
package com.base.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.stereotype.Component;

/**
 * @author wubangjun
 * 
 */
@Component
public class SpringBeanFactoryUtils implements BeanFactoryAware {
	private static BeanFactory beanFactory = null;
	private static SpringBeanFactoryUtils factoryUtils = null;


	public static BeanFactory getBeanFactory() {
		return beanFactory;
	}

	public static SpringBeanFactoryUtils getInstance() {
		if (factoryUtils == null) {
			factoryUtils = new SpringBeanFactoryUtils();
		}
		return factoryUtils;
	}

	public static Object getBean(String name) {
		return beanFactory.getBean(name);
	}
	
	public static Object getBean(Class className) {
		return beanFactory.getBean(className);
	}

	public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
		SpringBeanFactoryUtils.beanFactory = beanFactory;
	}
}
