/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TicketsApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'TicketsApp.view.main.MainController',
        'TicketsApp.view.main.MainModel',
        'TicketsApp.view.main.List',
        'TicketsApp.view.main.BidGrid',
        'TicketsApp.view.main.CatalogGrid',
        'TicketsApp.view.component.PanelBid'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Заявки',
        iconCls: 'fa-home',
        layout: 'fit',
        items: [{
            xtype: 'panelBid'
        }]
    }, {
        title: 'Пользователи',
        iconCls: 'fa-user',
        layout: 'fit',
        items: [{
            title: 'Пользователи',
            xtype: 'CatalogGrid',
            store:{type: 'UserStore'}
        }]


    }, {
        title: 'Статусы',
        iconCls: 'fa-users',
        layout: 'fit',
        items: [{
            title: 'Статусы',
            xtype: 'CatalogGrid',
            store: {type: 'StatusStore'}
        }]
    }, {
        title: 'О программе',
        iconCls: 'fa-cog',
        bind: {
            html: '{about}'
        }
    }]
});
