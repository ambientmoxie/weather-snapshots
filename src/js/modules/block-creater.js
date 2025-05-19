import { hashToRange } from "./utils";
import { warmColors, coldColors } from "./dicts";

class BlockCreater {
  constructor(data) {
    this.data = data;
    if (!this.data) return;
  }

  createColorStripe() {
    const div = document.createElement("div");
    div.classList.add("weather-block__stripe");

    // Use wind_speed to shuffle the result, so the same city doesn't always get the same stripe layout
    const cols = hashToRange(this.data.lat * this.data.wind_speed, 3, 10);

    const fragment = document.createDocumentFragment(); // Create fragment for batch DOM updates

    let col;
    for (let index = 0; index < cols; index++) {

      // Generate seeds using weather values and loop index
      // to create consistent randomness within the current city
      const seed1 = this.data.lat * this.data.wind_speed * index;
      const seed2 = this.data.lon * this.data.wind_speed * index;

      col = document.createElement("div");
      col.classList.add("weather-block__color-col");

      // Assign flex value based on seed1 to vary column width
      const flexValue = hashToRange(seed1, 1, 5);
      col.style.flex = flexValue;

      // Use cold colors if temp < 10°C, otherwise warm
      let colors = this.data.temperature < 10 ? coldColors : warmColors;
      col.style.backgroundColor = colors[hashToRange(seed2, 0, colors.length)];

      fragment.append(col);
    }

    div.append(fragment);

    return div;
  }

  createBlock() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("weather-block");

    // Append the color stripe
    const stripe = this.createColorStripe();
    wrapper.appendChild(stripe);

    // Create other content
    wrapper.innerHTML += `
      <div class="weather-block__city">${this.data.city}</div>
      <div class="weather-block__description">::: ${this.data.description}</div>
      <ul class="weather-block__datas">
        <li class="weather-block__data weather-block__data--temperature">Temperature is ${this.data.temperature}°</li>
        <li class="weather-block__data weather-block__data--feels-like">But feels like ${this.data.feels_like}°</li>
        <li class="weather-block__data weather-block__data--humidity">Humidity is around ${this.data.humidity}%</li>
        <li class="weather-block__data weather-block__data--longitude">Longitude is ${this.data.lon}</li>
        <li class="weather-block__data weather-block__data--latitude">Latitude is ${this.data.lat}</li>
        <li class="weather-block__data weather-block__data--wind-speed">Wind speed is ${this.data.wind_speed} m/s</li>
      </ul>
    `;

    return wrapper;
  }
}

export default BlockCreater;
