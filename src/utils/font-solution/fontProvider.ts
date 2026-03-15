import type { FontProvider } from "astro";
import { getZeoSevenFontFaceDataList } from "./utils";

export const fontProvider = (): FontProvider => {
  return {
    name: "ZeoSeven",
    resolveFont: async () => {
      const urls = [
        "https://fontsapi.zeoseven.com/993/italic/result.css",
        "https://fontsapi.zeoseven.com/993/light/result.css",
        "https://fontsapi.zeoseven.com/993/light-italic/result.css",
        "https://fontsapi.zeoseven.com/993/medium/result.css",
        "https://fontsapi.zeoseven.com/993/medium-italic/result.css",
        "https://fontsapi.zeoseven.com/993/main/result.css",
      ];
      const fonts = await getZeoSevenFontFaceDataList(urls);
      return fonts;
    },
  };
};