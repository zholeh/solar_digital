import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weatherWidgets: [],
    widgetList: []
  },
  mutations: {
    addWeatherWidget(state, city) {
      state.weatherWidgets.push(city);
    },
    delWeatherWidget(state, index) {
      state.weatherWidgets.splice(index, 1);
    },
    updateWeatherWidget(state, opt) {
      state.weatherWidgets.splice(opt.index, 1, opt.city);
    },
    addWidgetList(state, widget) {
      state.widgetList.push(widget);
    },
    delWidgetList(state, index) {
      state.widgetList.splice(index, 1);
    },
    updateWeatherList(state, opt) {
      state.widgetList.splice(opt.index, 1, opt.city);
    }
  },
  actions: {
    addWeatherWidget({ state, commit }, city) {
      let index = state.weatherWidgets.findIndex(el => (el.id === city.id && el.widgetOption.option === city.widgetOption.option));
      if (index < 0) commit("addWeatherWidget", city);
      const widget = {
        name: city.name,
        id: city.id,
        country: city.sys.country,
        widgetOption: city.widgetOption,
      } 
      index = state.widgetList.findIndex(el => (el.id === city.id && el.widgetOption.option === city.widgetOption.option));
      if (index < 0) commit("addWidgetList", widget);
    },

    delWeatherWidget({ state, commit }, id) {
      let index = state.weatherWidgets.findIndex(el => el.id === id);
      if (index >= 0) commit("delWeatherWidget", index);
      index = state.widgetList.findIndex(el => el.id === id);
      if (index >= 0) commit("delWidgetList", index);
    },

    updateWeatherWidget({ state, commit }, city) {

      let widget = Object.assign({}, city);
      if (widget.widgetOption.filled !== undefined) widget.widgetOption.lastUpdate = Date.now();
      let index = state.weatherWidgets.findIndex(el => (el.id === widget.id && el.widgetOption.option === widget.widgetOption.option));
      let newState = {
        index: index,
        city: widget
      }
      if (index >= 0) commit("updateWeatherWidget", newState);
      else commit("addWeatherWidget", widget);
      const widgetList = {
        name: widget.name,
        id: widget.id,
        country: widget.country,
        widgetOption: widget.widgetOption,
      } 
      index = state.widgetList.findIndex(el => (el.id === widgetList.id && el.widgetOption.option === widgetList.widgetOption.option));
      newState = {
        index: index,
        city: widgetList
      }
      if (index >= 0) commit("updateWeatherList", newState);
      else commit("addWeatherWidget", widgetList);
    }
  }
});
