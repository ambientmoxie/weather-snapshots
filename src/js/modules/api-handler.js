class WeatherAPIHandler {
  constructor(config = {}) {
    this.config = {
      zip: config.zip,
      country: config.country || "FR",
      units: config.units || "metric"
    };
  }

  static async fetchWeather(config) {
    const { zip, country, units } = config;
    const url = `api/weather.php?zip=${zip}&country=${country}&units=${units}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(resp.statusText);
    return await resp.json();
  }

  async getData() {
    const resp = await WeatherAPIHandler.fetchWeather(this.config);

    return {
      city: resp.name,
      lon: resp.coord.lon,
      lat: resp.coord.lat,
      temperature: resp.main.temp,
      feels_like: resp.main.feels_like,
      humidity: resp.main.humidity,
      wind_speed: resp.wind.speed,
      description: resp.weather[0].description,
    };
  }
}

export default WeatherAPIHandler;
