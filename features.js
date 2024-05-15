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
