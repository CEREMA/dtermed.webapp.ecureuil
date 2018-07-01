var TMap = {};

App.define('Lib.map', {
    statics: {
        init: function () {
            //console.log(App.get('VCommunes panel#PanelCommune'));
            TMap = new google.maps.Map(App.get('VCommunes panel#PanelCommune').getEl().dom, {
                zoom: 5,
                center: new google.maps.LatLng(47.866669, 5.33333),
                mapTypeId: google.maps.MapTypeId.HYBRID
            })
        },
        markers: [],
        marker: function (l, m) {
            var marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(l, m)
            });
            this.markers.push(marker);
            marker.setMap(TMap);
        }
    }
});

App.controller.define('CMain', {

    views: [
        "VMain",
        "VPrincipal",
        "VConsult",
        "VNotifAgents",
        "VNotifGroupes",
        "VShowDoc",
        "VMobile",
        "VFavoris",
        "VAppelOffreFavoris",
        "VCommunes",
        "VImport"
    ],

    models: [],

    init: function () {

        this.control({
            "menu>menuitem": {
                click: "Menu_onClick"
            },
            "TShowDoc": {
                show: "TShowDoc_onShow"
            },
            "TImport": {
                show: "TImport_onshow"
            },
            "TImport combo#source": {
                select: "TImport_comboSource"
            },
            "TImport combo#cbofeeds": {
                select: "TImport_comboFeeds"
            },
            "TImport button#import": {
                click: "import_click"
            },
            "TImport button#visu": {
                click: "visu_click"
            },
            "TImport combo#cboCategories": {
                select: "cboCatSelect"
            },
            "button#CancelMobile": {
                click: "CancelMobile"
            },
            "button#SynchroniserMobile": {
                click: "SynchroniserMobile"
            },
            "TPrincipal grid#AO": {
                itemclick: "AO_onclick",
                itemdblclick: "grid_dblclick",
                beforeitemcontextmenu: "grid_oncontextmenu"
            },
            "TPrincipal button#b_excel": {
                click: "export_excel"
            },
            "TFavoris grid#AO": {
                itemdblclick: "grid_dblclick",
                beforeitemcontextmenu: "gridFavoris_oncontextmenu"
            },
            "button#b_appeloffre": {
                click: "ShowAccueil"
            },
            "VAppelOffreFavoris button#supprimer_favoris": {
                click: "SuppressionFavori"
            },
            "button#ajouter_favoris": {
                click: "AjoutFavori"
            },
            "button#ajouter_modification": {
                click: "ajouter_modification"
            },
            "button#b_favoris": {
                click: "ShowFavoris"
            },
            "button#b_device": {
                click: "showMobile"
            },
            "datefield#date": {
                change: "date_change_week"
            },
            "TShowDoc button#Exit": {
                click: "button_exit_onclick"
            },
            "button#ajouter_groupe": {
                click: "Ajouter_groupe"
            },
            "button#ajouter_agent": {
                click: "ajouter_agent"
            },
            "button#effacer_saisie": {
                click: "effacer_saisie"
            },
            "button#annuler": {
                click: "annuler"
            },
            "button#annuler2": {
                click: "annuler2"
            },
            "button#CANCEL_lien": {
                click: "CANCEL_lien"
            },
            "uploadpanel#up": {
                itemdblclick: "up_click",
                upload: "item_upload",
                complete: "item_upload_complete",
                del: function (me, list) {
                    console.log(list);
                }
            },
            "grid#grid2": {
                itemclick: "grid2_onclick",
                itemdblclick: "grid2_doubleclick"
            },
            "grid#grid3": {
                itemclick: "grid3_onclick",
                itemdblclick: "grid3_doubleclick"
            },
            "grid#grid1": {
                itemclick: "grid1_onclick"
            },
            "TConsult grid#grid1": {
                beforeitemcontextmenu: "grid1_oncontextmenu"
            },
            "TConsult button#add_commune": {
                click: "add_commune"
            },
            "TConsult button#del_dest": {
                click: "del_dest"
            },
            "button#ajouter2": {
                click: "validation_groupe"
            },
            "button#ajouter": {
                click: "validation_agent"
            },
            "button#valider_saisie": {
                click: "valider_saisie"
            },
            "TConsult": {
                show: "TConsult_onshow",
                close: function () {
                    delete App.CurrentAO;
                }
            },
            "combo#cboDomaine": {
                select: "valider_thematiques"
            },
            "TConsult textfield#ed_keyword": {
                keydown: "keyword_add"
            },
            "VCommunes": {
                show: "VCommunes_onshow"
            },
            "VCommunes textfield": {
                keyup: "search_onkey"
            },
            "VCommunes grid#search": {

            },
            "VCommunes button#Add_commune": {
                "click": "view_commune"
            },
            "VCommunes button#Del_commune": {
                "click": "del_commune"
            },
            "VCommunes button#btn_ok": {
                "click": "ok_commune"
            },
            "TConsult grid#TCommunes": {
                beforeitemcontextmenu: "gridCommunes_oncontextmenu"
            }
        });

        App.init('VMain', this.onLoad);

    },
    showMobile: function () {
        App.view.create('VMobile', {
            modal: true
        }).show().center();
    },
    cboCatSelect: function (me) {
        App.Feed.view(App.get(me.up('window'), 'combo#cbofeeds').getValue(), function (r) {
            var dta = {
                fields: ["title", "author", "date", "description", "link"],
                data: [],
                groupField: 'author'
            };
            for (var i = 0; i < r.length; i++) {
                var item = r[i];
                if (item.categories.indexOf(me.getValue()) != -1) {
                    dta.data.push({
                        title: item.title,
                        author: item.author,
                        date: item.date.split('T')[0],
                        description: item.description,
                        link: item.link
                    })
                }
            };
            var store = App.store.create(dta);
            store.load();
            App.get('TImport grid').bindStore(store);
        });
    },
    TShowDoc_onShow: function (me) {
        var html = '<object style="width:100%;height:100%" data="' + me.doc + '" type="' + me.type + '"><p></p></object>';
        App.get(me, 'panel#main').update(html);
    },
    visu_click: function (me) {
        var grid = App.get(me.up('window'), 'grid');
        var row = grid.getSelectionModel().getSelection()[0];
        var win = window.open(row.data.link, '_blank');
    },
    import_click: function (me) {
        var grid = App.get(me.up('window'), 'grid');
        var row = grid.getSelectionModel().getSelection()[0];
        //console.log(row);
        App.get('TConsult textarea#objet').setValue(row.data.title);
        App.get('TConsult textfield#client').setValue(row.data.author);
        App.get('TConsult uploadpanel#up').setFiles([{
            filename: row.data.link,
            filetype: "text/html",
            docId: "-1",
            filesize: 0
        }]);
        App.get('TConsult datefield#date').setValue(row.data.date);
        me.up('window').close();
    },
    TImport_comboFeeds: function (me) {
        App.Feed.view(me.getValue(), function (r) {
            //console.log(r);
            var dta = {
                fields: ["title", "author", "date", "description", "link"],
                data: [],
                groupField: 'author'
            };
            var cats = [];
            var categories = [];
            for (var i = 0; i < r.length; i++) {
                var item = r[i];
                for (var j = 0; j < item.categories.length; j++) {
                    if (cats.indexOf(item.categories[j]) == -1) {
                        cats.push(item.categories[j]);
                        categories.push({
                            cat: item.categories[j]
                        });
                    }
                };
                dta.data.push({
                    title: item.title,
                    author: item.author,
                    date: item.date.split('T')[0],
                    description: item.description,
                    link: item.link
                })
            };
            var store = App.store.create({
                fields: ["cat"],
                data: categories
            });
            App.get(me.up('window'), 'combo#cboCategories').bindStore(store);
            store.load();
            var store = App.store.create(dta);
            store.load();
            App.get('TImport grid').bindStore(store);
        });
    },
    TImport_comboSource: function (me) {
        var store = App.store.create('gestionao2://feeds?source=' + me.getValue());
        App.get(me.up('window'), "combo#cbofeeds").bindStore(store);
        store.load();
    },
    TImport_onshow: function (me) {
        App.get(me, "combo#source").setValue("marchesonline.com");
        var store = App.store.create('gestionao2://feeds?source=' + App.get(me, "combo#source").getValue());
        App.get(me, "combo#cbofeeds").bindStore(store);
        App.get(me, "combo#cbofeeds").getStore().load();
    },
    del_dest: function () {
        var grid = App.get('TConsult grid#grid1');
        var select = grid.getSelectionModel().getSelection();
        grid.getStore().remove(select);
    },
    export_excel: function (me) {
        me.disable(true);
        var ranges = App.get('TPrincipal grid#AO').getSelectionModel().getSelection();
        var data = [];
        for (var i = 0; i < ranges.length; i++) data.push(ranges[i].data.IdAppelOffre);
        Ext.Ajax.request({
            url: '/export',
            params: {
                name: "AO",
                AO: data.join(',')
            },
            success: function (response) {
                me.disable(false);
                var url = response.responseText;
                var iframe = document.createElement('iframe');
                iframe.src = url;
                document.getElementsByTagName('body')[0].appendChild(iframe);
            }
        });
    },
    ok_commune: function (me) {
        me.up('window').close();
    },
    del_commune: function (p) {
        var s = App.get(p.up('window'), "grid#search2").getSelectionModel().getSelection();
        if (s) {
            s = s[0];
            var ndx = App.get(p.up('window'), "grid#search2").getStore().indexOf(s);
            Lib.map.markers[ndx].setMap(null);
            Lib.map.markers.splice(ndx, 1);
            App.get("TConsult grid#TCommunes").getStore().removeAt(ndx);
            App.get(p.up('window'), "grid#search2").getStore().removeAt(ndx);
        }
    },
    view_commune: function (p) {
        var s = App.get(p.up('window'), "grid#search").getSelectionModel().getSelection();
        if (s) {
            App.get(p.up('window'), "grid#search2").getStore().add(s[0].data);
            App.get("TConsult grid#TCommunes").bindStore(App.get(p.up('window'), "grid#search2").getStore());
            Lib.map.marker(s[0].data.ville_latitude_deg, s[0].data.ville_longitude_deg);
        }
    },
    add_commune: function () {
        App.view.create('VCommunes', {
            modal: true
        }).show();
    },
    search_onkey: function (me) {
        var search = me.getValue();
        var search = me.getValue();
        var store = App.store.create('gestionao2://communes?ville_nom=' + me.getValue() + '*');
        App.get(me.up('window'), "grid#search").bindStore(store);
        App.get(me.up('window'), "grid#search").getStore().load();

    },
    VCommunes_onshow: function (me) {
        App.loadAPI("https://maps.googleapis.com/maps/api/js?key=AIzaSyBjrQFrAt1CykERQC8uLfKP2TFF6fo6RR4&sensor=false&callback=Lib.map.init");
        App.get(me, "grid#search2").bindStore(App.get("TConsult grid#TCommunes").getStore());
    },
    keyword_add: function (p, s) {
        //console.log(s.button);
        if (s.button == 12) {
            App.DB.get('gestionao2://keywords?keyword=' + p.getValue(), function (o) {
                if (o.data.length == 0) {
                    App.DB.post('gestionao2://keywords', {
                        keyword: p.getValue()
                    }, function (e, r) {
                        App.get('TConsult tagfield#Keywords').getStore().load();
                        App.get('TConsult tagfield#Keywords').getStore().on('load', function () {
                            var values = App.get('TConsult tagfield#Keywords').getValue();
                            values.push(e.insertId);
                            App.get('TConsult tagfield#Keywords').setValue([]);
                            App.get('TConsult tagfield#Keywords').setValue(values);
                            App.get('TConsult textfield#ed_keyword').hide();
                            App.get('tagfield#Keywords').show();
                            App.get('TConsult button#add_keyword').setDisabled(false);
                        });
                    });
                } else {
                    App.get('TConsult textfield#ed_keyword').hide();
                    App.get('tagfield#Keywords').show();
                    App.get('TConsult button#add_keyword').setDisabled(false);
                }
            });
        }
    },
    date_change_week: function (p) {
        //App.get('textfield#numero_semaine').setValue(p.getValue().getWeek());
    },
    up_click: function (p, data) {
        App.AO.viewDoc(data, function (r) {
            if (!r) return alert('Le document est introuvable !');
            App.view.create('VShowDoc', {
                modal: true,
                doc: r._blob,
                type: r.type
            }).show();
        });
    },
    gridCommunes_oncontextmenu: function (view, record, item, index, e) {
        e.stopEvent();
        var user = Auth.User;
        App.AO.getProfil(function (err, r) {
            if (r.result.length <= 0) return;
            var gridMenu = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: 'Supprimer',
                    handler: function () {
                        Ext.MessageBox.show({
                            title: "Supprimer la commune",
                            msg: "Vous êtes sur le point de supprimer cette commune. Voulez vous continuer ?",
                            buttons: Ext.MessageBox.YESNOCANCEL,
                            fn: function (btn) {
                                if (btn == "yes") {
                                    App.get('TConsult grid#TCommunes').getStore().removeAt(index);
                                    var store = App.get('TConsult grid#TCommunes').getStore().getRange();
                                    var ranges = [];
                                    for (var i = 0; i < store.length; i++) {
                                        ranges.push(store[i].data.ville_id);
                                    };

                                    App.DB.post('gestionao2://appelsoffres', {
                                        Communes: JSON.stringify(ranges),
                                        IdAppelOffre: App.CurrentAO
                                    })
                                }
                            },
                            animateTarget: 'mb4',
                            icon: Ext.MessageBox.QUESTION
                        });
                    }
                }]
            });
            gridMenu.showAt(e.getXY());
        });
    },
    grid_oncontextmenu: function (view, record, item, index, e) {
        e.stopEvent();

        var user = Auth.User;
        App.AO.getProfil(function (err, r) {
            //console.log(r);
            if (r.result.length <= 0) return;
            var gridMenu = Ext.create('Ext.menu.Menu', {
                items: [{
                    text: 'Supprimer',
                    handler: function () {
                        Ext.MessageBox.show({
                            title: "Supprimer l'appel d'offre",
                            msg: "Vous êtes sur le point de supprimer cet appel d'offre. Voulez vous continuer ?",
                            buttons: Ext.MessageBox.YESNOCANCEL,
                            fn: function (btn) {
                                if (btn == "yes") {
                                    App.AO.del(record.data.IdAppelOffre, function (err, r) {
                                        view.getStore().load();
                                        App.notify("L'appel d'offre a été supprimé");
                                    });
                                }
                            },
                            animateTarget: 'mb4',
                            icon: Ext.MessageBox.QUESTION
                        });
                    }

                }]
            });
            gridMenu.showAt(e.getXY());
        });


    },
    button_exit_onclick: function () {
        App.get('TShowDoc').close();
    },
    item_upload: function (me, response) {
        console.log(me);
        console.log(response);
    },
    item_upload_complete: function (me) {
        console.log('fini');
        console.log(me.getFiles());
    },
    //Permet le double click sur un appelOffre et recupere les données 
    grid_dblclick: function (p, record) {

        var user = Auth.User;

        App.DB.get('gestionao2://favoris?UId=' + user.uid, function (e, r) {
            if (e.success) {

                var favoris = null;
                var check = true;
                var idAppelOffre = record.data.IdAppelOffre;
                if (e.data.length > 0) {
                    if (e.data[0].Favoris != '' && e.data[0].Favoris != null) {

                        favoris = JSON.parse(e.data[0].Favoris);

                        for (var i = 0; i < favoris.length && check; i++) {
                            if (favoris[i].IdAppelOffre == idAppelOffre) {
                                check = false;
                            }
                        }
                    };

                    if (check) {
                        App.get('button#ajouter_favoris').idAppelOffre = record.data.IdAppelOffre;
                        App.get('button#ajouter_favoris').show();
                    } else {
                        App.get('button#ajouter_favoris').hide();
                    }
                };
            }
        });


        OP = false;

        App.view.create('VConsult', {
            modal: true
        }).show().center();
    },
    //Si l'url contient ?appelOffre= cela modifie la fenêtre initial et affiche les données de l'appelOffre correspondante
    TConsult_onshow: function (me) {
        var user = Auth.User;
        try {
            if (OP) return;
        } catch (e) {

        };
        new Ext.tip.ToolTip({
            target: App.get(me, 'panel#panel_like'),
            delegate: '.like',
            listeners: {
                beforeshow: function (tip) {
                    var current = tip.currentTarget.dom;
                    tip.setHtml("Ca m'intéresse !");
                }
            }
        });
        /*

        App.$('.like2').on('click', function () {
            App.$('.like2').hide();
            App.$('.like').show();
        });
        */
        if (!App.CurrentAO) {
            var record = App.get('TPrincipal grid#AO').getSelectionModel().getSelection();
            record = record[0];

            App.CurrentAO = record.data.IdAppelOffre;
        };

        App.DB.get('gestionao2://appelsoffres?IdAppelOffre=' + App.CurrentAO, function (rx) {

            var record = {
                data: rx.data[0]
            };
            // console.log(record.data);
            if (record.data.Liked) {
                if (record.data.Liked == 0) {
                    if (Auth.User) {
                        App.$('.like').show();
                        App.$('.like').on('click', function () {
                            App.$('.like').hide();
                            App.$('.like2').show();
                            App.DB.post('gestionao2://appelsoffres', {
                                IdAppelOffre: record.data.IdAppelOffre,
                                Liked: Auth.User.uid
                            });
                        });
                    }
                } else App.$('.like2').show();
            } else {
                if (Auth.User) {
                    App.$('.like').show();
                    App.$('.like').on('click', function () {
                        App.$('.like').hide();
                        App.$('.like2').show();
                        App.DB.post('gestionao2://appelsoffres', {
                            IdAppelOffre: record.data.IdAppelOffre,
                            Liked: Auth.User.uid
                        });
                    });
                }
            }

            App.AO.getProfil(function (err, r) {


                if (r.result.length > 0) {


                    App.get('TConsult').setTitle('Modifier un enregistrement');
                    App.get('combo#cboNom').setValue(record.data.IdSource);

                    //console.log(record.data);


                    App.DB.get('gestionao2://mails?idao=' + record.data.IdAppelOffre, function (e, r) {
                        try {
                            var t = JSON.parse(r.result.data[0].value);
                            App.get('grid#grid1').getStore().loadRawData(t);
                        } catch (e) {}
                    });

                    App.get('combo#cboType').setValue(record.data.IdConsultation);
                    App.get('textarea#objet').setValue(record.data.Objet);
                    App.get('textfield#client').setValue(record.data.Client);
                    App.get('textfield#observations').setValue(record.data.Commentaire);
                    App.get('uploadpanel#up').setFiles(JSON.parse(record.data._BLOB));

                    if (record.data.Keywords) App.get('tagfield#Keywords').setValue(JSON.parse(record.data.Keywords));

                    try {
                        var tab = record.data.IdDepartement.split(',');
                    } catch (e) {
                        var tab = [];
                        tab.push(record.data.IdDepartement);
                    };
                    var tabx = [];
                    for (var i = 0; i < tab.length; i++) {
                        tabx.push(parseInt(tab[i]));
                    };

                    var store = App.store.create('gestionao2://communes{ville_id,ville_nom}?ville_id=' + record.data.Communes);
                    App.get('TConsult grid#TCommunes').bindStore(store);
                    App.get('TConsult grid#TCommunes').getStore().load();

                    App.get('tagfield#cboDepartement').setValue(tabx);
                    App.get('datefield#date').setValue(new Date(record.data.DateParution));
                    App.get('datefield#date_limite').setValue(new Date(record.data.DateLimite));
                    App.get('combo#cboCode').setValue(record.data.IdNaturePrestation);
                    //App.get('textfield#numero_semaine').setValue(record.data.Semaine);
                    App.get('combo#cboDomaine').setValue(record.data.IdDomaine);

                    if (App.get('combo#cboDomaine').getValue() == 0) {
                        App.get('combo#cboDomaine').setValue('');
                    };


                    AO_ID = record.data.IdAppelOffre;

                } else {
                    App.DB.get('gestionao2://mails?idao=' + record.data.IdAppelOffre, function (e, r) {
                        try {
                            var t = JSON.parse(r.result.data[0].value);
                            App.get('grid#grid1').getStore().loadRawData(t);
                        } catch (e) {}
                    });
                    AO_ID = record.data.IdAppelOffre;
                    App.get('TConsult').setTitle('Appel d\'offre');

                    App.get('uploadpanel#up').setReadOnly(true);
                    App.get('combo#cboNom').setReadOnly(true);
                    App.get('combo#cboType').setReadOnly(true);
                    App.get('tagfield#cboDepartement').setReadOnly(true);
                    App.get('datefield#date').setReadOnly(true);
                    App.get('datefield#date_limite').setReadOnly(true);
                    App.get('button#effacer_saisie').hide();
                    App.get('button#valider_saisie').hide();
                    App.get('textfield#client').setReadOnly(true);
                    App.get('textarea#objet').setReadOnly(true);
                    App.get('textarea#observations').setReadOnly(true);
                    App.get('combo#cboDomaine').setReadOnly(true);
                    App.get('combo#cboCode').setReadOnly(true);
                    App.get('TConsult tagfield#Keywords').setReadOnly(true);
                    App.get('TConsult button#add_keyword').hide();
                    App.get('combo#cboNom').setValue(record.data.IdSource);
                    App.get('combo#cboType').setValue(record.data.IdConsultation);
                    App.get('textarea#objet').setValue(record.data.Objet);
                    App.get('textfield#client').setValue(record.data.Client);
                    App.get('textfield#observations').setValue(record.data.Observation);
                    App.get('grid#grid1').getDockedItems('toolbar[dock=top]')[0].hide();
                    App.get('TConsult grid#TCommunes').getDockedItems('toolbar[dock=top]')[0].hide();

                    App.get('uploadpanel#up').setFiles(JSON.parse(record.data._BLOB));

                    var store = App.store.create('gestionao2://communes{ville_id,ville_nom}?ville_id=' + record.data.Communes);
                    App.get('TConsult grid#TCommunes').bindStore(store);
                    App.get('TConsult grid#TCommunes').getStore().load();

                    try {
                        var tab = record.data.IdDepartement.split(',');
                    } catch (e) {
                        var tab = [];
                        tab.push(record.data.IdDepartement);
                    };
                    var tabx = [];
                    for (var i = 0; i < tab.length; i++) {
                        tabx.push(parseInt(tab[i]));
                    };
                    App.get('tagfield#cboDepartement').setValue(tabx);

                    App.get('datefield#date').setValue(new Date(record.data.DateParution));
                    App.get('datefield#date_limite').setValue(new Date(record.data.DateLimite));


                    App.get('combo#cboCode').setValue(record.data.IdNaturePrestation);
                    App.get('textfield#numero_semaine').setValue(record.data.Semaine);
                    App.get('combo#cboDomaine').setValue(record.data.IdDomaine);

                    if (App.get('combo#cboDomaine').getValue() == 0) {
                        App.get('combo#cboDomaine').setValue('');
                    }


                }
            });

        });

    },

    AO_onclick: function (p, record) {

    },

    //Permet de supprimer une ligne avec le clic droit supprimer
    grid1_oncontextmenu: function (view, record, item, index, e) {
        Remove_Id = record.data.Id;
        e.stopEvent();
        App.AO.getProfil(function (err, r) {
            if (r.result.length > 0) {
                var gridMenu = Ext.create('Ext.menu.Menu', {
                    items: [{
                        text: 'Supprimer',
                        handler: function () {
                            var ndx = App.get("grid#grid1").getSelectionModel().getSelection();
                            //console.log(ndx);
                            App.get('grid#grid1').getStore().remove(ndx);
                        }
                    }]
                });
                gridMenu.showAt(e.getXY());
            }
        });
    },
    //Permet de supprimer une ligne avec le clic droit supprimer
    grid_upload_oncontextmenu: function (view, record, item, index, e) {
        e.stopEvent();
        var gridMenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Supprimer',
                handler: function () {
                    var ndx = App.get("grid#upload").getSelectionModel().getSelection();
                    //console.log(ndx);
                    App.get('grid#upload').getStore().remove(ndx);
                }

            }]
        });
        gridMenu.showAt(e.getXY());

    },
    /*****************************************************************************************************************************************************************/
    //Permet de supprimer une ligne avec le clic droit supprimer
    gridFavoris_oncontextmenu: function (view, record, item, index, e) {
        Remove_Id = record.data.Id;
        me = this;
        e.stopEvent();
        var gridMenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Supprimer des favoris',
                handler: function () {
                    me.SuppressionFavori(record.data.IdAppelOffre);
                }

            }]
        });
        gridMenu.showAt(e.getXY());

    },
    AjoutFavori: function (obj) {
        var user = Auth.User;

        App.DB.get('gestionao2://favoris?UId=' + user.uid, function (e, r) {
            //console.log(e);
            if (e.success) {

                var favoris = null;

                if (e.data[0].Favoris != '' && e.data[0].Favoris != null) {
                    var favoris = JSON.parse(e.data[0].Favoris);
                } else {
                    var favoris = [];
                }

                App.AO.get(obj.idAppelOffre, function (e, record) {
                    if (e.success) {
                        favoris.push(e.data[0]);
                        App.DB.post('gestionao2://favoris', {
                            UId: user.uid,
                            Favoris: favoris,
                            LastUpdate: new Date()
                        }, function (e, r) {
                            if (e.affectedRows == 1) {
                                App.get('button#ajouter_favoris').hide();
                            }
                        });
                    }
                });
            }
        });
    },
    SuppressionFavori: function (obj) {
        var me = this;
        var idAppelOffre;

        if (typeof obj === 'number') {
            idAppelOffre = obj;
        } else {
            idAppelOffre = obj.idAppelOffre;
        }

        Ext.Msg.show({
            title: 'Êtes-vous sûr de vouloir supprimer cet appel d\'offre de vos favoris ?',
            message: 'Êtes-vous sûr de vouloir supprimer cet appel d\'offre de vos favoris ?',
            buttons: Ext.Msg.YESNOCANCEL,
            fn: function (btn) {
                if (btn === 'yes') {
                    var user = Auth.User;
                    App.DB.get('gestionao2://favoris?UId=' + user.uid, function (e, r) {
                        if (e.success) {
                            var appelOffre = JSON.parse(e.data[0].Favoris);
                            var newAppelOffre = [];
                            for (var i = 0; i < appelOffre.length; i++) {
                                if (appelOffre[i].IdAppelOffre != idAppelOffre) {
                                    newAppelOffre.push(appelOffre[i]);
                                }
                            }
                            if (newAppelOffre.length > 0) {
                                newAppelOffre = JSON.stringify(newAppelOffre);
                            } else {
                                newAppelOffre = null;
                            }
                            App.DB.post('gestionao2://favoris', {
                                UId: user.uid,
                                Favoris: newAppelOffre,
                                LastUpdate: new Date()
                            }, function (e, r) {
                                if (e.affectedRows == 1) {
                                    if (App.get('VAppelOffreFavoris')) {
                                        App.get('VAppelOffreFavoris').close();
                                    }
                                    me.LoadFavoris();
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    ConsultationFavoris: function (p, record) {

        OP = false;

        App.view.create('VAppelOffreFavoris', {
            modal: true,
            listeners: {
                show: function () {
                    var user = Auth.User;
                    App.AO.getProfil(function (err, r) {

                        if (r.result.length > 0) {

                            App.get('combo#cboNom').setValue(record.data.IdSource);

                            App.DB.get('gestionao2://mails?idao=' + record.data.IdAppelOffre, function (e, r) {
                                try {
                                    var t = JSON.parse(r.result.data[0].value);
                                    App.get('grid#grid1').getStore().loadRawData(t);
                                } catch (e) {}
                            });

                            App.get('combo#cboType').setValue(record.data.IdConsultation);
                            App.get('textarea#objet').setValue(record.data.Objet);
                            App.get('textfield#client').setValue(record.data.Client);
                            App.get('textfield#observations').setValue(record.data.Observation);
                            App.get('uploadpanel#up').setFiles(JSON.parse(record.data._BLOB));
                            if (record.data.Keywords) App.get('tagfield#Keywords').setValue(JSON.parse(record.data.Keywords));

                            try {
                                var tab = record.data.IdDepartement.split(',');
                            } catch (e) {
                                var tab = [];
                                tab.push(record.data.IdDepartement);
                            };
                            var tabx = [];
                            for (var i = 0; i < tab.length; i++) {
                                tabx.push(parseInt(tab[i]));
                            };

                            App.get('tagfield#cboDepartement').setValue(tabx);
                            App.get('datefield#date').setValue(record.data.DateParution);
                            App.get('datefield#date_limite').setValue(record.data.DateLimite);
                            App.get('combo#cboCode').setValue(record.data.IdNaturePrestation);
                            App.get('textfield#numero_semaine').setValue(record.data.Semaine);
                            App.get('combo#cboDomaine').setValue(record.data.IdDomaine);
                            //App.get('combo#cboThematique').setValue(record.data.IdThematique);
                            if (App.get('combo#cboDomaine').getValue() == 0) {
                                App.get('combo#cboDomaine').setValue('');
                            };
                            /*App.get('combo#cboThematique').getStore().getProxy().extraParams.id_domaine = record.data.Id_domaine;
                            App.get('combo#cboThematique').getStore().load();*/

                            AO_ID = record.data.IdAppelOffre;

                        } else {
                            AO_ID = record.data.IdAppelOffre;
                            App.get('VAppelOffreFavoris').setTitle('Appel d\'offre');
                            App.get('panel#regroupement_hboxGrid1').hide();
                            App.get('uploadpanel#up').setReadOnly(true);
                            App.get('combo#cboNom').setReadOnly(true);
                            App.get('combo#cboType').setReadOnly(true);
                            App.get('tagfield#cboDepartement').setReadOnly(true);
                            App.get('datefield#date').setReadOnly(true);
                            App.get('datefield#date_limite').setReadOnly(true);
                            App.get('textfield#client').setReadOnly(true);
                            App.get('textarea#objet').setReadOnly(true);
                            App.get('textarea#observations').setReadOnly(true);
                            App.get('combo#cboDomaine').setReadOnly(true);
                            //App.get('combo#cboThematique').setReadOnly(true);
                            App.get('combo#cboCode').setReadOnly(true);
                            App.get('VAppelOffreFavoris tagfield#Keywords').setReadOnly(true);
                            App.get('VAppelOffreFavoris button#add_keyword').hide();
                            App.get('combo#cboNom').setValue(record.data.IdSource);
                            App.get('combo#cboType').setValue(record.data.IdConsultation);
                            App.get('textarea#objet').setValue(record.data.Objet);
                            App.get('textfield#client').setValue(record.data.Client);
                            App.get('textfield#observations').setValue(record.data.Observation);

                            App.get('uploadpanel#up').setFiles(JSON.parse(record.data._BLOB));

                            try {
                                var tab = record.data.IdDepartement.split(',');
                            } catch (e) {
                                var tab = [];
                                tab.push(record.data.IdDepartement);
                            };
                            var tabx = [];
                            for (var i = 0; i < tab.length; i++) {
                                tabx.push(parseInt(tab[i]));
                            };

                            App.get('tagfield#cboDepartement').setValue(tabx);

                            App.get('datefield#date').setValue(record.data.DateParution);
                            App.get('datefield#date_limite').setValue(record.data.DateLimite);

                            App.get('combo#cboCode').setValue(record.data.IdNaturePrestation);
                            App.get('textfield#numero_semaine').setValue(record.data.Semaine);
                            App.get('combo#cboDomaine').setValue(record.data.IdDomaine);

                            if (App.get('combo#cboDomaine').getValue() == 0) App.get('combo#cboDomaine').setValue('');



                        }
                    });
                }
            }
        }).show().center();

        App.get('button#supprimer_favoris').idAppelOffre = record.data.IdAppelOffre;
    },
    LoadFavoris: function () {

        var user = Auth.User;


        App.DB.get('gestionao2://favoris?UId=' + user.uid, function (e, r) {
            if (e.success) {

                var data = [];
                var tabMeta = [];

                if (e.data[0].Favoris) {

                    data = JSON.parse(e.data[0].Favoris);

                    for (a in data[0]) {
                        tabMeta.push(a);
                    }

                    for (a in data) {
                        data[a].DateLimite = new Date(data[a].DateLimite);
                        data[a].DateParution = new Date(data[a].DateParution);
                    }
                }

                var store = App.store.create({
                    fields: tabMeta,
                    data: data,
                    groupField: 'nom_thematique'
                });

                App.get('TFavoris grid#AO').bindStore(store);
                App.get('TFavoris grid#AO').getStore().load();
            }
        });


    },
    ShowFavoris: function () {
        this.LoadFavoris();
        App.get('TPrincipal').hide();
        App.get('TFavoris').show();
    },
    ShowAccueil: function () {
        App.get('TPrincipal').show();
        App.get('TFavoris').hide();
    },
    Menu_onClick: function (p) {
        if (p.itemId) {
            if (p.itemId == "MobileADD") {
                App.view.create('VMobile', {
                    modal: true
                }).show().center();
            }
        };
    },
    CancelMobile: function (p, record) {
        App.get('VMobile').close();
    },
    SynchroniserMobile: function (p) {
        p.setDisabled(true);
        var mobileId = App.get('VMobile textfield#Peripherique').getValue();

        if (mobileId != '') {
            var user = Auth.User;


            var UId = user.uid;

            App.DB.get('gestionao2://mobile?MobileId=' + mobileId, function (e, r) {

                if (r.result.data.length == 1) {
                    if (e.data[0].UId == null) {
                        App.DB.post('gestionao2://mobile', {
                            UId: UId,
                            MobileId: mobileId
                        }, function (e, r) {
                            if (r.result.affectedRows == 1) {
                                App.get('VMobile label#LabelError').el.setStyle({
                                    "color": "green"
                                });
                                App.get('VMobile label#LabelError').setText('Synchronisation...');

                                App.IO.send('#' + mobileId, true, "*");
                                App.IO.subscribe('#' + mobileId + 'OK');
                                App.IO.on('#' + mobileId + 'OK', function () {
                                    App.notify('Synchronisation Terminée.');
                                    p.up('window').close();
                                });
                            }
                        });
                    } else if (!e.data[0].Synchro) {
                        App.get('VMobile label#LabelError').el.setStyle({
                            "color": "green"
                        });
                        App.get('VMobile label#LabelError').setText('Synchronisation...');

                        App.IO.send('#' + mobileId, true, "*");
                        App.IO.subscribe('#' + mobileId + 'OK');
                        App.IO.on('#' + mobileId + 'OK', function () {
                            App.get('VMobile').close();
                            App.notify('Synchronisation mobile terminée.');
                        });
                    } else {
                        App.get('VMobile label#LabelError').el.setStyle({
                            "color": "orange"
                        });
                        App.get('VMobile label#LabelError').setText('Ce code Mobile est déjà attribué.');
                        p.setDisabled(false);
                    }
                } else {
                    App.get('VMobile label#LabelError').el.setStyle({
                        "color": "red"
                    });
                    App.get('VMobile label#LabelError').setText('Code incorrect.');
                    p.setDisabled(false);
                }
            });

        } else {
            App.get('VMobile label#LabelError').el.setStyle({
                "color": "red"
            });
            App.get('VMobile label#LabelError').setText('Champ Obligatoire.');
            p.setDisabled(false);
        }
    },
    /*****************************************************************************************************************************************************************/
    //remet les saisies à vide
    effacer_saisie: function (p, record) {
        App.get('combo#cboNom').setValue('');
        App.get('datefield#date').setValue('');
        App.get('combo#cboType').setValue('');
        App.get('textarea#objet').setValue('');
        App.get('textfield#client').setValue('');
        App.get('textfield#observations').setValue('');
        App.get('combo#cboDepartement').setValue('');
        App.get('datefield#date_limite').setValue('');
        App.get('combo#cboCode').setValue('');
        App.get('textfield#numero_semaine').setValue('');
        App.get("grid#grid1").getStore().removeAll();
        App.get("grid#upload").getStore().removeAll();
        App.get('combo#cboDomaine').setValue('');
        //App.get('combo#cboThematique').setValue('');
        BLOB = [];

    },
    ajouter_modification: function (p, record) {
        OP = true;
        App.view.create('VConsult', {
            modal: true
        }).show().center();

    },
    //bouton ajouter groupe de la grid principal
    Ajouter_groupe: function (p, record) {

        App.view.create('VNotifGroupes', {
            modal: true
        }).show();
    },
    //bouton ajouter agent de la grid principal
    ajouter_agent: function (p, record) {

        App.view.create('VNotifAgents', {
            modal: true
        }).show();

    },
    //Bouton annuler de la grid agent
    annuler: function (p, record) {
        App.get('TNotifAgents').close();
    },

    //Bouton annuler de la grid groupe
    annuler2: function (p, record) {
        App.get('TNotifGroupes').close();
    },

    CANCEL_lien: function (p, record) {
        App.get('TConsult').close();
    },

    grid1_onclick: function (p, record) {
        //console.log(record);
    },

    //Grid agent
    grid2_onclick: function (p, record) {

        GRP_NOM2 = record.data.Nom + " " + record.data.Prenom;
        GRP_EMAIL2 = record.data.LibMelA;
        //console.log(record);
        GRP_ID2 = record.data.Kage;


    },
    // Permet le double clic sur un enregistrement qui ajoutera les données si il y a un mail
    grid2_doubleclick: function (p, record) {

        GRP_NOM2 = record.data.Nom + " " + record.data.Prenom;
        GRP_EMAIL2 = record.data.LibMelA;
        //console.log(record);
        GRP_ID2 = record.data.Kage;


        if (GRP_EMAIL2 == null) Ext.Msg.alert('Mail manquant', 'Cette agent n\'a pas encore de mail !');
        else {
            App.get('grid#grid1').getStore().add([{
                Nom: GRP_NOM2,
                Email: GRP_EMAIL2,
                Type: "Agent",
                Id: GRP_ID2
            }]);


        }
    },

    //Grid groupe 
    grid3_onclick: function (p, record) {
        GRP_NOM = record.data.LibUnic;
        GRP_EMAIL = record.data.LibMelU;
        //console.log(record);

    },
    // Permet le double clic sur un enregistrement qui ajoutera les données si il y a un mail
    grid3_doubleclick: function (p, record) {

        GRP_NOM = record.data.LibUnic;
        GRP_EMAIL = record.data.LibMelU;

        if (GRP_EMAIL == null) Ext.Msg.alert('Mail manquant', 'Ce groupe n\'a pas encore de mail !');
        else {
            App.get('grid#grid1').getStore().add([{
                Nom: GRP_NOM,
                Email: GRP_EMAIL,
                Type: "Groupe",

            }]);

        }
    },

    //Bouton valider de la grid groupe
    validation_groupe: function (p, record) {
        /* App.get('grid#grid1').getStore().add([{
			Nom: GRP_NOM,
			Email: GRP_EMAIL,
			Type: "Groupe",
		}]); */
        App.get('TNotifGroupes').close();
    },
    //Bouton valider de la grid agent
    validation_agent: function (p, record) {
        /* App.get('grid#grid1').getStore().add([{
			Nom: GRP_NOM2,
			Email: GRP_EMAIL2,
			Type: "Agent",
			Id: GRP_ID2
		}]); */
        App.get('TNotifAgents').close();
    },
    //Certain saisie sont obligatoire. Si on a fait un click sur le bouton ajouter_modification on fera 
    //de l'insertion et si on a fait un click sur grid_dblclick on fera une modification dans la base de donnée
    valider_saisie: function (p, record) {
        return p.up('window').close();
        /*var EMAIL = [];
        var cmp = App.get('TConsult grid#grid1').getStore().getRange();
        for (var i = 0; i < cmp.length; i++) EMAIL.push(cmp[i].data.Email);

        p.setDisabled(true);

        var temoin = false;
        if (App.get('combo#cboNom').getValue() == null) {
            alert('Veuillez entrer un nom');
            temoin = true;
        };
        if (App.get('datefield#date').getValue() == null) {
            alert('Veuillez entrer une date de parution');
            temoin = true;
        };
        if (App.get('combo#cboType').getValue() == null) {
            alert('Veuillez entrer un type de consulatation');
            temoin = true;
        };
        if (App.get('textfield#client').getValue() == "") {
            alert('Veuillez entrer un client');
            temoin = true;
        };
        if (App.get('textarea#objet').getValue() == "") {
            alert('Veuillez entrer un objet');
            temoin = true;
        };
        if (App.get('tagfield#cboDepartement').getValue() == null) {
            alert('Veuillez entrer un département');
            temoin = true;
        };
        if (App.get('datefield#date_limite').getValue() == null) {
            alert('Veuillez entrer une date limite');
            temoin = true;
        };
        if (App.get('combo#cboDomaine').getValue() == null) {
            alert('Veuillez entrer un domaine');
            temoin = true;
        };
        if (App.get('combo#cboCode').getValue() == null) {
            alert('Veuillez entrer un code de la prestation');
            temoin = true;
        };
        if (App.get('textfield#numero_semaine').getValue() != parseInt(App.get('textfield#numero_semaine').getValue())) {
            alert('Veuillez entrer un numero de semaine');
            temoin = true;
        };
        if (temoin) return;
        var tab = App.get(p.up('window'), 'grid#TCommunes').getStore().getRange();

        var Communes = [];
        for (var i = 0; i < tab.length; i++) Communes.push(tab[i].data.ville_id);

        var o = {
            IdSource: App.get('combo#cboNom').getValue(),
            DateParution: App.get('datefield#date').getValue(),
            IdConsultation: App.get('combo#cboType').getValue(),
            Objet: App.get('textarea#objet').getValue(),
            Client: App.get('textfield#client').getValue(),
            Observation: App.get('textfield#observations').getValue(),
            IdDepartement: App.get('combo#cboDepartement').getValue().join(','),
            DateLimite: App.get('datefield#date_limite').getValue(),
            Semaine: App.get('textfield#numero_semaine').getValue(),
            IdDomaine: App.get('combo#cboDomaine').getValue(),
            Communes: JSON.stringify(Communes),
            IdNaturePrestation: App.get('combo#cboCode').getValue(),
            _BLOB: App.get('uploadpanel#up').getFiles(),
            Keywords: App.get('tagfield#Keywords').getValue()
        };

        if (App.CurrentAO) o.IdAppelOffre = App.CurrentAO;

        App.AO.post(o, function (rr) {

            if (!rr) {
                App.notify("Un problème est survenu lors de l'enregistrement de la fiche");
                p.setDisabled(false);
                return;
            };

            var id_appelOffre = rr.insertId;
            if (id_appelOffre == 0) id_appelOffre = App.CurrentAO;

            var values = App.get('TConsult tagfield#Keywords').getRawValue().split(', ');

            App.DB.get('gestionao2://keywords?keyword=["' + values.join('","') + '"]', function (e, r) {
                var arr = [];
                for (var i = 0; i < r.result.data.length; i++) arr.push(r.result.data[i].keyword);
                //var diff = $(values).not(arr).get();
                var diff = values.diff(arr);
                var d = [];
                for (var i = 0; i < diff.length; i++) d.push({
                    keyword: diff[i]
                });
                App.DB.post('gestionao2://keywords', d, function (e2, r2) {
                    App.get('TPrincipal grid#AO').getStore().load();

                    // on notifie par mail
                    if (EMAIL.length > 0) {
                        var subject = "Appel d'offre #" + id_appelOffre + ' :' + App.get('textarea#objet').getValue();
                        var o = {
                            to: EMAIL,
                            subject: subject.substr(0, 255),
                            text: 'Bonjour, \nl\'appel d\'offre "' + subject.substr(0, 255) + '" a été identifié pour vous. \nVeuillez cliquer sur le lien suivant :\n' + lien + '?appelOffre=' + id_appelOffre + '\nEn cas de question, merci de contacter la balu.'
                        };

                        var obj = App.get('grid#grid1').getStore().getRange();
                        var d = [];
                        for (var k = 0; k < obj.length; k++) d.push(obj[k].data);

                        App.DB.post('gestionao2://mails', {
                            idao: id_appelOffre,
                            value: JSON.stringify(d)
                        }, function (e, r) {

                        });
                        App.get('TConsult').close();
                        App.Mail.send(o, function (error, result) {
                            console.log(error);
                            if (!error) App.notify('ERREUR', "Le mail n'a pas été envoyé.");
                            else App.notify('Le mail a été envoyé.', "Les agents ont été notifiés.");
                            //p.setDisabled(false);
                        });
                    } else App.get('TConsult').close();
                });
            });
        });


        */

    },
    //Selon le domaine selectionné cela affiche la thematique correspondante
    valider_thematiques: function (p, record) {

        var id_domaine = App.get('combo#cboDomaine').getValue();
        /*App.get('combo#cboThematique').setValue('');
        App.get('combo#cboThematique').getStore().getProxy().extraParams.id_domaine = id_domaine;
        App.get('combo#cboThematique').getStore().load();*/

    },

    //Au chargement de l'application si le lien URL contient ?appelOffre= on recuperera les information de l'offre grace a son numero
    onLoad: function () {

        var loc = document.location.href.split('?appelOffre=');
        lien = document.location.href.split('?')[0];

        Auth.login(function (user) {

            App.AO.getProfil(function (r) {

                App.get('TPrincipal grid#AO').getStore().load();
                if (loc.length > 1) {
                    App.CurrentAO = document.location.href.split('?appelOffre=')[1].trim();
                    App.view.create('VConsult', {
                        modal: true
                    }).show().center();
                };
                /*
                if (r.length > 0)
                    App.get('button#ajouter_modification').show();
                else
                    App.get('button#ajouter_modification').hide();
                */
            });
        });


    }


});