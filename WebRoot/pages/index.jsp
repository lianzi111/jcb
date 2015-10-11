<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<html>
<head>
	<title>聚财宝后台管理系统</title>
	<meta http-equiv="X-UA-Compatible" content="IE=7" />
	<meta content="text/html; charset=utf-8" http-equiv=Content-Type>
	<meta http-equiv="pragma" content="no-cache"> 
    <meta http-equiv="cache-control" content="no-cache"> 
	<meta http-equiv="expires" content="0">   
	<link rel="stylesheet" type="text/css" href="common/easyui/themes/bootstrap/easyui.css">   
	<link rel="stylesheet" type="text/css" href="common/easyui/themes/icon.css"> 
	<link rel="stylesheet" type="text/css" href="common/css/app.css">     
	<script type="text/javascript" src="common/js/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="common/js/json2.js"></script>
    <script type="text/javascript" src="common/easyui/jquery.easyui.min.js"></script> 
    <script type="text/javascript" src="common/easyui/locale/easyui-lang-zh_CN.js"></script> 
   
</head>
<body class="easyui-layout">
	<div id="header" data-options="region:'north',border:false">
		<a class="logo" href="">聚财宝后台管理系统</a>
		<ul class="nav">
			<li><a href="#">欢迎, ${SE_ACCOUNT.empName}</a></li>
			<li><a href="#" onclick="$.gmkq.showPwdDlg();">修改密码</a></li>
			<li><a href="logout.do">注销</a></li>
			<li><a href="#" onclick="$.gmkq.homePage();">首页 </a></li>
		</ul>
	</div>
	<div id="west" data-options="region:'west',split:true,title:'操作菜单'"><ul id="leftMenuTree"></ul></div>
	<div id="center" data-options="region:'center',title:'首页'"><h1>欢迎</h1></div>
	<div id="footer" data-options="region:'south',border:false">Copyright © 2014 聚财宝后台管理系统</div>
	
	<input type="hidden" id="flag" value="">

	<jsp:include page="depts.jsp"></jsp:include>
	
	<script type="text/javascript" src="common/js/jquery-extensions.js"></script>
 	<script type="text/javascript" src="common/js/app.js"></script> 
 	
</body>
</html>