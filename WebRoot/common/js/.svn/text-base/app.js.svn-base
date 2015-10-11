(function(jQuery) {
	this.selfoptions = {
		homePage : '',
		pageSize : 50,
		expendTree : 0,
		needModify : 'N'
	}
	
	this.leftMenuId = '#leftMenuTree';
	this.centerPanelId = '#center';
	this.pwdDlgId = "#pwdDlg";
	this.deptChoiceDlgId = "#commDeptSelectorDlg";
	/**
	 * 获取系统参数配置
	 */
	this.options = function() {
		return this.selfoptions;
	}
	
	/**
	 * 清除人员选择的弹出panel
	 */
	this.cleanEmpToolbar = function() {
		var obj = $("div .panel, .combo-p");
		if (obj.length > 0) {
			for (var i = 0; i < obj.length; i++) {
				if (obj[i].find("#emp_toolbar").length > 0) {
					obj[i].remove();
					break;
				}
			}
		}
	}

	/**
	 * 加载页面内容并显示在中间区域
	 */
	this.loadPage = function(title, linkUrl) {
		
		// 如果URL与菜单相同，使菜单选中状态
		var pos = linkUrl.indexOf("?");
		var tempLinkUrl = linkUrl;
		if (pos > 0) {
			tempLinkUrl = linkUrl.substring(0, pos);
		}
		var targetNode = $(leftMenuId).tree('find', tempLinkUrl);
		$(leftMenuId).tree('select', targetNode.target);

		// 加载页面
		var panel = $('body').layout('panel', 'center');
		panel.panel('options').onLoad = function() {
			initControls($(this));
		}
		panel.panel('setTitle', title).panel('refresh', linkUrl);
		
		// 清除人员选择的弹出panel
		//cleanEmpToolbar();
	}
	
	/**
	 * 刷新页面内容并显示在中间区域
	 */
	this.refreshPage = function(title, linkUrl) {

		// 加载页面
		var panel = $('body').layout('panel', 'center');
		panel.panel('options').onLoad = function() {
			initControls($(this));
		}
		panel.panel('setTitle', title).panel('refresh', linkUrl);

		// 清除人员选择的弹出panel
		//cleanEmpToolbar();

	}
	
	/**
	 * 取得部门树根节点
	 */
	this.getRootDeptment = function() {
		var deptTree = $(this.deptChoiceDlgId + " ul");
		var deptId = deptTree.tree('getRoot').id;
		
		return deptId;
	}

	/**
	 * 显示部门选择对话框
	 */
	this.showDeptChoiceDlg = function(target) {
			
		// 重新初始化子部门包含控件
		var includeInput = $(".dept-child", target);
		var includeCheckbox = $("#includeChildDept");
		// 1.解除绑定的事件
		includeCheckbox.unbind();  
		// 2.设置其初始值
		var withChild = includeInput.val();
		if (withChild != null && (withChild == "true" || withChild == "1")) {
			includeCheckbox[0].checked = true;
		} else {
			includeCheckbox[0].checked = false;
		}
		// 3. 重新注册事件
		includeCheckbox.on('change', function(event){
			includeInput.val(this.checked ? 1 : 0);
			
    		var empControl = $('#emp_select');
    		if (empControl != undefined && empControl != null) {
    			empControl.combogrid('clear');
			}	
			
		});
		
		
		// 重新初始化部门列表控件
		var deptTree = $(this.deptChoiceDlgId + " ul");

		// 展开部门Tree(默认为全部折叠)
		if (selfoptions.expendTree == 1) {
			deptTree.tree({
	  			onLoadSuccess: function() {
						$(this).tree('expandAll');
					}				
			});
		}	

		// 1. 清除原来选中的节点
		var node = deptTree.tree('getSelected');   
		if (node != null) {
			$(node.target).removeClass('tree-node-selected');
		}
		// 2. 重新设置选中节点
		var id = $(".dept-id", target).val();
		if (id != null && id != "") {
			var node = deptTree.tree('find', id);
			if (node != null && node.target != null) {
				$(node.target).addClass('tree-node-selected');
				//deptTree.tree('select', node.target);
			}
		}

		// 3.重新注册部门选择函数 
		deptTree.tree('options').onSelect = function(node) { 
			var oldID = $(".dept-id", target).val();
			
	    	if (node.id != undefined && node.id != "") {
	    		$(".textbox-text", target).val(node.text);
	    		$(".dept-id", target).val(node.id);
	    	}
	    	
    		var empControl = $('#emp_select');
    		if (empControl != undefined && empControl != null) {
    			empControl.combogrid('enable');
			}	

	    	// onChange
	    	if (oldID != $(".dept-id", target).val()) {
	    		if (empControl != undefined && empControl != null) {
	    			empControl.combogrid('clear');
				}	
	    	}
	    };
		
		// 注册清空部门选择按钮事件
	    var btnClearDept = $("#btnClearDept");
	    btnClearDept.unbind();
	    btnClearDept.on('click', function(event){
    		$(".textbox-text", target).val('');
    		$(".dept-id", target).val('');
    		$(".dept-dept", target).val('');
    		includeCheckbox[0].checked = false;
    		var node = deptTree.tree('getSelected');   
    		if (node != null) {
    			$(node.target).removeClass('tree-node-selected');
    		}
    		
    		var empControl = $('#emp_select');
    		if (empControl != undefined && empControl != null) {
    			empControl.combogrid('clear');
    			empControl.combogrid('disable');
			}	
		});
		
		//获取部门选择框的位置，设置弹出对话框显示位置并显示
		var pos = target.getPosition();
		$(this.deptChoiceDlgId).dialog({
			left:pos[0].Left,
			top:pos[0].Top + pos[0].Height
		});
		$(this.deptChoiceDlgId).dialog('open');
	}

	/**
	 * 处理服务器端返回的处理结果
	 * 服务器端返回的数据结构为:ActionResult
	 * @param result		ActionResult	
	 * @returns {Boolean}	如果是未登录，则返回false,其它返回true
	 */
	this.handleActionResult= function(result) {
		// 0-成功, 1-失败, 2-无权限, 3-未登录或Session过期, 4-超时
		if (result.retcode == 0) {		
			$.messager.show({
				title: '操作成功',
				msg: result.retmesg,
				showType: 'slide',
				timeout: 1500,
				style:{
					right:'',
					top:document.body.scrollTop+document.documentElement.scrollTop,
					bottom:''
				}
			});
			//$.messager.alert('操作成功', result.retmesg, 'info');
		} else if (result.retcode == 1) {
			$.messager.alert('操作失败', result.retmesg, 'info');
		} else if (result.retcode == 2) {
			$.messager.alert('操作失败', result.retmesg, 'warning');
		} else if (result.retcode == 4) {
			$.messager.alert('操作超时', result.retmesg, 'warning');
		} else if (result.retcode == 3) {
			$.messager.alert('操作失败', "您还没有登录或长时间没有操作，2秒中后将跳转到登录页面", 'question');
			setTimeout(function(){
				window.location = "/login.do";
			}, 2000);
		}
		return (result.retcode != 3);
	}
	
	/**
	 * 为DataGrid创建列选择菜单
	 * @param cmenu		需要创建的菜单变量
	 * @param dgid		DataGrid元素的ID
	 */
	this.createColumnMenu = function(dgid){
		var cmenu = $('<div/>').appendTo('body');
		cmenu.menu({
			onClick: function(item){
				if (item.iconCls == 'icon-ok'){
					$(dgid).datagrid('hideColumn', item.name);
					cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-empty'
					});
				} else {
					$(dgid).datagrid('showColumn', item.name);
					cmenu.menu('setIcon', {
						target: item.target,
						iconCls: 'icon-ok'
					});
				}
			}
		});
		var fields = $(dgid).datagrid('getColumnFields');
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(dgid).datagrid('getColumnOption', field);
			cmenu.menu('appendItem', {
				text: col.title,
				name: field,
				iconCls: 'icon-ok'
			});
		}
		return cmenu;
	}
	
	this.homePage = function() {
		document.cookie="nodeText=";
		document.cookie="nodeId=";
		
		window.location.href="index.do"; 
	}
	
	/**
	 * 显示修改密码对话框
	 */
	this.showPwdDlg = function(title) {
		var pwdDlg = $("<div></div>");
		pwdDlg.dialog({
			title: (title == undefined) ? '密码修改':title,
			href: 'user/password.do',
			width: 400,
		    height: 210,
		    closed: false,
		    modal: true,		
			buttons: [{
				text:'保 存',
				iconCls:'icon-ok',
				handler:function() {
					var pwdForm = $("#pwdForm", pwdDlg);
					pwdForm.form({
						onSubmit: function () {
							return pwdForm.form('validate');
						},
					    success:function(data) {
					    	var result = $.parseJSON(data);
					    	if (handleActionResult(result)) {
					    		if (result.retcode == 0) {
					    			pwdDlg.dialog('destroy');
					    		}
					    	}
					    }
					});
					pwdForm.form('submit');
				}
			},{
				text:'取 消',
				iconCls:'icon-cancel',
				handler:function(){
					pwdDlg.dialog('destroy');
				}
			}],
			onLoad: function() {
				$('.validatebox-text', pwdDlg).bind('blur', function(){
					$(this).validatebox('enableValidation').validatebox('validate');
				});				
			},
			onClose : function() {
				pwdDlg.dialog('destroy');
			}
		});
	}
	
	/**
	 * 初始化页面局部的控件
	 */
	this.initControls = function(target) {
		// 注册部门下拉框控件
		$('.dept-combobox a', target).on('click', function(event){
			showDeptChoiceDlg($(this).parent().parent());
		})
		return target;
	}
	
	/**
	 * 应用（首页）初始化
	 */
	this.inits = function() {
		// 创建并加载菜单树
		$(this.leftMenuId).tree({  
			url:'user/menus.do',
			method:'get',
			animate:true,
			'lines': 'true',
		    onClick: function(node) { 
		    	if (node.id != undefined && node.id != "") {
		    		
		    		document.cookie="nodeText=" + node.text;
		    		document.cookie="nodeId=" + node.id;
		    		
		    		loadPage(node.text, node.id); 
		    	}
		    },
		    onLoadSuccess: function(node, data) {
		    	var thisTree = $(this);
		    	
		    	// 获取系统参数
		    	$.getJSON('params.do', function(data) {
		    		// 合并参数配置
		    		selfoptions = $.extend({}, selfoptions, data);
		    		
		    		// 判断初始页面
		    		var rootNodes = thisTree.tree('getRoots');
		    		if (rootNodes.length > 0) {
		    			
		    			var strCookie = document.cookie;
	    				var arrCookie=strCookie.split("; "); 
	    				var nodeText="";
	    				var nodeId="";
	    				
	    				//遍历cookie数组，处理每个cookie对 
	    				for(var i=0;i<arrCookie.length;i++){ 
	    					var arr=arrCookie[i].split("="); 
	    					//找到名称为userId的cookie，并返回它的值 
	    					if("nodeText"==arr[0]){ 
	    						nodeText=arr[1]; 
	    					} 
	    					if("nodeId"==arr[0]){ 
	    						nodeId=arr[1]; 
	    					} 
	    				} 
	    				
	    				if(nodeText != undefined && nodeText != ""  && nodeId != undefined && nodeId != "" ){
	    					loadPage(nodeText, nodeId);
	    					return;
	    				}
		    			
		    			if (data.homePage == "") {
		    				var firstChild = rootNodes[0].children[0];
		    				loadPage(firstChild.text, firstChild.id);
		    			} else {
		    				var found = false;
		    				for (var i = 0; i < rootNodes.length; i++) {
		    					var children = rootNodes[i].children;
		    					if (!found) {
			    					for (var j = 0; j < children.length; j++) {
			    						if (data.homePage == children[j].attributes.id) {
			    							//console.log(children[j]);
			    							loadPage(children[j].text, children[j].id);
			    							found = true;
			    							break;
			    						}
			    					}
		    					}
		    				}
		    			}
		    		}
		    		
		    		// 判断是否显示修改密码页面
		    		if (data.needModify == 'Y') {
		    			showPwdDlg('密码修改 (您还没有修改密码)');
		    		}
		    	});
			}
		});	
		
	}
	
	jQuery.gmkq = this;
	return jQuery;
})(jQuery);

$(function(){  
	// 注册Ajax默认设置
	$.ajaxSetup({ cache: false });
	// 注册Ajax请求错误默认处理函数
	$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
		if (jqxhr.status == 401) {
			$.messager.alert('登录超时', "您长时间没有操作，2秒中后将自动跳转到登录页面！", 'question');
			setTimeout(function(){
				window.location.href = "login.do";
			}, 2000);
		}
	});
	//初始化首页面
	$.gmkq.inits(); 
});  


