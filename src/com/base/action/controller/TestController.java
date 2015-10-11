package com.base.action.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.domain.DataDic;

@Controller
//@RequestMapping("/test")
public class TestController extends BaseController{

	@RequestMapping("/test/helloWorld.do")  
	@ResponseBody
    public DataDic helloworld() { 
		DataDic dict = new DataDic();
		dict.setCode("333");
		
        return dict;  
    } 
}
