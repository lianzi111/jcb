package com.base.action.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.base.util.SysConstant;

/**
 * Controller类的基类
 * 
 * @author TanLiang
 */
public abstract class BaseController {
    /**
     * 日志实例
     */
    protected static Log logger = LogFactory.getLog("controller");


    /**
     * 判断用户是否已登录.
     * 
     * @param session
     *            session
     * @return 已登录：true
     */
    protected Boolean isLogined(HttpSession session) {
        return session.getAttribute(SysConstant.Login.LOGIN_USER) != null;
    }

    /**
     * 设置Excel下载时Response头信息.
     * 
     * @param fileName
     *            文件名
     * @param request
     *            request
     * @param response
     *            response
     * @throws UnsupportedEncodingException
     *             不支持编码异常
     */
    public void setExcelDownloadHeader(String fileName, HttpServletRequest request,
            HttpServletResponse response) throws UnsupportedEncodingException {

        String agent = (String) request.getHeader("USER-AGENT");
        if (agent != null && agent.indexOf("Firefox") != -1) {
            // 火狐浏览器特殊处理
            fileName = "=?UTF-8?B?" + (new String(Base64.encodeBase64(fileName.getBytes("UTF-8"))))
                    + "?=";
        } else {
            fileName = URLEncoder.encode(fileName, "UTF8");
        }
        response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName
                + "\";target=_blank");
    }

    /**
     * 获取用户ID地址.
     * 
     * @param request
     *            request
     * @return ID地址
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
}
