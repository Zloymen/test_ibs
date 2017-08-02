/**
 * Created by Zloy on 02.08.2017.
 */

Ext.define('TicketsApp.view.component.StatusEdit', {
    extend: 'Ext.form.ComboBox',
    requires: [
        'TicketsApp.store.StatusStore'
    ],

    alias: 'component.StatusEdit',

    typeAhead: true,
    triggerAction: 'all',
    store: {type: 'StatusStore'},
    displayField: 'description',
    valueField: 'id',
    lazyRender: false
});
