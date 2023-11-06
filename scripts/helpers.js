// FILE: scripts/helpers.js
const totalcount = hexo.extend.helper.get('totalcount');

hexo.extend.helper.register('totalcount', function(site) {
  const newFunc = totalcount.bind(this);
  return newFunc(Object.assign({}, site, { posts: site.all_posts }));
});