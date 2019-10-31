// DOM Objects
const christmasLights = document.getElementsByClassName('christmas-light');
const christmasLightsInterval = document.getElementById('christmas-lights-interval');
const christmasLightsToggle = document.getElementById('christmas-lights-toggle');

// Global Variables
let lightsOn = true;            // Should the light display run?
let lightsInterval = null;      // How fast should the light display go?
let activeLight = 0;            // The index of the currently active Christmas light.

const nonActiveShadow = '5px 5px 0px black';  // The 'box-shadow' property of inactive lights.
const activeShadow = '0px 0px 50px 50px';     // The 'box-shadow' property, sans color, of the active light.

// The color of each Christmas light, when active.
const lightColors = [
  'rgba(255, 0, 0, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(255, 255, 0, 1)',
  'rgba(255, 165, 0, 1)',
  'rgba(255, 0, 255, 1)',
  'rgba(0, 255, 255, 1)'
];

// The shadow color of each Christmas light, when active.
const lightShadowColors = [
  'rgba(255, 0, 0, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 255, 0, 1)',
  'rgba(255, 255, 0, 1)',
  'rgba(255, 165, 0, 1)',
  'rgba(255, 0, 255, 1)',
  'rgba(0, 255, 255, 1)'
];

// Functions

/**
 * Lights the next bulb of the Christmas light sequence.
 */
function lightNextBulb() {
  // In-activate the previous light in the sequence, if there is one.
  if (activeLight >= 0) {
    christmasLights[activeLight].style.backgroundColor = 'transparent';
    christmasLights[activeLight].style.boxShadow = nonActiveShadow;
  }

  // Advance the light index. Reset to zero if necessary.
  activeLight++;
  if (activeLight >= christmasLights.length) {
    activeLight = 0;
  }

  // Activate the next light.
  christmasLights[activeLight].style.backgroundColor = lightColors[activeLight];
  christmasLights[activeLight].style.boxShadow = `${activeShadow} ${lightShadowColors[activeLight]}`;
}

/**
 * Validates the Christmas light sequence interval, and corrects it if
 * necessary.
 * 
 * @return {number} The corrected lights interval.
 */
function clampLightsInterval() {
  // Grab the value from the Christmas lights interval box.
  const { value } = christmasLightsInterval;

  // If none is present, then default to 500.
  if (!value) {
    return 500;
  }

  // Clamp the number to a range between 100 (100 milliseconds) and
  // 5000 (5 seconds). Return the result.
  if (value < 100) {
    return 100;
  } else if (value > 5000) {
    return 5000;
  } else {
    return value;
  }
}

/**
 * Updates the interval at which the active Christmas light changes.
 */
function setLightsInterval() {
  // Make sure to clear the previous interval, first, if there is any.
  clearInterval(lightsInterval);

  // Get the new, validated, interval. Update the interval box if necessary.
  const newInterval = clampLightsInterval();
  christmasLightsInterval.value = newInterval;

  // Set the new interval to the new time, if the lights display is turned on.
  // Otherwise, turn all lights off and set the light index to -1, signifying
  // that no lights are active.
  if (lightsOn === true) {
    lightsInterval = setInterval(
      lightNextBulb,
      newInterval
    );
  } else {
    for (let i = 0; i < christmasLights.length; ++i) {
      christmasLights[i].style.backgroundColor = 'transparent';
      christmasLights[i].style.boxShadow = nonActiveShadow;
      activeLight = -1;
    }
  }
}

/**
 * Sets the text of the toggle button according to whether the lights display
 * is on or not.
 */
function setToggleText() {
  christmasLightsToggle.innerHTML =
    lightsOn ? 'Stop' : 'Start';
}

/**
 * Toggles the lights display.
 */
function toggleLights() {
  lightsOn = !lightsOn;
  setToggleText();
  setLightsInterval();
}

// Main Function
(() => {
  // Set the initial toggle text.
  setToggleText();

  // Hook the toggle button and interval input up to adjust the light display.
  christmasLightsToggle.onclick = toggleLights;
  christmasLightsInterval.onchange = setLightsInterval;
  christmasLightsInterval.onkeypress = setLightsInterval;

  // Activate the first Christmas light.
  christmasLights[activeLight].style.backgroundColor = lightColors[activeLight];
  christmasLights[activeLight].style.boxShadow = `${activeShadow} ${lightShadowColors[activeLight]}`;

  // Start the display.
  setLightsInterval();
})();
