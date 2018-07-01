App.view.define('VImport', {
    extend: "Ext.window.Window",
    alias: "widget.TImport",
    initComponent: function() {
		this.width=1024;
		this.height=768;
		this.title="Importer";
		this.layout="border";
		this.bodyStyle="background-color:white";
		this.items=[
		{
			region: "south",
			height: 50,
			border: false,
			padding: 10,
			layout: "hbox",
			items: [
				{
					xtype: "button",
					text: "Annuler",
					handler: function(me) {
						me.up('window').close();
					}
				},
				{flex: 1,border: false},
				{
					xtype: "button",
					text: "Visualiser",
					itemId: "visu"
				},
				{
					xtype: "button",
					itemId: "import",
					margin: {
						left: 5
					},
					text: "<b>Importer</b>"
				}
			]
		},
		{
			region: "north",
			height: 45,
			padding: 10,
			layout: "hbox",
			border: false,
			items: [
				{
					xtype: "combo",
					width: 200,
					displayField:"source",
					editable: false,
					itemId: "source",
					valueField:"source",
					store: App.store.create({
						fields: ["source"],
						data: [
							{
								source: "marchesonline.com"
							},
							{
								source: "Le Moniteur"
							},
							{
								source: "e-marchespublics.com"
							}
						]
					})
				},
				{
					xtype: "combo",
					itemId: "cbofeeds",
					margin: {
						left: 10
					},
					valueField:"rss",
					displayField: "title",
					store: App.store.create('gestionao2://feeds'),
					editable: false,
					flex: 1
				},
				{
					xtype: "combo",
					itemId: "cboCategories",
					margin: {
						left: 10
					},
					valueField:"cat",
					displayField: "cat",
					store: App.store.create({fields:[],data:[]}),
					editable: false,
					flex: 1	
				}
			]
		},
		{
			region: "center",
			border: false,
			layout: "vbox",
			padding: 10,
			items: [
			{
				xtype: "grid",
				flex: 1,
				width: "100%",
				features: [{
            		id: 'group',
            		ftype: 'grouping',
            		groupHeaderTpl: '{name}',
            		enableGroupingMenu: true
        		}],
				columns: [{
					header: "Titre",
					dataIndex: "title",
					flex: 1
				},{
					header: "Auteur",
					dataIndex: "author",
					hidden: true
				},{
					header: "Date",
					dataIndex: "date"
				}],
				store: App.store.create({fields:[],data:[]})
			}
			]
		}
		];
		this.callParent(arguments);
	}
});