import App from "./app.js";

const main = () => {
  let app = new App();
  app.addDropListeners(app.col_todo);
  app.addDropListeners(app.col_doing);
  app.addDropListeners(app.col_done);  
  /* You can add cards to the board here so you don't have to type them all in every time the page refreshes. Here are a few examples: */
  document.addEventListener("DOMContentLoaded", () => {
    let themeButton = document.getElementById("toggle-theme");
    let html = document.querySelector("html");
    let colorInput = document.getElementById("cardColor");
    const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      themeButton.innerHTML = "<span class=\"material-symbols-outlined\">clear_night</span>";
      colorInput.setAttribute("value","#FFFFFF");
    } else if (theme === "light") {
      html.setAttribute("data-theme", "light");
      themeButton.innerHTML = "<span class=\"material-symbols-outlined\">clear_day</span>";
      colorInput.setAttribute("value","#000000");
    } else if (systemSettingLight.matches) {
      html.setAttribute("data-theme", "light");
      themeButton.innerHTML = "<span class=\"material-symbols-outlined\">clear_day</span>";
      colorInput.setAttribute("value","#000000");
    } else {
      html.setAttribute("data-theme", "dark");
      themeButton.innerHTML = "<span class=\"material-symbols-outlined\">clear_night</span>";
      colorInput.setAttribute("value","#FFFFFF");
    }

    themeButton.addEventListener("click", () => {
      if (html.getAttribute("data-theme") === "light") {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        colorInput.setAttribute("value","#FFFFFF");
        themeButton.innerHTML = "<span class=\"material-symbols-outlined\">clear_night</span>";
      } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeButton.innerHTML = "<span class=\"material-symbols-outlined\">clear_day</span>";
        colorInput.setAttribute("value","#000000");
      }
    });

  });

  
};
main();
