App.view.define('VShowDoc', {
    extend: "Ext.window.Window",
    alias: 'widget.TShowDoc',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;
        this.title = "Document";
        this.layout = {
            type: 'fit'
        };

        this.bbar = [
            '->', {
                text: 'Quitter',
				itemId: "Exit"
            }
        ];
		
        this.defaults = {
            split: true
        };

        this.items = [
			{
				xtype: "panel",
				html: '-',
				itemId: "main",
				border: false,
				flex: 1
			}
		];

        this.callParent();
    }
});