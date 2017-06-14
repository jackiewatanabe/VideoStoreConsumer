import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import MovieView from './movie_view';
import Movie from '../models/movie';
import ResultList from '../collections/result_list';
import ResultListView from './result_list_view';

var MovieListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    console.log(this.el);
    this.listenTo(this.model, "update", this.render);
  },
  render: function() {
    this.$("#movie-list").empty();
    var that = this;

    this.model.each(function(movie) {
      var movieView = new MovieView( {
        model: movie,
        template: that.template,
      });
      that.$('#movie-list').append(movieView.render().$el);
    });

    return this;
  },
  events: {
    "click #submit-search" : "search"
  },
  getFormData: function() {
    var formTitle = this.$("#title").val();
    console.log("This is formTitle: " + formTitle);
    this.$("#title").val('');

    return {
      title: formTitle
    };
  },
  search: function() {

    var mySearchTerm = this.getFormData().title;
    var resultList = new ResultList();
    console.log("******getFormData:" + typeof mySearchTerm);

    resultList.fetch({data: {query: mySearchTerm}

    });

    var myResultListView = new ResultListView( {
      model: resultList,
      template: _.template($('#result-template').html()),
      params: this.getFormData(),
      el: 'main'
    });

    console.log(myResultListView);

    myResultListView.render();
    //
    // this.model.create(movie);

  }
});

export default MovieListView;
