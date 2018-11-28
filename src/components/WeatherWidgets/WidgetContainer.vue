<template>
  <div v-if="$store.state.widgetList.length > 0">
    <div  
      v-for="widget in $store.state.widgetList" 
      :key="widget.id + widget.widgetOption.option" 
      class="wether-widgets"
    >
      <div id="WidgetContainer">
        <SimpleWidget v-if="isDaily(widget)" v-bind:widget="widget"></SimpleWidget>
        <Simple5day v-else-if="is5Day(widget)" v-bind:widget="widget"></Simple5day>
        <Horizontal5day v-else-if="is5DayHorizontal(widget)" v-bind:widget="widget"></Horizontal5day>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleWidget from "./Simple.vue";
import Simple5day from "./Simple5day.vue";
import Horizontal5day from "./Horizontal5day.vue";
import { updateWeatherWidgets } from "../../API/weatherAPI";

export default {
  name: "WidgetContainer",
  components: {
    SimpleWidget,
    Simple5day,
    Horizontal5day,
  },
  methods: {
    evenSlotClick: function() {
      this.evenSlotClick();
    },
    isDaily: function(widget) {
      return (widget.widgetOption.option==='simple-daily')
    },
    is5Day: function(widget) {
      return (widget.widgetOption.option==='simple-5-day')
    },
    is5DayHorizontal: function(widget) {
      return (widget.widgetOption.option==='horizontal-5-day')
    }
  },
  beforeMount: async function() {
    const curDate = Date.now();
    const widgetList = this.$store.state.widgetList.reduce((acc, el) => {
      const lastUpdate = curDate - el.widgetOption.lastUpdate;
      if (lastUpdate < 0 || lastUpdate > 900000) acc.push(el);
      return acc;
    }, []);

    updateWeatherWidgets(widgetList, this.$store);
  }
};
</script>

<style scoped>
  #WidgetContainer {
    position: relative;
  }
</style>
