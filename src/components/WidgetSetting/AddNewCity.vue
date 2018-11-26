<template>
  <form style= "margin-top: 10px;"
    v-on:submit.prevent>
    <div class="form-group city-name--input-groupe">
      <label for="inputCityName">Find city by name</label>
      <input 
        type="text"
        class="form-control city-name--input"
        id="inputCityName" 
        placeholder="Typing city name" 
        @keyup.enter="inputChange(true)"
        @input="inputChange(false)"
        v-model="cityName"
      >
      <div class="city-name--clear" @click="handleClear">✖</div>
    </div>
    <p>or</p>
    <div class="form-group city-name--input-groupe">
      <button class="btn btn-primary w-100" @click="findByGeo">Find city by geo</button>
    </div>
    <div v-if="!fetchError">
      <div class="form-group">
        <div  
          v-for="city in citiesList" 
          :key="city.id" 
          :id="city.id"
        >
          <b-dropdown variant="outline-success" size="sm" id="ddown1" text="Add widget" class="m-md-2">
            <b-dropdown-item @click="add(city, 'simple-daily')">Simple daily widet </b-dropdown-item>
            <b-dropdown-item @click="add(city, 'simple-5-day')">Simple 5 day widet </b-dropdown-item>
            <b-dropdown-item @click="add(city, 'horizontal-5-day')">Horizontal 5 day widet </b-dropdown-item>
          </b-dropdown>
          <SimpleWidget v-bind:city="city"></SimpleWidget> 
        </div>
      </div>
    </div>
    <div v-else> 
      <p class="text-danger">Internal server error.</p>
    </div>
  </form>
</template>

<style>
.city-name--input-groupe {
  position: relative;
}

.city-name--input#inputCityName {
  padding-left: 24px;
}

.city-name--clear {
  position: absolute;
  user-select: none;
  cursor: pointer;
  top: calc(50% + 16px);
  transform: translate(0, -50%);
  font-size: x-small;
  left: 4px;
  opacity: 0;
  transition: opacity 0.25s ease-in, font-size 0.25s ease-in;
}

.city-name--input-groupe:hover .city-name--clear {
  opacity: 1;
  font-size: x-large;
}
</style>

<script>
import debounce from "lodash.debounce";
import { getCities as getCitiesAPI, findByGeo as findByGeoAPI } from "./widgetAPI";
import SimpleWidget from "../WeatherWidgets/Simple.vue";

export default {
  name: "AddNewCity",
  components: {
    SimpleWidget
  },
  data: function() {
    return {
      fetchError: false,
      cityName: "",
      citiesList: []
    };
  },
  methods: {
    handleClear: function() {
      this.cityName = "";
      this.citiesList = [];
      this.fetchError = false;
    },
    inputChange: function(forced = false) {
      if (forced) this.getCities();
      else this.debounceInput();
    },
    debounceInput: debounce(function() {
      this.getCities();
    }, 500),
    getCities: async function() {
      const resp = await getCitiesAPI(this.cityName);

      this.citiesList = resp.citiesList;
      this.fetchError = resp.fetchError;
    },
    add: function(city, option) {
      const newState = Object.assign({}, city);
      newState.widgetOption = {
        option: option,
        lastUpdate: 0
      };
      this.$store.dispatch("addWeatherWidget", newState);
    },

    findByGeo: async function() {

      function callbackResult(resp) {
        this.citiesList = resp.citiesList;
        this.fetchError = resp.fetchError;
      }
      findByGeoAPI(callbackResult.bind(this));
    }
  }
};
</script>