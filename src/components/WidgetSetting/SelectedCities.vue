<template>
  <div class="form-group">
    <div  
      v-for="widget in $store.state.widgetList" 
      :key="widget.id + widget.widgetOption.option" 
      :id="widget.id"
    >
      <div
        class="CityButtonDell01" 
        id="CityButtonDell01" 
        v-on:click="delCity(widget.id)"
        style="
          display: flex;
          height: 50px;
          width: 100%;
          min-width: 375px;
          background-color: #fff;
          background-clip: border-box;
          border: 1px solid rgba(0, 0, 0, 0.125);
          border-radius: 0.25rem;
        "
        >
        <div
          style="height: 100%;
          width: 10px;
          background-color: brown;"
        >
        </div>
        <span></span>
        <div style="font-size: x-large; margin: auto 5px auto 5px; cursor: pointer;">✖</div>
        <span
          style="margin: auto 5px auto 5px;">
          <span class="badge badge-info m-1">{{widget.widgetOption.option}}</span>
          <img 
            :src="`http://openweathermap.org/images/flags/${widget.country.toLowerCase()}.png`"
          >
          {{widget.name}}, ID: {{widget.id}}, {{widget.country}}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
#WidgetContainer:hover #CityButtonDell01 {
  opacity: 1 !important;
  font-size: x-large !important;
}
</style>

<script>

export default {
  name: "SelectedCities",
  methods: {
    delCity: function(id) {
      this.$store.dispatch("delWeatherWidget", id);
    }
  }
};
</script>