//CONNECTION OF THE GLOVE//

// Call the connect function when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded.");

  // Add this code to add the 'animate' class once the DOM content is loaded
  var containerWrapper = document.querySelector(".container-wrapper");
  console.log(containerWrapper); // Check if .container-wrapper element is found

  changeTheme("Neon");

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

let xData = [];
let yData = [];
let zData = [];

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
