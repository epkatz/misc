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
const forEach = require('lodash/forEach');
const async = require('async');

const baseUrl = 'http://jsonplaceholder.typicode.com/';
const userEndpoint = `${baseUrl}users`;
const postsEndpoint = `${baseUrl}posts`;
const commentsEndpoint = `${baseUrl}comments`;

var aggregate_posts = function () {

  async.map([postsEndpoint, commentsEndpoint, userEndpoint], get_by_url, function(err, res){
    if (err){
      console.log(err);
    }

  const posts = res[0];
  const comments = res[1];
  const users = res[2];

  build_post(posts, comments, users);
  console.log('And Done');

  });
}

var build_post = function(posts, comments, users) {
  const comments_by_post_id = groupBy(comments, 'postId');
  const users_by_id = keyBy(users, 'id');

  var finalPosts = {};
  forEach(posts, function(post){
    post.comments = comments_by_post_id[post.id];
    post.user = users_by_id[post.userId];
    delete post.userId;
    finalPosts[post.id] = post;
  });
}

var get_by_url = function (url) {
   request
    .get(url, function (err, data) {
      if (err) {
        console.err(err);
        return {};
      }
      return JSON.parse(data.body);
    });
}

var legacy_funct = function () {
  request
    .get(postsEndpoint, function (err, postData) {
      if (err) {
        console.err(err);
        return;
      }

      const parsedPosts = JSON.parse(postData.body);
      const posts = keyBy(parsedPosts, 'id');

      request.get(commentsEndpoint, function (err, commentData) {
        if (err) {
          console.err(err);
          return;
        }

        const parsedComments = JSON.parse(commentData.body);
        const groupedComments = groupBy(parsedComments, 'postId');

        Object
          .keys(groupedComments)
          .forEach(key => {
            posts[key].comments = groupedComments[key];
          });

        request.get(userEndpoint, function (err, userData) {
          if (err) {
            console.err(err);
            return;
          }

          const parsedUsers = JSON.parse(userData.body);
          const users = keyBy(parsedUsers, 'id');

          const finalPosts = Object
            .keys(posts)
            .map(key => {
              const post = posts[key];
              post.user = users[post.userId];
              delete post.userId;
              return post;
            });

          console.log('Done');
          console.log(finalPosts[0]);
        });
      });
    });
}

//legacy_funct();
aggregate_posts();