import DS from 'ember-data';

export default DS.Model.extend({
  src: DS.attr('string'),
  caption: DS.attr('string'),
  comments: DS.hasMany('comment', {async: true}),
  num_comments: DS.attr('number')
});
