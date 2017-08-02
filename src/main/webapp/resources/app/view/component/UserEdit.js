/**
 * Created by Zloy on 02.08.2017.
 */

Ext.define('TicketsApp.view.component.UserEdit', {
    extend: 'Ext.form.ComboBox',
    requires: [
        'TicketsApp.store.UserStore'
    ],

    alias: 'component.UserEdit',

    typeAhead: true,
    triggerAction: 'all',
    store: {type: 'UserStore'},
    displayField: 'description',
    valueField: 'id',
    lazyRender: false
});



