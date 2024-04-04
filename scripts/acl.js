// FILE: scripts/acl.js
const isGeneratorAllowed = require('hexo-hide-posts/lib/isGeneratorAllowed');

// Advanced usage: ACL (Access Control List) per post.
// The most powerful way to control which posts should be included in which generator.
// Return `true` to allow and `false` to block access. It's all up to you.
hexo.config.hide_posts.acl_function_per_post = function (post, generatorName) {
  // Mark the post with front-matter `acl: xxx` so we can recognize it here.
  // For the full definition of `post` and all available properties,
  // see: https://github.com/hexojs/hexo/blob/master/lib/models/post.js
  // console.log(post, post.slug, post.acl, post.tags, post.categories)

  // Posts marked as "noindex"
  if (post.acl === 'noindex') {
    return generatorName !== 'index';
  }


  // 标记为 `hidden: true` 的文章只能通过网址访问
  if (post.hidden) {
    return false;
  }

  // 其他文章正常显示
    return true;
  }