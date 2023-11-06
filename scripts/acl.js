// FILE: scripts/acl.js

hexo.config.hide_posts.acl_function_per_post = function (post, generatorName) {
    // 在 front-matter 中标记为 `acl: to-ame` 的文章不会出现
    if (post.acl === 'to-ame') {
      return false;
    }
  
    // 标记为 `hidden: true` 的文章在主页隐藏
    if (post.hidden) {
      return generatorName !== 'index';
    }
  
    // 其他文章正常显示
    return true;
  }