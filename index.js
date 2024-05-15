const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHARACTERISTIC_UUID_TX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

let bleDevice;
let txCharacteristic;
let isConnected = false;

async function connect() {
  try {
    // Disable the connect button while connecting
    const connectButton = document.querySelector(".connect");
    connectButton.disabled = true;
    connectButton.textContent = "Connecting...";

    console.log("Inside connect function");

    // Request the device
    console.log("Requesting device...");
    bleDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "Scott's Glove" }],
      optionalServices: [SERVICE_UUID], // Add the service UUID to optionalServices
    });
    console.log("Device requested successfully:", bleDevice);

    // Connect to the device
    console.log("Connecting to device...");
    const server = await bleDevice.gatt.connect();
    console.log("Device connected successfully:", server);

    // Get the service
    console.log("Getting primary service...");
    const service = await server.getPrimaryService(SERVICE_UUID);
    console.log("Primary service obtained successfully:", service);

    // Get the TX characteristic
    console.log("Getting characteristic...");
    txCharacteristic = await service.getCharacteristic(CHARACTERISTIC_UUID_TX);
    console.log("Characteristic obtained successfully:", txCharacteristic);

    // Subscribe to notifications
    console.log("Subscribing to notifications...");
    await txCharacteristic.startNotifications();
    txCharacteristic.addEventListener("characteristicvaluechanged", handleData);
    console.log("Notifications subscribed successfully.");

    // Update UI to indicate successful connection
    // Hide the connect UI and show the main UI
    console.log("Updating UI...");
    document.querySelector(".connect-ui").classList.add("hide");
    document.querySelector(".ui").classList.remove("hide");
    document.querySelector(".content-container2").classList.remove("hide");
    document.querySelector(".charts").classList.remove("hide");
    document.querySelector(".left-side").classList.add("hide");
    console.log("UI updated.");

    isConnected = true;
    updateButton();
  } catch (error) {
    console.error("Error connecting:", error);
    // Display error message to the user
    const errorElement = document.querySelector(".error");
    errorElement.classList.remove("hide");
    errorElement.textContent = "Error connecting: " + error;

    // Hide the error message after 10 seconds
    setTimeout(() => {
      errorElement.classList.add("hide");
    }, 5000);
  } finally {
    // Enable the connect button regardless of the connection result
    const connectButton = document.querySelector(".connect");
    connectButton.disabled = false;
    connectButton.textContent = "Click to Connect";
  }
}

async function disconnect() {
  try {
    if (bleDevice && bleDevice.gatt.connected) {
      // Disconnect from the device
      console.log("Disconnecting from device...");
      await bleDevice.gatt.disconnect();
      console.log("Disconnected successfully.");

      // Update UI to indicate disconnection
      document.querySelector(".connect-ui").classList.remove("hide");
      document.querySelector(".ui").classList.add("hide");

      isConnected = false;
      updateButton();
    } else {
      console.log("No device connected.");
    }
  } catch (error) {
    console.error("Error disconnecting:", error);
  } finally {
    bleDevice = null; // Reset bleDevice
    txCharacteristic = null; // Reset txCharacteristic
  }
}

function updateButton() {
  const disconnectButton = document.querySelector(".disconnect");
  if (isConnected) {
    disconnectButton.textContent = "Disconnect";
  } else {
    disconnectButton.textContent = "Connect";
  }
}

// Call the connect function when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");

  // Add this code to add the 'animate' class once the DOM content is loaded
  var containerWrapper = document.querySelector(".container-wrapper");
  console.log(containerWrapper); // Check if .container-wrapper element is found

  // Remove 'animate' class if it exists
  containerWrapper.classList.remove("animate");

  // Trigger reflow before adding the class again
  containerWrapper.offsetWidth; // This line forces the browser to reflow the element

  containerWrapper.classList.add("animate");
  console.log("Animate class added"); // Confirm if the class is added

  // Add event listener to the connect button
  document.querySelector(".connect").addEventListener("click", connect);

  // Add event listener to the disconnect button
  document.querySelector(".disconnect").addEventListener("click", function () {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  });
});
let theme = "Neon";
function changeTheme(newTheme) {
  theme = newTheme;
  console.log("Changing theme to:", theme);

  for (let i = 0; i < 11; i++) {
    const label = document.querySelector(`.label-${i}`);
    if (!label) continue; // Skip if label not found

    if (theme === "Neon") {
      label.classList.add("neon");
    } else if (theme === "Mango") {
      label.classList.remove("neon");
    }
  }

  // Handle 'connected' button color
  const button = document.querySelector("button.connect");

  if (theme === "Neon") {
    button.classList.add("neon");
  } else if (theme === "Mango") {
    button.classList.remove("neon");
  }
  const buttonConnected = document.querySelector("button.connected");

  if (theme === "Neon") {
    buttonConnected.classList.add("neon");
  } else if (theme === "Mango") {
    buttonConnected.classList.remove("neon");
  }
  const cont2 = document.querySelector(".content-container2");
  if (theme === "Neon") {
    cont2.classList.add("neon");
  } else if (theme === "Mango") {
    cont2.classList.remove("neon");
  }
  const statistics = document.querySelector(".statistics");
  if (theme === "Neon") {
    statistics.classList.add("neon");
  } else if (theme === "Mango") {
    statistics.classList.remove("neon");
  }
  const contain = document.querySelector(".container");
  if (theme === "Neon") {
    contain.classList.add("neon");
  } else if (theme === "Mango") {
    contain.classList.remove("neon");
  }
  const reset = document.querySelector(".resetButton");
  if (theme === "Neon") {
    reset.classList.add("neon");
  } else if (theme === "Mango") {
    reset.classList.remove("neon");
  }
  const root = document.querySelector(":root");
  if (theme === "Neon") {
    root.classList.add("neon");
  } else if (theme === "Mango") {
    root.classList.remove("neon");
  }
  const ui = document.querySelector(".ui");
  if (theme === "Neon") {
    ui.classList.add("neon");
  } else if (theme === "Mango") {
    ui.classList.remove("neon");
  }
  const chart = document.querySelector(".chartContainer");
  if (theme === "Neon") {
    chart.classList.add("neon");
  } else if (theme === "Mango") {
    chart.classList.remove("neon");
  }
  const controls = document.querySelector(".controls");
  if (theme === "Neon") {
    controls.classList.add("neon");
  } else if (theme === "Mango") {
    controls.classList.remove("neon");
  }
  const buttons = document.querySelectorAll(".button-container button");

  if (theme === "Neon") {
    buttons.forEach((button) => {
      button.classList.add("neon");
    });
  } else if (theme === "Mango") {
    buttons.forEach((button) => {
      button.classList.remove("neon");
    });
  }
}
let gravity = 9.81;
let maxGs = gravity;
let number = 0;
let going = true;
let stopping = false;
let landing = false;
let gliding = false;
let homing = false;
let time = 0;
let forceX = 0;
let forceY = 0;
let forceZ = 0;
let throttle = 0;
let leftRightAngle = 0;
let forBackAngle = 180;
let accelerationX = 0;
let accelerationY = 0;
let accelerationZ = 0;
let velocityX = 0;
let velocityY = 0;
let velocityZ = 0;
let distanceX = 0;
let distanceY = 0;
let distanceZ = 0;
let totalDistance = 0;
let airDensity = 1.225; // kg/m^3
let crossSectionalArea = 0.5; // m^2
let dragCoefficient = 1;
let mass = 50;
let airResistanceX = 0;
let airResistanceY = 0;
let airResistanceZ = 0;
let maxForce = 1960;
let brakes = false;
let justStartedBraking = false;
let justStoppedBraking = false;
let savedLeftRightAngle = 0;
let terminalVelocity = Math.sqrt(
  (2 * (maxForce + 980)) / (airDensity * crossSectionalArea * dragCoefficient)
);
let gravForce = mass * gravity;
let velMag = Math.sqrt(velocityX ** 2 + velocityY ** 2 + velocityZ ** 2);

