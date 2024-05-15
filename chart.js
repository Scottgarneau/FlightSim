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
