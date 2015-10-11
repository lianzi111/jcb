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
	
	this.pageId = '#adminPage';
	this.listId = this.pageId + ' #listPanel';
	this.gridId = this.pageId + ' #dg';
	this.gridColMenu = null;
	//查看考勤员画面
	this.panelId = '#panel';
	this.addGridId = this.panelId + ' #addDg';
	//添加界面
	this.treeId = '#orgTree';
	//人员检索框
	//是否加载添加页面
	this.isLoaded = false;
	this.comboGridId = '#emp_select';
	
	/**
	 * 从Panel页面返回到列表页面
	 */
	this.returnToListPage = function() {
		$(panelId).panel('close');
		$(listId).show();
		$(gridId).datagrid("load");
	}
	
	/**
	 * 提交Panel中的内容到服务器
	 */
	this.submitData = function() {

		var actCode = DD_EMACT_ADMIN;
		var empRows = $(addGridId).datagrid('getSelections');
		if(!empRows || empRows.length == 0){
			$.messager.alert('提示', '请先选择人员!', 'info');
			return;
		}
		var empNumbers = $.map(empRows, function(empRows){ return empRows.empNumber; }).join(",");

		var orgNumbers = '';
		var node = $(treeId).tree('getSelected');	
		
		if(node!=null){
			orgNumbers =  node.id;
		}else{
			$.messager.alert('提示', '请先选择部门!', 'info');
			return;
		}
		
		$.messager.confirm('提示', '是否进行相应操作?', function (confirm) {
			if (confirm) {
			    $.getJSON("employee/act.do?empNumbers=" + empNumbers + '&orgNumbers=' + orgNumbers + '&actCode=' +actCode, function(data){
					if ($.gmkq.handleActionResult(data)) {
						if (data.retcode == 0) {
							// 删除成功,刷新页面
							
						}
					}
				}); 
			}
		});

	}
	
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
					var ids = $.map(rows, function(row){ return row.id; }).join(",");
					$.getJSON("employee/deleteAdmin.do?ids=" + ids, function(data){
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
	//查询记录
	this.selectByempNumber = function() {
		
		var params = $(pageId + " form.condition-empNo").serializeObject();
		
		$(this.gridId).datagrid("load", params);
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
	 * 加载添加考勤员页面
	 */
	this.loadAddPanel = function(){
		if(!isLoaded){
			isLoaded = true;
			$(panelId).panel({
				onLoad: function() {
					// 创建设备Grid
					$(addGridId).datagrid({
						method: 'post',
						toolbar:'.add-table-header',
						title: '人员列表',
						iconCls: 'icon-reload',
						pagination:true,
						fit:true,
						pageSize: 0,
						pageList: [$.gmkq.options().pageSize],
						columns:[[
									{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true  },  
									{field:'empNumber',title:'考勤号码',align:'left',width:120},
									{field:'name',title:'姓名',align:'left'},
									{field:'dept',title:'部门名称',width:120,align:'left'},
									{field:'position',title:'职务',width:120,align:'left'}
								]],
						onHeaderContextMenu: function(e, field){
							e.preventDefault();
							if (gridColMenu == null) {
								gridColMenu = $.gmkq.createColumnMenu(addGridId);
							}
							gridColMenu.menu('show', {left:e.pageX, top:e.pageY});
						},
						onBeforeLoad: function (param) {},
					    onLoadSuccess: function (data) {},
					    onLoadError: function () {},
					    onClickCell: function (rowIndex, field, value) {}
					});	
					
					
					/**
					 * 初始化部门控件
					 */
					$.gmkq.initControls($(this));
					
					
					// 创建人员选择控件
					this.comboGridId = '#emp_select';
					$(this.comboGridId).combogrid({
					    panelWidth:580,
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
			                {field:'empNumber',title:'考勤号码',width:100},
					        {field:'name',title:'姓名',width:100},
					        {field:'position',title:'职务',width:120},
					        {field:'deptName',title:'部门名称',width:150}
					    ]],
					    
					    onShowPanel: function () {
					    	// 设置URL
							var url = "kqrecord/getEmployList.do";
							$(comboGridId).combogrid('grid').datagrid('options').url = url;
							
					    	// 为全选按钮添加事件
							clearAllCheck();
							
					    	$('#emp_select').combogrid('grid').datagrid('unselectAll');
					    	
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
					    
					    onHidePanel: function () {
				    	// 清空检索用姓名
					    	$("#srch_empName_grid").attr("value",'');
					    	//var val= $(comboGridId).combogrid('getValues');
					    	//alert(val);
				        },
				        
				        onLoadSuccess: function (data) {
							//显示记录数，选择数
							var rowNum = data.rows.length;
							var checkedNum = $('#emp_select').combogrid('grid').datagrid("getChecked").length;
							var labelStr1 = "总" + rowNum;
							var labelStr2 =  "（已选择" + 0 + "）"; 
							document.getElementById("srch_emp_num").innerHTML = labelStr1;
							document.getElementById("srch_emp_checked").innerHTML = labelStr2;
				        },
				        
				        onCheck: function (index, row) {
				        	var checkedNum = $('#emp_select').combogrid('grid').datagrid("getChecked").length;
							var labelStr2 =  "（已选择" + checkedNum + "）"; 
							document.getElementById("srch_emp_checked").innerHTML = labelStr2;
				        },
	
				        onUncheck: function (index, row) {
				        	var checkedNum = $('#emp_select').combogrid('grid').datagrid("getChecked").length;
							var labelStr2 =  "（已选择" + checkedNum + "）"; 
							document.getElementById("srch_emp_checked").innerHTML = labelStr2;
				        }
	
					});
					
					// 按钮事件:人员检索按钮
					$('#btnSrchEmp').on('click', function(event) {
						$('#emp_select').combogrid('grid').datagrid('unselectAll');    	
						// 设置参数
				    	var orgNumbers = $('#dept_id').val();
				    	var withChildren = $('#has_children_id').val();
				    	var empName = $('#srch_empName_grid').val();
				    	var param = {orgNumbers: orgNumbers, withChildren: withChildren, empName: empName};
	
				    	// 刷新数据
						$('#emp_select').combogrid('grid').datagrid("load", param);
					});
	
					// 按钮事件:人员检索关闭按钮
					$('#btnCloseSrchEmp').on('click', function(event) {
						$('#emp_select').combogrid("hidePanel");
					});
				}
			});
		}
	}

	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		// 创建DataGrid
		$(this.gridId).datagrid({
			url: 'employee/listOrgEmp.do',
			method: 'post',
			toolbar:'.table-header',
			title: ' 部门人员列表',
			iconCls: 'icon-reload',
			pagination:true,
			fit:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
						{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true},  
						{field:'orgName',title:'部门名称',align:'left',width:200},
						{field:'empName',title:'考勤员姓名',align:'left',width:200},
						{field:'apAccount',title:'考勤员帐号',align:'left',width:200}
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
		
		

		
		// 按钮事件:检索按钮   -->添加页面
		this.search =  function() {
			//获取选择部门
			//获取在职的员工(state=1)
			var url = "employee/kqemplist.do?state=1";
			$(addGridId).datagrid('options').url = url;
			
			var param = $(pageId + " form.condition-form").serializeObject();
//			alert(pageId + " form.condition-form");
			$(addGridId).datagrid("load", param);
		};
		
		// 查旬事件
		$(this.pageId + ' #selectByempName').unbind();
		$(this.pageId + ' #selectByempName').on('click', function(event) {
			selectByempNumber();
		});	
		
		
		// 按钮事件:删除按钮  -->管理页面
		$(this.pageId + ' #btnDel').unbind();
		$(this.pageId + ' #btnDel').on('click', function(event) {
			deleteRow();
		});	
		
		// 按钮事件:添加按钮 -->管理页面
		$(this.pageId + ' #btnAdd').on('click', function(event) {

			loadAddPanel();
			
			$(listId).hide();		
			var param =  [];
			$(panelId).panel('options').href = 'employee/add.do';
			$(panelId).panel('open');
		});
	}
	
	/**
	 * 树节点改变函数, 暂时不用了
	 */
	this.nodeChanged = function(node){
		
		var isChecked = $('#withChild')[0].checked;
		var withChildren = isChecked?1:0;

		var orgNumbers = '';
		var nodes = $(treeId).tree('getChecked');	
		if(nodes!=null && nodes.length>0){
			orgNumbers =  $.map(nodes, function(nodes){ return nodes.id; }).join(",");
		}

		var params = [];
		params['orgNumbers'] = orgNumbers;
		params['withChildren'] = withChildren;
		reloadGrid(params);
	}
	
	/**
	 * 刷新列表
	 */
	this.reloadGrid = function(params){
		$(addGridId).datagrid("load", params);
	}
	
	jQuery.admin = this;
	return jQuery;
})(jQuery);

$.admin.inits();