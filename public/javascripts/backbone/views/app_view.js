var AppView = Backbone.View.extend({
	el: $("#todoapp"),
	template: '<h1>hello</h1>',
	
	events: {
		//"keypress #new-todo": "createOnEnter"
	},
	
	// initialize: function() {
	// 	this.input = this.$("new-todo");
	// 	this.allCheckbox = this.$("#toggle-all")[0];
	// 	this.listenTo(Todos, 'add', this.addOne);
	// },
	
	render: function() {
		$("#todoapp").html(this.template);
		return this;
	},
	
	link_to: function(route) {
		
	}
	
});
