import fs from "node:fs";
import path from "node:path";

// 辅助函数：从本地 result.css 解析字体变体
export function getFontVariants(dir: string) {
  const cssPath = path.join(
    process.cwd(),
    `src/assets/fonts/${dir}/result.css`
  );
  if (!fs.existsSync(cssPath)) return [];

  const cssText = fs.readFileSync(cssPath, "utf-8");
  const fontFaceRegex = /@font-face\s*\{([^}]*)\}/gi;
  const variants = [];
  let match;

  while ((match = fontFaceRegex.exec(cssText)) !== null) {
    const block = match[1];
    const extract = (prop: string) => {
      const m = block.match(new RegExp(`${prop}:\\s*([^;\\}]+)`, "i"));
      return m ? m[1].trim() : undefined;
    };

    const fontWeight = extract("font-weight") || "400";
    const style = extract("font-style") || "normal";
    const unicodeRangeRaw = extract("unicode-range");
    const srcMatch = block.match(/url\(["']?([^"']+)["']?\)/i);

    if (srcMatch) {
      variants.push({
        weight: isNaN(Number(fontWeight)) ? fontWeight : Number(fontWeight),
        style: style,
        src: [`./src/assets/fonts/${dir}/${srcMatch[1]}`],
        display: "swap" as const,
        unicodeRange: unicodeRangeRaw
          ? unicodeRangeRaw.split(",").map(r => r.trim())
          : undefined,
      });
    }
  }
  return variants;
}
