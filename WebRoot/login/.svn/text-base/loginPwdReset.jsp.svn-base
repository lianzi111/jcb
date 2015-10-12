<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <title>密码重置验证界面</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="../common/date/skin/WdatePicker.css">
	<link rel="stylesheet" type="text/css" href="../common/css/gsstyle.css">
	<script language="JavaScript" src="../common/date/WdatePicker.js"></script>
	<script language="JavaScript" src="../common/js/CheckInput.js"></script>
	<script type="text/javascript" src="../common/js/jquery-1.8.3.js"></script>
  </head>
<script type="text/javascript">
	var basePath = "<%=basePath %>";
	
	function save(){
		
		if($("#empidno").val()==null||$("#empidno").val()==''){
			alert("请输入身份证号码！");
			return ;
		}
		
		if(!checkInput()){
			return;
		}
		
		$.post(basePath+"common/loginPwdReset_resetPwd.action", $("#remindform").serialize(),
			function(data){
				if(data.message.code=='1'){
					alert(data.message.msg);
					window.close();
				}else{
					alert(data.message.msg);
				}
			});
	}
	
	$(document).ready(function(){
		$.post(basePath+"common/loginPwdReset_obtainSysList.action", null,
			function(data){
					var count= 0;
					var systr = "<tr>";
					$.each(data.sysMap, function(i, n){
							count++;
							systr = systr+"<td style=\"padding: 6PX;\"><input type=\"checkbox\" value="+i+" name=\"syscodes\">"+n+"</td>";
							if(count%3==0){
								systr+="</tr>";
								$("#systableid").append(systr);
								systr = "<tr>";
							}
						});
					if(count%3!=0){
						systr+="</tr>";
						$("#systableid").append(systr);
					}
			});		
	});
</script>
  <body onload="initShow();">
    <table >
    	<tr >
    	<td class=titleImg><img src="../common/images/s.gif" onclick="showDiv(this,queryDiv);" class="titleImgClose">密码重置</td>
    	</tr>
    </table>
    <div id=queryDiv>
    <form name=fm method="post" id="remindform">
    <table >
	    	<tr >
		    	<td class=glable>应用系统账号</td>
		    		<td class=input><input class="common" type="text" verify="应用系统账号|notnull" elementAttr=notnull   name="applicationAccount" value='${applicationAccount}'></td>
	    	</tr> 	
	    	<tr >
		    	<td class=glable>身份证号码</td>
		    		<td class=input><input class="common" type="text" verify="身份证号码|LEN=15|LEN=18" elementAttr=notnull id="empidno"  name="idCardNo" value='${idCardNo}'></td>
	    	</tr> 	
	    	<tr >
		    	<td class=glable>手机号</td>
		    		<td class=input><input class="common" type="text" verify="手机号|notnull&LEN=11&NUM&INT"  elementAttr=notnull name="phone" value='${phone}'></td>
	    	</tr> 	
    </table>
    <div align="left" style="margin-top: 15px;margin-left: 30px;">
    	<table id="systableid">
    	</table>
    </div>
    </form>
    </div>
    <input type="button"  class=btncss onclick="save();" value="保 存">
    <input type="button"  class=btncss onclick="window.close();" value="返 回">
 </body>	
</html>
 