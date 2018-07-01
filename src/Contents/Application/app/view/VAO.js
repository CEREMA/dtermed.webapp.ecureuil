//?

App.view.define('VAO', {
	extend: 'Ext.window.Window',
	alias: 'widget.form',

	x: 50,
	y: 50,
	height: 160,
	width: 200,
	closable: true,
	draggable: true,
	resizable: false,
	closeAction: 'destroy',
	labelWidth: 125,
	hidden: true,
	frame: false,
	title: '',
	bodyStyle: 'padding:5px 5px 0',
	width: 420,
	defaults: {
		width: 390
	},

	items: [{
			layout: "hbox",
			width: 500,
			margin: {
				top: -5,
				bottom: 0,
				left: -5,
				right: 0
			},
			border: false,
			items: [

				{
					xtype: 'label',
					forId: 'label_nom',
					text: 'Nom',
					margin: 10
				},
				{

					xtype: 'textfield',
					width: 120,
					itemId: "insert_nom",
					margin: {
						top: 6,
						bottom: 6,
						left: 32,
						right: 0
					}

				}
			]
		},
		{
			layout: "hbox",
			width: 500,
			margin: {
				top: 0,
				bottom: 0,
				left: -5,
				right: 0
			},
			border: false,
			items: [

				{
					xtype: 'label',
					forId: 'label_prenom',
					text: 'Prenom',
					margin: 10
				},
				{

					xtype: 'textfield',
					width: 120,
					itemId: "insert_prenom",
					margin: {
						top: 6,
						bottom: 6,
						left: 16,
						right: 0
					}

				}
			]
		},
		{
			layout: "hbox",
			width: 500,
			margin: {
				top: 0,
				bottom: -10,
				left: -5,
				right: 0
			},
			border: false,
			items: [

				{
					xtype: 'label',
					forId: 'label_telephone',
					text: 'Telephone',
					margin: 10
				},
				{

					xtype: 'textfield',
					width: 120,
					itemId: "insert_telephone",
					margin: {
						top: 6,
						bottom: 6,
						left: 0,
						right: 0
					}

				}
			]
		}

	],
	bbar: [{
			xtype: "button",
			text: "Annuler",
			itemId: "CANCEL_insert"
		},
		'->',
		{
			xtype: "button",
			text: "Valider",
			itemId: "insert_valider"
		}
	],
});