<template>
  <div>
    <div class="mb-1 card">
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
        {{widget.name}} <span class="badge badge-info m-1">simple-5-day</span>, ID: {{widget.id}}, {{widget.country}}
      </span>
    
      <div v-if="showDeteils">
        <div v-for="dayList in widget.city.list" 
          :key="dayList.date.getTime()" 
          style="display: flex;" class=""
        >
          <div class="card-body small">
            <div 
            class="card-title"
            style="margin-bottom: 0.75rem;
                  background: darkkhaki;
                  font-size: x-large;
                  padding: 0.5rem;
                  background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(50, 50, 50, .3));"
            >
              {{ dayList.date | localDate }}
            </div>
            
            <div 
              v-for="hourList in dayList.list" 
              :key="'' + widget.city.id + dayList.date.getTime() + hourList.date.getTime()" 
              style="display: flex; padding-left: .5rem;" 
              class="card-text"
            >
              <div>{{ hourList.date | localTime }}</div>
              <div> 
                <img :src="cloudImage(hourList)">
              </div>
              <div>
                <p class="m-0">
                  <span class="badge badge-info">
                    {{ hourList.main.temp | roundToInt }}°С
                  </span>
                  {{ weatherDescription(hourList) }}
                </p>
                <p>{{ hourList.wind.speed }} m/s, clouds {{ hourList.clouds.all }}%, {{ hourList.main.pressure }} hpa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateWidget } from './API'

export default {
  name: "Simple5day",
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
    },
    localDate: function(date) {
      return new Intl.DateTimeFormat().format(date);
    },
    localTime: function(date) {
      return new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    }
  },
  computed: {
    showDeteils: function() {
      return (
        this.cond.wrap &&
        this.widget.city !== undefined &&
        this.widget.widgetOption.filled === true
      );
    }
  },
  methods: {
    cloudImage: function(hourList) {
      return hourList.weather.length > 0
        ? `http://openweathermap.org/img/w/${hourList.weather[0].icon.toLowerCase()}.png`
        : "";
    },
    weatherDescription: function(hourList) {
      return hourList.weather.length > 0 ? hourList.weather[0].description : "";
    },
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