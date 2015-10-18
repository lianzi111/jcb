<%@ page contentType="text/html;charset=utf-8" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
<head>
<title id=indexTitle>徽贷宝后台管理系统</title>
</head>
<!-- 设置主窗口名字,用于代码选择功能查找主窗口来缓存数据 -->
<script language="javascript">
window.focus();
</script>
<frameset name="Main" rows="60px,*" frameborder="no" border="1" framespacing="0">
	<frame name="Title"  scrolling="no"  src="<%=basePath %>login/Title.jsp" noresize />
	<frameset name="Set"  id="Set" cols="11%,*" frameborder="no" border="1" framespacing="0">
		<!--菜单区域-->
		<frameset name="MenuMain" rows="25,*" frameborder="no" border="1" framespacing="0">
			<frame id="MenuTop" name="MenuTop" scrolling="no" src="<%=basePath %>login/menutop.jsp" noresize />
			<frame id="Menu" name="Menu" scrolling="auto" src="<%=basePath %>login/menu.jsp?UserCode='<%=request.getParameter("UserCode")%>'" noresize />
		</frameset>

		<!--交互区域-->
		<frameset name="Talk" rows="25,*" frameborder="no" border="1" framespacing="0">
			<frame id="Quick" name="Quick" scrolling="no" src="<%=basePath %>login/quick.jsp" noresize />
			<frame id="MainBuss" name="MainBuss" scrolling="auto" src="<%=basePath %>login/trunkarea.jsp" noresize />
		</frameset>
	</frameset>
</frameset>
<noframes>
	<body bgcolor="#ffffff">
	</body>
</noframes>
</html>