let minforceZ = 0;

function toggleActive(button) {
  going = false;
  gliding = false;
  stopping = false;
  landing = false;
  homing = false;

  switch (button) {
    case "Flying":
      going = true;
      break;
    case "Gliding":
      gliding = true;
      break;
    case "Stopping":
      stopping = true;
      break;
    case "Landing":
      landing = true;
      break;
    case "Returning Home":
      homing = true;
      break;
  }

  var activeState;
  if (going) activeState = "Flying";
  else if (gliding) activeState = "Gliding";
  else if (stopping) activeState = "Stopping";
  else if (landing) activeState = "Landing";
  else if (homing) activeState = "Returning Home";
  else activeState = "None";

  document.getElementById("activeStateDisplay").textContent = activeState;
}

let xData = [];
let yData = [];
let zData = [];

// Initialize Three.js scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, // Doubled field of view
  1, // Aspect ratio will be dynamically set
  0.1,
  5000
);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparent background
const chartContainer = document.getElementById("chartContainer");
const chartDisplay = document.getElementById("my3DChart");
chartDisplay.appendChild(renderer.domElement);

// Create grid lines
const gridHelperX = new THREE.GridHelper(3000, 15); // size, divisions
const gridHelperY = new THREE.GridHelper(3000, 15); // size, divisions
scene.add(gridHelperX);
scene.add(gridHelperY);

// Counter variables
let counterValue = 0;
let maxAge = 0;

// Create a counter display
const counterElement = document.getElementById("counter");

// Update counter display function
function updateCounter() {
  var minutes = Math.floor(counterValue / 60);
  var seconds = Math.floor(counterValue % 60);
  var tenthsOfSeconds = Math.floor(
    (counterValue - Math.floor(counterValue)) * 10
  );

  counterElement.textContent =
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    "." +
    tenthsOfSeconds;
}
let previousSpheres = [];
// Create a function to simplify ring creation
function createRing1(scene, position, color) {
  const ringMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.8, // Adjust this value for desired opacity
    transparent: true,
    color: color,
  });

  const ringGeometry = new THREE.TorusBufferGeometry(40, 5, 16, 32); // Reduced segments
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2; // Rotate to lay on xy plane
  ring.position.copy(position);
  scene.add(ring);
}

function createRing2(scene, position, color) {
  const ringMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.8, // Adjust this value for desired opacity
    transparent: true,
    color: color,
  });

  const ringGeometry = new THREE.TorusBufferGeometry(40, 5, 16, 32); // Reduced segments
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = 0; // Rotate to lay on xy plane
  ring.position.copy(position);
  scene.add(ring);
}

function createRing3(scene, position, color) {
  const ringMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.8, // Adjust this value for desired opacity
    transparent: true,
    color: color,
  });

  const ringGeometry = new THREE.TorusBufferGeometry(40, 5, 16, 32); // Reduced segments
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.y = Math.PI / 2; // Rotate to lay on xy plane
  ring.position.copy(position);
  scene.add(ring);
}

function createRing4(scene, position, color) {
  const ringMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.8, // Adjust this value for desired opacity
    transparent: true,
    color: color,
  });

  const ringGeometry = new THREE.TorusBufferGeometry(40, 5, 16, 32); // Reduced segments
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.y = (Math.PI * 3) / 4; // Rotate to lay on xy plane
  ring.position.copy(position);
  scene.add(ring);
}

function createRing5(scene, position, color) {
  const ringMaterial = new THREE.MeshBasicMaterial({
    opacity: 0.8, // Adjust this value for desired opacity
    transparent: true,
    color: color,
  });

  const ringGeometry = new THREE.TorusBufferGeometry(40, 5, 16, 32); // Reduced segments
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.rotation.y = Math.PI / 4; // Rotate to lay on xy plane
  ring.position.copy(position);
  scene.add(ring);
}

