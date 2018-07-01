App.view.define('VCommunes', {
    extend: "Ext.window.Window",
    alias: "widget.VCommunes",
    initComponent: function () {
        this.width = 600;
        this.height = 700;
        this.title = "Communes";
        this.bodyCls = "white";
        this.layout = "vbox";
        this.closeAction = "destroy";

        this.tbar = [{
            xtype: "textfield",
            itemId: "searchCommunes",
            enableKeyEvents: true,
            padding: 5
        }];
        this.items = [{
                layout: "hbox",
                height: 250,
                width: "100%",
                border: false,
                items: [{
                        xtype: "grid",
                        itemId: "search",
                        flex: 1,
                        /*verticalScroller: {
                            xtype: 'paginggridscroller',
                            activePrefetch: false
                        },*/
                        columns: [{
                            header: "CPostal",
                            width: 80,
                            hidden: true,
                            dataIndex: "ville_code_postal"
                        }, {
                            header: "Commune",
                            flex: 1,
                            dataIndex: "ville_nom"
                        }],
                        store: App.store.create({
                            fields: [],
                            data: []
                        }),
                        height: 250
                    },
                    {
                        width: 70,
                        layout: "vbox",
                        height: "100%",
                        border: false,
                        margin: 5,
                        items: [{
                                flex: 1,
                                border: false
                            },
                            {
                                xtype: "button",
                                text: "-->",
                                width: 70,
                                itemId: "Add_commune"
                            },
                            {
                                height: 10,
                                border: false
                            },
                            {
                                xtype: "button",
                                text: "<--",
                                itemId: "Del_commune",
                                width: 70
                            },
                            {
                                flex: 1,
                                border: false
                            }
                        ]
                    },
                    {
                        xtype: "grid",
                        itemId: "search2",
                        flex: 1,
                        /*verticalScroller: {
                            xtype: 'paginggridscroller',
                            activePrefetch: false
                        },*/
                        columns: [{
                            header: "CPostal",
                            width: 80,
                            dataIndex: "ville_code_postal"
                        }, {
                            header: "Commune",
                            flex: 1,
                            dataIndex: "ville_nom"
                        }],
                        store: App.store.create("gestionao2://my_communes_fields", {
                            autoLoad: true
                        }),
                        height: 250
                    }
                ]
            },
            {
                xtype: "panel",
                itemId: "PanelCommune",
                width: "100%",
                flex: 1
            }
        ];
        this.bbar = [{
                html: ""
            },
            '->',
            {
                text: "OK",
                width: 80,
                itemId: "btn_ok"
            }
        ];
        this.callParent(arguments);
    }

});