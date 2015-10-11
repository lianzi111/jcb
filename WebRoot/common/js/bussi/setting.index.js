
// 扩展数字范围的验证
$.extend($.fn.validatebox.defaults.rules, {
    digitalScope: {
        validator: function(value, param){
        	var re = /^[1-9]\d*$/;
            if (!re.test(value)) {
            	return false;
            }
            
        	if (value >= param[0] && value <= param[1]) {
        		return true;
        	} else {
        		return false;
        	}
        },
        message: '请输入 {0}到{1}之间的整数'
    }
});

(function(jQuery) {

	String.prototype.trim = function(){   
		  return   this.replace(/(^\s*)|(\s*$)/g,"");   
	}
	
	/*
	 * 设备管理JS插件
	 */
	
	this.pageId = '#settingPage';
	this.listId = this.pageId + ' #listPanel';
	this.gridId_dict = this.pageId + ' #dg_dict';
	this.comboxId = this.pageId + ' #comHomepage';
	this.tabsId = this.pageId + ' #setting_tabs';
	
	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		// 创建字典表DataGrid
		$(this.gridId_dict).datagrid({
			url: 'setting/dictList.do',
			method: 'get',
			iconCls: 'icon-edit',
			toolbar : '#dict_toolbar',
			pagination:false,
			columns:[[
                        {field:'ck',title:'选择',checkbox:true,align:'center'},
						{field:'codeName',title:'名称',width:150,align:'center', editor : "validatebox"},
						{field:'code',title:'值',width:150,align:'center', editor : "validatebox"}
					]]
		});	
		
		// 初始化首页Comobox
		$(this.comboxId).combobox({
			url: 'setting/getMenuList.do',
			 method:'get',
             valueField:'id',
             textField:'menuName',
             editable: false,
             panelHeight:'auto'
		});	
		
		// 创建Tabs
		$(this.tabsId).tabs({
		});
		
	}
	
	function endEdit(){
		var rows = $(gridId_dict).datagrid('getRows');
		for ( var i = 0; i < rows.length; i++) {
			$(gridId_dict).datagrid('endEdit', i);
		}
	}	
	
	// 按钮事件:增加字典数据按钮
	$(this.pageId + ' #btnAddDict').on('click', function(event) {
		$(gridId_dict).datagrid('appendRow', {"codeType":"sjcx_kqjl","code":null,"codeName":null,"shortName":null,"alis":null,"descr":null,"remark":null});
		var rows = $(gridId_dict).datagrid('getRows');
		$(gridId_dict).datagrid('beginEdit', rows.length - 1);
	});
	
	// 按钮事件:删除字典数据按钮
	$(this.pageId + ' #btnDelDict').on('click', function(event) {
		var selectedRow = $(gridId_dict).datagrid('getSelections');
		// 没选择数据时，显示告警，返回
		if (selectedRow.length <= 0) {
			$.messager.show({
				title: '提示',
				msg: '请选择要删除的记录。',
				showType: 'slide',
				timeout: 1500,
				style:{
					right:'',
					top:document.body.scrollTop+document.documentElement.scrollTop,
					bottom:''
				}
			});		
			
			$(gridId_dict).datagrid('unselectAll');
			$(gridId_dict).datagrid('clearChecked');
			return false;
		}
		
		var inserted = $(gridId_dict).datagrid('getChanges', "inserted");
		// 存在追加数据时，显示告警，返回
		if (inserted.length > 0) {
			$.messager.show({
				title: '提示',
				msg: '请先保存再执行删除功能。',
				showType: 'slide',
				timeout: 1500,
				style:{
					right:'',
					top:document.body.scrollTop+document.documentElement.scrollTop,
					bottom:''
				}
			});	

			$(gridId_dict).datagrid('unselectAll');
			$(gridId_dict).datagrid('clearChecked');
			return false;
		}
		
		$.messager.confirm("操作提示", "确实要执行删除功能吗？", function (ok) { 
            if (ok) { 
            	endEdit();
        		// 设置要删除数据
        		var effectRow = new Object();
        		if (selectedRow.length) {
        			effectRow["deleted"] = JSON.stringify(selectedRow);
        		}
        		
        		// 发送请求
        		$.post("setting/deleteDict.do", effectRow, function(data) {
        	    	$.gmkq.handleActionResult(data);
        	    	if (data.retcode == 0) {
                		$(gridId_dict).datagrid('acceptChanges');
                		
                		$(gridId_dict).datagrid('load', {});
                		$(gridId_dict).datagrid('unselectAll');
                		$(gridId_dict).datagrid('clearChecked');
        	    	}
        		}, "JSON");
        		
            } 
        }); 
		
	});
	
	// 判断主键是否冲突    true:冲突, false:无冲突
	this.checkPK = function() {
		var oldCode, newCode;
		var roxIndex;
		
		var rowItems = $(gridId_dict).datagrid('getRows');
		for (var i=0; i<rowItems.length; i++) {
			oldCode = rowItems[i].code;
			
			for(var j=i+1; j<rowItems.length; j++){
				roxIndex = $(gridId_dict).datagrid('getRowIndex', rowItems[j]);
				newCode = rowItems[j].code;
				if (newCode != oldCode) {
					continue;
				} else {
					var msg = "增加的编码[" + newCode + "],在数据库中已经存在。"
						$.messager.show({
							title: '警告',
							msg: msg,
							showType: 'slide',
							timeout: 1500,
							style:{
								right:'',
								top:document.body.scrollTop+document.documentElement.scrollTop,
								bottom:''
							}
						});	
					
					$(gridId_dict).datagrid('beginEdit', roxIndex);
					return true;				
				}
			}
		}

		return false;
	}

	// 按钮事件:保存字典数据按钮
	$(this.pageId + ' #btnSaveDict').on('click', function(event) {
		//结束编辑
		endEdit();
		
		if ($(gridId_dict).datagrid('getChanges').length) {
			var inserted = $(gridId_dict).datagrid('getChanges', "inserted");
			
			// 没追加数据时，显示告警，返回
			if (inserted.length <= 0) {
				$.messager.show({
					title: '提示',
					msg: '请先增加再执行保存功能。',
					showType: 'slide',
					timeout: 1500,
					style:{
						right:'',
						top:document.body.scrollTop+document.documentElement.scrollTop,
						bottom:''
					}
				});	

				$(gridId_dict).datagrid('unselectAll');
				$(gridId_dict).datagrid('clearChecked');
				return false;
			}
			
			// 新增行的验证
			for (var i=0; i<inserted.length; i++) {
				var code = inserted[i].code.trim();
				var codeName = inserted[i].codeName.trim();
				var roxIndex = $(gridId_dict).datagrid('getRowIndex', inserted[i]);
				
	            if (code == null || code == "") {
					$.messager.show({
						title: '提示',
						msg: "值必须输入,请输入1至4位的非负整数",
						showType: 'slide',
						timeout: 1500,
						style:{
							right:'',
							top:document.body.scrollTop+document.documentElement.scrollTop,
							bottom:''
						}
					});			
					$(gridId_dict).datagrid('beginEdit', roxIndex);
					
					$(gridId_dict).datagrid('unselectAll');
					$(gridId_dict).datagrid('clearChecked');
	            	return false;
	            }

	            if (codeName == null || codeName == "") {
					$.messager.show({
						title: '提示',
						msg: "名称必须输入,请输入50位以内字符串",
						showType: 'slide',
						timeout: 1500,
						style:{
							right:'',
							top:document.body.scrollTop+document.documentElement.scrollTop,
							bottom:''
						}
					});			
					$(gridId_dict).datagrid('beginEdit', roxIndex);
					
					$(gridId_dict).datagrid('unselectAll');
					$(gridId_dict).datagrid('clearChecked');
	            	return false;
	            }

	            var regular = /^[0-9]\d*$/;
				var msg = "";
	            if (!regular.test(code)) {
	            	msg = "值[" + code + "]无效,请输入1至4位的非负整数"
					$.messager.show({
						title: '提示',
						msg: msg,
						showType: 'slide',
						timeout: 1500,
						style:{
							right:'',
							top:document.body.scrollTop+document.documentElement.scrollTop,
							bottom:''
						}
					});			
					$(gridId_dict).datagrid('beginEdit', roxIndex);
					
					$(gridId_dict).datagrid('unselectAll');
					$(gridId_dict).datagrid('clearChecked');
	            	return false;
	            }
	            
	        	if (code.length > 4) {
	            	msg = "值[" + code + "]无效,请输入1至4位的非负整数"
					$.messager.show({
						title: '提示',
						msg: msg,
						showType: 'slide',
						timeout: 1500,
						style:{
							right:'',
							top:document.body.scrollTop+document.documentElement.scrollTop,
							bottom:''
						}
					});			
					$(gridId_dict).datagrid('beginEdit', roxIndex);

					$(gridId_dict).datagrid('unselectAll');
					$(gridId_dict).datagrid('clearChecked');
					
	            	return false;
	        	}
				
	        	if (codeName.length > 50 || codeName.length <= 0) {
	            	msg = "名称[" + codeName + "]无效,请输入50位以内字符串"
					$.messager.show({
						title: '提示',
						msg: msg,
						showType: 'slide',
						timeout: 1500,
						style:{
							right:'',
							top:document.body.scrollTop+document.documentElement.scrollTop,
							bottom:''
						}
					});	
					$(gridId_dict).datagrid('beginEdit', roxIndex);

					$(gridId_dict).datagrid('unselectAll');
					$(gridId_dict).datagrid('clearChecked');
					return false;
	        	}
			}
			
			if (checkPK()) {
				$(gridId_dict).datagrid('unselectAll');
				$(gridId_dict).datagrid('clearChecked');
				return false;				
			}

			var effectRow = new Object();
			if (inserted.length) {
				effectRow["inserted"] = JSON.stringify(inserted);
			}

			$.post("setting/insertDict.do", effectRow, function(data) {
		    	$.gmkq.handleActionResult(data);
			}, "JSON");

			$(gridId_dict).datagrid('unselectAll');
			$(gridId_dict).datagrid('clearChecked');
			
		} else {
			$.messager.show({
				title: '提示',
				msg: '请先增加再执行保存功能。',
				showType: 'slide',
				timeout: 1500,
				style:{
					right:'',
					top:document.body.scrollTop+document.documentElement.scrollTop,
					bottom:''
				}
			});	
			$(gridId_dict).datagrid('unselectAll');
			$(gridId_dict).datagrid('clearChecked');
			return false;
		}
		
		$(gridId_dict).datagrid('acceptChanges');
		$(gridId_dict).datagrid('unselectAll');
		$(gridId_dict).datagrid('clearChecked');
	});
	
	/**
	 * 保存设置记录
	 */
	this.saveSystemSetting = function() {
		var curForm = $(pageId + " #system_setting");
		curForm.form({
			onSubmit: function () {
				curForm.form('enableValidation');
				return curForm.form('validate')
			},
		    success:function(data) {
		    	var result = $.parseJSON(data);
		    	if ($.gmkq.handleActionResult(result)) {
		    		if (result.retcode == 0) {
		    			//curForm.form('disableValidation');
		    		}
		    	}
		    }
		});
		
    	$(pageId + " #settingForm1").val("form1");
		
		curForm.form('submit');
	}
	
	/**
	 * 保存设置记录（自动清除部分）
	 */
	this.saveClearSetting = function() {
		var curForm = $(pageId + " #clear_setting");
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
		
    	$(pageId + " #settingForm2").val("form2");
		
		curForm.form('submit');
	}
	
	
	jQuery.setting = this;
	
	return jQuery;
})(jQuery);

$.setting.inits();
