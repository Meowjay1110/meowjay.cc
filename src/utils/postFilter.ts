import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return (
    import.meta.env.DEV ||
    import.meta.env.ENVIRONMENT === "preview" ||
    (!data.draft && isPublishTimePassed)
  );
};

export default postFilter;
