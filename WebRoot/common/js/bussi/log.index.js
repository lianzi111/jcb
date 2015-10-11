(function(jQuery)  {
	/*
	 * 日志管理JS插件
	 */
	
	this.pageId = '#logPage';
	this.listId = this.pageId + ' #listPanel';
	this.gridId = this.pageId + ' #dg';
	
	this.mlMenu = null;
	this.mcMenu = null;
	this.dcMenu = null;
	this.dlMenu = null;
	this.ddMenu = null;
	
	/**
	 * 删除行记录
	 */
	this.deleteRow = function() {
		var rows = $(gridId).datagrid('getSelections');
		var logType = $('#logType').val();
		/*alert('type' + logType);*/
		
		if (!rows || rows.length == 0) {
			$.messager.alert('提示', '请选择要删除的数据!', 'info');
		} else {
			$.messager.confirm('提示', '是否删除选中数据?', function (confirm) {
				if (confirm) {
					// 获取选中记录的ID，并用逗号分隔
					var ids = $.map(rows, function(row){ return row.id; }).join(",");
					$.getJSON("log/delete.do?ids=" + ids +'&logType=' +logType, function(data){
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
	 * 页面初始化函数
	 */

	this.inits = function( type) {
		
		
		// 创建DataGrid
		if(type==5){
			//补勤日志
			$(this.gridId).datagrid({
				url:"",
				method: 'get',
				toolbar:'.table-header',
				title: '日志列表',
				iconCls: 'icon-reload',
				pagination:true,
				fit:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns:[[
					{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true },  
					{field:'empNumber',title:'考勤号码',align:'left',width:120},
					{field:'name',title:'姓名',align:'left'},
					{field:'deptName',title:'部门名称',width:120,align:'left'},
					{field:'checkTime',title:'考勤时间',width:120,align:'left'},
					{field:'checkType',title:'考勤类型',width:120,align:'left'},
					{field:'rocoreCause',title:'补记录原因',width:120,align:'left'},
					{field:'rocoreManager',title:'补记录操作员',width:120,align:'left'},
					{field:'rocoreDatetime',title:'补记录时间',width:120,align:'left'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (mlMenu == null) {
						mlMenu = $.gmkq.createColumnMenu(gridId);
					}
					mlMenu.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {/*clear();*/},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});	
		}else if(type==4){
			//管理员操作日志
			$(this.gridId).datagrid({
				url:"",
				method: 'get',
				toolbar:'.table-header',
				title: '日志列表',
				iconCls: 'icon-reload',
				pagination:true,
				fit:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns:[[
					{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true },  
					{field:'operateTime',title:'操作时间',align:'left'},
					{field:'managerName',title:'管理员名称',width:120,align:'left'},
					{field:'action',title:'操作名称',width:120,align:'left'},
					{field:'object',title:'操作对象',width:120,align:'left'},
					{field:'operateData',title:'操作数据',width:120,align:'left'},
					{field:'count',title:'操作数量',width:120,align:'right'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (mcMenu == null) {
						mcMenu = $.gmkq.createColumnMenu(gridId);
					}
					mcMenu.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {/*clear();*/},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});	
		}else if(type==3){
			//设备操作日志
			$(this.gridId).datagrid({
				url:"",
				method: 'get',
				toolbar:'.table-header',
				title: '日志列表',
				iconCls: 'icon-reload',
				pagination:true,
				fit:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns:[[
					{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true },  
					{field:'snId',title:'序列号',width:120,align:'left'},
					{field:'deviceName',title:'别名',width:120,align:'left'},
					{field:'adminManager',title:'设备管理员',width:120,align:'left'},
					{field:'action',title:'操作名称',width:120,align:'left'},
					{field:'devdataTime',title:'操作时间',width:120,align:'left'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (dcMenu == null) {
						dcMenu = $.gmkq.createColumnMenu(gridId);
					}
					dcMenu.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {/*clear();*/},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});	
			
		}else if(type==2){
			//设备上传数据日志
			$(this.gridId).datagrid({
				url:"",
				method: 'get',
				toolbar:'.table-header',
				title: '日志列表',
				iconCls: 'icon-reload',
				pagination:true,
				fit:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns:[[
					{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true  },  
					{field:'snId',title:'系列号',width:80,align:'left'},
					{field:'deviceName',title:'别名',width:120,align:'left'},
					{field:'upTime',title:'上传时间',align:'left'},
					{field:'op',title:'数据',width:120,align:'left'},
					{field:'object',title:'对象',width:120,align:'left'},
					{field:'dataCount',title:'数据记录数',width:120,align:'right'},
					{field:'error',title:'错误',width:120,align:'left'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (dlMenu == null) {
						dlMenu = $.gmkq.createColumnMenu(gridId);
					}
					dlMenu.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {/*clear();*/},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});	
			
		}else if(type==1){
			//服务器下发命令日志
			$(this.gridId).datagrid({
				url:"",
				method: 'get',
				toolbar:'.table-header',
				title: '日志列表',
				iconCls: 'icon-reload',
				pagination:true,
				fit:true,
				pageSize: 0,
				pageList: [$.gmkq.options().pageSize],
				columns:[[
					{ field: 'id', title: '选择', width: 40, align:'left',checkbox:true },  
					{field:'snId',title:'系列号',width:80,align:'left'},
					{field:'deviceName',title:'别名',width:120,align:'left'},
					{field:'cmdContent',title:'命令详情', width:300,align:'left'},
					{field:'cmdCommitTime',title:'提交时间',width:120,align:'left'},
					{field:'cmdTransTime',title:'传送时间',width:120,align:'left'},
					{field:'cmdOverTime',title:'返回时间',width:120,align:'left'},
					{field:'returnCont',title:'返回值',width:120,align:'left'}
				]],
				onHeaderContextMenu: function(e, field){
					e.preventDefault();
					if (ddMenu == null) {
						ddMenu = $.gmkq.createColumnMenu(gridId);
					}
					ddMenu.menu('show', {left:e.pageX, top:e.pageY});
				},
				onBeforeLoad: function (param) {/*clear();*/},
			    onLoadSuccess: function (data) {},
			    onLoadError: function () {},
			    onClickCell: function (rowIndex, field, value) {}
			});	
			
		}
		

		// 按钮事件:检索按钮
		$(this.pageId + ' #btnSearch').unbind();
		$(this.pageId + ' #btnSearch').on('click', function(event) {
			$("input[name=startTime]").attr("value", $("input[name=startTime]").siblings("input").val());
			$("input[name=endTime]").attr("value", $("input[name=endTime]").siblings("input").val());
			
			var url = "log/list.do";
			$(gridId).datagrid('options').url = url;
			
			var param = $(pageId + " form.condition-form").serializeObject();
			var logType = $("#logType").val();
			var sn = $("#sn").val();
			if(sn != null && sn != ""){
				param['sn'] = sn;
			}
			param['logType'] = logType;
			
			$(gridId).datagrid("load", param);
			
		});
		
		// 按钮事件:删除按钮
		$(this.pageId + ' #btnDel').unbind();
		$(this.pageId + ' #btnDel').on('click', function(event) {
			deleteRow();
		});	
		
		// 按钮事件:导出按钮
		$(this.pageId + ' #btnExport').unbind();
		$(this.pageId + ' #btnExport').on('click', function(event) {
			$("input[name=startTime]").attr("value", $("input[name=startTime]").siblings("input").val());
			$("input[name=endTime]").attr("value", $("input[name=endTime]").siblings("input").val());
			var params = $(pageId + " form.condition-form").serialize();
			var logType = $('#logType').val();
			var sn = $("#sn").val();
			if(sn != null && sn != ""){
				params['sn'] = sn;
			}
			
			window.location = "log/export.do?logType=" +logType +"&sn=" + sn +"&" + params;	
		});
		
	}
	
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
	
	jQuery.log = this;
	return jQuery;
})(jQuery);




