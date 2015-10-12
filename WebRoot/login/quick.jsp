<%@ page contentType="text/html;charset=GBK" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link rel='stylesheet' type='text/css' href='../common/css/other.css'>
</head>
<script type="text/javascript">
function openMenu(){
	parent.Set.cols = "14%,*";
	parent.Quick.document.getElementById("open_menu").style.display="none";
}
</script>
<body leftmargin="0" topmargin="0" marginwidth="0" marginhigh="0" oncontextmenu=self.event.returnValue=false>
<table width="100%" height="25" cellspacing="0">
  <tr>
  			<th align="left"><input id="open_menu" style="display: none" name="open_menu" type="image" onclick="openMenu();" src="../common/images/open_menu.png" title="显示菜单"/></th>
			<th align="right" style="margin-right: 30px;"><font style="margin-right: 30px;" id="menupath" color="#000000">当前位置：</font></th>
		</tr>
	</table>
</body>
</html>