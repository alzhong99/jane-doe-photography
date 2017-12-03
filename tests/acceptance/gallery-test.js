import { test } from 'qunit';
import moduleForAcceptance from 'jane-doe-photography/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | gallery');

test('viewing photos', function(assert) {
  // Visit gallery route
  visit('/gallery');
  // Should render 5 photos
  andThen(function() {
    assert.equal(find('.photo-post').length, 5, 'photos rendered in gallery');
  });
});
