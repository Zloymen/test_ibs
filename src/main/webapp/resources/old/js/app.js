Ext.require(['Ext.data.*', 'Ext.grid.*']);

Ext.define('Bid', {
    extend: 'Ext.data.Model',
    idProperty:'item',
    fields: ['item',
        'name',
        'descBid',
        'idReceiver',
        'idSender',
        'idStatus',
        'descBid']
});

Ext.define('Spr', {
    extend: 'Ext.data.Model',
    fields: ['id', 'description']
});


Ext.onReady(function() {
	var store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Bid',
        
        proxy: {
            type: 'rest',
            url: 'bids',
            reader: {
                type: 'json',
                root: 'bids'
            }
        }
    });
	
	store.load();
	
	var storeStatis = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Spr',
        proxy: {
            type: 'rest',
            url: 'status',
            reader: {
                type: 'json',
                root: 'statusCatalogs'
            }
        }
    });
	
	storeStatis.load();
	
	var storeUsers = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoSync: true,
        model: 'Spr',
        proxy: {
            type: 'rest',
            url: 'users',
            reader: {
                type: 'json',
                root: 'sendAndReceivCatalogs'
            }        
        }
    });
	
	storeUsers.load();
	
		
	Ext.util.Format.comboRenderer = function(combo){
	    return function(value){
	        var record = combo.findRecord(combo.valueField, value);
	        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
	    }
	};
	
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

    
	var grid = Ext.create('Ext.grid.Panel', {
        renderTo: document.body,
        plugins: [{
            ptype:'cellediting',
            clicksToEdit: 1
        }],
        width: 800,
        height: 600,
        frame: true,
        title: 'Заявки',
        store: store,
        iconCls: 'icon-user',
        columns: [{
            text: '№',
            width: 50,
            sortable: true,
            dataIndex: 'item',
            flex: 1
        }, {
            text: 'Название',
            sortable: true,
            dataIndex: 'name',
            field: {
                xtype: 'textfield'
            },
            flex: 1
        }, {
            text: 'Отправитель',
            sortable: true,
            width: 160,
            dataIndex: 'idSender',
            renderer: Ext.util.Format.comboRenderer(user_edit), 
            editor: user_edit,
            flex: 1
        }, {
            header: 'Получатель',
            width: 160,
            sortable: true,
            dataIndex: 'idReceiver',
            renderer: Ext.util.Format.comboRenderer(user_edit), 
            editor: user_edit,
            flex: 1
        }, {
            text: 'Статус',
            width: 80,
            sortable: true,
            dataIndex: 'idStatus',
            renderer: Ext.util.Format.comboRenderer(pfr_edit), 
            editor: pfr_edit,
            flex: 1
        }],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Добавить',
                icon: 'resources/old/images/add.png',
                handler: function(){
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
                         	fieldLabel: 'Отправитель',
                         	xtype: 'combobox',
                         	id: 'idSender',
                            name: 'idSender',
                            allowBlank:false,
                            anchor: '100%',
                            store: storeUsers,
                       	  	displayField:'description', 
                       	  	valueField: 'id', 
                       	  	queryMode:'remote'
      
                         }, {
                           fieldLabel: 'Получатель',
                           xtype: 'combobox',
                           id: 'idReceiver',
                           name: 'idReceiver',
                           anchor: '100%',
                           allowBlank:false,
                           store: storeUsers,
                           displayField:'description', 
                           valueField: 'id', 
                           queryMode:'remote'      
                         },{
                         	fieldLabel: 'Статус',
                         	xtype: 'combobox',
                            id: 'idStatus',
                            name: 'idStatus',
                            anchor: '100%',
                            allowBlank:false,
                            store: storeStatis,
                            displayField:'description', 
                            valueField: 'id', 
                            queryMode:'remote' 
                         }, 
                         {
                             xtype     : 'textareafield',
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

                               if (form.getForm().isValid()) {
                                 form.getForm().submit({
                                 method: 'POST',
                                 url: 'bid/addBid',
      
                                 success: function(a, response) {
                                 	grid.getStore().insert(response.result.bid.item,
     		                              new Bid({
     		                                item: response.result.bid.item,
     		                                name: response.result.bid.name,
     		                                idSender: response.result.bid.idSender,
     		                                idReceiver: response.result.bid.idReceiver,
     		                                idStatus: response.result.bid.idStatus,
     		                                descBid: response.result.bid.descBid
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
                
            }, '-', {
                text: 'Удалить',
                icon: 'resources/old/images/remove.png',
                handler: function(){
                    var selection = grid.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        store.remove(selection);
                    }
                }
            },'-',{ text: 'Обновить',
                icon: 'resources/old/images/update.png',
                handler: function(){
                    store.load();
                }}]
        }]
    });

      
    });

