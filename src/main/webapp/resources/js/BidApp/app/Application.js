/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'BidApp',
    controllers: ['Bids'],
    appFolder: 'app',
     
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'panel',
                xtype: 'booklist'
            }
        });
    }
});


/*Ext.define('TestApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'TestApp',

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});*/
