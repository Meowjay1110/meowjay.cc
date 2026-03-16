import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import type { APIContext } from "astro";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";

export async function GET(context: APIContext) {
  let baseUrl = context.site?.href || "https://example.com";
  if (baseUrl.at(-1) === "/") baseUrl = baseUrl.slice(0, -1);

  const container = await AstroContainer.create();

  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  const feedItems: RSSFeedItem[] = [];
  for (const post of sortedPosts) {
    // Get the `<Content/>` component for the current post.
    const { Content } = await render(post);
    // Use the Astro container to render the content to a string.
    const rawContent = await container.renderToString(Content);
    // Process and sanitize the raw content:
    // - Removes `<!DOCTYPE html>` preamble
    // - Makes link `href` and image `src` attributes absolute instead of relative
    // - Strips any `<script>` and `<style>` tags
    // Thanks @Princesseuh — https://github.com/Princesseuh/erika.florist/blob/1827288c14681490fa301400bfd815acb53463e9/src/middleware.ts
    const content = await transform(
      rawContent.replace(/^<!DOCTYPE html>/, ""),
      [
        async node => {
          await walk(node, node => {
            if (node.name === "a" && node.attributes.href?.startsWith("/")) {
              node.attributes.href = baseUrl + node.attributes.href;
            }
            if (node.name === "img" && node.attributes.src?.startsWith("/")) {
              node.attributes.src = baseUrl + node.attributes.src;
            }
            if (
              node.name === "div" &&
              node.attributes.class?.includes("markdown-alert")
            ) {
              node.name = "blockquote";
              delete node.attributes.class;
            }
            if (
              node.name === "p" &&
              node.attributes.class?.includes("markdown-alert-title")
            ) {
              node.children = node.children?.filter(
                (child: any) => child.name !== "svg"
              );
              delete node.attributes.class;
            }
          });
          return node;
        },
        sanitize({ dropElements: ["script", "style"] }),
      ]
    );
    feedItems.push({
      ...post.data,
      link: getPath(post.id, post.filePath),
      pubDate: post.data.pubDatetime,
      content,
    });
  }

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: baseUrl,
    items: feedItems,
  });
}
