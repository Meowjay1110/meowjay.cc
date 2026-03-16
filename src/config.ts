export const SITE = {
  website: "https://meowjay.cc/", // replace this with your deployed domain
  author: "Meowjay Zhou",
  profile: "https://meowjay.cc/",
  desc: "一个奇怪的小家伙在这赛博世界的一方自留地。",
  title: "Meowjay的小窝",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 30 * 60 * 1000, // 30 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: false,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