// Usage
const unit = 750;
const unit2 = 750 / 2 ** 0.5;
createRing2(scene, new THREE.Vector3(unit, 100, 0), 0xbb99ff); // Ring 1
createRing3(scene, new THREE.Vector3(0, 100, unit), 0x77ffee); // Ring 2
createRing2(scene, new THREE.Vector3(-unit, 100, 0), 0xff66cc); // Ring 3
createRing3(scene, new THREE.Vector3(0, 100, -unit), 0xffcc90); // Ring 4
createRing4(scene, new THREE.Vector3(unit2, 80, unit2), 0xbb99ff); // Ring 1
createRing4(scene, new THREE.Vector3(-unit2, 80, -unit2), 0x77ffee); // Ring 2
createRing5(scene, new THREE.Vector3(-unit2, 80, unit2), 0xff66cc); // Ring 3
createRing5(scene, new THREE.Vector3(unit2, 80, -unit2), 0xffcc90); // Ring 4
createRing1(scene, new THREE.Vector3(0, 5, 0), 0xffffff); // Ring 5

function create3DPlot() {
  let ope = 0.8 + velMag / terminalVelocity / 2;
  if (ope > 1) {
    ope = 1;
  }
  previousSpheres.forEach((sphere, index) => {
    let opacity = (1 - (index + 1) / 30) * ope; // Opacity from 0.1 to 1
    if (opacity > 1) {
      opacity = 1;
    }
    let color;
    if (theme === "Mango") {
      color = new THREE.Color(1 - opacity, 0, 0.5 - 0.3 * opacity); // Purple to blue gradient based on opacity
    } else {
      color = new THREE.Color(
        1.0 - 0.5 * opacity,
        (1.1 * opacity) ** 3,
        0.7 + 0.35 * opacity
      ); // Purple to blue gradient based on opacity
    }

    sphere.material.opacity = opacity;
    sphere.material.color = color;
    sphere.material.transparent = true;
    const radius =
      (2 - index / 3.5 + index ** 0.5 / 2 + index ** 2 / 235) * ope * 0.8; // Decreasing size based on index
    sphere.scale.set(radius, radius, radius); // Adjust sphere's scale
  });

  // Remove the oldest sphere if there are more than 20 spheres
  if (previousSpheres.length >= 30) {
    const removedSphere = previousSpheres.pop();
    scene.remove(removedSphere);
  }

  // Create a new sphere for the most recent point
  const i = xData.length - 1;
  // Calculate RGB color from HSL
  const color = new THREE.Color(0.6, 0.9, 1);

  // Create a new material with the calculated color
  const material = new THREE.MeshBasicMaterial({
    opacity: 0,
    transparent: true,
    color: color,
  });

  const geometry = new THREE.SphereBufferGeometry(10, 16, 16); // Adjust the parameters for smoother spheres
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(xData[i], zData[i], yData[i]); // Swap y and z coordinates

  // Add the most recent point to the scene
  scene.add(sphere);

  // Update previousSpheres array with the new sphere
  previousSpheres.unshift(sphere);

  // Set camera position to follow the most recent point
  const recentIndex = xData.length - 1;

  const maxCoordinate = Math.sqrt(
    Math.max(...xData) ** 2 + Math.max(...yData) ** 2 + Math.max(...zData) ** 2
  );
  let addHeight = 0;
  if (velMag > 1) {
    addHeight = 900 / (velMag + 29);
  } else {
    addHeight = 30;
  }
  const behindPoint = new THREE.Vector3(
    xData[recentIndex - 20],
    zData[recentIndex - 20] + 5 + 200 / (20 + zData[recentIndex]) + addHeight,
    yData[recentIndex - 20]
  );

  const lookAtPoint = new THREE.Vector3(
    xData[recentIndex],
    zData[recentIndex],
    yData[recentIndex]
  );

  camera.position.copy(behindPoint);
  camera.lookAt(lookAtPoint);

  // Set the aspect ratio of the camera to match the div's aspect ratio
  const { width, height } = chartDisplay.getBoundingClientRect();
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Resize the renderer to match the div's dimensions
  renderer.setSize(width, height);

  // Render the scene
  renderer.render(scene, camera);

  // Update counter display
  updateCounter();
}

function clear3DPlot() {
  // Dispose of resources for all objects in the scene
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => {
            material.dispose();
          });
        } else {
          object.material.dispose();
        }
      }
    }
  });

  // Remove all objects from the scene
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  // Clear the renderer
  renderer.clear();

  // Recreate grid lines
  const gridHelperX = new THREE.GridHelper(3000, 15); // size, divisions
  const gridHelperY = new THREE.GridHelper(3000, 15); // size, divisions
  scene.add(gridHelperX);
  scene.add(gridHelperY);
  createRing2(scene, new THREE.Vector3(unit, 100, 0), 0xbb99ff); // Ring 1
  createRing3(scene, new THREE.Vector3(0, 100, unit), 0x77ffee); // Ring 2
  createRing2(scene, new THREE.Vector3(-unit, 100, 0), 0xff66cc); // Ring 3
  createRing3(scene, new THREE.Vector3(0, 100, -unit), 0xffcc90); // Ring 4
  createRing4(scene, new THREE.Vector3(unit2, 80, unit2), 0xbb99ff); // Ring 1
  createRing4(scene, new THREE.Vector3(-unit2, 80, -unit2), 0x77ffee); // Ring 2
  createRing5(scene, new THREE.Vector3(-unit2, 80, unit2), 0xff66cc); // Ring 3
  createRing5(scene, new THREE.Vector3(unit2, 80, -unit2), 0xffcc90); // Ring 4
  createRing1(scene, new THREE.Vector3(0, 5, 0), 0xffffff); // Ring 5

  // Render the new scene
  renderer.render(scene, camera);

  // Update counter display after clearing
  updateCounter();
}

