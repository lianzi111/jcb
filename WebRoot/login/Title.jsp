<%@ page contentType="text/html;charset=utf-8" %>
<%@page import="com.base.util.SysConstant"%>
<%@page import="com.base.domain.ManagerAccount"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script language="JavaScript" src="../common/js/jquery-1.8.3.js"></script>
<script language="JavaScript">
function showTitle(){
	parent.fraMain.rows = "0,30,*";
	parent.fraTalk.rows = "*";
}
function showHideFrame(){
	try{
		if(parent.fraSet.cols == "0%,*"){
			parent.fraSet.cols = "180,*";
			menuPowerImage.src = "../common/images/butHide.gif";
		}
		else if(parent.fraSet.cols=="180,*"){
			parent.fraSet.cols = "0%,*";
			menuPowerImage.src = "../common/images/butShow.gif";
			}
		}
		catch(re){}
	}
function initTile(){
	var day="";
	var month="";
	var ampm="";
	var ampmhour="";
	var myweekday="";
	var year="";
	mydate=new Date();
	myweekday=mydate.getDay();
	mymonth=mydate.getMonth()+1;
	myday= mydate.getDate();
	myyear= mydate.getYear();
	year=(myyear > 200) ? myyear : 1900 + myyear;
	if(myweekday == 0)
		weekday="星期天";
	else if(myweekday == 1)
		weekday="星期一 ";
	else if(myweekday == 2)
		weekday="星期二";
	else if(myweekday == 3)
		weekday="星期三";
	else if(myweekday == 4)
		weekday="星期四";
	else if(myweekday == 5)
		weekday="星期五";
	else if(myweekday == 6)
		weekday="星期六";
	<%
	
	//((User)session.getAttribute("LoginUser")).getAccount()
	ManagerAccount account = (ManagerAccount)session.getAttribute(SysConstant.Login.LOGIN_USER);
	%>
	document.getElementById("welcomeInfo").innerHTML="<%=account.getUsername()%>,欢迎您登录徽贷宝后台系统!今天是"+year+"年"+mymonth+"月"+myday+"日"+weekday;
}
function logout(){
	if(confirm('您确定要退出本系统吗？')){
		$.ajax({type:"POST", url:"login!logonOut.action"}).responseText;
		top.window.location='<%=basePath%>'+'index.jsp';
	}
}

function modifyPwd(){
	//window.open("modifypwd.jsp","_blank","height=300,width=400,top=300,left=400,toolbar=no,menubar=no,scrollbars=no,Resizable=no,location=no,status=no");
	window.showModalDialog("modifypwd.jsp?flag=1","","dialogWidth=400px;dialogHeight=300px;status:no");
}
</script>
</head>
<body onload="initTile();" text="#000000" style="background-image:url(../common/images/123.gif) ;bgproperties:fixed;" bgproperties="fixed"   leftmargin="0"  topmargin="2" marginwidth="0" marginhigh="2">
	<div  align="left" style="margin-top: 15px;float: left;margin-left: 240px">
		<input  type="image" src="../common/images/zjjcmstext.png"    align="center" >
	</div>
	<div align="right" style="margin-top: 0px;margin-right: 20px">
		<input  type="image" src="../common/images/home_page.jpg" width="30px" title="注 销" height="30px" onclick="logout();">
		<input  type="image" src="../common/images/password_modify.png" width="30px" title="密码修改" height="30px" onclick="modifyPwd();">
	</div>
	<div align="right" style="margin-top: 2px;margin-right: 20px">
		<label ><font color="white" id="welcomeInfo" style="font-weight: bold;font-size: 9pt;"></font></label>
	</div>
</body>
</html>