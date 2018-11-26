import { updateWeatherWidgets } from "../../API/weatherAPI";

export async function updateWidget(widget, store) {

  const newState = Object.assign({}, widget);
  if(newState.widgetOption === undefined) {
    newState.widgetOption = {
      lastUpdate: 0,
      option: 'simple-daily'
    }
  }
  newState.widgetOption.lastUpdate = 0;
  updateWeatherWidgets([newState], store);
}