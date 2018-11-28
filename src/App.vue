<template>
  <div id="app">
    <div class="header main-logo" id="header">
      <img style="height: 80px;" alt="Vue logo" src="./assets/logo_dark.svg">
      <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/widgetSettings">Settings</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
.main-logo#header {
  text-align: center;
  height: 104px;
  min-width: 220px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: left; */
  color: #2c3e50;
  margin: 20px;
}
</style>

<script>
import { initApp } from "./API/weatherAPI";
export default {
  name: "HelloWorld",
  methods: {
    beforUnload: function() {
      const widgetListLS = this.$store.state.widgetList.map(el => {
        return {
          id: el.id,
          name: el.name,
          country: el.country,
          widgetOption: {
            option: el.widgetOption.option,
            lastUpdate: 0,
          }
        }
      });
      localStorage.setItem("widgetListLS", JSON.stringify(widgetListLS));
    }
  },
  created() {
    window.addEventListener("beforeunload", this.beforUnload);
    initApp(this.$store);
  },
  mounted() {}
};
</script>
