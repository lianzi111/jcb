package com.base.action.controller;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.base.util.SysConstant;

/**
 * 用户登录、注销、修改密码Controller
 * 
 * @author Tanliang
 *
 */
@Controller
public class UserController extends BaseController {

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
                Account account = securityService.login(username.trim(), password.trim());
                if (account == null) {
                    return new ModelAndView("login").addObject("error","用户名或密码错误！");
                } else {
                    session.setAttribute(SysConstant.Login.LOGIN_USER, account);
                    // 插入用户登录日志
//                    managerLogService.insert(account.getEmpNo(), "登录", getIpAddr(request), null, 1);

                    response.sendRedirect("index.do");
                    return null;
                }
            } catch (NoSuchAlgorithmException e) {
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
        Account account = (Account) session.getAttribute(SysConstant.Login.LOGIN_USER);
        String accountName = account != null ? account.getApAccount() : "";
        try {
            if (account != null) {
                securityService.logout();
                managerLogService.insert(account.getEmpNo(), "注销", getIpAddr(request), null, 1);
            }
            session.removeAttribute(Const.SE_ACCOUNT);
            session.removeAttribute(Const.SE_DEPT);
            session.removeAttribute(Const.SE_AUTHS);
            session.invalidate();
            response.sendRedirect("login.do");
            return null;
        } catch (IOException e) {
            logger.error(String.format("用户[?]退出时系统发生未知异常!", accountName), e);
            return "退出时系统发生未知异常!";
        }
    }

    /**
     * 修改密码
     * 
     * @param session
     *            session
     * @param phone
     *            参数.手机号
     * @param oldPwd
     *            参数.原始密码
     * @param password
     *            参数.新密码
     * @return ActionResult
     */
    @RequestMapping(value = "password.do", method = RequestMethod.POST)
    @ResponseBody
    public ActionResult changePwd(HttpSession session,
            @RequestParam(value = "phone", required = true) String phone,
            @RequestParam(value = "oldPwd", required = true) String oldPwd,
            @RequestParam(value = "pwd", required = true) String password) {

        Account account = (Account) session.getAttribute(Const.SE_ACCOUNT);
        if (account == null) {
            return ActionResult.nologin("您还没有登陆,无法修改密码!");
        }

        if (phone == null || phone.trim().length() == 0) {
            return ActionResult.fail(message.get("msg.warn.common002", "绑定手机号"));
        } else if (oldPwd == null || oldPwd.trim().length() == 0) {
            return ActionResult.fail(message.get("msg.warn.common002", "原始密码"));
        } else if (password == null || password.trim().length() == 0) {
            return ActionResult.fail(message.get("msg.warn.common002", "新密码"));
        } else {
            try {
                securityService.changePwd(account.getApAccount(), phone, oldPwd, password);
                account.setNeedModify("N");
                return ActionResult.success(message.get("msg.info.common006"));
            } catch (KnownException e) {
                return ActionResult.fail(e.getMessage());
            } catch (Exception e) {
                logger.error("用户修改密码时异常:!", e);
                return ActionResult.fail("系统发生未知异常!");
            }
        }
    }
}
