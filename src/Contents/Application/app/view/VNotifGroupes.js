App.view.define('VNotifGroupes', {
    extend: "Ext.window.Window",
    width: 465,
    height: 410,
    title: "Notification Groupe",
    alias: "widget.TNotifGroupes",
    layout: "fit",
    items: [

        {
            xtype: "grid",
            itemId: "grid3",
            border: false,
            columns: [{
                    text: "Nom groupe",
                    width: 120,
                    flex: 1,
                    dataIndex: "LibUnic",

                },

            ],
            store: App.store.create('App.AO.getUnites', // Creation du store
                {
                    autoLoad: false
                })


        }
    ],
    bbar: [{
            xtype: "button",
            text: "Annuler",
            itemId: "annuler2"
        },
        '->', {
            xtype: "button",
            text: "Valider",
            itemId: "ajouter2"

        }
    ],
});