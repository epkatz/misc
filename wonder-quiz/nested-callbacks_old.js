/**
 * Nested Callbacks
 *
 * The code below retrieves posts, comments and users and then stitches them
 * together so we end up with a final array of augmented posts.
 *
 * Name performance and maintainability/testability issues.
 * Rewrite the below code as a more performant, maintainable version.
 */

const request = require('request');
const keyBy = require('lodash/keyBy');
const groupBy = require('lodash/groupBy');

const baseUrl = 'http://jsonplaceholder.typicode.com/';
const userEndpoint = `${baseUrl}users`;
const postsEndpoint = `${baseUrl}posts`;
const commentsEndpoint = `${baseUrl}comments`;

request.get(postsEndpoint, function(err, postData) {
  if (err) {
    console.err(err);
    return;
  }

  const parsedPosts = JSON.parse(postData.body);
  const posts = keyBy(parsedPosts, 'id');

  request.get(commentsEndpoint, function(err, commentData) {
    if (err) {
      console.err(err);
      return;
    }

    const parsedComments = JSON.parse(commentData.body);
    const groupedComments = groupBy(parsedComments, 'postId');

    Object.keys(groupedComments).forEach(key => {
      posts[key].comments = groupedComments[key];
    });

    request.get(userEndpoint, function(err, userData) {
      if (err) {
        console.err(err);
        return;
      }

      const parsedUsers = JSON.parse(userData.body);
      const users = keyBy(parsedUsers, 'id');

      const finalPosts = Object.keys(posts).map(key => {
        const post = posts[key];
        post.user = users[post.userId];
        delete post.userId;
        return post;
      });

      console.log('Done');
    });
  });
});
