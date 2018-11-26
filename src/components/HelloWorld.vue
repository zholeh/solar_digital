<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="form-group">
      <WidgetContainer></WidgetContainer>
      <div v-if="$store.state.weatherWidgets.length <= 0" style="text-align: center;">
        <router-link to="/widgetSettings/1" class="btn btn-primary btn-lg">Select city</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetContainer from "./WeatherWidgets/WidgetContainer.vue";

export default {
  name: "HelloWorld",
  components: {
    WidgetContainer
  },
  props: {
    msg: String
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
