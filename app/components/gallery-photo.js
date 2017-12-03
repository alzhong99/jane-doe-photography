import Ember from 'ember';

export default Ember.Component.extend({
  comments: Ember.computed(function() {
    // Get comments based on photo ID
    return this.get('getComments')(this.get('photo.id'));
  }),
  actions: {
    // Post a new comment
    postComment(e) {
      // Prevent automatic page refresh
      e.preventDefault();
      // Create new comment object
      let newComment = {
        'name': this.get('name'),
        'body': this.get('body'),
        'photo': this.get('photo')
      };
      // DDAU: call addComment with new comment object and photo ID
      this.get('addComment')(newComment, this.get('photo.id')).then(() => {
        // Then update comments computed property
        this.send('refreshComments');
      });
    },
    // Delete a comment
    deleteComment(commentId) {
      // DDAU: call removeComment with comment ID and photo ID
      this.get('removeComment')(commentId, this.get('photo.id')).then(() => {
        // Then update comments computed property
        this.send('refreshComments');
      });
    },
    // Update comments computed property and reset input fields
    refreshComments() {
      this.notifyPropertyChange('comments');
      this.set('name', '');
      this.set('body', '');
    }
  }
});
