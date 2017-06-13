import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import MovieView from './movie_view';
import Movie from '../models/movie';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    console.log(this.el);
    this.listenTo(this.model, "update", this.render);

    // this.model.fetch({reset: true, success: function() {}});
  },
  render: function() {
    // this.$("#pet-list").empty();
    var that = this;

    this.model.each(function(pet) {
      var movieView = new MovieView( {
        model: Movie,
        template: that.template,
      });
      that.$('#pet-list').append(petView.render().$el);
    });

    return this;
  },
  events: {
    // "click #add-pet" : "addPet"
  },
  getFormData: function() {
    var formName = this.$("#name").val();
    this.$("#name").val('');

    var formBreed = this.$("#breed").val();
    this.$("#breed").val('');

    var formAge = this.$("#age").val();
    this.$("#age").val('');

    var formDescription = this.$("#description").val();
    this.$("#description").val('');

    var formVaccinated = this.$('#vaccinated-checkbox').is(":checked");
    this.$('#vaccinated-checkbox').prop('checked', false);

    return {
      name: formName,
      breed: formBreed,
      age: formAge,
      description: formDescription,
      vaccinate: formVaccinated
    };
  },
  addMovie: function() {
    var movie = new Movie(this.getFormData());

    this.model.create(movie);
  }
});

export default MovieListView;
