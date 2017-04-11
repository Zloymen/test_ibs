Ext.define('BidApp.controller.Bids', {
    extend: 'Ext.app.Controller',
 
    views: ['BidList', 'Bid'],
    stores: ['BidStore'],
    models: ['Bid'],
    init: function() {
        this.control({
            'viewport > bidlist': {
                itemdblclick: this.editBook
            },
            'bidwindow button[action=new]': {
                click: this.createBook
            },
            'bidwindow button[action=save]': {
                click: this.updateBook
            },
            'bidwindow button[action=delete]': {
                click: this.deleteBook
            },
            'bidwindow button[action=clear]': {
                click: this.clearForm
            }
        });
    },
    // обновление
    updateBook: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues(),
            item = form.getRecord().get('item');
            values.id = item;
        Ext.Ajax.request({
            url: 'bid/update/' + id,
            params: values,
            success: function(response){
                var data=Ext.decode(response.responseText);
                if(data.success){
                    var store = Ext.widget('bidlist').getStore();
                    store.load();
                    Ext.Msg.alert('Обновление',data.message);
                }
                else{
                    Ext.Msg.alert('Обновление','Не удалось обновить книгу в библиотеке');
                }
            }
        });
    },
    // создание
    createBook: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            values = form.getValues();
        Ext.Ajax.request({
            url: 'bid/addBid',
            params: values,
            success: function(response, options){
                var data=Ext.decode(response.responseText);
                if(data.success){
                    Ext.Msg.alert('Создание',data.message);
                    var store = Ext.widget('bidlist').getStore();
                    store.load();
                }
                else{
                    Ext.Msg.alert('Создание','');
                }
            }
        });
    },
    // удаление
    deleteBook: function(button) {
        var win    = button.up('window'),
            form   = win.down('form'),
            id = form.getRecord().get('item');
        Ext.Ajax.request({
            url: 'bid/delete/'+id,
            params: {id:id},
            success: function(response){
                var data=Ext.decode(response.responseText);
                if(data.success){
                    Ext.Msg.alert('Удаление',data.message);
                    var store = Ext.widget('bidlist').getStore();
                    var record = store.getById(id);
                    store.remove(record);
                    form.getForm.reset();
                }
                else{
                    Ext.Msg.alert('Удаление','');
                }
            }
        });
    },
    clearForm: function(grid, record) {
        var view = Ext.widget('bidwindow');
        view.down('form').getForm().reset();
    },
    editBook: function(grid, record) {
        var view = Ext.widget('bidwindow');
        view.down('form').loadRecord(record);
    }
});