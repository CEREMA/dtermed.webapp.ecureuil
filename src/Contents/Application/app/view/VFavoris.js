App.view.define('VFavoris',{
	extend: "Ext.Panel",
	alias: "widget.TFavoris",
	border: false,
	items: [
	{
		xtype: "grid",
		itemId: "AO",
		tbar: [
			,
			{
				xtype:"button",
				itemId: "b_favoris",
				text: "Favoris",
				scale: "large",
				iconAlign: "top",
				iconCls: "add"
			},
			{
				xtype:"button",
				itemId: "b_appeloffre",
				text: "Appel d'offre",
				scale: "large",
				iconAlign: "top",
				iconCls: "appel-offre"
			},
			{
				xtype:"button",
				itemId: "b_favoris",
				text: "Favoris",
				scale: "large",
				iconAlign: "top",
				iconCls: "favori"
			}
		],
		features: [
		{
			groupHeaderTpl: '{name}',
			ftype: 'groupingsummary'
		}
		],
		columns: [
			{
				text: "Id",
				dataIndex: "IdAppelOffre",
				width: 50
			},			
			{
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
				renderer:  Ext.util.Format.dateRenderer('d/m/Y')
			},
			{
				text: "Date limite",
				dataIndex: "DateLimite",
				type: "date",
				renderer: function(value) {
					return '<div style="color:red">'+value.toString('dd/MM/yyyy')+'</div>'
				}
			}
		]
	}	
	]
});