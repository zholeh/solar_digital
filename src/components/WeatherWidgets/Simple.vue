<template>
  <div style="display: flex;" class="mb-1 card">
    <span style="font-size: x-large;
                padding: .5rem;
                background: linear-gradient(to top, #19191933, #4b4b4b80);"
    > 
      <div class="btn-group-vertical btn-option-widget">
        <span @click="btnUpdateClick" class="btn btn-outline-primary ">🗘</span>
        <span @click="btnShowDeteilsClick" class="btn btn-outline-primary btn-option-widget">
          {{ cond.context }}
        </span>
      </div>
      <img :src="`http://openweathermap.org/images/flags/${widget.country.toLowerCase()}.png`">
      {{widget.name}} <span class="badge badge-info m-1">simple</span>, ID: {{widget.id}}, {{widget.country}}
    </span>
    <div v-if="showDeteils" style="padding-left: 0.5rem;"> 
      <p class="m-0">
        <span class="badge badge-info">{{ widget.city.main.temp | roundToInt }}°С</span>
        Temperature from {{ widget.city.main.temp_min | roundToInt }} to {{ widget.city.main.temp_max | roundToInt }}°С, wind {{ widget.city.wind.speed }} m/s, clouds {{ widget.city.clouds.all }}%, {{ widget.city.main.pressure }} hpa
      </p>
      <p class="m-0">
        <a :href="hrefOpenWeatheZoom">Geo coordsx [{{ widget.city.coord.lat }}, {{ widget.city.coord.lon }}]</a>
      </p>
    </div> 
  </div>
</template>

<style>
.btn-option-widget {
  margin: 0 5px 0 0;
  padding-top: 0;
  padding-bottom: 0;
}
.btn-option-widget > span {
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: xx-small;
}
</style>


<script>
import { updateWidget } from './API'

export default {
  name: "Simple",
  props: {
    widget: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      cond: {
        wrap: true,
        context: "⮟"
      }
    };
  },
  filters: {
    roundToInt: function(value) {
      return Math.round(value - 273.15);
    }
  },
  computed: {
    cloudImage: function() {
      return this.widget.city.weather.length > 0
        ? `http://openweathermap.org/img/w/${this.widget.city.weather[0].icon.toLowerCase()}.png`
        : "";
    },
    hrefOpenWeatheZoom: function() {
      return `https://openweathermap.org/weathermap?zoom=12&lat=${
        this.widget.city.coord.lat
      }&lon=${this.widget.city.coord.lon}`;
    },
    showDeteils: function() {
      return (
        this.cond.wrap &&
        this.widget.city !== undefined &&
        this.widget.widgetOption.filled === true
      );
    }
  },
  methods: {
    btnShowDeteilsClick: function() {
      this.cond.wrap = !this.cond.wrap;
      this.cond.context = this.cond.wrap ? "⮟" : "⮝";
    },
    btnUpdateClick: function() {
      updateWidget(this.widget, this.$store);
    }
  }
};
</script>