function handleData(event) {
  console.log("Inside handleData function");
  // Indicate that the function is being invoked
  console.log("handleData function is invoked.");

  // Get the values from the input fields
  maxForce = parseFloat(document.getElementById("maxForce").value);
  airDensity = parseFloat(document.getElementById("airDensity").value);
  crossSectionalArea = parseFloat(
    document.getElementById("crossSectionalArea").value
  );
  dragCoefficient = parseFloat(
    document.getElementById("dragCoefficient").value
  );
  mass = parseFloat(document.getElementById("mass").value);

  // Ensure that maxForce cannot be set below gravity*mass
  const minForce = gravity * mass;
  if (maxForce < minForce) {
    maxForce = minForce;
    // Update the input field value to reflect the change
    document.getElementById("maxForce").value = minForce;
    // Optionally, you can also display a message to the user informing them of the minimum force requirement
    // For example:
    // alert("Maximum Force cannot be set below " + minForce + " N (gravity * mass)");
  }

  // Iterate over labels and update their classes based on the theme
  for (let i = 0; i <= 10; i++) {
    const label = document.querySelector(`.label-${i}`);
    if (!label) continue; // Skip if label not found

    if (theme === "Neon") {
      label.classList.add("neon");
    } else if (theme === "Mango") {
      label.classList.remove("neon");
    }
  }

  // Get the value from the characteristic
  const value = event.target.value;

  // Initialize an array to store the sums for each line

  if (value && value.byteLength > 0) {
    // Assuming the data is UTF-8 encoded
    const receivedText = new TextDecoder().decode(value);
    console.log("Received data:", receivedText);

    // Call changeTheme function to update the UI theme
    changeTheme(theme); // Set the theme to Neon every time new data is received

    // Split the received text by space
    const numbers = receivedText.trim().split(" ");

    // Check if there are exactly 6 numbers
    if (numbers.length !== 6) {
      // Display error message for incorrect number of values
      console.error("Error: Expected 6 numbers, but received:", numbers.length);
      document.getElementById("receivedData").textContent =
        "Error: Expected 6 numbers, but received " + numbers.length;
      return;
    }

    // Clear previous content
    document.getElementById("receivedData").innerHTML = "";

    // Display each number on a separate line with corresponding labels
    const labels = [
      "▋         ",
      "▋         ",
      "▋▋        ",
      "▋▋▋       ",
      "▋▋▋▋      ",
      "▋▋▋▋▋     ",
      "▋▋▋▋▋▋    ",
      "▋▋▋▋▋▋▋   ",
      "▋▋▋▋▋▋▋▋  ",
      "▋▋▋▋▋▋▋▋▋ ",
      "▋▋▋▋▋▋▋▋▋▋",
    ];

    let lineNumber = 1; // Counter for preceding numbers
    for (let i = 0; i < numbers.length; i++) {
      let labelIndex;
      const num = parseInt(numbers[i]);
      let labelClass; // Variable to store the label class for the block

      if (isNaN(num)) {
        // Display error message for invalid values
        console.error("Error: Invalid number format:", numbers[i]);
        document.getElementById("receivedData").textContent =
          "Error: Invalid number format: " + numbers[i];
        return;
      } else if (num < 1) {
        labelIndex = 0;
      } else if (num < 10) {
        labelIndex = 1;
      } else if (num < 20) {
        labelIndex = 2;
      } else if (num < 30) {
        labelIndex = 3;
      } else if (num < 40) {
        labelIndex = 4;
      } else if (num < 50) {
        labelIndex = 5;
      } else if (num < 60) {
        labelIndex = 6;
      } else if (num < 70) {
        labelIndex = 7;
      } else if (num < 80) {
        labelIndex = 8;
      } else if (num < 90) {
        labelIndex = 9;
      } else {
        labelIndex = 10;
      }

      // Assign label class based on the label index
      if (theme === "Neon") {
        switch (labelIndex) {
          case 0:
            labelClass = "label-0 neon";
            break;
          case 1:
            labelClass = "label-1 neon";
            break;
          case 2:
            labelClass = "label-2 neon";
            break;
          case 3:
            labelClass = "label-3 neon";
            break;
          case 4:
            labelClass = "label-4 neon";
            break;
          case 5:
            labelClass = "label-5 neon";
            break;
          case 6:
            labelClass = "label-6 neon";
            break;
          case 7:
            labelClass = "label-7 neon";
            break;
          case 8:
            labelClass = "label-8 neon";
            break;
          case 9:
            labelClass = "label-9 neon";
            break;
          case 10:
            labelClass = "label-10 neon";
            break;
          default:
            labelClass = "red-label";
        }
      } else {
        // For "Mango" theme, no need to append ".neon"
        switch (labelIndex) {
          case 0:
            labelClass = "label-0";
            break;
          case 1:
            labelClass = "label-1";
            break;
          case 2:
            labelClass = "label-2";
            break;
          case 3:
            labelClass = "label-3";
            break;
          case 4:
            labelClass = "label-4";
            break;
          case 5:
            labelClass = "label-5";
            break;
          case 6:
            labelClass = "label-6";
            break;
          case 7:
            labelClass = "label-7";
            break;
          case 8:
            labelClass = "label-8";
            break;
          case 9:
            labelClass = "label-9";
            break;
          case 10:
            labelClass = "label-10";
            break;
          default:
            labelClass = "red-label";
        }
      }

      const label = labels[labelIndex];
      const formattedText = `<span class="${labelClass}">${label}</span>`;
      const div = document.createElement("div");
      div.innerHTML = formattedText;
      document.getElementById("receivedData").appendChild(div);
    }
    gravForce = mass * gravity;
    //let timeTillGround = distanceZ / velocityZ;
    let requiredAccelerationZ = velocityZ ** 2 / distanceZ;
    let requiredForceZ = requiredAccelerationZ * mass;
    // Adjust the minimum Z force required based on future position
    if (velocityZ < 0) {
      minforceZ = gravForce + requiredForceZ - distanceZ * 10;
    } else {
      minforceZ = gravForce - requiredForceZ * 2 - distanceZ * 10;
    }

    if (minforceZ > maxForce) {
      minforceZ = maxForce;
    }
    if (numbers[0] > 5) {
      numbers[3] = -numbers[3];
      numbers[4] = -numbers[4];
      numbers[5] = -numbers[5];
    }
    if (numbers[2] > 5) {
      brakes = true;
      if (justStartedBraking == false) {
        justStartedBraking = true;
        savedLeftRightAngle = leftRightAngle;
      }
    } else {
      brakes = false;
      if (justStartedBraking == true) {
        justStartedBraking = false;
        justStoppedBraking = true;
      } else {
        justStoppedBraking = false;
      }
    }
    throttle += (numbers[5] * maxForce) / 1000; // Assuming numbers[5] is the throttle value
    forBackAngle += numbers[3] / (10 + velMag / 5);
    leftRightAngle += numbers[4] / (10 + velMag / 4);

    if (throttle >= maxForce) {
      throttle = maxForce;
    }
    if (throttle < 0) {
      throttle = 0;
    }

    // Convert angles from degrees to radians
    let forwardBackwardAngleRadians = (forBackAngle * Math.PI) / 180;
    let leftRightAngleRadians = (leftRightAngle * Math.PI) / 180;

    // Calculate force components using trigonometric functions
    forceX =
      throttle *
      Math.sin(forwardBackwardAngleRadians) *
      Math.cos(leftRightAngleRadians);
    forceY =
      throttle *
      Math.sin(forwardBackwardAngleRadians) *
      Math.sin(leftRightAngleRadians);
    forceZ = throttle * Math.cos(forwardBackwardAngleRadians);

    // Apply limits to forceZ
  } else {
    // If no value is received, display "No value read"
    console.log("No value received.");
    document.getElementById("receivedData").textContent = "No value read";
  }

  // Update the content of the Statistics div with the computed sums
  const statisticsDiv = document.querySelector(".statistics");
  statisticsDiv.innerHTML = "\n";
  /*
  for (let i = 0; i < lineSums.length; i++) {
    statisticsDiv.innerHTML += `Line ${i + 1} sum: ${lineSums[i]} <br> `;
  }
  */
  if (justStoppedBraking == true) {
    forceX = 0;
    forceY = 0;
    forceZ = gravForce;
    throttle = gravForce;
    forBackAngle = 0;
    leftRightAngle = savedLeftRightAngle;
  } else if (stopping == true || brakes == true) {
    /* case 1: 

You want to stop in place */

    forceX = -mass * velocityX * 1.5;
    forceY = -mass * velocityY * 1.5;
    forceZ = -mass * velocityZ * 1.5 + gravForce;
    if (forceX - airResistanceX < -maxGs * mass) {
      forceX = -maxGs * mass + airResistanceX;
    }
    if (forceX - airResistanceX > maxGs * mass) {
      forceX = maxGs * mass + airResistanceX;
    }
    if (forceY - airResistanceY < -maxGs * mass) {
      forceY = -maxGs * mass + airResistanceY;
    }
    if (forceY - airResistanceY > maxGs * mass) {
      forceY = maxGs * mass + airResistanceY;
    }
    if (forceZ - airResistanceZ < -maxGs * mass + gravForce) {
      forceZ = -maxGs * mass + airResistanceZ + gravForce;
    }
    if (forceZ - airResistanceZ > maxGs * mass + gravForce) {
      forceZ = maxGs * mass + airResistanceZ + gravForce;
    }
    if (forceZ < minforceZ) {
      forceZ = minforceZ;
    }
    if (forceZ < 0) {
      forceZ = 0;
    }
    if (
      Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ) > maxForce
    ) {
      let factor =
        Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ) /
        maxForce;
      forceX = forceX / factor;
      forceY = forceY / factor;
      forceZ = forceZ / factor;
    }
    throttle = Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ);
    forBackAngle = (Math.acos(forceZ / throttle) * 180) / Math.PI;
    let azimuthalAngle = Math.atan2(forceY, forceX);
    azimuthalAngle = (azimuthalAngle * 180) / Math.PI;
    leftRightAngle = azimuthalAngle; //oppose xy velocity
  } else if (going == true && velocityZ < -1) {
    /* case 2: 

You want to accelerate in the same direction (just not hit the ground)*/

    if (forceZ < minforceZ) {
      if (throttle < minforceZ) {
        throttle = minforceZ;
      }
      let forwardBackwardAngleRadians = Math.acos(minforceZ / throttle);
      forBackAngle = (forwardBackwardAngleRadians * 180) / Math.PI;
      let leftRightAngleRadians = (leftRightAngle * Math.PI) / 180;
      forceX =
        throttle *
        Math.sin(forwardBackwardAngleRadians) *
        Math.cos(leftRightAngleRadians);
      forceY =
        throttle *
        Math.sin(forwardBackwardAngleRadians) *
        Math.sin(leftRightAngleRadians);
      forceZ = throttle * Math.cos(forwardBackwardAngleRadians);
    }
  } else if (gliding == true) {
    /* case 3: 

You want to glide in the same direction */
    if (velocityZ >= 0) {
      throttle = 0;
    } else {
      throttle = -mass * velocityZ + gravForce;
      if (throttle < minforceZ) {
        throttle = minforceZ;
      }
      if (throttle > maxForce) {
        throttle = maxForce;
      }

      forBackAngle = 0;
      forceZ = throttle;
      forceX = 0;
      forceY = 0;
    }
  } else if (landing == true) {
    /* case 4: 
  
You want to land */

    if (minforceZ > maxForce) {
      forBackAngle = 0;
      throttle = maxForce;
    } else if (minforceZ < 0) {
      forceZ = 0;
      if (forceZ - airResistanceZ < -maxGs * mass + gravForce) {
        forceZ = -maxGs * mass + airResistanceZ + gravForce;
      }
      if (forceZ - airResistanceZ > maxGs * mass + gravForce) {
        forceZ = maxGs * mass + airResistanceZ + gravForce;
      }
      if (forceZ < 0) {
        forceZ = 0;
      }
      let Fxy = Math.sqrt(maxForce * maxForce - forceZ * forceZ);
      forceX = -mass * velocityX;
      forceY = -mass * velocityY;
      if (forceX - airResistanceX < -maxGs * mass) {
        forceX = -maxGs * mass + airResistanceX;
      }
      if (forceX - airResistanceX > maxGs * mass) {
        forceX = maxGs * mass + airResistanceX;
      }
      if (forceY - airResistanceY < -maxGs * mass) {
        forceY = -maxGs * mass + airResistanceY;
      }
      if (forceY - airResistanceY > maxGs * mass) {
        forceY = maxGs * mass + airResistanceY;
      }

      if (Math.sqrt(forceX * forceX + forceY * forceY) > Fxy) {
        let factor = Math.sqrt(forceX * forceX + forceY * forceY) / Fxy;
        forceX = forceX / factor;
        forceY = forceY / factor;
      }
      throttle = Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ);
      forBackAngle = 90;
      let azimuthalAngle = Math.atan2(forceY, forceX);
      azimuthalAngle = (azimuthalAngle * 180) / Math.PI;
      leftRightAngle = azimuthalAngle; //oppose xy velocity
    } else {
      forceZ = minforceZ;
      let Fxy = Math.sqrt(maxForce * maxForce - forceZ * forceZ);
      forceX = -mass * velocityX;
      forceY = -mass * velocityY;
      if (forceX - airResistanceX < -maxGs * mass) {
        forceX = -maxGs * mass + airResistanceX;
      }
      if (forceX - airResistanceX > maxGs * mass) {
        forceX = maxGs * mass + airResistanceX;
      }
      if (forceY - airResistanceY < -maxGs * mass) {
        forceY = -maxGs * mass + airResistanceY;
      }
      if (forceY - airResistanceY > maxGs * mass) {
        forceY = maxGs * mass + airResistanceY;
      }
      if (Math.sqrt(forceX * forceX + forceY * forceY) > Fxy) {
        let factor = Math.sqrt(forceX * forceX + forceY * forceY) / Fxy;
        forceX = forceX / factor;
        forceY = forceY / factor;
      }
      throttle = Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ);
      forBackAngle = (Math.acos(forceZ / throttle) * 180) / Math.PI;
      let azimuthalAngle = Math.atan2(forceY, forceX);
      azimuthalAngle = (azimuthalAngle * 180) / Math.PI;
      leftRightAngle = azimuthalAngle; //oppose xy velocity
    }
  } else if (homing == true) {
    if (minforceZ > maxForce) {
      forBackAngle = 0;
      throttle = maxForce;
    } else {
      forceZ =
        minforceZ +
        40 * Math.sqrt(Math.sqrt(distanceX ** 2 + distanceY ** 2)) -
        distanceZ / 3;

      if (forceZ - airResistanceZ < -maxGs * mass + gravForce) {
        forceZ = -maxGs * mass + airResistanceZ + gravForce;
      }
      if (forceZ - airResistanceZ > maxGs * mass + gravForce) {
        forceZ = maxGs * mass + airResistanceZ + gravForce;
      }
      if (forceZ < 0) {
        forceZ = 0;
      }
      if (forceZ > maxForce) {
        forceZ = maxForce;
      }
      let Fxy = Math.sqrt(maxForce * maxForce - forceZ * forceZ);
      forceX = (-mass * distanceX) / 10 + (-mass * velocityX) / 1.7;
      forceY = (-mass * distanceY) / 10 + (-mass * velocityY) / 1.7;
      if (forceX - airResistanceX < -maxGs * mass) {
        forceX = -maxGs * mass + airResistanceX;
      }
      if (forceX - airResistanceX > maxGs * mass) {
        forceX = maxGs * mass + airResistanceX;
      }
      if (forceY - airResistanceY < -maxGs * mass) {
        forceY = -maxGs * mass + airResistanceY;
      }
      if (forceY - airResistanceY > maxGs * mass) {
        forceY = maxGs * mass + airResistanceY;
      }
      if (Math.sqrt(forceX * forceX + forceY * forceY) > Fxy) {
        let factor = Math.sqrt(forceX * forceX + forceY * forceY) / Fxy;
        forceX = forceX / factor;
        forceY = forceY / factor;
      }
      throttle = Math.sqrt(forceX * forceX + forceY * forceY + forceZ * forceZ);
      forBackAngle = (Math.acos(forceZ / throttle) * 180) / Math.PI;
      let azimuthalAngle = Math.atan2(forceY, forceX);
      azimuthalAngle = (azimuthalAngle * 180) / Math.PI;
      leftRightAngle = azimuthalAngle; //oppose xy velocity
    }
  }
  //take velmag, and calculate the force with that
  let totalAirResistance =
    0.5 * airDensity * velMag ** 2 * crossSectionalArea * dragCoefficient;

  // Calculate the air resistances based on the components compared to velMag
  if (velMag !== 0) {
    airResistanceX = (velocityX / velMag) * totalAirResistance;
    airResistanceY = (velocityY / velMag) * totalAirResistance;
    airResistanceZ = (velocityZ / velMag) * totalAirResistance;
  } else {
    // Handle the case when velMag is 0 to avoid division by zero
    airResistanceX = 0;
    airResistanceY = 0;
    airResistanceZ = 0;
  }

  terminalVelocity = Math.sqrt(
    (2 * (maxForce + gravForce)) /
      (airDensity * crossSectionalArea * dragCoefficient)
  );
  if (distanceZ < 0.5) {
    throttle = gravForce + 10;
    forBackAngle = 0;
    forceZ = throttle;
    forceX = 0;
    forceY = 0;
  }
  accelerationX = (forceX - airResistanceX) / mass;
  accelerationY = (forceY - airResistanceY) / mass;
  accelerationZ = (forceZ - gravForce - airResistanceZ) / mass;
  velocityX += accelerationX / 10;
  velocityY += accelerationY / 10;
  velocityZ += accelerationZ / 10;
  distanceX += velocityX / 10;
  distanceY += velocityY / 10;
  distanceZ += velocityZ / 10;
  time += 0.1; // Update myChart1
  velMag = Math.sqrt(velocityX ** 2 + velocityY ** 2 + velocityZ ** 2);
  totalDistance += velMag / 10000;

  if (number == 1) {
    // Update the 3D scatter plot
    xData.push(distanceX);
    yData.push(distanceY); // Swap y and z calculations
    zData.push(distanceZ); // Swap y and z calculations

    // Increment counter
    counterValue += 0.1;

    // Update the 3D scatter plot
    create3DPlot();
    number = 0;
  }
  number += 1;

  statisticsDiv.innerHTML += `Min Force Z: ${minforceZ.toFixed(0)} Newtons<br>`;
  statisticsDiv.innerHTML += `Gravitational Force: ${gravForce.toFixed(
    0
  )} Newtons<br>`;
  statisticsDiv.innerHTML += `Terminal Velocity: ${terminalVelocity.toFixed(
    0
  )} m/s(${(terminalVelocity * 3.6).toFixed(0)} km/h)<br>`;
  statisticsDiv.innerHTML += `<br>Time: ${time.toFixed(1)} Seconds<br>`;
  statisticsDiv.innerHTML += `<br>Total Force: ${throttle.toFixed(
    0
  )} Newtons<br>`;
  statisticsDiv.innerHTML += `Angle (Forward): ${forBackAngle.toFixed(
    0
  )} Degrees<br>`;
  statisticsDiv.innerHTML += `Angle (Right): ${leftRightAngle.toFixed(
    0
  )} Degrees<br>`;
  statisticsDiv.innerHTML += `<br>Force:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Air Resistance:<br>`;

  if (forceX >= 1000) {
    statisticsDiv.innerHTML += `X: ${forceX.toFixed(
      0
    )} &emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else if (forceX >= 100) {
    statisticsDiv.innerHTML += `X: ${forceX.toFixed(
      0
    )} &nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else if (forceX >= 10) {
    statisticsDiv.innerHTML += `X: ${forceX.toFixed(
      0
    )} &nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else if (forceX >= 0) {
    statisticsDiv.innerHTML += `X: ${forceX.toFixed(
      0
    )} &nbsp;&nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else if (forceX >= -9) {
    statisticsDiv.innerHTML += `X:${forceX.toFixed(
      0
    )} &nbsp;&nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else if (forceX >= -99) {
    statisticsDiv.innerHTML += `X:${forceX.toFixed(
      0
    )} &nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else if (forceX >= -999) {
    statisticsDiv.innerHTML += `X:${forceX.toFixed(
      0
    )} &nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  } else {
    statisticsDiv.innerHTML += `X:${forceX.toFixed(
      0
    )} &emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;X: ${airResistanceX.toFixed(
      0
    )} N<br>`;
  }

  if (forceY >= 1000) {
    statisticsDiv.innerHTML += `Y: ${forceY.toFixed(
      0
    )} &emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else if (forceY >= 100) {
    statisticsDiv.innerHTML += `Y: ${forceY.toFixed(
      0
    )} &nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else if (forceY >= 10) {
    statisticsDiv.innerHTML += `Y: ${forceY.toFixed(
      0
    )} &nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else if (forceY >= 0) {
    statisticsDiv.innerHTML += `Y: ${forceY.toFixed(
      0
    )} &nbsp;&nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else if (forceY >= -9) {
    statisticsDiv.innerHTML += `Y:${forceY.toFixed(
      0
    )} &nbsp;&nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else if (forceY >= -99) {
    statisticsDiv.innerHTML += `Y:${forceY.toFixed(
      0
    )} &nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else if (forceY >= -999) {
    statisticsDiv.innerHTML += `Y:${forceY.toFixed(
      0
    )} &nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  } else {
    statisticsDiv.innerHTML += `Y:${forceY.toFixed(
      0
    )} &emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Y: ${airResistanceY.toFixed(
      0
    )} N<br>`;
  }

  if (forceZ >= 1000) {
    statisticsDiv.innerHTML += `Z: ${forceZ.toFixed(
      0
    )} &emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else if (forceZ >= 100) {
    statisticsDiv.innerHTML += `Z: ${forceZ.toFixed(
      0
    )} &nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else if (forceZ >= 10) {
    statisticsDiv.innerHTML += `Z: ${forceZ.toFixed(
      0
    )} &nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else if (forceZ >= 0) {
    statisticsDiv.innerHTML += `Z: ${forceZ.toFixed(
      0
    )} &nbsp;&nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else if (forceZ >= -9) {
    statisticsDiv.innerHTML += `Z:${forceZ.toFixed(
      0
    )} &nbsp;&nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else if (forceZ >= -99) {
    statisticsDiv.innerHTML += `Z:${forceZ.toFixed(
      0
    )} &nbsp;&nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else if (forceZ >= -999) {
    statisticsDiv.innerHTML += `Z:${forceZ.toFixed(
      0
    )} &nbsp;&emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  } else {
    statisticsDiv.innerHTML += `Z:${forceZ.toFixed(
      0
    )} &emsp;N&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;Z: ${airResistanceZ.toFixed(
      0
    )} N<br><br>`;
  }
  statisticsDiv.innerHTML += `Acceleration:&emsp;&emsp;&emsp;&emsp;Velocity:<br>`;
  if (accelerationX >= 1000) {
    statisticsDiv.innerHTML += `X: ${accelerationX.toFixed(
      1
    )} m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(1)} m/s<br>`;
  } else if (accelerationX >= 100) {
    statisticsDiv.innerHTML += `X: ${accelerationX.toFixed(
      1
    )} &nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(1)} m/s<br>`;
  } else if (accelerationX >= 10) {
    statisticsDiv.innerHTML += `X: ${accelerationX.toFixed(
      1
    )} &nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationX >= 0) {
    statisticsDiv.innerHTML += `X: ${accelerationX.toFixed(
      1
    )} &nbsp;&nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationX >= -9) {
    statisticsDiv.innerHTML += `X:${accelerationX.toFixed(
      1
    )} &nbsp;&nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationX >= -99) {
    statisticsDiv.innerHTML += `X:${accelerationX.toFixed(
      1
    )} &nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationX >= -999) {
    statisticsDiv.innerHTML += `X:${accelerationX.toFixed(
      1
    )} &nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(1)} m/s<br>`;
  } else {
    statisticsDiv.innerHTML += `X:${accelerationX.toFixed(
      1
    )} m/s^2&emsp;&emsp;&emsp;&emsp;X: ${velocityX.toFixed(1)} m/s<br>`;
  }
  /*CONTINUE THE FORMATTING*/
  if (accelerationY >= 1000) {
    statisticsDiv.innerHTML += `Y: ${accelerationY.toFixed(
      1
    )} m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(1)} m/s<br>`;
  } else if (accelerationY >= 100) {
    statisticsDiv.innerHTML += `Y: ${accelerationY.toFixed(
      1
    )} &nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(1)} m/s<br>`;
  } else if (accelerationY >= 10) {
    statisticsDiv.innerHTML += `Y: ${accelerationY.toFixed(
      1
    )} &nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationY >= 0) {
    statisticsDiv.innerHTML += `Y: ${accelerationY.toFixed(
      1
    )} &nbsp;&nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationY >= -9) {
    statisticsDiv.innerHTML += `Y:${accelerationY.toFixed(
      1
    )} &nbsp;&nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationY >= -99) {
    statisticsDiv.innerHTML += `Y:${accelerationY.toFixed(
      1
    )} &nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(
      1
    )} m/s<br>`;
  } else if (accelerationY >= -999) {
    statisticsDiv.innerHTML += `Y:${accelerationY.toFixed(
      1
    )} &nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(1)} m/s<br>`;
  } else {
    statisticsDiv.innerHTML += `Y:${accelerationY.toFixed(
      1
    )} m/s^2&emsp;&emsp;&emsp;&emsp;Y: ${velocityY.toFixed(1)} m/s<br>`;
  }
  if (accelerationZ >= 1000) {
    statisticsDiv.innerHTML += `Z: ${accelerationZ.toFixed(
      1
    )} m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(1)} m/s<br><br>`;
  } else if (accelerationZ >= 100) {
    statisticsDiv.innerHTML += `Z: ${accelerationZ.toFixed(
      1
    )} &nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(
      1
    )} m/s<br><br>`;
  } else if (accelerationZ >= 10) {
    statisticsDiv.innerHTML += `Z: ${accelerationZ.toFixed(
      1
    )} &nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(
      1
    )} m/s<br><br>`;
  } else if (accelerationZ >= 0) {
    statisticsDiv.innerHTML += `Z: ${accelerationZ.toFixed(
      1
    )} &nbsp;&nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(
      1
    )} m/s<br><br>`;
  } else if (accelerationZ >= -9) {
    statisticsDiv.innerHTML += `Z:${accelerationZ.toFixed(
      1
    )} &nbsp;&nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(
      1
    )} m/s<br><br>`;
  } else if (accelerationZ >= -99) {
    statisticsDiv.innerHTML += `Z:${accelerationZ.toFixed(
      1
    )} &nbsp;&nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(
      1
    )} m/s<br><br>`;
  } else if (accelerationZ >= -999) {
    statisticsDiv.innerHTML += `Z:${accelerationZ.toFixed(
      1
    )} &nbsp;m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(
      1
    )} m/s<br><br>`;
  } else {
    statisticsDiv.innerHTML += `Z:${accelerationZ.toFixed(
      1
    )} m/s^2&emsp;&emsp;&emsp;&emsp;Z: ${velocityZ.toFixed(1)} m/s<br><br>`;
  }
  statisticsDiv.innerHTML += `Position (X,Y,Z):&emsp;Speed: ${velMag.toFixed(
    0
  )} (m/s)<br>`;
  statisticsDiv.innerHTML += `<br>( ${distanceX.toFixed(
    1
  )}, ${distanceY.toFixed(1)}, ${distanceZ.toFixed(
    1
  )} )<br><br>Distance: ${totalDistance.toFixed(1)} Km`;
}

async function reset() {
  accelerationX = 0;
  accelerationY = 0;
  accelerationZ = 0;
  velocityX = 0;
  velocityY = 0;
  velocityZ = 0;
  distanceX = 0;
  distanceY = 0;
  distanceZ = 0;
  time = 0;
  counterValue = 0;
  totalDistance = 0;

  xData = [];
  yData = [];
  zData = [];
  clear3DPlot();
  going = true;
  stopping = false;
  landing = false;
  gliding = false;
  homing = false;
}
