import Ember from 'ember';

export default Ember.Component.extend({
  comments: Ember.computed(function() {
    return this.get('getComments')(this.get('photo.id'));
  }),
  actions: {
    postComment(e) {
      e.preventDefault();
      let newComment = {
        'name': this.get('name'),
        'body': this.get('body'),
        'photo': this.get('photo')
      };
      this.get('addComment')(newComment, this.get('photo.id')).then(() => {
        this.send('refreshComments');
      });
    },
    deleteComment(commentId) {
      this.get('removeComment')(commentId, this.get('photo.id')).then(() => {
        this.send('refreshComments');
      });
    },
    refreshComments() {
      this.notifyPropertyChange('comments');
      this.set('name', '');
      this.set('body', '');
    }
  }
});
