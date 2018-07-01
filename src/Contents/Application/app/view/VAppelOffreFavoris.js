App.view.define('VAppelOffreFavoris', {
    extend: "Ext.window.Window",
    alias: "widget.VAppelOffreFavoris",
    initComponent: function() {
        this.width = 800;
        this.height = 750;
        this.title = "Consultation de l'appel d'offre";
        this.bodyCls = "white";
        this.items = [{
                layout: "hbox",
                border: false,
                width: "100%",
                items: [{
                    layout: "vbox",
					border: false,
                    items: [{
                        xtype: "combo",
                        itemId: "cboNom",
                        margin: {
                            top: 10,
                            left: 10
                        },
                        fieldLabel: "Source",
                        allowBlank: false,
                        editable: false,
                        labelAlign: "top",
                        labelWidth: 200,
                        width: 200,
                        displayField: "NomSource",
                        valueField: "IdSource",

                        store: App.store.create('App.AO.getAll2', // Creation du store
                            {
                                autoLoad: true
                            })

                    }, 
                    {
                        xtype: "datefield",
                        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                        itemId: "date",
                        labelAlign: "top",
                        allowBlank: false,
                        editable: false,
                        margin: {
                            top: 10,
                            left: 10
                        },
                        width: 200,
                        fieldLabel: 'Date de parution',
                    }, 
                    {
                        xtype: "datefield",
                        itemId: "date_limite",
                        labelAlign: "top",
						editable: false,
                        margin: {
                            top: 10,
                            left: 10
                        },
                        width: 200,
                        fieldLabel: 'Date limite',
                        allowBlank: false,
                    }]
                }, 
                {
                    layout: "hbox",
                    itemId: "regroupement_hboxGrid1",
                    border: false,
                    flex: 1,
                    items: [{
                        xtype: "grid",
                        itemId: "grid1",
                        flex: 1,
                        padding: 10,

                        tbar: [{
                                xtype: "button",
                                text: "Ajouter groupe(s)",
                                itemId: "ajouter_groupe"
                            },

                            {
                                xtype: "button",
                                text: "Ajouter agent(s)",
                                itemId: "ajouter_agent"
                            },
                        ],

                        columns: [{
                                text: "Nom",
                                width: 140,
                                dataIndex: "Nom"
                            }, {
                                text: "Email",
                                width: 185,
                                dataIndex: "Email"
                            }, {
                                text: "Type",
                                dataIndex: "Type",
                                flex: 1
                            },

                        ],
                        flex: 1,
                        height: 160,
                        store: App.store.create({
                            fields: [
                                "Nom",
                                "Email",
                                "Type"
                            ],
                            data: []
                        })


                    }]

                }]
            },

            {
                layout: "hbox",
                border: false,
                width: "100%",
                items: [{
                        xtype: "combo",
                        itemId: "cboType",
                        margin: {
                            top: 10,
                            left: 10

                        },
                        fieldLabel: "Type de consultation",
                        allowBlank: false,
                        editable: false,
                        labelAlign: "top",
                        labelWidth: 200,
                        width: 200,
                        displayField: "reponse",
                        valueField: "IdConsultation",

                        store: App.store.create('App.AO.getAll3', // Creation du store
                            {
                                autoLoad: true
                            })

                    }, {
                        xtype: "textfield",
                        itemId: "client",
                        margin: {
                            top: 10,
                            left: 30,
                            right: 10
                        },
                        flex: 1,
                        labelAlign: "top",
                        allowBlank: false,
                        fieldLabel: "Client",
                        labelWidth: 200,
                    },

                ]
            },
			{
				layout: "hbox",
				width: "100%",
				border: false,
				items: [
				{
					layout:"vbox",
					width: 400,
					border: false,
					items: [
            {
                xtype: "textarea",
                itemId: "objet",
				flex: 1,
                padding: 10,
				width: "95%",
                height: 50,
                labelAlign: "top",
                allowBlank: false,
                fieldLabel: "Objet"

            },

            {
                xtype: "textarea",
                itemId: "observations",
				flex: 1,
                padding: 10,
                width: "95%",
                height: 50,
                labelAlign: "top",
                fieldLabel: "Observations"
            }					
					]
				},             {

                layout: "vbox",
                border: false,
                width: "100%",
				padding: 10,
                items: [{
                        xtype: "boxselect",
                        itemId: "cboDepartement",
                        fieldLabel: "Département",
                        allowBlank: false,
                        editable: false,
                        labelAlign: "top",
                        labelWidth: 200,
                        width: 310,
                        displayField: "departement",
                        valueField: "IdDepartement",

                        store: App.store.create('App.AO.getAll4', // Creation du store
                            {
                                autoLoad: true
                            })

                    }
                ]
            }
				]
			},

            {
                layout: "hbox",
                itemId: "regroupement_hboxUpload",
                border: false,
                width: "100%",
                items: [{
                    xtype: "uploadfilemanager",
                    padding: 10,
                    itemId: "up",
                    flex: 1,
                    height: 120,
                    uploader: '/upload',
                    hidden: false
                }
				]
			},
            {
                layout: "hbox",
                itemId: "regroupement_keywords",
                border: false,
                width: "100%",
                items: [
				{
					xtype: "boxselect",
					itemId: "Keywords",
					fieldLabel: "Mots clés",
					allowBlank: false,
					editable: true,
					labelAlign: "top",
					labelWidth: 200,
					padding: 10,
					flex: 1,
					displayField: "keyword",
					valueField: "id",
					triggerAction:'all',
					enableKeyEvents:true,
                    createNewOnEnter: false,
                    forceSelection: false,
                    queryMode: 'local',
                    typeAhead: true,  
					store: App.store.create('gestionao2://keywords',
						{
							autoLoad: true
						})

                },
	            {
						xtype: "textfield",
						itemId: "ed_keyword",
						fieldLabel: "Mots clés",
						hidden: true,
						triggerAction:'all',
					    padding: 10,
					    flex: 1,
                        labelAlign: "top",
                        labelWidth: 200,
						enableKeyEvents:true						
                },
				{
					xtype: "button",
					itemId: "add_keyword",
					text: "Ajouter",
					height: 24,
					margin: {
						top: 28,
						right: 10
					},					
					width: 100,
                    handler: function(p) {
                        p.setDisabled(true);
                        App.get('TForm2 textfield#ed_keyword').setValue('');
                        App.get('TForm2 textfield#ed_keyword').show();                        
                        App.get('TForm2 boxselect#Keywords').hide();
                    }
				}
				]
			},
            {

                layout: "hbox",
                border: false,
                width: "100%",
                items: [{
                    xtype: "combo",
                    itemId: "cboDomaine",
                    margin: {
                        //top: 10,
                        left: 10

                    },
                    fieldLabel: "Domaine",
                    allowBlank: false,
                    editable: false,
                    labelAlign: "top",
                    labelWidth: 200,
                    width: 200,
                    displayField: "nom_domaine",
                    valueField: "id_domaine",

                    store: App.store.create('App.AO.getDomaines', // Creation du store
                        {
                            autoLoad: true
                        })

                }, {
                    xtype: "combo",
                    itemId: "cboThematique",
                    margin: {
                        left: 30
                    },
                    fieldLabel: "Thématique",
                    allowBlank: false,
                    editable: false,
                    labelAlign: "top",
                    labelWidth: 200,
                    width: 200,
                    displayField: "nom_thematique",
                    valueField: "id_thematique",

                    store: App.store.create('App.AO.getThematiques', {
                        autoLoad: true
                    })

                }]
            },



            {
                layout: "hbox",
                border: false,
                width: "100%",
                items: [

                    {
                        xtype: "combo",
                        itemId: "cboCode",
                        margin: {
                            top: 10,
                            left: 10

                        },
                        fieldLabel: "Code de la prestation",
                        allowBlank: false,
                        editable: false,
                        labelAlign: "top",
                        labelWidth: 200,
                        width: 200,
                        displayField: "LibelleNaturePrestation",
                        valueField: "IdNaturePrestation",

                        store: App.store.create('App.AO.getAll5', // Creation du store
                            {
                                autoLoad: true
                            })

                    }, {
                        xtype: "textfield",
                        itemId: "numero_semaine",
                        margin: {
                            top: 10,
                            left: 30
                        },
                        width: 200,
						readOnly: true,
                        labelAlign: "top",
                        fieldLabel: "Numéro de semaine",
                        allowBlank: false,
                        labelWidth: 200,
                    },
                ]
            }, {
                layout: "hbox",
                width: 400,
                height: 4,
                margin: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                border: false,
                items: [

                ]
            }
        ];
        this.bbar = [ 
            {
                xtype: "button",
                itemId: "supprimer_favoris",
                text: "Supprimer des favoris",
                idAppelOffre: null,
                margin: {
                    top: 10,
                    left: 10

                }
            }
        ];
        this.callParent(arguments);
    }

});