"use client";

import { useLanguage } from "../../i18n/language-provider";

function BlogHeading() {
  const { t } = useLanguage();

  return (
    <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
      {t.blog.allBlogs}
    </span>
  );
};

export default BlogHeading;
