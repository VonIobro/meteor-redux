/* eslint-env mocha */
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'meteor/practicalmeteor:chai';

import {Tasks} from './tasks.js';

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      const userId = Random.id();
      let taskId;

      beforeEach(() => {
        Tasks.remove({});
        Tasks.insert({
          text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'tmesday',
        });
      });

      it('can delete owned task', () => {
        // Find the internal implementation of the task method so we can
        // test it in isolation
        const deleteTask = Meteor.server.method_handlers['task.remove'];

        // Set up a fake method invocation that looks like what the method expects
        const invocation = {userId};

        // Run the method with 'this' set to the fake invoaction
        deleteTask.apply(invocation, [taskId]);

        // Verify that the method does what we expected
        assert.equal(Tasks.find().count(), 1);
      });
    });
  });
}
