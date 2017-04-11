Ext.onReady(function() {
      var store = new Ext.data.Store({
        url: 'bids',
        reader: new Ext.data.JsonReader({
          root: 'bids',
          id: 'item'
        }, [
          'item',
          'name',
          'descBid',
          'idReceiver',
          'idSender',
          'idStatus',
          'descBid'
        ])
      });
      
      
      var storeStatis = new Ext.data.JsonStore({    
    	    autoDestroy: true,
    	    url: 'status',
    	    storeId: 'storeStatis',    
    	    root: 'statusCatalogs',
    	    idProperty: 'id',
    	    fields: ['id', 'description']
    	});
       
      storeStatis.load();
      
      var storeUsers = new Ext.data.JsonStore({    
  	    autoDestroy: true,
  	    url: 'users',
  	    storeId: 'storeUser',    
  	    root: 'sendAndReceivCatalogs',
  	    idProperty: 'id',
  	    fields: ['id', 'description']
  	  });
      storeUsers.load();
      console.log(storeUsers);      
      

      var ds_model = Ext.data.Record.create([
			'item',
			'name',
			'descBid',
			'idReceiver',
			'idSender',
			'idStatus',
			'descBid'
      ]);
       
      Ext.util.Format.comboRenderer = function(combo){
    	    return function(value){
    	        var record = combo.findRecord(combo.valueField, value);
    	        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    	    }
    	}    
      
      
      var ticker_edit = new Ext.form.TextField();
      var name_edit = new Ext.form.TextField();
      var type_edit = new Ext.form.TextField();
      var country_edit = new Ext.form.TextField();
      var pfr_edit = new Ext.form.ComboBox({
    	  typeAhead: true,
    	  triggerAction: 'all',  
    	  store: storeStatis,
    	  displayField:'description', 
    	  valueField: 'id',   
    	  lazyRender: false
    	}); 
      
      var user_edit = new Ext.form.ComboBox({
    	  typeAhead: true,
    	  triggerAction: 'all',  
    	  store: storeUsers,
    	  displayField:'description', 
    	  valueField: 'id',   
    	  lazyRender: false
    	}); 
 
      
      var grid = new Ext.grid.EditorGridPanel({
        id:'button-grid',
        store: store,
        cm: new Ext.grid.ColumnModel([
        new Ext.grid.RowNumberer(),
          {header: "Номер", dataIndex: 'item', sortable: true},
          {id: 'name', header: "Название", dataIndex: 'name', sortable: true, editor: name_edit},
          //{header: "Получатель", dataIndex: 'idReceiver', sortable: true, width: 75, editor: type_edit},
          {header: "Получатель", dataIndex: 'idReceiver', sortable: true, width: 75, renderer: Ext.util.Format.comboRenderer(user_edit), editor: user_edit},
          {header: "Отправитель", dataIndex: 'idSender', sortable: true, width: 75, renderer: Ext.util.Format.comboRenderer(user_edit), editor: user_edit},
          //{header: "Отправитель", dataIndex: 'idSender', sortable: true, width: 75, editor: country_edit},
          {header: "Статус", dataIndex: 'idStatus', sortable: true, width: 75, renderer: Ext.util.Format.comboRenderer(pfr_edit), editor: pfr_edit}
          //{header: "Статус", dataIndex: 'idStatus', sortable: true, width: 75, editor: country_edit}
        ]),
             
 
 
        selModel: new Ext.grid.RowSelectionModel({
          singleSelect: true
        }),        
 
 
        listeners: {
          afteredit: function(e) {
            var _id = e.record.data.item;
            var _name = (e.field == 'name') ? e.value : e.record.data.name;
            var _idReceiver = (e.field == 'idReceiver') ? e.value : e.record.data.idReceiver;
            var _idSender = (e.field == 'idSender') ? e.value : e.record.data.idSender;
            var _idStatus = (e.field == 'idStatus') ? e.value : e.record.data.idStatus;
                 
 
            var restURL = 'bid/update/' + _id;
            var conn = new Ext.data.Connection();
              conn.request({
                url: restURL,
                method: 'PUT',
                params: {
                  item: _id,
                  name: _name,
                  idReceiver: _idReceiver,
                  idSender: _idSender,
                  idStatus: _idStatus
                },
 
                success: function(a, response) {
                  e.record.commit();
                },
                 
                failure: function(a, response) {
                  Ext.Msg.alert("Failed", response.result.message);
                  e.record.reject();
                }
            });
          }
        },
 
        viewConfig: {
          forceFit:true
        },
 
        tbar:[{
            text:'Добавить',
                tooltip:'Добавить новую заявку',
                icon: 'resources/images/add.png',
                cls: 'x-btn-text-icon',
                handler: function() {
                  var form = new Ext.form.FormPanel({
                    baseCls: 'x-plain',
                    labelWidth: 75,
                    name: 'addForm',
                    url: 'bid/addBid',
                    defaultType: 'textfield',
 
                    items: [{
                        fieldLabel: 'Название заявки',
                        id: 'name',
                        name: 'name',
                        allowBlank:false,
                        anchor: '100%',
                        listeners: {
                            afterrender: function(field) {
                            field.focus(false, 200);
                          }
                        }                        	
                    }, 
                    {
        	            xtype: 'combobox',
        				id: 'idSender',
        	            fieldLabel: 'Отправитель',
        	            store: storeUsers,
        	            valueField:'id',
        	            displayField:'description'
                   }
                    /*{
                    	fieldLabel: 'Отправитель',
                    	type: 'combobox',
                    	id: 'idSender',
                        name: 'idSender',
                        maxLength: 10,
                        width: 90,
                        store: storeUsers,
                  	  	displayField:'description', 
                  	  	valueField: 'id',   
                  	  	lazyRender: false
 
                    }*/, {
                      fieldLabel: 'Получатель',
                      id: 'idReceiver',
                        name: 'idReceiver',
                        maxLength: 20,
                        width: 150
 
                    },{
                    	fieldLabel: 'Статус',
                        id: 'idStatus',
                          name: 'idStatus',
                          maxLength: 20,
                          width: 150
                    }, 
                    {
                        type     : 'textareafield',
                        grow      : false,
                        id      : 'descBid',
                        name      : 'descBid',
                        fieldLabel: 'Описание',
                        anchor    : '100%'
                    }]
                });
               
 
              var window = new Ext.Window({
                    title: 'Сохранить заявку',
                    width: 350,
                    height:220,
                    minWidth: 350,
                    minHeight: 220,
                    layout: 'fit',
                    plain:true,
                    bodyStyle:'padding:5px;',
                    buttonAlign:'center',
                    resizable: false,
                    items: form,
 
                    buttons: [{
                        text: 'Сохранить',
                        handler: function () {
                          
                          var formName = Ext.get('name').getValue();
                          var formIdSender = Ext.get('idSender').getValue();
                          var formIdReceiver = Ext.get('idReceiver').getValue();
                          var formIdStatus = Ext.get('idStatus').getValue();
                          var formDescBid = Ext.get('descBid').getValue();
 
                          if (form.getForm().isValid()) {
                            form.getForm().submit({
                            method: 'POST',
                            url: 'bid/addBid',
 
                            success: function(a, response) {
                            	grid.getStore().insert(0,
		                              new ds_model({
		                                item: response.result.bid.item,
		                                name: formName,
		                                idSender: formIdSender,
		                                idReceiver: formIdReceiver,
		                                idStatus: formIdStatus,
		                                descBid: formDescBid
		                              })
		                             );
                             window.close();
                            },
 
                          failure: function(a, response) {
                            Ext.Msg.alert("Проблема", response.result.message);
                          }
                        });
                      }
                    }
                  },{
                    text: 'Отмена',
                    handler: function () {
                      if (window) {
                        window.close();
                      }
                    }
                  }]
                });
                window.show();
              }
            },'-',{
                text:'Удалить',
                tooltip:'Удалить выбранную заявку',
                icon: 'resources/images/remove.png',
                cls: 'x-btn-text-icon',
                handler: function() {
                  var sm = grid.getSelectionModel();
                  var sel = sm.getSelected();
                  if (sm.hasSelection()) {
                    Ext.Msg.show({
                      title: 'Удалить заявку',
                      buttons: Ext.MessageBox.YESNOCANCEL,
                      msg: 'Удалить ' + sel.data.name + '?',
                      fn: function(btn) {
                        if (btn == 'yes') {
                          var conn = new Ext.data.Connection();
                          var restURL = 'bid/delete/' + sel.data.item;
                          conn.request({
                            method: 'DELETE',
                            url: restURL,
  
                            success: function(resp,opt) {
                              grid.getStore().remove(sel);
                            },
                             
                            failure: function(resp,opt) {
                              Ext.Msg.alert('Error', 'Unable to delete bid');
                            }
                          });
                        }
                      }
                    });
                  };
                }
            }],
 
            width: 600,
            height: 350,
            collapsible: true,
            frame: true,
            clicksToEdit: 2,
            animCollapse: false,
            title:'Список заявок',
            iconCls:'icon-grid',
            renderTo: document.body
        });
    });

