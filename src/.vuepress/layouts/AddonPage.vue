<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
</script>

<template>
  <Layout>
    <template #sidebarTop>
      <ModInfo />
    </template>
    <template #contentBefore>
      <ArticleSource />
    </template>
  </Layout>
</template>
