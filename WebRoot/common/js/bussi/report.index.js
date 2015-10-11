(function(jQuery) {
	/*
	 * 设备管理JS插件
	 */
	
	this.pageId = '#reportPage';
	this.listId = this.pageId + ' #listPanel';
	this.tabsId = this.pageId + ' #report_tabs';
	this.gridId_Yuanuanshi = this.pageId + ' #dg_yuanshijilu';
	this.gridId_Bukaoqin = this.pageId + ' #dg_bukaoqinjilu';
	this.gridId_Tongji = this.pageId + ' #dg_tongjihuizong';
	this.gridId_BumenTongji = this.pageId + ' #dg_bumentongjihuizong';
	
	this.comboGridId = this.pageId + ' #emp_select';
	
	this.gridColMenu1 = null;
	this.gridColMenu2 = null;
	this.gridColMenu3 = null;
	this.gridColMenu4 = null;
	
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
	 * 创建补考勤记录DataGrid
	 */
	this.createBukaoqinGrid = function() {
		if (gridColMenu2 != null) {
			return false;
		}
		
		// 创建补考勤记录DataGrid
		$(gridId_Bukaoqin).datagrid({
			url: '',
			method: 'get',
			toolbar:'.table-header',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
						{field:'empNumber',title:'考勤号码',width:150,align:'left'},
						{field:'name',title:'姓名',width:150,align:'left'},
			          {field:'deptName',title:'部门名称',width:150,align:'left'},
						{field:'checkTime',title:'考勤时间',width:150,align:'left'},
						{field:'checkType',title:'考勤类型',width:100,align:'left'},
						{field:'rocoreCause',title:'补记录原因',width:200,align:'left'},
						{field:'rocoreManager',title:'补记录操作员',width:200,align:'left'}
					]],
					onHeaderContextMenu: function(e, field){
						e.preventDefault();
						if (gridColMenu2 == null) {
							gridColMenu2 = $.gmkq.createColumnMenu(gridId_Bukaoqin);
						}
						gridColMenu2.menu('show', {left:e.pageX, top:e.pageY});
					}
		});	
	}

	/**
	 * 创建统计汇总DataGrid
	 */
	this.createSummeryGrid = function() {
		if (gridColMenu3 != null) {
			return false;
		}
		
		// 创建统计汇总DataGrid
		$(gridId_Tongji).datagrid({
			url: '',
			method: 'get',
			toolbar:'.table-header',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
						{field:'deptName',title:'部门名称',width:150,align:'left'},
						{field:'empNumber',title:'考勤号码',width:150,align:'left'},
						{field:'name',title:'姓名',width:150,align:'left'},
						{field:'days',title:'平日',width:100,align:'right'},
						{field:'weekNums',title:'周天',width:100,align:'right'},
						{field:'workDays',title:'应上班天数',width:100,align:'right'},
						{field:'attendanceDays',title:'实际上班天数',width:100,align:'right'},
						{field:'attendanceRate',title:'出勤率',width:100,align:'right'},
					]],
					onHeaderContextMenu: function(e, field){
						e.preventDefault();
						if (gridColMenu3 == null) {
							gridColMenu3 = $.gmkq.createColumnMenu(gridId_Tongji);
						}
						gridColMenu3.menu('show', {left:e.pageX, top:e.pageY});
					}
		});	
	}
	
	/**
	 * 创建部门统计汇总DataGrid
	 */
	this.createDeptSummeryGrid = function() {
		if (gridColMenu4 != null) {
			return false;
		}
		
		// 创建部门统计汇总DataGrid
		$(gridId_BumenTongji).datagrid({
			url: '',
			method: 'get',
			toolbar:'.table-header',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
						{field:'deptName',title:'部门名称',width:150,align:'left'},
						{field:'deptEmpNum',title:'人数',width:150,align:'right'},
						{field:'days',title:'应上班天数',width:100,align:'right'},
						{field:'attendanceDays',title:'实际上班天数',width:100,align:'right'},
						{field:'attendanceRate',title:'出勤率',width:100,align:'right'},
					]],
					onHeaderContextMenu: function(e, field){
						e.preventDefault();
						if (gridColMenu4 == null) {
							gridColMenu4 = $.gmkq.createColumnMenu(gridId_BumenTongji);
						}
						gridColMenu4.menu('show', {left:e.pageX, top:e.pageY});
					}
		});	
	}

	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		
		// 创建人员选择控件
		$(this.comboGridId).combogrid({
		    panelWidth:'500px',
		    multiple: true,
		    disabled : true,
		    idField:'empNumber',
		    textField:'name',
		    toolbar:'#emp_toolbar',
		    editable:false,
		    method: 'get',
		    url:'',
		    columns:[[
                {field:'ck',checkbox:true},
		        {field:'empNumber',title:'考勤号码',width:100,align : 'left'},
		        {field:'name',title:'姓名',width:100,align : 'left'},
		        {field:'position',title:'职务',width:120,align : 'left'},
		        {field:'deptName',title:'部门名称',width:150,align : 'left'}
		    ]],
		    
		    onShowPanel: function () {
				// 设置URL
				var url = "kqrecord/getEmployList.do";
				$(comboGridId).combogrid('grid').datagrid('options').url = url;
		    	
				// 为全选按钮添加事件
				clearAllCheck();
		    	
		    	$(comboGridId).combogrid('grid').datagrid('unselectAll');
		    	
		    	// 设置参数
		    	var empowDepartment = $('#dept_id').val();
		    	var withChildren = $('#has_children_id').val();
		    	var param = {empowDepartment: empowDepartment, withChildren: withChildren};
				// 刷新数据
				$(comboGridId).combogrid('grid').datagrid("load", param);
		    },
		    
		    onHidePanel: function () {
	    	    // 清空检索用姓名
		    	$("#srch_empName_grid").attr("value",'');
	        },
	        
	        onLoadSuccess: function (data) {
				//显示记录数，选择数
				var rowNum = data.rows.length;
				var checkedNum = $(comboGridId).combogrid('grid').datagrid("getChecked").length;
				var labelStr1 = "总" + rowNum;
				var labelStr2 =  "（已选择" + 0 + "）"; 
				document.getElementById("srch_emp_num").innerHTML = labelStr1;
				document.getElementById("srch_emp_checked").innerHTML = labelStr2;
	        },
	        
	        onCheck: function (index, row) {
	        	var checkedNum = $(comboGridId).combogrid('grid').datagrid("getChecked").length;
				var labelStr2 =  "（已选择" + checkedNum + "）"; 
				document.getElementById("srch_emp_checked").innerHTML = labelStr2;
	        },

	        onUncheck: function (index, row) {
	        	var checkedNum = $(comboGridId).combogrid('grid').datagrid("getChecked").length;
				var labelStr2 =  "（已选择" + checkedNum + "）"; 
				document.getElementById("srch_emp_checked").innerHTML = labelStr2;
	        }

		});
		
		// 创建原始记录DataGrid
		$(this.gridId_Yuanuanshi).datagrid({
			url: '',
			method: 'get',
			toolbar:'.table-header',
			iconCls: 'icon-reload',
			pagination:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
						{field:'deptName',title:'部门名称',width:150,align:'left'},
						{field:'empNumber',title:'考勤号码',width:150,align:'left'},
						{field:'name',title:'姓名',width:150,align:'left'},
						{field:'checkTime',title:'时间',width:150,align:'left'},
						{field:'validate',title:'验证方式',width:100,align:'left'},
						{field:'checkType',title:'状态',width:100,align:'left'},
						{field:'deviceNmae',title:'设备名称',width:200,align:'left'}
					]],
					onHeaderContextMenu: function(e, field){
						e.preventDefault();
						if (gridColMenu1 == null) {
							gridColMenu1 = $.gmkq.createColumnMenu(gridId_Yuanuanshi);
						}
						gridColMenu1.menu('show', {left:e.pageX, top:e.pageY});
					}
		});	
		
		// 创建Tabs
		$(this.tabsId).tabs({
		    onSelect:function(title, index){
				if (index == 0) { // 原始记录
					$("input[name='time_sort']").removeAttr("checked");
					$("input[name='name_sort']").removeAttr("checked");
					$("input[name='empNum_sort']").removeAttr("checked");
					$("input[name='desc_sort']").removeAttr("checked");

					$("input[name='time_sort']").removeAttr("disabled");
					$("input[name='name_sort']").removeAttr("disabled");
					$("input[name='empNum_sort']").removeAttr("disabled");
					$("input[name='desc_sort']").removeAttr("disabled");
				} else if (index == 1) { // 补考勤记录
					$("input[name='time_sort']").removeAttr("checked");
					$("input[name='name_sort']").removeAttr("checked");
					$("input[name='empNum_sort']").removeAttr("checked");
					$("input[name='desc_sort']").removeAttr("checked");

					$("input[name='time_sort']").removeAttr("disabled");
					$("input[name='name_sort']").removeAttr("disabled");
					$("input[name='empNum_sort']").removeAttr("disabled");
					$("input[name='desc_sort']").removeAttr("disabled");
					
					// 创建Datagrid
					createBukaoqinGrid();
				} else if (index == 2) { // 统计汇总
					$("input[name='time_sort']").removeAttr("checked");
					$("input[name='name_sort']").removeAttr("checked");
					$("input[name='empNum_sort']").removeAttr("checked");
					$("input[name='desc_sort']").removeAttr("checked");

					$("input[name='name_sort']").removeAttr("disabled");
					$("input[name='empNum_sort']").removeAttr("disabled");
					$("input[name='desc_sort']").removeAttr("disabled");
					
					$("input[name='time_sort']").attr("disabled", true);

					// 创建Datagrid
					createSummeryGrid();
				} else if (index == 3) { // 部门统计汇总
					$("input[name='time_sort']").removeAttr("checked");
					$("input[name='name_sort']").removeAttr("checked");
					$("input[name='empNum_sort']").removeAttr("checked");
					$("input[name='desc_sort']").removeAttr("checked");

					$("input[name='time_sort']").attr("disabled", true);
					$("input[name='name_sort']").attr("disabled", true);
					$("input[name='empNum_sort']").attr("disabled", true);
					$("input[name='desc_sort']").attr("disabled", true);
					
					// 创建Datagrid
					createDeptSummeryGrid();
				}
		    	
		    }
		});
		
	}
	
	// 按钮事件:人员检索按钮
	$(this.pageId + ' #btnSrchEmp').on('click', function(event) {
		$(comboGridId).combogrid('grid').datagrid('unselectAll');    	
		// 设置参数
    	var empowDepartment = $('#dept_id').val();
    	var withChildren = $('#has_children_id').val();
    	var empName = $('#srch_empName_grid').val();
    	var param = {empowDepartment: empowDepartment, withChildren: withChildren, empName: empName};

    	// 刷新数据
		$(comboGridId).combogrid('grid').datagrid("load", param);
	});

	// 按钮事件:人员检索关闭按钮
	$(this.pageId + ' #btnCloseSrchEmp').on('click', function(event) {
		$('#emp_select').combogrid("hidePanel");
	});

	/**
	 * 按钮事件:部门变化
	 */
	this.deptChange = function() {
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
		
		var dateFrom = $(pageId + " #dateFrom").datebox('getText');
		var dateTo = $(pageId + " #dateTo").datebox('getText');
		
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
		var param = $(pageId + " form.condition-form").serializeObject();
		// 添加排序参数
		param.timSort = timSort;
		param.empNumSort = empNumSort;
		param.nameSort = nameSort;
		param.descSort = descSort

		var pp = $(tabsId).tabs('getSelected');
		var tabIndex = $(tabsId).tabs('getTabIndex',pp);
		
		if (tabIndex == 0) {
			// 设置URL
			var url = "report/deviceAttentanceList.do";
			$(gridId_Yuanuanshi).datagrid('options').url = url;

			$(gridId_Yuanuanshi).datagrid("load", param);
		} else if (tabIndex == 1) {
			// 设置URL
			var url = "report/addAttentanceList.do";
			$(dg_bukaoqinjilu).datagrid('options').url = url;

			$(dg_bukaoqinjilu).datagrid("load", param);
		} else if (tabIndex == 2) {
			if (dateFrom == null || dateFrom == "" || dateTo == null || dateTo == "") {
				$.messager.show({
    				title: '警告',
    				msg: '汇总时，必须输入开始日期和结束日期！',
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
			
			// 设置URL
			var url = "report/summaryList.do";
			$(dg_tongjihuizong).datagrid('options').url = url;

			$(dg_tongjihuizong).datagrid("load", param);
		} else if (tabIndex == 3) {
			if (dateFrom == null || dateFrom == "" || dateTo == null || dateTo == "") {
				$.messager.show({
    				title: '警告',
    				msg: '汇总时，必须输入开始日期和结束日期！',
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
			
			// 设置URL
			var url = "report/deptSummaryList.do";
			$(dg_bumentongjihuizong).datagrid('options').url = url;

			$(dg_bumentongjihuizong).datagrid("load", param);
		}
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
		
		var dateFrom = $(pageId + " #dateFrom").datebox('getText');
		var dateTo = $(pageId + " #dateTo").datebox('getText');
		
		// 取得Tab index
		var pp = $(tabsId).tabs('getSelected');
		var tabIndex = $(tabsId).tabs('getTabIndex',pp);
		
		if (tabIndex == 2) {
			if (dateFrom == null || dateFrom == "" || dateTo == null || dateTo == "") {
				$.messager.show({
    				title: '警告',
    				msg: '汇总时，必须输入开始日期和结束日期！',
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
		} else if (tabIndex == 3) {
			if (dateFrom == null || dateFrom == "" || dateTo == null || dateTo == "") {
				$.messager.show({
    				title: '警告',
    				msg: '汇总时，必须输入开始日期和结束日期！',
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
				+ descSort + "&Title=" + tabIndex;
		

		var urlStr = "report/printPdf.do?" + param;
		$('#btnPrintPdf').attr("href", urlStr);
	});

	// 按钮事件:导出按钮
	$(this.pageId + ' #btnExportExcel').on('click', function(event) {
		// 设置时间
		$("input[name=dateFrom]").attr("value", $("input[name=dateFrom]").siblings("input").val());
		$("input[name=dateTo]").attr("value", $("input[name=dateTo]").siblings("input").val());
		
		var dateFrom = $(pageId + " #dateFrom").datebox('getText');
		var dateTo = $(pageId + " #dateTo").datebox('getText');
		
		// 取得Tab index
		var pp = $(tabsId).tabs('getSelected');
		var tabIndex = $(tabsId).tabs('getTabIndex',pp);
		
		if (tabIndex == 2) {
			if (dateFrom == null || dateFrom == "" || dateTo == null || dateTo == "") {
				$.messager.show({
    				title: '警告',
    				msg: '汇总时，必须输入开始日期和结束日期！',
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
		} else if (tabIndex == 3) {
			if (dateFrom == null || dateFrom == "" || dateTo == null || dateTo == "") {
				$.messager.show({
    				title: '警告',
    				msg: '汇总时，必须输入开始日期和结束日期！',
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
				+ descSort + "&Title=" + tabIndex;
		
		var urlStr = "report/exportExcel.do?" + param;
		$('#btnExportExcel').attr("href", urlStr);
	});
	
	jQuery.report = this;
	
	return jQuery;
})(jQuery);

$.report.inits();
