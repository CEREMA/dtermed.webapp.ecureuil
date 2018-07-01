App.view.define('VNotifAgents', {
    extend: "Ext.window.Window",
    width: 610,
    height: 640,
    title: "Notification agents",
    alias: "widget.TNotifAgents",
    layout: "fit",
    items: [{
        xtype: "grid",
        itemId: "grid2",
        border: false,
        columns: [{
                text: "Nom",
                width: 120,
                dataIndex: "Nom",

            },
            {
                text: "Prenom",
                dataIndex: "Prenom",
                width: 120
            },
            {
                text: "Mail",
                dataIndex: "LibMelA",
                flex: 1
            }
        ],
        store: App.store.create('App.AO.getAgents', {
            autoLoad: false
        })
    }],
    bbar: [{
            xtype: "button",
            text: "Annuler",
            itemId: "annuler"
        },
        '->',
        {
            xtype: "button",
            text: "Valider",
            itemId: "ajouter"

        }
    ],
});