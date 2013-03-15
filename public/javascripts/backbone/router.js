var AppRouter = Backbone.Router.extend({

	// initialize: function(options) {
	// },

	routes: {
		".*": "index",
		"about": "about"
	},

	index: function() {
		var App = new AppView;
		App.render();
	}

});
