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
        {{widget.name}} <span class="badge badge-info m-1">horizontal-5-day</span>, ID: {{widget.id}}, {{widget.country}}
      </span>
      <div v-if="showDeteils" class="card-body small" 
        style="display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        justify-content: flex-start;
        align-items: flex-start;"
        >
        <div v-for="dayList in widget.city.list" :key="'' + widget.id + dayList.date"
          style="display: flex;
                justify-content: flex-start;
                align-items: flex-start;"
        >
          <div 
            v-for="hourList in dayList.list" 
            :key="'' + widget.id + dayList.date + hourList.date" 
            style="width: 80px; text-align: center;" 
            class="card-text"
          >
            <div>{{ hourList.date | localTime }}</div>
            <div> 
              <img :src="cloudImage(hourList)">
            </div>
            <div>{{ hourList.wind.speed }} m/s</div>
            <div>clouds {{ hourList.clouds.all }}%</div>
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