(function(jQuery) {
	/*
	 * 设备管理JS插件
	 */
	
	this.pageId = '#devicePage';
	this.listId = this.pageId + ' #listPanel';
	this.gridId = this.pageId + ' #dg';
	this.panelId = this.pageId + ' #editPanel';
	
	this.gridColMenu = null;
	
	/**
	 * 从Panel页面返回到列表页面
	 */
	this.returnToListPage = function() {
		$(panelId).panel('close');
		$(listId).show();
		$(pageId + ' #actList').val(-1);
	}
	
	/**
	 * 插入设备
	 */
	this.insertDevice = function() {
		var curForm = $(panelId + " form");
		curForm.form('submit', {
			onSubmit: function () {
				$(this).form('enableValidation');
				return $(this).form('validate');				
			},
		    success:function(data) {
		    	var result = $.parseJSON(data);
		    	if ($.gmkq.handleActionResult(result)) {
		    		if (result.retcode == 0) {
		    			curForm.form('disableValidation');
		    			curForm.form('reset');
		    		}
		    	}
		    }
		});
	}

	/**
	 * 更新设备
	 */
	this.updateDevice = function() {
		var curForm = $(panelId + " form");
		curForm.form('submit', {
			onSubmit: function () {
				$(this).form('enableValidation');
				return $(this).form('validate');
			},
		    success:function(data) {
		    	var result = $.parseJSON(data);
		    	if ($.gmkq.handleActionResult(result)) {
		    		if (result.retcode == 0) {
		    			$(panelId).panel('close');
		    			$(listId).show();
		    			$(gridId).datagrid('reload');
		    		}
		    	}
		    }
		});
	}

	/**
	 * 执行操作
	 */
	this.executeAction = function() {
		var select = $(pageId + ' #actList');
		var cmdId = select.val();
		if (cmdId != null && cmdId != -1) {
			// 获取选取的设备
			var devs = $(gridId).datagrid('getChecked');
			if (!devs || devs.length == 0) {
				$.messager.alert('提示', '您还没有选取任何设备，无法执行操作!', 'info');
				return false;
			}
			
			if (cmdId == 5 || cmdId == 11 || cmdId == 12) {	
				// 获取当前选中的设备,部门,是否包含子部门,人员或指纹信息的列表
				var url = "device/cmd.do?cmd=" + cmdId + "&";
				url += $.map(devs, function(dev){ return "deviceId=" + dev.id; }).join("&");
				
				// 获取选中的对象
				var targetDg = $(panelId + " #deptEmpDg");
				var targets = targetDg.datagrid('getChecked');
				if (!targets || targets.length == 0) {
					// 用户未选中任何对象，传递部门信息
					var params = targetDg.datagrid('options').queryParams;
					if (params.orgNumber == undefined || params.orgNumber == null || params.orgNumber =='') {
						$.messager.alert('提示', '您还没有选择任何部门或员工，无法执行操作!', 'info');
						return false;
					} else {
						url += "&orgNumber=" + params.orgNumber; 
						url += "&withChild=" + params.withChild; 
					}
				} else {
					// 用户已选中对象，传递对象信息
					if (cmdId == 12) {
						// 指纹记录ID
						url += "&" + $.map(targets, function(target){ return "fpId=" + target.id; }).join("&");
					} else {
						// 员工番号
						url += "&" + $.map(targets, function(target){ return "empNumber=" + target.id; }).join("&");
					}
				}

				// 向服务器发送请求
				$.getJSON(url, function(data) {
					$.gmkq.handleActionResult(data);
				});	
			} else if (cmdId == 13) {
				var depts = $(pageId + ' #deptOfDeviceTree').tree('getChecked');
//				if (!depts || depts.length == 0) {
//					$.messager.alert('提示', '您还没选择要关联的部门!', 'info');
//				} else {
				
				
				$.messager.confirm('提示', '是否确定关联其他部门,若重新关联可能会删除上次的部门，如果不删除以前的部门，请打开以前部门的节点?', function (confirm) {
					if(confirm)
					{
						var orgNumbers = $.map(depts, function(dept){ return 'orgNumber=' + dept.id; }).join("&");
						$.getJSON("device/cmd.do?cmd=" + cmdId + "&deviceId=" + devs[0].id + '&' + orgNumbers, function(data){
							$.gmkq.handleActionResult(data);
						});	
					}
				});
				
					
//				}
			} else if (cmdId == 14) {
				var devs = $(pageId + ' #devEmpDevDg').datagrid('getChecked');
				if (!devs || devs.length == 0) {
					$.messager.alert('提示', '您还没有选取任何设备，无法执行操作!', 'info');
					return;
				}
				
				// 获取选取的人员
				var emps = $(panelId + " #deviceEmpDg").datagrid('getChecked');
				if (!emps || emps.length == 0) {
					$.messager.alert('提示', '您还没有选择对应的人员，无法执行操作!', 'info');
					return;
				}
				
				// 获取设备ID和人员ID, 并提交后台处理
				var devIds = $.map(devs, function(dev){ return "deviceId=" + dev.id; }).join("&");
				var empIds = $.map(emps, function(emp){ return "empNumber=" + emp.empNumber; }).join("&");
				$.getJSON("device/cmd.do?cmd=" + cmdId + "&" + devIds + "&" + empIds, function(data) {
					$.gmkq.handleActionResult(data);
				});					
			}
		}
	}
	
	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		// 查找以下菜单判断是否有相应的权限
		var logAuth = $($.gmkq.leftMenuId).tree('find', 'log/index.do');
		var kqAuth = $($.gmkq.leftMenuId).tree('find', 'kqrecord/index.do');

		// 创建控件 =========================================================
		// 创建DataGrid
		$(this.gridId).datagrid({
			url: 'device/list.do',
			method: 'post',
			toolbar:'.table-header',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: $.gmkq.options().pageSize,
			pageList: [$.gmkq.options().pageSize],
			idField: 'id',
			//fit: true,
			columns:[[ 
				{field:'id',			title:'选择',width:40,align:'center', checkbox:true},
				{field:'snId',			title:'SN',width:120},
				{field:'deviceName',	title:'别名',width:150},
				{field:'ipAddress',		title:'IP地址',width:100},
				{field:'statusName',	title:'状态',width:60,align:'center'},
				{field:'recentOp',		title:'最近联机时间',width:130},
				{field:'lastOpStamp',	title:'最近传送记录时间 ',width:130},
				{field:'fwVersion',		title:'固件版本',width:80},
				{field:'amName',		title:'设备名',width:100},
				{field:'aaa',			title:'数据', align:'center',
					formatter: function(value,row,index){
						var snId = row.snId;
						var html = '<div>';
						if (logAuth != null) {
							var cCmd = "$.gmkq.loadPage('系统日志', 'log/index.do?type=1&sn=" + snId + "')";
							html += '<a href="javascript:void(0);" title="本机服务器下发命令" onclick="' + cCmd + '">C</a>&nbsp;&nbsp;';
						}
						if (kqAuth != null) {
							var lCmd = "$.gmkq.loadPage('考勤记录', 'kqrecord/index.do?sn=" + snId + "')";
							html += '<a href="javascript:void(0);" title="本机考勤记录" onclick="' + lCmd + '">L</a>&nbsp;&nbsp;'
						}						
						if (logAuth != null) {
							var uCmd = "$.gmkq.loadPage('系统日志', 'log/index.do?type=2&sn=" + snId + "')";
							html += '<a href="javascript:void(0);" title="本机设备上传日志" onclick="' + uCmd + '">U</a>';
						}
						return html + '</div>';
					}
				},
				{field:'userCount',		title:'用户数',width:70,align:'right'},
				{field:'fpCount',		title:'指纹数',width:70,align:'right'},
				
				{field:'transactionCount',	title:'当前考勤记录数',width:100,align:'right'},
				{field:'maxRecoNumber',		title:'最大记录容量(万)',width:100,align:'right'},
				//{field:'transInterval',		title:'检查并传送新数据的时间间隔(分钟)',width:40,align:'right'},
				//{field:'transTimes',	title:'定时检查并传送新数据的时间间隔',width:40,align:'right'},
				{field:'deptName',		title:'部门',width:120},
				//{field:'placePosition',	title:'所在位置',width:120},
				//{field:'timeZonel',		title:'时区',width:120},
				//{field:'checkFashion',	title:'验证方式',width:60,align:'center'},
				//{field:'machineUses',	title:'机器用途',width:120},
				//{field:'empowDepartment',	title:'授权部门',width:120},
				//{field:'encrypt',		title:'是否加密传送',width:60,align:'center'},
				//{field:'stamp',			title:'最后上传考勤记录的时间戳标记',width:80},
				//{field:'opStamp',		title:'最后上传人员数据的时间戳标记',width:80},
				//{field:'errorDelay',	title:'联网失败后重新连接服务器的间隔时间(秒)',width:80},
				//{field:'delay',			title:'正常联网时连接服务器的时间(秒)',width:80},
				//{field:'realtime',		title:'是否时实传送新记录',width:60},				
				//{field:'operllogStamp',	title:'上传操作日志时间戳',width:80},
				//{field:'userinfoStamp',	title:'上传用户信息时间戳',width:80},				
				//{field:'fingertmpStamp',title:'上传指纹模版时间戳',width:80},
				//{field:'transFlag',		title:'允许传送的数据类型',width:80,align:'center'},
				//{field:'createDate',	title:'创建日期',width:80,align:'center'},
				//{field:'createTime',	title:'创建时间',width:60,align:'center'},				
				//{field:'modifyDate',	title:'修改日期',width:80,align:'center'},
				//{field:'modifyTime',	title:'修改时间',width:60,align:'center'},				
				//{field:'descript',		title:'备注'}
			]],
			onHeaderContextMenu: function(e, field){
				e.preventDefault();
				if (gridColMenu == null) {
					gridColMenu = $.gmkq.createColumnMenu(gridId);
				}
				gridColMenu.menu('show', {left:e.pageX, top:e.pageY});
			}//,
			//onBeforeLoad: function (param) {},
		    //onLoadSuccess: function (data) {},
		    //onLoadError: function () {},
		    //onClickCell: function (rowIndex, field, value) {}   
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
		
		// 注册按钮事件  =========================================================
		// 按钮事件:检索按钮
		$(this.pageId + ' #btnSearch').on('click', function(event) {
			var param = $(pageId + " form.condition-form").serializeObject();
			$(gridId).datagrid("clearChecked");
			$(gridId).datagrid("load", param);
		});
		
		// 按钮事件:新增按钮
		$(this.pageId + ' #btnAdd').on('click', function(event) {
			$(listId).hide();
			$(panelId).panel({title:'添加设备', height:'400px', href:'device/add.do'});
			$(panelId).panel('open');
		});

		// 按钮事件:编辑按钮
		$(this.pageId + ' #btnEdit').on('click', function(event) {
			var rows = $(gridId).datagrid('getChecked');
			if (!rows || rows.length == 0) {
				$.messager.alert('提示', '请选择要查看的设备!', 'info');
			} else if (rows.length > 1) {
				$.messager.alert('提示', '您只能选择一个设备!', 'info');
			} else {
				$(listId).hide();
				$(panelId).panel({title:'查看编辑设备', height:'400px', href:'device/edit.do?id=' + rows[0].id});
				$(panelId).panel('open');
			}
		});
		
		// 按钮事件:导出按钮
		$(this.pageId + ' #btnExport').on('click', function(event) {
			var params = $(pageId + " form.condition-form").serialize();
			window.open("device/export.do?" + params);	
		});
		
		// 按钮事件:删除按钮
		$(this.pageId + ' #btnDel').on('click', function(event) {
			var rows = $(gridId).datagrid('getChecked');
			if (!rows || rows.length == 0) {
				$.messager.alert('提示', '请选择要删除的数据!', 'info');
			} else {
				$.messager.confirm('提示', '是否删除选中数据?', function (confirm) {
					if (confirm) {
						var ids = $.map(rows, function(row){ return row.snId; }).join(",");
						$.getJSON("device/delete.do?sns=" + ids, function(data){
							if ($.gmkq.handleActionResult(data)) {
								if (data.retcode == 0) { $(gridId).datagrid('reload');}
							}
						});
					}
				});
			}
		});		
		
		// 按钮事件:设备参数配置按钮
		$(this.pageId + ' #btnSet').on('click', function(event){
			$(listId).hide();
			$(panelId).panel({title:'设备参数配置', height:'330px', href:'device/setting.do'});
			$(panelId).panel('open');
		});
		
		// 按钮事件:操作下拉框
		// 1-暂停使用 2-恢复使用 3-重新传送设备上的人员数据 4-重新传送设备上的考勤记录
		// 5-传送部门人员到设备 6-更新设备信息 7-重新启动设备 8-立即检查并传送数据
		// 9-清除设备的所有数据 10-清除设备的考勤记录 11-按部门从人员设备中删除人员
		// 12-按部门从人员设备中删除指纹 13-设置考勤部门 14-查询设备员工信息15 设置考勤机管理员
		$(this.pageId + ' #actList').on('change', function(event) {
			var select = $(this);
			var cmdId = select.val();
			if (cmdId == -1) { return; }
			var cmdTxt = select.find("option:selected").text();

			var rows = $(gridId).datagrid('getChecked');
			if (!rows || rows.length == 0) {
				$.messager.alert('提示', '您还没有选取任何设备，无法执行操作!', 'info');
				select.val(-1);
				return;
			}
			// 先检查设备状态是否满足条件
			if (cmdId == 15 || cmdId == 5 || (cmdId >= 11 && cmdId <= 14)) {
				var idQuery = $.map(rows, function(row){ return "deviceId=" + row.id; }).join("&");
				$.getJSON("device/checkStatus.do?cmd=" + cmdId + "&" + idQuery, function(data){
					if (data.retcode == 0) {
						if (cmdId == 13) {
							if (rows.length > 1) {
								$.messager.alert('提示', '设置考勤部门时，只能选择一个设备!', 'info');
								select.val(-1);
								return;
							}
							$(listId).hide();
							$(panelId).panel({title:'设置考勤部门',height:'100%',href:'device/joint.do?deviceSn=' + rows[0].snId});
							$(panelId).panel('open');
						}else if (cmdId == 15){
							if (rows.length > 1) {
								$.messager.alert('提示', '设置考勤机管理员时，只能选择一个设备!', 'info');
								select.val(-1);
								return;
							}
							$(listId).hide();
							$(panelId).panel({title:'设置考勤机管理员',height:'100%',href:'device/setdeviceManager.do?deviceSn=' + rows[0].snId});
							$(panelId).panel('open');
						} else if (cmdId == 14) {
							$(listId).hide();
							$(panelId).panel({title:'查询设备员工',height:'100%',href:'device/devemp.do'});
							$(panelId).panel('open');				
						} else if (cmdId == 5 || cmdId == 11 || cmdId == 12) {
							$(listId).hide();
							$(panelId).panel({title:cmdTxt, height:'100%', href:'device/emppage.do?cmd=' + cmdId});
							$(panelId).panel('open');
						}					
					} else {
						$.gmkq.handleActionResult(data);
						select.val(-1);
					}
				});					
			} else {
				$.messager.confirm('提示', "确定要对选中的设备执行[  " + cmdTxt + "  ]命令?", function (confirm) {
					if (!confirm) {
						select.val(-1);
					} else {
						var idQuery = $.map(rows, function(row){ return "deviceId=" + row.id; }).join("&");
						$.getJSON("device/cmd.do?cmd=" + cmdId + "&" + idQuery, function(data){
							if ($.gmkq.handleActionResult(data)) {
								if (data.retcode == 0 && (cmdId == 1 || cmdId == 2)) {
									$(gridId).datagrid('reload');
								}
							}
							select.val(-1);
						});					
					}
				});				
			}
		});
	}
	
	jQuery.device = this;
	return jQuery;
})(jQuery);

$.device.inits();
