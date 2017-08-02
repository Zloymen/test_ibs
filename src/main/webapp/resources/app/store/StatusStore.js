/**
 * Created by Zloy on 01.08.2017.
 */

Ext.define('TicketsApp.store.StatusStore', {
    extend: 'Ext.data.Store',

    alias: 'store.StatusStore',

    autoSync: true,
    model: 'TicketsApp.model.Spr',
    autoLoad: true,
    proxy: {
        type: 'rest',
        url: 'status',
        reader: {
            type: 'json',
            root: 'statusCatalogs'
        }
    }

});
