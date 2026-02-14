<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>
<style>
/* บังคับให้ Quill ใช้ icon font ของตัวเอง */
.ql-snow .ql-toolbar button::before {
  font-family: "ql-icons" !important;
}
</style>
