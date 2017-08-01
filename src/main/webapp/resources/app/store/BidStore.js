/**
 * Created by Zloy on 01.08.2017.
 */
Ext.define('TicketsApp.store.BidStore', {
    extend: 'Ext.data.Store',

    alias: 'store.BidStore',

    autoLoad: true,
    autoSync: true,
    model: 'TicketsApp.model.Bid',

    proxy: {
        type: 'rest',
        url: 'bids',
        reader: {
            type: 'json',
            root: 'bids'
        }
    }
});