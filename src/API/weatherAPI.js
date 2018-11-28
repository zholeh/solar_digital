import { getCitiesById, getCities5ById } from "./http";

export function initApp(store) {
  let widgetList = [];
  try {
    widgetList = JSON.parse(localStorage.getItem("widgetListLS"));
  } catch (e) {
    localStorage.removeItem("widgetListLS");
  }

  if (!Array.isArray(widgetList)) widgetList = [];
  else
    store.state.widgetList = widgetList.map((el) => {
      return {
        id: el.id || 0,
        name: el.name || "",
        country: el.country || "",
        widgetOption: {
          option:
            el.widgetOption !== undefined ? el.widgetOption.option || "" : "",
          lastUpdate: 0
        }
      };
    });
}

async function updateSimpleByID(list, store) {
  const idStr = list.reduce((acc, el) => {
    if (el.widgetOption.option === "simple-daily") {
      acc = acc === "" ? "" + el.id : acc + "," + el.id;
    }
    return acc;
  }, "");
  const resp = await getCitiesById(idStr);
  if (
    (resp.cod === undefined || resp.cod === "200") &&
    resp.list !== undefined
  ) {
    for (let city in resp.list) {
      const widget = list.find(
        el =>
          el.id === resp.list[city].id &&
          el.widgetOption.option === "simple-daily"
      );
      if (widget !== undefined) {
        const newState = Object.assign({}, widget, { city: resp.list[city] });
        newState.widgetOption.filled = true;
        store.dispatch("updateWeatherWidget", newState);
      }
    }
  }
  return resp;
}

async function updateSimple5ByID(widget, store) {
  const resp = await getCities5ById(widget.id);
  if (
    (resp.cod === undefined || resp.cod === "200") &&
    resp.list !== undefined
  ) {
    const newState = Object.assign({}, widget, { city: resp });
    newState.widgetOption.filled = true;

    // group by date
    const list = resp.list.reduce((acc, el) => {
      const tz = new Date().getTimezoneOffset() * 60000;
      const date = new Date(el.dt * 1000 + tz);
      const beginDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const index = acc.findIndex(elAcc => {
        return beginDay - elAcc.date === 0;
      });
      if (index < 0) {
        const dateList = {
          date: beginDay,
          list: []
        };
        acc.push(dateList);
      } else {
        const newDetail = Object.assign({}, el);
        newDetail.date = date;
        acc[index].list.push(newDetail);
      }
      return acc;
    }, []);

    // sort list inside of group
    for (let i in list) {
      list[i].list.sort((a, b) => a.date - b.date);
    }

    // sort list by group
    list.sort((a, b) => a.date - b.date);
    newState.city.list = list;
    store.dispatch("updateWeatherWidget", newState);
  }
}

async function updateSimple5ByListID(list, store) {
  const allowedWidgets = "horizontal-5-day, simple-5-day";
  for (let city in list) {
    if (allowedWidgets.search(list[city].widgetOption.option) !== -1) {
      updateSimple5ByID(list[city], store);
    }
  }
}

export async function updateWeatherWidgets(list, store) {
  updateSimpleByID(list, store);
  updateSimple5ByListID(list, store);
}
