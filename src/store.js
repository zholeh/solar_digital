import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    widgetList: []
  },
  mutations: {
    addWidgetToList(state, widget) {
      state.widgetList.push(widget);
    },
    delWidgetFromList(state, index) {
      state.widgetList.splice(index, 1);
    },
    updateWeatherFromList(state, opt) {
      state.widgetList.splice(opt.index, 1, opt.widget);
    },
    updateWeathers(state, opt) {
      state.widgetList = opt;
    }
  },
  actions: {
    addWeatherWidget({ state, commit }, city) {
      const widget = {
        name: city.name,
        id: city.id,
        country: city.country,
        widgetOption: city.widgetOption,
      } 
      const index = state.widgetList.findIndex(el => (el.id === city.id && el.widgetOption.option === city.widgetOption.option));
      if (index < 0) commit("addWidgetToList", widget);
    },

    delWeatherWidget({ state, commit }, setting) {
      let index = state.widgetList.findIndex(el => el.id === setting.id && el.widgetOption.option === setting.option);
      if (index >= 0) commit("delWidgetFromList", index);
    },

    updateWeatherWidget({ state, commit }, widget) {

      if (widget.widgetOption.filled !== undefined) widget.widgetOption.lastUpdate = Date.now();
      const index = state.widgetList.findIndex(el => (el.id === widget.id && el.widgetOption.option === widget.widgetOption.option));
      if (index >= 0) {
        const newState = {
          index: index,
          widget: widget
        }  
        commit("updateWeatherFromList", newState);
      }
    }
  }
});
