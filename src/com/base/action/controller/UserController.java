package com.base.action.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.base.dao.service.ManagerAccountService;
import com.base.domain.ManagerAccount;
import com.base.util.SysConstant;

/**
 * 用户登录、注销、修改密码Controller
 * 
 * @author Tanliang
 *
 */
@Controller
public class UserController extends BaseController {
	@Resource
	private ManagerAccountService managerAccountService;
	
    /**
     * 显示登录页面
     * 
     * @param session
     *            session
     * @param request
     *            request
     * @return ModelAndView
     */
    @RequestMapping(value = "login.do")
    public ModelAndView showLogin(HttpSession session, HttpServletRequest request) {
        return new ModelAndView("login");
    }

    /**
     * 登录验证
     * 
     * @param session
     *            session
     * @param request
     *            request
     * @param response
     *            response
     * @param username
     *            参数.用户名
     * @param password
     *            参数.密码
     * @return ModelAndView
     * @throws IOException
     *             IOException
     */
    @RequestMapping(value = "login.do", method = RequestMethod.POST)
    public ModelAndView checkLogin(HttpSession session, HttpServletRequest request,
            HttpServletResponse response, @RequestParam("username") String username,
            @RequestParam("password") String password) throws IOException {
        // 参数合法性验证
        if (username == null || username.trim().length() <= 0) {
            return new ModelAndView("login").addObject("error","用户名不能为空");
        } else if (password == null || password.trim().length() <= 0) {
            return new ModelAndView("login").addObject("error","密码不能为空");
        } else {
            try {
                // 根据用户名和密码查询
                ManagerAccount account = managerAccountService.login(username.trim(), password.trim());
                if (account == null) {
                    return new ModelAndView("login").addObject("error","用户名或密码错误！");
                } else {
                    session.setAttribute(SysConstant.Login.LOGIN_USER, account);
                    // 插入用户登录日志
//                    response.sendRedirect("index.do");
                    return new ModelAndView("login/main");
                }
            } catch (Exception e) {
                return new ModelAndView("login").addObject("error", "登陆验证时发生未知异常!");
            }
        }
    }

    /**
     * 注销处理
     * 
     * @param session
     *            session
     * @param request
     *            request
     * @param response
     *            response
     * @return 注销成功返回null，失败时返回错误信息
     */
    @RequestMapping(value = "logout.do")
    @ResponseBody
    public String doLogout(HttpSession session, HttpServletRequest request,
            HttpServletResponse response) {
    	ManagerAccount account = (ManagerAccount) session.getAttribute(SysConstant.Login.LOGIN_USER);
        try {
            if (account != null) {
            	return "退出时系统发生未知异常!"; 
            }
            session.removeAttribute(SysConstant.Login.LOGIN_USER);
            session.invalidate();
            response.sendRedirect("login.do");
            return null;
        } catch (IOException e) {
            return "退出时系统发生未知异常!";
        }
    }
}
