Ext.define('BidApp.store.BidStore', {
    extend: 'Ext.data.Store',
    model: 'BidApp.model.Bid',
    autoLoad: true,
    storeId: 'BidStore',
    proxy: {
        type: 'ajax',
        url: 'bids',
        reader: {
            type: 'json',
            root: 'bids',
            successProperty: 'success'
        }
    }
});