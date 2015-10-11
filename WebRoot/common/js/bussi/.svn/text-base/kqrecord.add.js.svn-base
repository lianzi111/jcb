(function(jQuery) {
	/*
	 * 设备管理JS插件
	 */
	
	this.subPageId = '#kqRecordAddPage';
	this.empNumberId = this.subPageId + ' #empNumber';
	this.deptId = this.subPageId + ' #orgNumber';
	this.checkTypeId = this.subPageId + ' #checkType';
	this.empComboGridId = this.subPageId + ' #active_emp_select';
	this.isEmpNumberChg = false;
	this.isComboGridChg = false;
	this.isDeptChg = false;
	
	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		
		// 部门控件
		$(this.deptId).combotree({
		    url: 'user/depts.do',
		    method:'get',
		    novalidate:true,
		    required: true,
		    
		    onChange: function (newValue, oldValue) {
		    	if (isEmpNumberChg) {
		    		return;
		    	}
		    	
		    	if (isComboGridChg) {
		    		return;
		    	}
		    	
		    	isDeptChg = true;
		    	if (newValue != null) {
		    		$(empComboGridId).combogrid('enable');
		    	} else {
		    		$(empComboGridId).combogrid('disable');
		    	}
		    	
		    	$(empComboGridId).combogrid('clear');
		    	$(empNumberId).textbox('clear');
		    	isDeptChg = false;
		    }
		});

		// 创建人员选择控件
		$(this.empComboGridId).combogrid({
		    panelWidth:500,
		    idField:'empNumber',
		    textField:'name',
		    toolbar:'#kqRecordAddPage #active_emp_toolbar',
		    editable:false,
		    disabled:true,
		    method: 'get',
		    url:'kqrecord/getActiveEmployList.do',
		    columns:[[
		        {field:'empNumber',title:'考勤号码',width:100},
		        {field:'name',title:'姓名',width:100},
		        {field:'position',title:'职务',width:120},
		        {field:'deptName',title:'部门名称',width:200},
		        {field:'orgNumber',title:'部门编码',hidden:true}
		    ]],
		    
		    onShowPanel: function () {
		    	$(empComboGridId).combogrid('grid').datagrid('unselectAll');
		    	
		    	// 设置参数
		    	var empowDepartment = $(deptId).combotree('getValue');
		    	var withChildren = '1';
		    	var param = {empowDepartment: empowDepartment, withChildren: withChildren};
				// 刷新数据
				$(empComboGridId).combogrid('grid').datagrid("load", param);
		    },
		    
		    onHidePanel: function () {
	    	// 清空检索用姓名
		    	$("#srch_activeEmpName_grid").val("");
	        },
	        
	        onSelect: function (index,row) {
	        	isComboGridChg = true;
	        	$(deptId).combotree('setValue', row.orgNumber);
	        	$(empNumberId).textbox('setValue', row.empNumber);
		    	$(subPageId + " #empName").val(row.name);
		    	isComboGridChg = false;

	        }
	        
		});
		
		// 考勤类型控件
		$(this.checkTypeId).combobox({
		    url: 'kqrecord/getCheckTypeList.do',
		    method:'get',
		    novalidate:true,
		    required: true,
		    editable: false,
		    panelHeight:60,
		    valueField:'code',
		    textField:'codeName'
		});
		
		// 考勤号码控件
		$(this.empNumberId).textbox({
		    iconAlign:'left',
		    onChange: function (newValue, oldValue) {
		    	if (isDeptChg) {
		    		return;
		    	}
		    	
		    	if (isComboGridChg) {
		    		return;
		    	}
		    	
		    	// 清空部门和人员控件
		    	$(deptId).combotree('clear');
		    	$(empComboGridId).combogrid('clear');
		    	
		    	// 根据考勤号码取得人员信息
	    		var url = "kqrecord/getEmployByCode.do";
	    		var code = newValue;
		    	$.getJSON(url,{"code": code},function(result){
		    		if (result.retcode == 0) {
		    			isEmpNumberChg = true;
		    			$(deptId).combotree('setValue', result.retdata.orgNumber);
		    			$(empComboGridId).combogrid('setValue', result.retdata.empNumber);
		    			$(empComboGridId).combogrid('enable');
		    		} else {
		    			$.messager.show({
		    				title: '警告',
		    				msg: result.retmesg,
		    				showType: 'slide',
		    				timeout: 1500,
		    				style:{
		    					right:'',
		    					top:document.body.scrollTop+document.documentElement.scrollTop,
		    					bottom:''
		    				}
		    			});		    			
		    		}
		    		isEmpNumberChg = false;
		    	});
		    }
		});
		
	}
	
	var setTreeValue = function (data) {
        $(subPageId + ' #orgNumber').combotree('setValue', data.retdata.orgNumber);
    }
	
	// 按钮事件:人员检索按钮
	$(this.subPageId + ' #btnSrchActiveEmp').on('click', function(event) {
		$(empComboGridId).combogrid('grid').datagrid('unselectAll');    	
		// 设置参数
    	var empowDepartment = $(deptId).combotree('getValue');
    	var withChildren = '1';
    	var empName = $('#srch_activeEmpName_grid').val();
    	var param = {empowDepartment: empowDepartment, withChildren: withChildren, empName: empName};

    	// 刷新数据
		$(empComboGridId).combogrid('grid').datagrid("load", param);
	});
	
	/**
	 * 插入补考勤记录
	 */
	this.insertAttendance = function() {
		var curForm = $(subPageId + " #addAttendanceForm");
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
		    			$(empComboGridId).combogrid('disable');
		    		}
		    	}
		    }
		});
		
    	var deptName = $(deptId).combotree('getText');
    	$(subPageId + " #deptName").val(deptName);
		
		curForm.form('submit');
	}
	

	jQuery.addKqrecord = this;
	
	return jQuery;
})(jQuery);

$.addKqrecord.inits();
