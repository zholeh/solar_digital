<template>
  <div class="form-group">
    <draggable element="div" v-model="list" :options="dragOptions">

      <div
        v-for="widget in list"
        :wd.prop="widget"
        :key.prop="widget.id + widget.widgetOption.option"
        :id="widget.id"
      >
        <div
          id="CityButtonDell01"
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
          <div style="height: 100%;
            width: 10px;
            background-color: brown;"></div>
          <span></span>
          <div
            v-on:click="delCity(widget.id)"
            style="font-size: x-large; margin: auto 5px auto 5px; cursor: pointer;"
          >✖</div>
          <span style="margin: auto 5px auto 5px;">
            <span class="badge badge-info m-1">{{widget.widgetOption.option}}</span>
            <img
              :src="`http://openweathermap.org/images/flags/${widget.country.toLowerCase()}.png`"
            >
            {{widget.name}}, ID: {{widget.id}}, {{widget.country}}
          </span>
        </div>
      </div>
    </draggable>
  </div>
</template>

<style>
#WidgetContainer:hover #CityButtonDell01 {
  opacity: 1 !important;
  font-size: x-large !important;
}
</style>

<script>
import draggable from 'vuedraggable'

export default {

  name: "SelectedCities",
  components: {
    draggable,
  },
  data: function() {
    return {
      editable: true,
      isDragging: false,
    }
  },
  methods: {
    delCity: function(id) {
      this.$store.dispatch("delWeatherWidget", id);
    }
  },    
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    list: {
      get() {
          return this.$store.state.widgetList;
      },
      set(value) {
          this.$store.commit('updateWeathers', value);
      }
    }
  }
};
</script>