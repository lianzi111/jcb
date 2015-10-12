<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script type="text/javascript">
	var flag = "<%=request.getParameter("flag")%>";
</script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>修改密码</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link rel="stylesheet" type="text/css"
			href="../common/css/gsstyle.css">
		<script language="JavaScript" src="../common/date/WdatePicker.js"></script>
		<script language="JavaScript" src="../common/js/paging.js"></script>
		<script language="JavaScript" src="../common/js/CheckInput.js"></script>
		<script type="text/javascript" src="../common/js/jquery-1.8.3.js"></script>
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

	</head>
<script type="text/javascript">
function back(){
	if(flag=="1"){
		window.opener=null;
		window.close();
	}else{
		top.window.location='<%=basePath%>'+'index.jsp';
	}
}
function save(){
	if(!checkInput()){
		return ;
	}
	if(fm.newPassword.value!=fm.renewPassword.value){
		alert("录入的二次密码不一致！");
		return;
	}
	if(flag=='1'){
		$.ajax({
		   type: "POST",
		   url: "<%=basePath%>common/modify_changePwd",
		   data: "flag="+flag+"&phnoenumber="+fm.phnoenumber.value+"&newPassword="+fm.newPassword.value,
		   success: function(msg){
	   	 	if(msg!='1'){
	     		alert(msg);
	     	}else{
		     	alert("操作成功！");
		     	back();
	     	}
		   }
		});	
	}
	if(flag=='2'){
		fm.action="<%=basePath%>common/modify_changePwdAction?flag="+flag;
		fm.submit();
	}
}

function checkOldPwd(oldPasswrod){
	$.ajax({
	   type: "POST",
	   url: "<%=basePath%>common/modify_checkOldPwd",
	   data: "oldPasswrod="+oldPasswrod,
	   success: function(msg){
	     if(msg!='1'){
	     	alert(msg);
	     	//fm.oldPasswrod.focus();
	     	return ;
	     }
	   }
	});
}
</script>	
	<body onload="initShow();">
		<table>
			<tr>
				<td class=titleImg>
					<img src="../common/images/s.gif" onclick="showDiv(this,queryDiv);"
						class="titleImgClose">
					密码修改
				</td>
			</tr>
		</table>

		<div id="queryDiv">
			<form id=fm name=fm method="post" >
				<table>
					<tr>
						<td class=glable>
							绑定手机号：
						</td>
						<td class=input>
							<input class="common" verify="绑定手机号|notnull&len=11&int"  name="phnoenumber" 
								type="text"  elementAttr=notnull/>
						</td>
					</tr>				
					<tr>
						<td class=glable>
							原始密码：
						</td>
						<td class=input>
							<input class="common" verify="原始密码|notnull" name="oldPasswrod" onblur="checkOldPwd(this.value)"
								type="password"  elementAttr=notnull/>
						</td>
					</tr>
					<tr>
						<td class=glable>
							新密码：
						</td>
						<td class=input>
							<input class="common" verify="新密码|notnull" name="newPassword"
								 type="password" elementAttr=notnull>
						</td>
					</tr>
					<tr>
						<td class=glable>
							确认新密码：
						</td>
						<td class=input>
							<input class="common" verify="确认新密码|notnull" name="renewPassword"
								 type="password" elementAttr=notnull>
						</td>
					</tr>
				</table>
			</form>
		</div>
		<div style="margin: 0px; padding: 0px">
			<input type="button" id="queryBtn" value="保  存" class=btncss onclick="save()">
			<input type="button" id="addBtn" value="返  回" class=btncss onclick="back()">
		</div>
	</body>
</html>
