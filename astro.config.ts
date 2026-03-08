import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "LXGW Bright",
        cssVariable: "--font-lxgw-bright",
        fallbacks: ["serif"],
        provider: fontProviders.local(),
        options: {
          variants: [
            {
              style: "normal",
              weight: 300,
              src: ["./src/assets/fonts/LXGWBright-Light.woff2"],
            },
            {
              style: "italic",
              weight: 300,
              src: ["./src/assets/fonts/LXGWBright-LightItalic.woff2"],
            },
            {
              style: "normal",
              weight: 500,
              src: ["./src/assets/fonts/LXGWBright-Medium.woff2"],
            },
            {
              style: "italic",
              weight: 500,
              src: ["./src/assets/fonts/LXGWBright-MediumItalic.woff2"],
            },
            {
              style: "normal",
              weight: 700,
              src: ["./src/assets/fonts/LXGWBright-Regular.woff2"],
            },
            {
              style: "italic",
              weight: 700,
              src: ["./src/assets/fonts/LXGWBright-Italic.woff2"],
            }
          ]
        },
      },
    ],
  },
});
