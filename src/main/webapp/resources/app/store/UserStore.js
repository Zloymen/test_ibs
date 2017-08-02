/**
 * Created by Zloy on 02.08.2017.
 */
Ext.define('TicketsApp.store.UserStore', {
    extend: 'Ext.data.Store',

    alias: 'store.UserStore',

    autoLoad: true,
    autoSync: true,
    model: 'TicketsApp.model.Spr',
    proxy: {
        type: 'rest',
        url: 'users',
        reader: {
            type: 'json',
            root: 'sendAndReceivCatalogs'
        }
    }
});