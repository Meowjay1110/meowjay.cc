---
title: 「部落格文章（与他们的产地）」：我怎么写博客文章
pubDatetime: 2026-10-27T16:39:16+08:00
description: Meowjay 正在介绍自己的小窝。
tags:
  - Blogblog同乐会
  - 博客
draft: true
featured: false
---

> [!TIP] BlogBlog 同乐会！
> 这是我在「[BlogBlog 同乐会 - 2026 年 11 月](https://blogblog.club/party/)」的投稿文章。本月主題是「[部落格文章（与他们的产地）](https://blog.giveanornot.com/blogblogparty-blog-posts/)」，由 [資工小廢物 - JN](https://blog.giveanornot.com/) 主持。如果你有自己的博客，欢迎一起来参加！

## Table of Contents

## 写在前面

上次参加同乐会居然已经是 7 月的事情了呢。之后就因为各种各样的原因没有参加了。想想还是有点可惜，尤其是 [8 月的主题](https://blog.ikukaroom.com/ichigo-ichie/) 感觉很对我的胃口。或许之后会找个机会补上。

另外容我小小的吐槽一下，怎么好像同乐会的主题名越来越长了啊喂！或许你已经发现了，[专门为同乐会而写的文章](/tags/blogblog同乐会/) 标题都会包含当期的主题名，_~~（[日本食品包装上的「製造所固有記号」有什么用？](/posts/factory-unique-code/) 除外，这篇是活动之前就写好的）~~_，还要再加上些别的才完成。这个月的主题名就直接去到了 13 个字符，加上我自己的内容，渲染出来光标题就占了两行ww

所以接下来还没定主题名的主持人能不能取稍微短一些的主题名，_~~不然我会很困扰XD~~_

## 写博客的心路历程

### “因为很酷啊”

我大概是 2023 年开始接触到博客的。我还记得当时我花了好几个晚上，用 Hexo 配上当时很多人用的 Butterfly 主题搭了自己的第一个博客，放在 GitHub Pages 上[^1]。至于为什么要有博客，_~~因为很酷啊~~_

2024 年，苦于 GitHub Pages 的访问速度实在算不上快，我购买了第一个属于自己的域名 `meowjay.cc`，也就是现在这个站的域名，并且把网站放到了 Vercel。你现在还可以在 Wayback Machine 看到当时的样子[^2]。~~_虽然说买了域名之后也没有写文章_~~

这之后就没怎么碰博客了。

### 重新开始

直到今年年初，我看到 [Wiwi](https://wiwi.blog) 发起的同乐会，才重燃了写博客的热情。这才有了现在这个站。虽然说还是有些免不了三分钟热度，但一路下来也写了不少文章。

## 写博客用到的

- SSG[^3]
  - [Astro](https://astro.build)，配上稍微改过的 AstroPaper 主题。
- 编辑器
  - Obsidian，配上 [Vault CMS](https://vaultcms.org/)，基本上写文章可以在里边搞定。
  - Visual Studio Code
- 版本控制
  - Git[^5]
- 构建
  - GitHub Actions
- 网站托管
  - Cloudflare Workers[^4]
- 还有一些别的

## Footnote

[^1]: 遗憾的是，Wayback Machine 没有收录这个站，所以已经成失传媒体了~

[^2]: https://web.archive.org/web/0/https://meowjay.cc/

[^3]: Static site generator，静态网站生成器。

[^4]: 我看有些人说要用 Pages，其实不然，现在 Workers 也可以托管静态站了，大概步骤可以看[这里](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/#if-you-have-a-static-site)。

[^5]: [你應該用 git](https://wiwi.blog/blog/you-should-use-git)
