const initialState = {
  cities: [
    {
      name: "Paris",
      temp: 11,
      weather: "Clouds",
      icon: "04d"
    },
    {
      name: "Montpellier",
      temp: 20,
      weather: "Clouds",
      icon: "04d"
    }
  ]
};

export default function cityReducer(state = initialState, action) {
  let newCity;

  switch (action.type) {
    case "ADD_CITY":
      newCity = state.cities.concat(action.payload);
      return { ...state, cities: newCity };

    case "REMOVE_CITY":
      newCity = state.cities.filter(city => city.name !== action.payload.name);
      return { ...state, cities: newCity };
    default:
      return state;
  }
}
