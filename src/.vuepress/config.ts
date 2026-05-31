import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import theme from "./theme.js";

const Dir = ($path: string) => path.resolve(getDirname(import.meta.url), $path);

export default defineUserConfig({
  base: "/",
  port: 8080,

  locales: {
    "/": {
      lang: "en-US",
      title: "Mango's Discord Bot Documentation",
      description: "Mango's Discord Bot Documentation",
    },
    "/zh-tw/": {
      lang: "zh-TW",
      title: "芒果的 Discord 機器人文件",
      description: "芒果的 Discord 機器人文件",
    },
    // "/zh-cn/": {
    //   lang: "zh-CN",
    //   title: "芒果的 Discord 機器人文件",
    //   description: "芒果的 Discord 機器人文件",
    // },
  },

  theme,

  head: [
    ["meta", { property: "og:image", content: "/logo.png" }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "128" }],
    ["meta", { property: "og:image:height", content: "128" }],
    ["meta", { property: "theme-color", content: "#56c392" }],
  ],

  clientConfigFile: Dir("./client.ts"),

  alias: {
    "@components": Dir("./components"),
    "@private-components": Dir("./components/private"),
    "@theme-hope": "vuepress-theme-hope",
  },

  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  },
});
