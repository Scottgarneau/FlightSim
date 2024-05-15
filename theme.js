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
