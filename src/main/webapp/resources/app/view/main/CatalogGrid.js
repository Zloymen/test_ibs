/**
 * Created by Zloy on 03.08.2017.
 */

Ext.define('TicketsApp.view.main.CatalogGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'CatalogGrid',

    columns:[{
        text: '№',
        width: 50,
        renderer: function(value, meta, record, rowIndex, colIndex){
            return rowIndex + 1;
        }
    }, {
        text: 'Ид',
        sortable: true,
        dataIndex: 'id',
        flex: 1
    }, {
        text: 'Описание',
        sortable: true,
        dataIndex: 'description',
        flex: 1
    }]
});