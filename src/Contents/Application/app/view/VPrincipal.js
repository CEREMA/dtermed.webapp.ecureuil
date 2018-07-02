App.view.define('VPrincipal', {
    extend: "Ext.Panel",
    alias: "widget.TPrincipal",
    border: false,
    layout: "vbox",
    items: [{
        xtype: "FilterBox",
        itemId: "FilterPanel",
        fields: [{
                name: "Client",
                field: "appelsoffres.Client",
                type: "choice",
                model: "mClients",
                display: "NOM",
                value: "NOM"
            },
            {
                name: "Département",
                field: "appelsoffres.IdDepartement",
                type: "choice",
                model: "mDep",
                display: "departement_nom",
                value: "departement_id"
            },
            {
                name: "Date de parution",
                field: "appelsoffres.DateParution",
                type: "date"
            },
            {
                name: "Date limite",
                field: "appelsoffres.DateLimite",
                type: "date"
            },
            {
                name: "Source",
                field: "appelsoffres.IdSource",
                type: "choice",
                model: "mSources",
                display: "NomSource",
                value: "IdSource"
            }
        ]
    }, {
        xtype: "grid",
        itemId: "AO",
        width: "100%",
        flex: 1,
        multiSelect: true,
        viewConfig: {
            forceFit: true
        },
        autoHeight: false,

        tbar: [{
                xtype: "button",
                itemId: "ajouter_modification",
                text: "Ajouter",
                scale: "large",
                iconAlign: "top",
                iconCls: "add",
                hidden: true
            },
            {
                xtype: "button",
                itemId: "b_appeloffre",
                text: "Appel d'offre",
                scale: "large",
                iconAlign: "top",
                iconCls: "appel-offre"
            },
            {
                xtype: "button",
                itemId: "b_favoris",
                text: "Favoris",
                scale: "large",
                iconAlign: "top",
                iconCls: "favori"
            },
            {
                xtype: "button",
                itemId: "b_device",
                text: "Mobile",
                scale: "large",
                iconAlign: "top",
                iconCls: "mobile"
            },
            {
                xtype: "button",
                itemId: "b_excel",
                text: "Exporter",
                scale: "large",
                iconAlign: "top",
                iconCls: "xls",
                hidden: true
            }, {
                xtype: "button",
                itemId: "filtering",
                scale: "large",
                iconAlign: "top",
                iconCls: "filter",
                text: "Filtrer"
            }
        ],
        features: [{
            groupHeaderTpl: '{name}',
            ftype: 'groupingsummary'
        }],
        columns: [{
                text: "Id",
                dataIndex: "IdAppelOffre",
                width: 50
            }, {
                text: "Objet",
                dataIndex: "Objet",
                flex: 1
            },
            {
                text: "Thématique",
                dataIndex: "nom_thematique",
                width: 300,
                hidden: true
            },
            {
                text: "Client",
                dataIndex: "Client",
                width: 200
            },
            {
                text: "Date de parution",
                dataIndex: "DateParution",
                type: "date",
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            },
            {
                text: "Date limite",
                dataIndex: "DateLimite",
                type: "date",
                renderer: function (value) {
                    return '<div style="color:red">' + value.toString('dd/MM/yyyy') + '</div>'
                }
            }
        ],
        store: App.store.create('App.AO.getAll', {
            groupField: 'nom_domaine'
        })
    }]
});