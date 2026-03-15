export interface LocalFontSource {
  name: string;
}

export interface RemoteFontSource {
  url: string;
  format?: string;
  tech?: string;
}

export interface FontFaceMeta {
  priority?: number;
  subset?: string;
}

export interface FontFaceData {
  src: (LocalFontSource | RemoteFontSource)[];
  style?: string;
  weight?: string | number;
  unicodeRange?: string[];
  display?: "optional" | "auto" | "block" | "swap" | "fallback";
  stretch?: string;
  featureSettings?: string;
  variationSettings?: string;
  meta?: FontFaceMeta;
}

/**
 * 从 ZeoSeven 字体 API 的 CSS 文件中解析字体列表并转换为 FontFaceData 格式
 * 严格对齐 Astro 官方提供程序的返回结构
 */
export async function getZeoSevenFontFaceData(cssUrl: string): Promise<{ fonts: FontFaceData[] }> {
  console.log(`[ZeoSeven] Loading CSS from: ${cssUrl}`);
  try {
    const response = await fetch(cssUrl);

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    const cssText = await response.text();
    // 基础路径，用于将相对 URL 转为绝对路径
    const baseUrl = new URL(".", cssUrl).toString();

    const fontFaceRules: FontFaceData[] = [];
    const fontFaceRegex = /@font-face\s*\{([^}]*)\}/gi;
    let match;

    while ((match = fontFaceRegex.exec(cssText)) !== null) {
      const blockContent = match[1];
      
      // 提取属性值（考虑命名规范，不区分大小写）
      const extract = (prop: string) => {
        const regex = new RegExp(`${prop}:\\s*([^;\\}]+)`, "i");
        const m = blockContent.match(regex);
        return m ? m[1].trim() : undefined;
      };

      const rawSrc = extract("src");
      if (!rawSrc) continue;

      const sources: (LocalFontSource | RemoteFontSource)[] = [];
      const parts = rawSrc.split(/,(?![^(]*\))/);
      
      for (const part of parts) {
        const p = part.trim();
        if (!p) continue;

        // 匹配 url(...)
        const urlMatch = p.match(/url\(["']?([^"']+)["']?\)/i);
        if (urlMatch) {
          const urlStr = urlMatch[1];
          const absoluteUrl = new URL(urlStr, baseUrl).toString();
          
          // 匹配 format(...)
          const formatMatch = p.match(/format\(["']?([^"']+)["']?\)/i);
          
          sources.push({
            url: absoluteUrl,
            format: formatMatch ? formatMatch[1] : "woff2" // 默认 woff2，也是 ZeoSeven 主要使用的格式
          });
          continue;
        }

        // 匹配 local(...)
        const localMatch = p.match(/local\(["']?([^"']+)["']?\)/i);
        if (localMatch) {
          // 在远程切片字体加载中，local 可能导致 Astro transformer 路径计算逻辑异常。
          continue;
        }
      }

      // 如果没有解析出有效的 URL 资源，则跳过此规则
      if (sources.length === 0) continue;

      // 构造对齐官方格式的对象
      const fontWeight = extract("font-weight") || "400";
      const unicodeRangeRaw = extract("unicode-range");
      
      const fontData: FontFaceData = {
        style: extract("font-style") || "normal",
        weight: isNaN(Number(fontWeight)) ? fontWeight : Number(fontWeight),
        unicodeRange: unicodeRangeRaw ? unicodeRangeRaw.split(",").map(r => r.trim()) : undefined,
        src: sources
      };

      // 可选属性（如果存在则添加）
      const display = extract("font-display");
      if (display) fontData.display = display as any;
      
      const stretch = extract("font-stretch");
      if (stretch) fontData.stretch = stretch;

      fontFaceRules.push(fontData);
    }

    console.log(`[ZeoSeven] Successfully parsed ${fontFaceRules.length} font-face rules.`);
    return { fonts: fontFaceRules };
  } catch (error) {
    console.error("[ZeoSeven] Error during parsing:", error);
    return { fonts: [] };
  }
}

/**
 * 同时从多个 ZeoSeven 字体 API 的 CSS 链接中获取并合并字体数据
 */
export async function getZeoSevenFontFaceDataList(cssUrls: string[]): Promise<{ fonts: FontFaceData[] }> {
  console.log(`[ZeoSeven] Loading multiple CSS files: ${cssUrls.length} targets`);
  const allFonts: FontFaceData[] = [];
  
  // 使用 Promise.all 并行获取
  const results = await Promise.all(cssUrls.map(url => getZeoSevenFontFaceData(url)));
  
  for (const result of results) {
    allFonts.push(...result.fonts);
  }
  
  console.log(`[ZeoSeven] Total merged font-face rules: ${allFonts.length}`);
  return { fonts: allFonts };
}
