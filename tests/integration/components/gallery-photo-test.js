import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gallery-photo', 'Integration | Component | gallery photo', {
  integration: true
});

test('it renders the photo caption', function(assert) {
  // Arrange: create a photo object and set getComments to an empty function
  this.set('samplePhoto', {
    caption: 'A family of geese'
  });
  this.set('getComments', function() {});
  // Act: render the component
  this.render(hbs`{{gallery-photo photo=samplePhoto getComments=getComments}}`);
  // Assert: component should render caption
  assert.equal(this.$('.caption').text().trim(), 'A family of geese', 'Caption is displayed');
});

test('it renders number of comments', function(assert) {
  // Arrange: create a photo object and set getComments to return an array of 2 comments
  this.set('samplePhoto', {
    num_comments: 2
  });
  this.set('getComments', function() {
    let comment = { name: '', body: '' };
    return [comment, comment];
  });
  // Act: render the component
  this.render(hbs`{{gallery-photo photo=samplePhoto getComments=getComments}}`);
  // Assert: component should render number of comments and 2 comments
  assert.equal(this.$('.num-comments').text().trim(), 'Comments: 2', 'Number of comments is displayed');
  assert.equal(this.$('.comment').length, 2, 'Comments are rendered');
});

test('it renders "No Comments" when there are no comments', function(assert) {
  // Arrange: create a photo object and set getComments to return an empty array
  this.set('samplePhoto', {
    num_comments: 0
  });
  this.set('getComments', function() {
    return [];
  });
  // Act: render the Component
  this.render(hbs`{{gallery-photo photo=samplePhoto getComments=getComments}}`);
  // Assert: component should render number of comments (0) and "No Comments"
  assert.equal(this.$('.num-comments').text().trim(), 'Comments: 0', 'Number of comments is 0');
  assert.equal(this.$('.comment').text().trim(), 'No Comments', '"No Comments" is displayed');
});
