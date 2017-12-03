import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let photos = this.get('store').findAll('photo');
    return photos;
  },
  title: "Jane's Photo Gallery"
});
