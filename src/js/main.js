import "../scss/main.scss";
import BlockCreater from "./modules/block-creater";
import WeatherAPIHandler from "./modules/api-handler";
import { zipCodes } from "./modules/dicts";

document.addEventListener("DOMContentLoaded", async () => {
  // Store the wrapper for block
  const blockWrapper = document.querySelector("main");
  const loadingScreen = document.getElementById("loading-screen");

  // Init fragment to temporize append process
  const fragment = document.createDocumentFragment();

  // Loop through all zip codes. Uses "for" loop instead of "forEach"
  // For Each does not support asynchronous operations.
  for (const zipCode of zipCodes) {
    // Invoque weater handler with the right zip code
    const weatherHandler = new WeatherAPIHandler({
      zip: zipCode,
      country: "FR",
      units: "metric",
    });

    try {
      // Get the data
      const weatherData = await weatherHandler.getData();
      // Invoque the block helper class, passing through weather data
      const blockHandler = new BlockCreater(weatherData);
      // Generates the block
      const weatherBlock = blockHandler.createBlock();
      // Appending to fragment
      fragment.append(weatherBlock);
    } catch (err) {
      console.warn(`Failed to fetch weather for ${zipCode}`, err);
    }
  }

  // Appending all the blocks
  blockWrapper.append(fragment);
  // Remove loading screen once all block are displayed
  if (loadingScreen) loadingScreen.style.display = "none";
});
