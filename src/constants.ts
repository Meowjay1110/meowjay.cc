import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBilibili from "@/assets/icons/IconBilibili.svg";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

interface Copyright {
  name: string;
  href: string;
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

export const DEFAULT_COPYRIGHT: Copyright = {
  name: "CC BY-NC-ND 4.0",
  href: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
};
