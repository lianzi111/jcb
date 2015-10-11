(function(jQuery) {
	/*
	 * 考勤记录管理JS插件
	 */

	this.pageId = '#kqRecordPage';
	this.listId = this.pageId + ' #listPanel';
	this.gridId = this.pageId + ' #dg';
	this.comboGridId = this.pageId + ' #emp_select';
	this.panelId = this.pageId + ' #editPanel';

	this.gridColMenu = null;

	// 按钮事件:新增按钮
	$(this.pageId + ' #btnAdd').on('click', function(event) {
		$(listId).hide();
		$(panelId).panel({title:'补考勤记录', height:'500px', href:'kqrecord/add.do'});
		$(panelId).panel('open');
	});
	
	/**
	 * 插入补考勤记录
	 */
	this.insertAttendance = function() {
		var curForm = $(panelId + " #addAttendanceForm");
		curForm.form({
			onSubmit: function () {
				curForm.form('enableValidation');
				//return curForm.form('validate');
				return true;
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
	 * 从Panel页面返回到列表页面
	 */
	this.returnToListPage = function() {
		$(panelId).panel('close');
		$(listId).show();
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
							toolbar : '#kqRecordPage #emp_toolbar',
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
		if ($('#sn_id').length > 0||$("#emp_Number").length>0) { // 从设备管理迁移过来
			// 取得snId
			var snId = $('#sn_id').val();
			var empno = $("#emp_Number").val();
			
			$(this.gridId).datagrid({
				url : '',
				method : 'get',
				queryParams : {sn:snId,empNumber:empno},
				toolbar : '#kqRecordPage .table-header',
				title : '考勤记录列表',
				iconCls : 'icon-reload',
				pagination : true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns : [[ 
				              {field : 'deptName',title : '部门名称',width : 150,align : 'left'}, 
				              {field : 'empNumber', title : '考勤号码', width : 150, align : 'left'}, 
				              {field : 'name',	title : '姓名',	width : 150, align : 'left'	}, 
				              {field : 'checkTime',	title : '时间', width : 150,	align : 'left'}, 
				              {field : 'checkType',	title : '状态',	width : 100,align : 'left'}, 
				              {field : 'deviceNmae',title : '设备名称',width : 200,align : 'left'} 
				          ]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (gridColMenu == null) {
						gridColMenu = $.gmkq.createColumnMenu(gridId);
					}
					gridColMenu.menu('show', {left:e.pageX, top:e.pageY});
				}
			});
		} else { // 从菜单迁移过来
			
			$(this.gridId).datagrid({
				url : '',
				method : 'get',
				toolbar : '#kqRecordPage .table-header',
				title : '考勤记录列表',
				iconCls : 'icon-reload',
				pagination : true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns : [[ 
				              {field : 'deptName',title : '部门名称',width : 150,align : 'left'}, 
				              {field : 'empNumber', title : '考勤号码', width : 150, align : 'left'}, 
				              {field : 'name',	title : '姓名',	width : 150, align : 'left'	}, 
				              {field : 'checkTime',	title : '时间', width : 150,	align : 'left'}, 
				              {field : 'checkType',	title : '状态',	width : 100,align : 'left'}, 
				              {field : 'deviceNmae',title : '设备名称',width : 200,align : 'left'} 
				          ]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (gridColMenu == null) {
						gridColMenu = $.gmkq.createColumnMenu(gridId);
					}
					gridColMenu.menu('show', {left:e.pageX, top:e.pageY});
				}
			});
		}

	}

	// 按钮事件:人员检索按钮
	$(this.pageId + ' #btnSrchEmp').on('click', function(event) {
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

	/**
	 * 按钮事件:部门变化
	 */
	this.deptChange = function() {
		var newValue = $(pageId + ' #dept_id').val();
		alert(newValue);
    	if (newValue != null) {
    		$(comboGridId).combogrid('enable');
    	} else {
    		$(comboGridId).combogrid('disable');
    	}
    	
		$(comboGridId).combogrid('clear');
		$(comboGridId).combogrid('grid').datagrid("uncheckAll");
	}
	
	/**
	 * 执行检索功能
	 */
	this.doSearch = function() {
		// 设置时间
		$("input[name=dateFrom]").attr("value", $("input[name=dateFrom]").siblings("input").val());
		$("input[name=dateTo]").attr("value", $("input[name=dateTo]").siblings("input").val());

		// 设置URL
		var url = "kqrecord/list.do";
		$(gridId).datagrid('options').url = url;

		// 取得排序参数
		var timSort = "";
		var empNumSort = "";
		var nameSort = "";
		var descSort = "";

		if ($("input[name='time_sort']:checked").val()) {
			timSort = 1;
		}
		if ($("input[name='empNum_sort']:checked").val()) {
			empNumSort = 1;
		}
		if ($("input[name='name_sort']:checked").val()) {
			nameSort = 1;
		}
		if ($("input[name='desc_sort']:checked").val()) {
			descSort = 1;
			if (timSort == "" && empNumSort == "" && nameSort == "") {
				$.messager.show({
    				title: '警告',
    				msg: '只选择了降序，没有选择排序项',
    				showType: 'slide',
    				timeout: 2000,
    				style:{
    					right:'',
    					top:document.body.scrollTop+document.documentElement.scrollTop,
    					bottom:''
    				}
    			});	
				return false;
			}
		}

		// 取得Form参数
		var param = $(pageId + " #kqRecordPageForm").serializeObject();

		param.timSort = timSort;
		param.empNumSort = empNumSort;
		param.nameSort = nameSort;
		param.descSort = descSort
      
		var url = 'kqrecord/list.do';
		$(gridId).datagrid('options').url = url;
		
		$(gridId).datagrid("load", param);
	}
	
	// 按钮事件:检索按钮
	$(this.pageId + ' #btnSearch').on('click', function(event) {
		doSearch();
	});

	// 按钮事件:打印按钮
	$(this.pageId + ' #btnPrintPdf').on('click', function(event) {
				// 设置时间
				$("input[name=dateFrom]").attr("value", $("input[name=dateFrom]").siblings("input").val());
				$("input[name=dateTo]").attr("value", $("input[name=dateTo]").siblings("input").val());
		
				// 取得排序参数
				var timSort = "";
				var empNumSort = "";
				var nameSort = "";
				var descSort = "";

				if ($("input[name='time_sort']:checked").val()) {
					timSort = 1;
				}
				if ($("input[name='empNum_sort']:checked").val()) {
					empNumSort = 1;
				}
				if ($("input[name='name_sort']:checked").val()) {
					nameSort = 1;
				}
				if ($("input[name='desc_sort']:checked").val()) {
					descSort = 1;
					if (timSort == "" && empNumSort == "" && nameSort == "") {
						$.messager.show({
		    				title: '警告',
		    				msg: '只选择了降序，没有选择排序项',
		    				showType: 'slide',
		    				timeout: 2000,
		    				style:{
		    					right:'',
		    					top:document.body.scrollTop+document.documentElement.scrollTop,
		    					bottom:''
		    				}
		    			});		
						return false;
					}
				}

				// 取得Form参数
				var param = $(pageId + " form.condition-form").serialize();

				param = param + "&timSort=" + timSort + "&empNumSort="
						+ empNumSort + "&nameSort=" + nameSort + "&descSort="
						+ descSort;

				var urlStr = "kqrecord/printPdf.do?" + param;
				$(pageId + ' #btnPrintPdf').attr("href", urlStr);
			});

	// 按钮事件:导出按钮
	$(this.pageId + ' #btnExportPdf').on('click', function(event) {
		// 设置时间
		$("input[name=dateFrom]").attr("value", $("input[name=dateFrom]").siblings("input").val());
		$("input[name=dateTo]").attr("value", $("input[name=dateTo]").siblings("input").val());
		
		// 取得排序参数
		var timSort = "";
		var empNumSort = "";
		var nameSort = "";
		var descSort = "";

		if ($("input[name='time_sort']:checked").val()) {
			timSort = 1;
		}
		if ($("input[name='empNum_sort']:checked").val()) {
			empNumSort = 1;
		}
		if ($("input[name='name_sort']:checked").val()) {
			nameSort = 1;
		}
		if ($("input[name='desc_sort']:checked").val()) {
			descSort = 1;
			if (timSort == "" && empNumSort == "" && nameSort == "") {
				$.messager.show({
    				title: '警告',
    				msg: '只选择了降序，没有选择排序项',
    				showType: 'slide',
    				timeout: 2000,
    				style:{
    					right:'',
    					top:document.body.scrollTop+document.documentElement.scrollTop,
    					bottom:''
    				}
    			});		
				return false;
			}
		}

		// 取得Form参数
		var param = $(pageId + " form.condition-form").serialize();

		param = param + "&timSort=" + timSort + "&empNumSort="
				+ empNumSort + "&nameSort=" + nameSort + "&descSort="
				+ descSort;

		// 取得导出文件类型
		var fileType = $("input[name='export_type']:checked").val();
		var urlStr;
		if (fileType == "1") { // PDF
			urlStr = "kqrecord/exportPdf.do?" + param;
		} else if (fileType == "2") { // Excel
			urlStr = "kqrecord/exportExcel.do?" + param;
		}

		$(pageId + ' #btnExportPdf').attr("href", urlStr);

	});

	
	jQuery.kqrecord = this;

	return jQuery;
})(jQuery);

$.kqrecord.inits();
