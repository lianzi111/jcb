
var tree = new MzTreeView("tree");
function getTreeData(UserCode) {
	var text = $.ajax({type:"POST", url:"../loadMenuTree.do", async:false, data:"menuType=1"}).responseText;//menuType=1&
	loadtree(text);
}
function loadtree(msg) {
	tree.setIconPath("../common/TreeView/");
	var arr = msg.split("^");
	for (var i = 0; i < arr.length; i++) {
		eval(arr[i]);
	}
	var r = tree.toString();
	$("#treeviewarea").hide();
	$("#treeviewarea").html(r);
	$("#treeviewarea").show(500);
}
function getMenuPath(menuid) {
	var text = $.ajax({type:"POST", url:"../queryMenuPath.do", async:false, data:"menuid=" + menuid}).responseText;
	if(text.indexOf("session失效或者登录")!=-1){
		top.window.location='<%=basePath %>'+'index.jsp';
	}else{
		parent.Quick.document.getElementById('menupath').innerHTML = "当前位置："+text;
	}
}

