<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>
<style>
.ql-snow .ql-toolbar button::before {
  font-family: "ql-icons" !important;
}
</style>
