(function(jQuery) {
	/*
	 * 设备管理JS插件
	 */
	
	this.pageId = '#rolePage';
	this.listId1 = this.pageId + ' #listPanel1';
	this.gridId1 = this.listId1 + ' #tbl1';
	this.panelId = this.pageId + ' #editPanel';
	
	this.listId2 = this.pageId + ' #listPanel2';
	this.gridId2 = this.listId2 + ' #tbl2';
	this.listId3 = this.pageId + ' #listPanel3';
	this.gridId3 = this.listId3 + ' #tbl3';
	this.gridColMenu1 = null;
	this.gridColMenu2 = null;
	this.gridColMenu3 = null;
	
	//授权画面
	this.setPanelId = this.pageId + ' #setPanel';

	// 查看/添加岗位页面控件是否已加载
	this.isPanel2Loaded = false;
	//授权页面控件是否已加载
	this.isPanel3Loaded = false;
	
	/**
	 * 从Panel页面返回到列表页面
	 */
	this.returnToListPage = function() {
		$(panelId).panel('close');
		$(listId1).show();
		$(gridId1).datagrid('reload');
	}
	
	this.getSelected = function (){
		var nodes = $('#tt').tree('getChecked', ['checked','indeterminate']);
		var roleId = $('#tempRoleId').val();
		var menuIds = $.map(nodes, function(node){ return node.id; }).join(",");
		$.getJSON("role/roleSetSave.do?roleId=" + roleId + '&menuIds=' + menuIds, function(data){
				if ($.gmkq.handleActionResult(data)) {
					if (data.retcode == 0) {
					}
				}
			})
	}
	/**
	 * 删除行记录
	 */
	this.deleteRow = function() {
		var rows = $(gridId1).datagrid('getChecked');
		if (!rows || rows.length == 0) {
			$.messager.alert('提示', '请选择要删除的记录。', 'info');
		} else {
			$.messager.confirm('提示', '确实要执行删除功能吗?', function (confirm) {
				if (confirm) {
					// 获取选中记录的ID，并用逗号分隔
					var ids = $.map(rows, function(row){ return row.id; }).join(",");
					$.getJSON("role/delete.do?ids=" + ids, function(data){
						if ($.gmkq.handleActionResult(data)) {
							if (data.retcode == 0) {
								// 删除成功,刷新页面
								$(gridId1).datagrid('reload');
								$(gridId1).datagrid("clearChecked");
							}
						}
					});
				}
			});
		}
	}

	/**
	 * 删除角色岗位
	 */
	this.deletePositionRow = function() {
		var rows = $(gridId2).datagrid('getChecked');
		if (!rows || rows.length == 0) {
			$.messager.alert('提示', '请选择要删除的记录。', 'info');
		} else {
			$.messager.confirm('提示', '确实要执行删除功能吗？', function (confirm) {
				if (confirm) {
					// 获取选中记录的ID，并用逗号分隔
					var id = $("input[name='id1']").val();
					var postNumbers = $.map(rows, function(rows){ return rows.postNumber}).join(",");
					$.getJSON("role/rolePositionDel.do?id=" + id + '&postNumbers=' + postNumbers, function(data){
						if ($.gmkq.handleActionResult(data)) {
							if (data.retcode == 0) {
								// 删除成功,刷新页面
								$(gridId2).datagrid('reload');
							}
						}
					});
				}
			});
		}
	}
	
	/**
	 * 选择角色未选择岗位信息 选择岗位
	 */
	this.rolePositionSelRow = function() {
		var rows = $(gridId3).datagrid('getChecked');
		if (!rows || rows.length == 0) {
			$.messager.alert('提示', '请选择要增加的岗位!', 'info');
		} else {
			$.messager.confirm('提示', '是否增加选中的岗位?', function (confirm) {
				if (confirm) {
					// 获取选中记录的ID，并用逗号分隔
					var id = $("input[name='id1']").val();
					var postNumbers = $.map(rows, function(rows){ return rows.postNumber}).join(",");
					$.getJSON("role/rolePositionSel.do?id=" + id + '&postNumbers=' + postNumbers, function(data){
						if ($.gmkq.handleActionResult(data)) {
							if (data.retcode == 0) {
								// 增加成功,刷新页面
								$(gridId3).datagrid('reload');
								$(gridId3).datagrid("clearChecked");
							}
						}
					});
				}
			});
		}
	}
	

	
	/**
	 * 授权岗位的显示
	 */
	this.showMenuRows = function() {
		var rows = $(gridId1).datagrid('getChecked');
		if (!rows || rows.length == 0) {
			$.messager.alert('提示', '请选择角色记录。', 'info');
		} else if (rows.length > 1) {
			$.messager.alert('提示', '您只能选择一个角色授权!', 'info');
		} else {
			$.messager.confirm('提示', '是否授权选中的角色?', function (confirm) {
				if (confirm) {
					$(listId1).hide();
					$(panelId).panel({title:'授权', height:'100%', href:'role/setpage.do?roleId=' + rows[0].id});
					$(panelId).panel('open');
				}
			});
		}
	}
	
	/**
	 * 提交Panel中的内容到服务器
	 */
	this.submitData = function() {
		var curForm = $(panelId + " form");
		curForm.form({
			onSubmit: function () {
				curForm.form('enableValidation');
				return curForm.form('validate')
			},
		    success:function(data) {
		    	var result = $.parseJSON(data);
		    	if ($.gmkq.handleActionResult(result)) {
		    		if (result.retcode == 0) {
		    			curForm.form('disableValidation');
		    			curForm.form('clear');
		    		}
		    	}
		    }
		});
		curForm.form('submit');
	}

	/**
	 * 角色修改提交Panel中的内容到服务器
	 */
	this.submitFixData = function() {
		var curForm = $(panelId + " form");
		curForm.form({
			onSubmit: function () {
				curForm.form('enableValidation');
				return curForm.form('validate')
			},
		    success:function(data) {
		    	var result = $.parseJSON(data);
		    	if ($.gmkq.handleActionResult(result)) {
		    		if (result.retcode == 0) {
		    			curForm.form('disableValidation');
		    		}
		    	}
		    }
		});
		curForm.form('submit');
	}

	/**
	 * 加载查看/添加岗位页面控件
	 */
	this.loadPanel2 = function() {
		if (!isPanel2Loaded) {
			// 创建DataGrid:角色对应岗位信息
			$(gridId2).datagrid({
				url: '',
				method: 'get',
				toolbar: listId2 + ' .table-header',
				title: '管理员角色对应岗位信息列表',
				iconCls: 'icon-reload',
				pagination:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				idField: 'id',
				fit:true,
				rownumbers:true,
				columns:[[
				          {field:'id',title:'序号',width:120,align:'left', checkbox:true},
				          {field:'postNumber',title:'岗位编码',width:220,align:'left'},
				          {field:'postName',title:'岗位名称',width:1000,align:'left'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (gridColMenu2 == null) {
						gridColMenu2 = $.gmkq.createColumnMenu(this.gridId2);
					}
					gridColMenu2.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});				

			// 角色对应岗位信息列表:查询按钮
			$(listId2 + ' #btnSearch2').on('click', function(event) {
				var param = $(listId2 + " form.condition-form").serializeObject();
				$(gridId2).datagrid("clearChecked");
				$(gridId2).datagrid("load", param);
			});
			
			// 角色对应岗位信息列表:新增按钮
			$(listId2 + ' #btnAdd2').on('click', function(event) {
				//初始化Panel3
				loadPanel3();	

				$(listId2).hide();
				$(listId2 + " #postName").textbox('clear');
				var param = $(listId2 + " form.condition-form").serializeObject();
				$(gridId2).datagrid("clearChecked");
				// 设置URL
				var url = "role/rolePositionAdd.do";
				$(gridId3).datagrid('options').url = url;
				$(gridId3).datagrid("clearChecked");
				$(gridId3).datagrid("load",param);
				$(listId3 + " #postNumber").textbox('clear');
				$(listId3 + " #postName").textbox('clear');
				$(listId3).show();
				$(gridId3).datagrid('resize');
				$(gridId3).datagrid("clearChecked");
			});	
			
			// 角色对应岗位信息列表:删除按钮
			$(listId2 + ' #btnDel2').on('click', function(event) {
				deletePositionRow();
			});	
			
			// 角色对应岗位信息列表:返回按钮
			$(listId2 + ' #btnReturn2').on('click', function(event) {
				$(listId2).hide();
				$(listId1).show();
			});
			
			isPanel2Loaded = true;
		}		
	}

	/**
	 * 加载授权页面控件
	 */
	this.loadPanel3 = function() {
		if (!isPanel3Loaded) {
			// 创建DataGrid:未选择岗位信息
			$(gridId3).datagrid({
				url: '',
				method: 'get',
				toolbar: listId3 + ' .table-header',
				title: '未选择岗位信息',
				iconCls: 'icon-reload',
				pagination:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				fit:true,
				rownumbers:true,
				//idField: 'id',
				columns:[[
				          {field:'id',title:'序号',width:300,align:'left',checkbox:true},
				          {field:'postNumber',title:'岗位编码',width:220,align:'left'},
				          {field:'postName',title:'岗位名称',width:1000,align:'left'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (gridColMenu3 == null) {
						gridColMenu3 = $.gmkq.createColumnMenu(this.gridId3);
					}
					gridColMenu3.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});
			
			// 未选择岗位信息:查询按钮
			$(listId3 + ' #btnSearch3').on('click', function(event) {
				var param = $(listId3 + " form.condition-form").serializeObject();
				// 设置URL
				var id = $("input[name='id1']").val();
				var url = "role/rolePositionAdd.do?id="+ id;
				$(gridId3).datagrid('options').url = url;
				$(gridId3).datagrid("load", param);
				});
			
			// 未选择岗位信息:选择按钮
			$(listId3 + ' #btnSelect3').on('click', function(event) {
				rolePositionSelRow();
			});
			
			// 未选择岗位信息:返回按钮
			$(listId3 + ' #btnReturn3').on('click', function(event) {
				$(listId3).hide();
				$(listId2).show();
				$(gridId2).datagrid('reload');
			});	
			
			isPanel3Loaded = true;
		}
	}
	
	
	/**
	 * 角色管理初始化函数
	 */
	this.inits = function() {
		// 创建DataGrid:角色信息列表
		$(this.gridId1).datagrid({
			url: '',
			method: 'get',
			toolbar: this.listId1 + ' .table-header',
			title: '角色信息列表',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			idField: 'id',
			fit:true,
			rownumbers:true,
			columns:[[
				{field:'id',title:'序号',width:120,align:'left', checkbox:true},
				{field:'name',title:'角色名',width:220,align:'left'},
				{field:'roleDesc',title:'角色描述',width:1000,align:'left'}
			]],
			onHeaderContextMenu: function(e, field){
				e.preventDefault();
				if (gridColMenu1 == null) {
					gridColMenu1 = $.gmkq.createColumnMenu(this.gridId1);
				}
				gridColMenu1.menu('show', {left:e.pageX, top:e.pageY});
			},
			onBeforeLoad: function (param) {},
		    onLoadSuccess: function (data) {},
		    onLoadError: function () {},
		    onClickCell: function (rowIndex, field, value) {}
		});	
		
		// 创建Panel控件
		$(this.panelId).panel({  
			closed: true,
			onLoad:function(){
				// 绑定验证触发时点
				$('.validatebox-text', $(this)).bind('blur', function(){
					$(this).validatebox('enableValidation').validatebox('validate');
				});
			}  
		});
		
		// 角色信息列表:查询按钮
		$(this.listId1 + ' #btnSearch').on('click', function(event) {
			// 设置URL
			var url = "role/list.do";
			$(gridId1).datagrid('options').url = url;
			var param = $(listId1 + " form.condition-form").serializeObject();
			$(gridId1).datagrid("clearChecked");
			$(gridId1).datagrid("load", param);
		});
		
		// 角色信息列表:新增按钮
		$(listId1 + ' #btnAdd').on('click', function(event) {
			$(listId1).hide();
			$(panelId).panel({title:'角色信息', height:'220px', href:'role/add.do'});
			$(panelId).panel('open');
		});
		
		// 角色信息列表:修改按钮
		$(listId1 + ' #btnFix').on('click', function(event) {
			var rows = $(gridId1).datagrid('getChecked');
			if (!rows || rows.length == 0) {
				$.messager.alert('提示', '请选择角色记录。', 'info');
			} else if (rows.length > 1) {
				$.messager.alert('提示', '您只能选择一个角色!', 'info');
			} else {
				$(listId1).hide();
				$(panelId).panel({title:'角色信息', height:'220px', href:'role/fix.do?id=' + rows[0].id});
				$(panelId).panel('open');
			}
		});
		
		// 角色信息列表:删除按钮
		$(listId1 + ' #btnDel').on('click', function(event) {
			deleteRow();
		});	
	
		// 角色信息列表:查看和添加岗位按钮
		$(listId1 + ' #btnSearchAdd').on('click', function(event){
			var rows = $(gridId1).datagrid('getChecked');
			if (!rows || rows.length == 0) {
				$.messager.alert('提示', '请选择角色记录。', 'info');
			} else if (rows.length > 1) {
				$.messager.alert('提示', '您只能选择一个角色!', 'info');
			} else {
				//初始化Panel2
				loadPanel2();
				
				$(listId1).hide();
				$(listId2 + " input[name='id']").val(rows[0].id);
				$(listId2 + " input[name='name']").val(rows[0].name);

				$(gridId2).datagrid('getPanel').panel('setTitle', rows[0].name + "角色对应岗位信息列表");
				$(gridId2).datagrid("clearChecked");
				// 设置URL
				var url = "role/rolePositionList.do"
				$(gridId2).datagrid('options').url = url;
				$(gridId2).datagrid("load", {id : rows[0].id});
				$(listId3 + " input[name='id1']").val(rows[0].id);
				$(listId2 + " #postName").textbox('clear');
				$(listId2).show();
				$(gridId2).datagrid('resize');
			}
		});
		
		// 角色信息列表:授权按钮
		$(listId1 + ' #btnSet').on('click', function(event) {
			showMenuRows();
		});
	}
	
	jQuery.role = this;
	return jQuery;
})(jQuery);

$.role.inits();
