/**
 * Created by Zloy on 03.08.2017.
 */
Ext.define('TicketsApp.view.component.PanelBid', {
    extend: 'Ext.panel.Panel',

    xtype: 'panelBid',

    header: false,
    headerAsText: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },


    constructor: function (config) {

        var self = this;

        self.textArea = Ext.create('Ext.form.field.TextArea',{});

        var gridBid = Ext.create('TicketsApp.view.main.BidGrid',{
            listeners: {
                select: function ( grid, record, eOpts){
                    self.textArea.setValue(record.get('descBid'));
            }
        }
        });

        config.items = [{
            layout: 'fit',
            xtype: 'panel',
            flex: 2,
            items:[gridBid]
        },{
            xtype: 'panel',
            title: 'Описание',
            layout: 'fit',
            flex: 1,
            items:[self.textArea]
        }];
        this.callParent(arguments);
    }
});