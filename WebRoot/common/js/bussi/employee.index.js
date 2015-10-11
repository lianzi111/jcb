(function(jQuery) {
	/*
	 * 日志管理JS插件
	 */
    /**
     * Datadic人员管理操作编码:人员离职
     */
	var DD_EMACT_LEAVE = 1;
    /**
     * Datadic人员管理操作编码:人员复职
     */
    var DD_EMACT_RETURN = 2;
    /**
     * Datadic人员管理操作编码:传送人员到设备
     */
    var DD_EMACT_DELIVER = 3;
    /**
     * Datadic人员管理操作编码:从设备中删除人员
     */
    var DD_EMACT_DEL = 4;
    /**
     * Datadic人员管理操作编码:临时调拨人员到设备
     */
    var DD_EMACT_DELIVER_TMP = 5;
    /**
     * Datadic人员管理操作编码:转移人员数据到新设备
     */
    var DD_EMACT_TRANSFER = 6;
    /**
     * Datadic人员管理操作编码:调整人员部门
     */
    var DD_EMACT_ADJUST = 7;
    /**
     * Datadic人员管理操作编码:设置考勤管理员
     */
    var DD_EMACT_ADMIN = 8;
    /**
     * 操作编码:登记指纹
     */
    var CUSTOM_SET_FINGER = 999;
	
	this.pageId = '#employeePage';
	this.listId = this.pageId + ' #listPanel';
	this.gridId = this.pageId + ' #dg';
	this.gridColMenu = null;
	//设备画面
	this.devPanelId = this.pageId + ' #devPanel';
	this.devGridId = this.pageId + ' #devDg';
	//部门画面
	this.deptPanelId = this.pageId + ' #deptPanel';
	//临时调拨人员到设备用
	this.searchbarId = this.pageId + ' #searchbar';
	//调整人员部门树
	this.treeId = '#orgTree';
	//人员搜索框 
	this.comboGridId = this.pageId + ' #emp_select';
	
	// 设备搜索框画面
	this.sninput = this.pageId + ' #searchsnid';
	
	//调整部门是否提交标志
	this.isCommitAdjust = false;
	
	//是否加载设备grid
	this.isLoaded = false;
	//是否加载时间控件
	this.isLoadTime = false;
	/**
	 * 从Panel页面返回到列表页面
	 */
	this.returnToListPage = function() {
		$(devPanelId).hide();
		$(deptPanelId).hide();
		$(listId).show();
		var actCode = $('#backActCode').val();
		if(actCode == DD_EMACT_ADJUST && isCommitAdjust){
			//调整部门时，需要在这里列表显示完后刷新，否则列表不见了
			$('#btnSearch').click();
			isCommitAdjust = false;
		}
		$('#fingerPress').val(0);
		$('#backActCode').val(-1);
		if(isLoadTime){
			$('#startTime').datetimebox("setValue","");
			$('#endTime').datetimebox("setValue","");
		}
	}
	
	/**
	 * 提交Panel中的内容到服务器
	 */
	this.submitData = function() {
		var actCode = $('#backActCode').val();
		var isFingerPress = $('#fingerPress').val();
		var startTime;
		var endTime;
		
		
		if(isFingerPress==1){
			//指纹登记用
			actCode = CUSTOM_SET_FINGER;
		}
		
		var empRows = $(gridId).datagrid('getSelections');
		if(!empRows || empRows.length == 0){
			$.messager.alert('提示', '请先选择人员!', 'info');
			return;
		}
		if(actCode == 999){
			if(empRows.length > 1){
				$.messager.alert('提示', '只能选择一个人员!', 'info');
				return;
			}
		}
		var empNumbers = $.map(empRows, function(empRows){ return empRows.empNumber; }).join(",");
		
		var devs = '';
		var orgNumbers = '';
		if(actCode > DD_EMACT_RETURN && actCode != DD_EMACT_ADJUST && actCode != DD_EMACT_DEL){
			var devRows = $(devGridId).datagrid('getSelections');
			if(!devRows || devRows.length == 0){
				$.messager.alert('提示', '请先选择设备!', 'info');
				return;
			}
			if(actCode == DD_EMACT_DELIVER_TMP || actCode == DD_EMACT_TRANSFER ||  actCode == CUSTOM_SET_FINGER){
				if(devRows.length > 1){
					$.messager.alert('提示', '只能选择一个设备!', 'info');
					return;
				}
			}
			devs = $.map(devRows, function(devRows){ return devRows.snId; }).join(",");
			if(actCode == DD_EMACT_DELIVER_TMP){
				
				$("input[name=startTime]").attr("value", $("input[name=startTime]").siblings("input").val());
				$("input[name=endTime]").attr("value", $("input[name=endTime]").siblings("input").val());
				startTime = $('#startTime').datetimebox("getValue");
				endTime = $('#endTime').datetimebox("getValue");
				
				if(startTime == null || startTime == '' || endTime == null || endTime == ''){
					$.messager.alert('提示', '请先选择开始时间和结束时间!', 'info');
					return;
				}
				
			}
			
		}else if(actCode == DD_EMACT_ADJUST){
			var node = $(treeId).tree('getSelected');	
			if(node != null){
				orgNumbers = node.id;
			}else{
				$.messager.alert('提示', '请先选择部门!', 'info');
				return;
			}			
		}
		
		$.messager.confirm('提示', '是否进行相应操作?', function (confirm) {
			if (confirm) {
			    $.getJSON("employee/act.do?empNumbers=" + empNumbers + '&devs=' + devs + '&orgNumbers=' + orgNumbers + '&actCode=' +actCode + '&startTime='+startTime + '&endTime='+endTime, function(data){
					if ($.gmkq.handleActionResult(data)) {
						if (data.retcode == 0) {
							// 删除成功,刷新页面
							if(actCode == DD_EMACT_LEAVE ){
								$('#btnSearch').click();
							}
							if(actCode == DD_EMACT_ADJUST){
								//调整部门时，需要在这里列表显示完后刷新，否则列表不见了
								isCommitAdjust = true;
							}
						}
					}
				}); 
			}
		});

	}
	
	/**
	 * 下拉列表事件函数
	 */
	this.actChanged = function(obj,actCode){
		if(actCode < 0) return;
		
		$('#backActCode').val(actCode);
		$('#actCode').val(-1);
		var empRows = $(gridId).datagrid('getSelections');
		if(!empRows || empRows.length == 0){
			$.messager.alert('提示', '请先选择人员!', 'info');
			$(obj).val(-1);
			return;
		}
		
		var url = "employee/listDevice.do";
		$(devGridId).datagrid('options').url = url;
		
		$(devGridId).datagrid('options').onLoadSuccess = function (data) {
			$(devGridId).datagrid("showColumn", "id");
		}
		
		
		if(actCode == DD_EMACT_LEAVE || actCode == DD_EMACT_RETURN ){
		//人员离职和复职
			submitData();
		}else if(actCode == DD_EMACT_ADJUST){
		//调整人员部门
			$(listId).hide();	
			$(deptPanelId).show();
		}else if(actCode == DD_EMACT_DELIVER_TMP){
			//临时调拨人员到设备用
			$(listId).hide();	
			var params =  [];
			$(devGridId).datagrid("getPanel").panel('setTitle', "临时调拨人员到设备");
			$(devGridId).datagrid("load", params);
			$(devPanelId).show();
			if(!isLoadTime){
				isLoadTime = true;
				$('#startTime').datetimebox({
				    showSeconds: true
				});
				$('#endTime').datetimebox({
				    showSeconds: true
				});
			}
			
			$(searchbarId).show();
		}else if(actCode == DD_EMACT_DEL){
			var empNumbers = $.map(empRows, function(empRows){ return empRows.empNumber; }).join(",");
			$(listId).hide();	
			$(searchbarId).hide();
			var params =  [];
			params['empNumber'] = empNumbers;

			$(devGridId).datagrid("getPanel").panel('setTitle', "从设备中删除人员");
//			$(sninput).show();

			//隐藏id列
			$(devGridId).datagrid('options').onLoadSuccess = function (data) {
				$(devGridId).datagrid("hideColumn", "id");
			}
			
			$(devGridId).datagrid("load", params);
			
			$(devPanelId).show();
		}else{
			if(actCode == DD_EMACT_DELIVER){
				$(devGridId).datagrid("getPanel").panel('setTitle', "传送人员到设备");
				
			}else if(actCode == DD_EMACT_TRANSFER){
				$(devGridId).datagrid("getPanel").panel('setTitle', "转移人员到新设备");
				
			}
			$(listId).hide();	
			$(searchbarId).hide();
			$(sninput).show();
			var params =  [];
			$(devGridId).datagrid("load", params);
			$(devPanelId).show();
		}
	}
	
	// 按钮事件:检索按钮
	$(this.pageId + ' #selectBysnid').on('click', function(event) {
		var param = $(pageId + " form.condition-snid").serializeObject();
		$(devGridId).datagrid("load", param);
	});
	/**
	 * 删除行记录
	 */
	this.deleteRow = function() {
		var rows = $(gridId).datagrid('getSelections');
		
		if (!rows || rows.length == 0) {
			$.messager.alert('提示', '请选择要删除的数据!', 'info');
		} else {
			$.messager.confirm('提示', '是否删除选中数据?', function (confirm) {
				if (confirm) {
					// 获取选中记录的ID，并用逗号分隔
					var ids = $.map(rows, function(row){ return row.empNumber; }).join(",");
					$.getJSON("employee/delete.do?ids=" + ids, function(data){
						if ($.gmkq.handleActionResult(data)) {
							if (data.retcode == 0) {
								// 删除成功,刷新页面
								$(gridId).datagrid('reload');
							}
						}
					});
				}
			});
		}
	}
	
	/**
	 * 为Datagrid全选按钮添加事件
	 */
	this.clearAllCheck = function() {
		var obj = $("div .datagrid-header-check");
		obj.find("input[type='checkbox']").bind("click", function () {
			var checkedNum = $(comboGridId).combogrid('grid').datagrid("getChecked").length;
	        var labelStr2 = "（已选择" + checkedNum + "）";
	        document.getElementById("srch_emp_checked").innerHTML = labelStr2;
        });
	}
	
	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		// 创建人员选择控件
		$(this.comboGridId).combogrid({
							panelWidth : '500px',
							multiple : true,
							disabled : true,
							idField : 'empNumber',
							textField : 'name',
							toolbar : '#employeePage #emp_toolbar',
							editable : false,
							method : 'get',
						    url:'',
						    columns:[[
				                {field:'ck',checkbox:true},
						        {field:'empNumber',title:'考勤号码',width:100},
						        {field:'name',title:'姓名',width:100},
						        {field:'position',title:'职务',width:120},
						        {field:'deptName',title:'部门名称',width:150}
						    ]],

							onShowPanel : function() {
								// 设置URL
								var url = "kqrecord/getEmployList.do";
								$(comboGridId).combogrid('grid').datagrid('options').url = url;
								
								// 为全选按钮添加事件
								clearAllCheck();
								
								$(comboGridId).combogrid('grid').datagrid(
										'unselectAll');

								// 设置参数
								var empowDepartment = $(pageId + ' #dept_id').val();
								var withChildren = $(pageId + ' #has_children_id').val();
								var param = {
									empowDepartment : empowDepartment,
									withChildren : withChildren
								};
								// 刷新数据
								$(comboGridId).combogrid('grid').datagrid(
										"load", param);
							},

							onHidePanel : function() {
								// 清空检索用姓名
								$("#srch_empName_grid").val("");
							},

							onLoadSuccess : function(data) {
								// 显示记录数，选择数
								var rowNum = data.rows.length;
								var checkedNum = $(comboGridId).combogrid(
										'grid').datagrid("getChecked").length;
								var labelStr1 = "总" + rowNum;
								var labelStr2 = "（已选择" + 0 + "）";
								document.getElementById("srch_emp_num").innerHTML = labelStr1;
								document.getElementById("srch_emp_checked").innerHTML = labelStr2;
							},

							onCheck : function(index, row) {
								var checkedNum = $(comboGridId).combogrid(
										'grid').datagrid("getChecked").length;
								var labelStr2 = "（已选择" + checkedNum + "）";
								document.getElementById("srch_emp_checked").innerHTML = labelStr2;
							},

							onUncheck : function(index, row) {
								var checkedNum = $(comboGridId).combogrid(
										'grid').datagrid("getChecked").length;
								var labelStr2 = "（已选择" + checkedNum + "）";
								document.getElementById("srch_emp_checked").innerHTML = labelStr2;
							}
						});
		
		// 创建DataGrid
		$(this.gridId).datagrid({
//			url: 'employee/list.do',
			method: 'get',
			toolbar:'.table-header',
			title: '人员列表',
			iconCls: 'icon-reload',
			pagination:true,
			fit:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
						{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true },  
						{field:'empNumber',title:'考勤号码',width:120},
						{field:'name',title:'姓名',align:'left'},
						{field:'dept',title:'部门名称',width:120,align:'left'},
//						{field:'sex',title:'性别',width:120,align:'left'},
//						{field:'birthday',title:'出生日期',width:120,align:'left'},
//						{field:'nation',title:'民族',width:120,align:'left'},
						{field:'postNumber',title:'职位',width:120,align:'left'},
						{field:'phone',title:'移动电话',width:120,align:'left'},
						{field:'enterDate',title:'聘用日期',width:120,align:'left'},
						{field:'email',title:'电子邮箱',width:120,align:'left'},
						{field:'empState',title:'离职标记',width:120,align:'left'},
						{field:'job_number',title:'职务',width:120,align:'left'},
						{field:'查看数据',title:'查看数据',width:120,align:'left',
							formatter: function(value,row,index){
								var empNumber = row.empNumber;
								var html = '<div>';
								
									var lCmd = "$.gmkq.loadPage('考勤记录', 'kqrecord/index.do?empNumber=" + empNumber + "')";
									html += '<a href="javascript:void(0);" onclick="' + lCmd + '">查看</a>&nbsp;&nbsp;';
								
								return html + '</div>';
							}
						},
					]],
			onHeaderContextMenu: function(e, field){
				e.preventDefault();
				if (gridColMenu == null) {
					gridColMenu = $.gmkq.createColumnMenu(gridId);
				}
				gridColMenu.menu('show', {left:e.pageX, top:e.pageY});
			},
			onBeforeLoad: function (param) {},
		    onLoadSuccess: function (data) {},
		    onLoadError: function () {},
		    onClickCell: function (rowIndex, field, value) {}
		});	
		
		// 创建设备Grid
		$(this.devGridId).datagrid({
			url: '',
			method: 'get',
			toolbar:'.dev-table-header',
			title: '设备列表',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
			          
				{field: 'id', title: '选择', width: 40, align:'left',checkbox:true},  
				{field:'snId',title:'SN',width:120,align:'left', sortable:'true'},
				{field:'deviceName',	title:'别名',width:200, align:'left',sortable:'true'}
			]],
			onHeaderContextMenu: function(e, field){
				e.preventDefault();
				if (gridColMenu == null) {
					gridColMenu = $.gmkq.createColumnMenu(devGridId);
				}
				gridColMenu.menu('show', {left:e.pageX, top:e.pageY});
			},
			onBeforeLoad: function (param) {},
		    onLoadSuccess: function (data) {},
		    onLoadError: function () {},
		    onClickCell: function (rowIndex, field, value) {}
		});	

		// 按钮事件:检索按钮
		$(this.pageId + ' #btnSearch').on('click', function(event) {
			var param = $(pageId + " form.condition-form").serializeObject();
			var url = 'employee/list.do';
			$(gridId).datagrid('options').url = url;
			$(gridId).datagrid("load", param);
		});
		
		// 按钮事件:删除按钮
		$(this.pageId + ' #btnDel').unbind();
		$(this.pageId + ' #btnDel').on('click', function(event) {
			deleteRow();
		});	
		
		// 按钮事件:导出按钮
		$(this.pageId + ' #btnExport').on('click', function(event) {
			var params = $(pageId + " form.condition-form").serialize();
			
			window.location = "employee/export.do?" + params;	
		});
		
		// 按钮事件:查看考勤员
		$(this.pageId + ' #btnView').on('click', function(event) {
			$(listId).hide();		
			var param =  [];
			param['empNumber']='001';
			
			// 设置URL
			var url = "employee/listDevice.do";
			$(devGridId).datagrid('options').url = url;
			
			$(devGridId).datagrid("load", param);
			$(devPanelId).show();
		});
		//按钮事件，设置考勤密码
		
		$(this.pageId+ ' #btnpassword').on('click', function(event){
		
			//获取选择人员，设置检索条件
			var empRows = $(gridId).datagrid('getSelections');
			if(!empRows || empRows.length == 0){
				$.messager.alert('提示', '请先选择人员!', 'info');
				return;
			}else if(empRows.length > 1){
				$.messager.alert('提示', '只能选择一个人员!', 'info');
				return;
			}
			
			var empnumber = $.map(empRows, function(empRows){ return empRows.empNumber; }).join(",");
			var KqpwdDlg = $("<div></div>");
			KqpwdDlg.dialog({
				title:'设置考勤密码',
				href: 'employee/Kqpassword.do?empNumber='+empnumber,
				width: 400,
			    height: 210,
			    closed: false,
			    modal: true,		
				buttons: [{
					text:'保 存',
					iconCls:'icon-ok',
					handler:function() {
						var KqpwdForm = $("#KqpwdForm", KqpwdDlg);
						KqpwdForm.form({
							onSubmit: function () {
								return KqpwdForm.form('validate');
							},
						    success:function(data) {
						    	var result = $.parseJSON(data);
						    	if (handleActionResult(result)) {
						    		if (result.retcode == 0) {
						    			KqpwdDlg.dialog('destroy');
						    		}
						    	}
						    }
						});
						KqpwdForm.form('submit');
					}
				},{
					text:'取 消',
					iconCls:'icon-cancel',
					handler:function(){
						KqpwdDlg.dialog('destroy');
					}
				}],
				onLoad: function() {
					$('.validatebox-text', KqpwdDlg).bind('blur', function(){
						$(this).validatebox('enableValidation').validatebox('validate');
					});				
				},
				onClose : function() {
					KqpwdDlg.dialog('destroy');
				}
			});
			
			
			
		});
		// 按钮事件:登记指纹
		$(this.pageId + ' #btnFinger').on('click', function(event) {

			var param =  [];
			//获取选择人员，设置检索条件
			var empRows = $(gridId).datagrid('getSelections');
			if(!empRows || empRows.length == 0){
				$.messager.alert('提示', '请先选择人员!', 'info');
				return;
			}else if(empRows.length > 1){
				$.messager.alert('提示', '只能选择一个人员!', 'info');
				return;
			}
		
			var empNumbers = $.map(empRows, function(empRows){ return empRows.empNumber; }).join(",");
			param['empNumber']= empNumbers;
			$('#fingerPress').val(1);
			$(listId).hide();		
			$(searchbarId).hide();
			$(devGridId).datagrid("getPanel").panel('setTitle', "登记指纹");

			// 设置URL
			var url = "employee/listDevice.do";
			$(devGridId).datagrid('options').url = url;
			
			$(devGridId).datagrid("load", param);
			$(devPanelId).show();
			//设置actCode为空, 后台根据这个标志调用登记
		});
		
		// 按钮事件:打印按钮
		$(this.pageId + ' #btnPrint').on('click', function(event) {
			var params = $(pageId + " form.condition-form").serialize();
			var urlStr = "employee/printPdf.do?" + params;
			$('#btnPrint').attr("href", urlStr);
		});
		
	}

	// 按钮事件:人员检索按钮
	$(this.pageId + ' #btnSrchEmp').on('click', function(event) {
		   alert(123123);
		$(comboGridId).combogrid('grid').datagrid('unselectAll');
		// 设置参数
		var empowDepartment = $(pageId + ' #dept_id').val();
		var withChildren = $(pageId + ' #has_children_id').val();
		var empName = $('#srch_empName_grid').val();
		
		var param = {
			empowDepartment : empowDepartment,
			withChildren : withChildren,
			empName : empName
		};
   
		// 刷新数据
		$(comboGridId).combogrid('grid').datagrid("load", param);
	});

	// 按钮事件:人员检索关闭按钮
	$(this.pageId + ' #btnCloseSrchEmp').on('click', function(event) {
		// 清空检索用姓名
		$("#srch_empName_grid").val('');
		$(pageId + ' #emp_select').combogrid("hidePanel");
	});
	
	
	jQuery.employee = this;
	return jQuery;
})(jQuery);

$.employee.inits();

