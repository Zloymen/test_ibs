/**
 * Created by Zloy on 01.08.2017.
 */

Ext.define('TicketsApp.store.StatusStore', {
    extend: 'Ext.data.Store',

    alias: 'store.StatusStore',

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
