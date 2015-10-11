(function(jQuery) {
	/*
	 * 日志管理JS插件
	 */
	
	this.pageId = '#fingerPage';
	this.gridId = '#fingerPage #dg';
	this.treeId = '#orgTree';
	this.colMenu = null;
	
	
	/**
	 * 页面初始化函数
	 */
	this.inits = function() {
		// 创建DataGrid
		$(this.gridId).datagrid({
			url: 'fingerprint/list.do',
			method: 'get',
			title: '人员列表',
			iconCls: 'icon-reload',
			pagination:true,
			fit:true,
			pageSize: 0,
			pageList: [$.gmkq.options().pageSize],
			columns:[[
				{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true },  
				{field:'deptName',title:'部门名称',align:'left',width:80},
				{field:'empNumber',title:'考勤号码',align:'left',width:120},
				{field:'name',title:'姓名',align:'left',width:80},
				{field:'password',title:'密码',align:'left',width:80},
//				{field:'fingerNo',title:'手指序号',width:120,align:'left'},
//				{field:'fingerName',title:'手指',width:120,align:'left'},
//				{field:'dactyEdition',title:'指纹版本',width:120,align:'left'}
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
	}
	
	/**
	 * 树节点改变函数
	 */
	this.nodeChanged = function(node){
		
		var isChecked = $('#withChild')[0].checked;
		var withChildren = isChecked?1:0;

/*		var orgNumbers = '';
		var nodes = $(treeId).tree('getChecked');	
		if(nodes!=null && nodes.length>0){
			orgNumbers =  $.map(nodes, function(nodes){ return nodes.id; }).join(",");
		}*/

		var params = [];
		params['orgNumbers'] = node.id;
		params['withChildren'] = withChildren;
		reloadGrid(params);
	}
	
	/**
	 * 刷新列表
	 */
	this.reloadGrid = function(params){
		$(gridId).datagrid("load", params);
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
					$.getJSON("fingerprint/delete.do?ids=" + ids, function(data){
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
	 * 删除所有行记录
	 */
	this.deleteAllRows = function() {
		var orgNumbers = '';
		var isChecked = $('#withChild')[0].checked;
		var withChildren = isChecked?1:0;
		
		var node = $(this.treeId).tree('getSelected');
		if(node != null){
			orgNumbers = node.id;
		}

		if (!orgNumbers || orgNumbers == '') {
			$.messager.alert('提示', '请选择部门!', 'info');
		} else {
			$.messager.confirm('提示', '是否删除部门全部指纹数据?', function (confirm) {
				if (confirm) {
					// 获取选中记录的ID，并用逗号分隔
					$.getJSON("fingerprint/deleteAll.do?orgNumbers=" + orgNumbers + "&withChildren=" + withChildren, function(data){
						if ($.gmkq.handleActionResult(data)) {
							if (data.retcode == 0) {
								// 删除成功,刷新页面 
								var params = [];
								params['orgNumbers'] = orgNumbers;
								params['withChildren'] = withChildren;
								reloadGrid(params);
							}
						}
					});
				}
			});
		}
	}
	
	/**
	 * 删除按钮事件
	 */
	this.deleteFinger = function(){
		this.deleteRow();
	}
	
	/**
	 * 删除全部按钮事件
	 */
	this.deleteAll = function(params){
		this.deleteAllRows();
	}
	
	/**
	 * 清除列表
	 */
	this.clear = function (){
		
		 var item = $(gridId).datagrid('getRows');
		 /*alert(item.length);*/
        if (item) {
            for (var i = item.length - 1; i >= 0; i--) {
                var index = $(gridId).datagrid('getRowIndex', item[i]);
                $(gridId).datagrid('deleteRow', index);
            }
        }
	}
	
	jQuery.finger = this;
	return jQuery;
})(jQuery);

$.finger.inits();