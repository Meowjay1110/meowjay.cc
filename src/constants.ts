import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBilibili from "@/assets/icons/IconBilibili.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/meowjay1110",
    linkTitle: `Github 上的 Meowjay`,
    icon: IconGitHub,
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/1063974427",
    linkTitle: `Bilibili 上的 Meowjay`,
    icon: IconBilibili,
  },
  {
    name: "Mail",
    href: "mailto:contact@meowjay.cc",
    linkTitle: `通过邮件联系 Meowjay`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `在邮件中分享这篇文章`,
    icon: IconMail,
  }
] as const;
