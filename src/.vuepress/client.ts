import { defineClientConfig } from "vuepress/client";
import type { App, Component } from "vue";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";

import CustomComponents from "./components/index.js";
import layouts from "./layouts/index.js";

export default defineClientConfig({
  enhance: ({ app }: { app: App }) => {
    const addComponent = ([name, component]: [string, Component]) =>
      app.component(name, component);

    Object.entries(CustomComponents).forEach(addComponent);
  },
  setup() {
    setupRunningTimeFooter(
      new Date("2025-01-18"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh-tw/": "已運行 :day 天 :hour 小時 :minute 分鐘 :second 秒",
        "/zh-cn/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true
    );
  },
  layouts,
});
