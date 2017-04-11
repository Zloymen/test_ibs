Ext.define('BidApp.view.Bid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.bidlist',
 
    title: 'Список заявок',
    store: 'BidStore',
     
    initComponent: function() {
        this.columns = [
            {header: 'Номер', dataIndex: 'item', flex: 1},
            {header: 'Название',  dataIndex: 'name',  flex: 1},
            {header: 'Получатель', dataIndex: 'idReceiver', flex: 1},
            {header: 'Отправитель', dataIndex: 'idSender', flex: 1},
            {header: 'Статус', dataIndex: 'idStatus', flex: 1}
        ];
         
        this.callParent(arguments);
    }
});