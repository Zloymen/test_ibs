/**
 * модель заявки
 * Created by Zloy on 01.08.2017.
 */
Ext.define('TicketsApp.model.Bid', {
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