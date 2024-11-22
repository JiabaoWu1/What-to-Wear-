export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rainy",
    url: new URL("../assets/day/rainy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("../assets/day/stormy.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "snowy",
    url: new URL("../assets/day/snowy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "foggy",
    url: new URL("../assets/day/foggy.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("../assets/night/rainy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("../assets/night/stormy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snowy",
    url: new URL("../assets/night/snowy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "foggy",
    url: new URL("../assets/night/foggy.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default_night.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default_day.png", import.meta.url).href,
  },
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];
export const coordinates = {
  latitude: 42.2805504,
  longitude: -71.1294976,
};

export const APIkey = "0e741eef9b797480c5892b57fe543c45";
