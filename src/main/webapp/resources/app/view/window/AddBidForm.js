/**
 * Created by Zloy on 01.08.2017.
 */
Ext.define('TicketsApp.view.window.AddBidForm', {
    extend: 'Ext.Window',
    title: 'Сохранить заявку',
    width: 350,
    height: 220,
    minWidth: 350,
    minHeight: 220,
    layout: 'fit',
    plain: true,
    bodyStyle: 'padding:5px;',
    buttonAlign: 'center',
    resizable: false,

    buttons: [{
        text: 'Сохранить',
        handler: function () {

            if (this.getForm().isValid()) {
                form.getForm().submit({
                    method: 'POST',
                    url: 'bid/addBid',

                    success: function (a, response) {
                        grid.getStore().insert(response.result.bid.item,
                            new TicketsApp.model.Bid({
                                item: response.result.bid.item,
                                name: response.result.bid.name,
                                idSender: response.result.bid.idSender,
                                idReceiver: response.result.bid.idReceiver,
                                idStatus: response.result.bid.idStatus,
                                descBid: response.result.bid.descBid
                            })
                        );
                        window.close();
                    },

                    failure: function (a, response) {
                        Ext.Msg.alert("Проблема", response.result.message);
                    }
                });
            }
        }
    }, {
        text: 'Отмена',
        handler: function () {
            if (window) {
                window.close();
            }
        }
    }]

});