$(function () {
	
	var Todo = Backbone.Model.extend({
		
		defaults: function() {
			return {
				title: "empty todo...",
				order: Todos.nextOrder(),
				done: false
			};
		},
		
		initialize: function() {
			if (!this.get("title")) {
				this.set({"title": this.defaults().title});
			}
		},
		
		toggle: function() {
			this.save({done: !this.get("done")});
		}
	});
	
	var TodoList = Backbone.Collection.extend({
		model: Todo,
		//localStorage: new Backbone.LocalStore("todos-backbone"),
		
		done: function() {
			return this.filter(function(todo){ return todo.get('done'); });
		},
		
		remaining: function() {
			return this.without.apply(this, this.done());
		},
		
		nextOrder: function() {
			if (!this.length) return 1;
		  return this.last().get('order') + 1;
		},
		
		comparator: function(todo) {
			return todo.get('order');
		}
		
	});
	
	var Todos = new TodoList;
	
	var TodoView = Backbone.View.extend({
		tagName: "li",
		
		template: null, //_.template($('#item-template').html()),
		
		events: {
			"click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
		},
		
		initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
		},
		
		render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
		},
		
		toggleDone: function() {
			this.model.toggle();
		}
	});
	
	var AppView = Backbone.View.extend({
		el: $("#todoapp"),
		template: '<h1>Hello</h1>',//_.template($('#stats-template').html()),
		
		events: {
			"keypress #new-todo": "createOnEnter"
		},
		
		initialize: function() {
			this.input = this.$("new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];
			this.listenTo(Todos, 'add', this.addOne);
			this.render();
		},
		
		render: function() {
			console.log('ender in main');
			this.$el.html(this.template);
			return this;
			// var done = Todos.done().length;
			// var remaining = Todos.remaining().length;
			// 
			// if (Todos.length) {
			// 	this.main.show();
			// 	this.footer.show();
			// 	this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
			// } else {
			// 	this.main.hide();
			// 	this.footer.hide();
			// }
			// 
			// this.allCheckbox.checked = !remaining;
		},
		
		addOne: function(todo) {
			var view = new TodoView({model: todo});
			this.$("#todo-list").append(view.render().el);
		},
		
		createOnEnter: function(e) {
			if (e.keyCode != 13) return;
			if (!this.input.val()) return;
			
			Todos.create({ title: this.input.val() });
			this.input.val('');
		}
	});
	
	var App = new AppView;
});
