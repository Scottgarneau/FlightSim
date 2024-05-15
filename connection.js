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
