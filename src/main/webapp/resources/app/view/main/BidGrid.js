/**
 * Created by Zloy on 01.08.2017.
 */



Ext.define('TicketsApp.view.main.BidGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'bidGrid',

    requires: [
        'TicketsApp.store.BidStore',
        'TicketsApp.store.UserStore',
        'TicketsApp.store.StatusStore'
    ],
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],

    title: 'Заявки',
    store: {
        type: 'BidStore'
    },
    iconCls: 'icon-user',


    constructor: function (config) {

        var self = this;

        var comboRenderer = function (combo) {
            return function (value) {
                var record = combo.findRecord(combo.valueField, value);
                return record ? record.get(combo.displayField) : combo.valueNotFoundText;
            }
        };


        var userEdit =  Ext.create('TicketsApp.view.component.UserEdit',{});
        var StatusEdit =  Ext.create('TicketsApp.view.component.StatusEdit',{});

        config.columns = [{
            text: '№',
            width: 50,
            renderer: function(value, meta, record, rowIndex, colIndex){
                return rowIndex + 1;
            }
        }, {
            text: 'Название',
            sortable: true,
            dataIndex: 'name',
            field: {
                xtype: 'textfield'
            },
            flex: 2
        }, {
            text: 'Отправитель',
            sortable: true,
            dataIndex: 'idSender',
            renderer: comboRenderer(userEdit),
            editor: userEdit,
            flex: 2
        }, {
            header: 'Получатель',
            sortable: true,
            dataIndex: 'idReceiver',
            renderer: comboRenderer(userEdit),
            editor: userEdit,
            flex: 2
        }, {
            text: 'Статус',
            sortable: true,
            dataIndex: 'idStatus',
            renderer: comboRenderer(StatusEdit),
            editor: StatusEdit,
            flex: 1
        }];

        config.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text: 'Добавить',
                icon: 'resources/old/images/add.png',
                handler: function () {
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
                            allowBlank: false,
                            blankText: 'Задайте Название заявки',
                            anchor: '100%'
                        },
                        {
                            fieldLabel: 'Отправитель',
                            xtype: 'combobox',
                            id: 'idSender',
                            name: 'idSender',
                            allowBlank: false,
                            blankText: 'Задайте Отправителя',
                            anchor: '100%',
                            store: {
                                type: 'UserStore'
                            },
                            displayField: 'description',
                            valueField: 'id',
                            queryMode: 'remote'

                        }, {
                            fieldLabel: 'Получатель',
                            xtype: 'combobox',
                            id: 'idReceiver',
                            name: 'idReceiver',
                            anchor: '100%',
                            allowBlank: false,
                            blankText: 'Задайте Получателя',
                            store: {
                                type: 'UserStore'
                            },
                            displayField: 'description',
                            valueField: 'id',
                            queryMode: 'remote'
                        }, {
                            fieldLabel: 'Статус',
                            xtype: 'combobox',
                            id: 'idStatus',
                            name: 'idStatus',
                            anchor: '100%',
                            allowBlank: false,
                            blankText: 'Задайте Статус',
                            store: {
                                type: 'StatusStore'
                            },
                            displayField: 'description',
                            valueField: 'id',
                            queryMode: 'remote'
                        },
                        {
                            xtype: 'textareafield',
                            grow: false,
                            id: 'descBid',
                            name: 'descBid',
                            fieldLabel: 'Описание',
                            anchor: '100%'
                        }]
                    });


                    var window = new Ext.Window({
                        title: 'Сохранить заявку',
                        minWidth: 350,
                        minHeight: 400,
                        layout: 'fit',
                        plain: true,
                        bodyStyle: 'padding:5px;',
                        buttonAlign: 'center',
                        resizable: false,
                        items: form,

                        buttons: [{
                            text: 'Сохранить',
                            handler: function () {

                                if (form.getForm().isValid()) {
                                    form.getForm().submit({
                                        method: 'POST',
                                        url: 'bid/addBid',

                                        success: function (a, response) {
                                            self.getStore().insert(response.result.bid.item,
                                                new TicketsApp.model.Bid({
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

                                        failure: function (a, response) {
                                            Ext.Msg.alert("Проблема", response.result.message);
                                        }
                                    });
                                }
                            }
                        }, {
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
                handler: function () {
                    var selection = self.getView().getSelectionModel().getSelection()[0];
                    if (selection) {
                        self.store.remove(selection);
                    }
                }
            }, '-', {
                text: 'Обновить',
                icon: 'resources/old/images/update.png',
                handler: function () {
                    self.store.load();
                }
            }]
        }];

        this.callParent(arguments);

    }
});