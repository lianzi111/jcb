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
	<link rel="stylesheet" type="text/css" href="../common/easyui/themes/bootstrap/easyui.css">   
	<link rel="stylesheet" type="text/css" href="../common/easyui/themes/icon.css">   
	<script type="text/javascript" src="../common/js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="../common/easyui/jquery.easyui.min.js"></script>
    <style type="text/css">
    body{margin:0; padding:0; background:url(../common/images/logon1.png) center top no-repeat ; }
	p,img,ul,li,input,button{margin:0; padding:0; list-style:none; border:0;}
	.box{width:1024px; height:400px; margin:0 auto;}
	.box1{width:362px; height:266px; margin:190px auto;}
	.box1-t{width:362px; height:72px; background:url(../common/images/kq.png) no-repeat center center #FFF;}
	.box1-t-l{width:6px; height:72px; background:url(../common/images/bg_l_1.png) no-repeat; float:left;}
	.box1-t-r{width:6px; height:72px; background:url(../common/images/bg_r_1.png) no-repeat; float:right;}
	.box1-m{width:336px; height:56px; padding:0 13px; background:url(../common/images/box1-c_bg.png) repeat-x;}
	ul{border-bottom:1px solid #FAFAFA;}
	li{float:left;}
	.bg1{width:70px; height:56px; background:url(../common/images/name.png) center 18px no-repeat;}
	.box1-m input{width:254px; height:56px; background:url(../common/images/box1-c_bg.png) repeat-x; line-height:56px; padding-left:12px;font-size:20px; font-weight:bold; color:#666;}
	.box1-b{width:336px; height:56px; padding:0 13px; border-bottom:1px solid #FAFAFA; background:url(../common/images/box1-c_bg.png) repeat-x;}
	.bg2{width:81px; height:56px; background:url(../common/images/mm.png) center 18px no-repeat;}
	.box1-b input{width:245px; height:56px; background:url(../common/images/box1-c_bg.png) repeat-x; line-height:56px; padding-left:7px;font-size:20px;color:#666;}
	.foot{width:362px; height:80px;}
	.foot-l{width:6px; height:80px; background:url(../common/images/logon_bg_l.png) no-repeat; float:left;}
	.foot-c{width:350px; height:80px; background:url(../common/images/logon_bg_c2.png); float:left;}
	
	.foot-r{width:6px; height:80px; background:url(../common/images/logon_bg_r.png) no-repeat; float:right;}
	.foot-c a{ display:block;width:340px;height:50px; margin-left:5px; margin-top:15px;}
	.error{
	  color:red;
	  margin-left: 20px;
	}
    </style>
</head>
	<script type="text/javascript">	
	$(document).ready(function(){  $("input[name=username]").focus();});
	
	function submitFormLogin(){
		document.cookie="nodeText=";
		document.cookie="nodeId=";
		
		$('#loginForm').submit();
	}
	
	document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
         if(e && e.keyCode==13){ // enter 键
        	 submitFormLogin();
        }
    };
   

	</script>
<body >
<div class="box">

    	<div class="box1">
    		<label class="error">${error}</label>
    	<form id="loginForm" action="login.do" method="post">
        	<div class="box1-t">
            	<span class="box1-t-l"></span>
                <span class="box1-t-r"></span>
            </div>
            <ul class="box1-m">
            	<li class="bg1"></li>
            	<li>
                	<input type="text" name="username" id="username" />
                </li>
            </ul>
            <ul class="box1-b">
            	<li class="bg2"></li>
            	<li>
                	<input type="password" name="password" />
                </li>
            </ul>
            <div class="foot">
            	<span class="foot-l"></span>
                <span class="foot-c">
                	<a ><img src="../common/images/button.png" width="340" onclick="submitFormLogin();" height="50"/></a>
                </span>
                <span class="foot-r"></span>
           </div>
           </form>
        </div>
        
    </div>	

</body>
</html>