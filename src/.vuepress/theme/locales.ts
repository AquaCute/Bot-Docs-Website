import { copyright } from "vuepress-theme-hope";
import { enusNavbar, zhtwNavbar, zhcnNavbar } from "./navbar/index.js";
import { zhTWLocale } from "./patch/i18n/zh_tw.js";
import { enusSidebar, zhtwSidebar, zhcnSidebar } from "./sidebar/index.js";

export default {
  "/": {
    navbar: enusNavbar,
    sidebar: enusSidebar,

    author: "MangoJellyPudding",

    blog: {
      description: "An interested KubeJS developer.",
    },

    copyright: `Copyright © ${new Date().getUTCFullYear()} MangoJellyPudding`,
  },
  "/zh-tw/": {
    navbar: zhtwNavbar,
    sidebar: zhtwSidebar,

    author: "芒果凍布丁",

    ...zhTWLocale,
    navbarLocales: {
      langName: "正體中文",
    },

    copyright: `Copyright © 2025-${new Date().getUTCFullYear()} 芒果凍布丁`,
  },
  "/zh-cn/": {
    navbar: zhcnNavbar,
    sidebar: zhcnSidebar,

    author: "芒果凍布丁",

    blog: {
      description: "一个兴趣使然的 KubeJS 开发者",
    },
    copyright: `Copyright © 2025-${new Date().getUTCFullYear()} 芒果凍布丁`,
  },
};
