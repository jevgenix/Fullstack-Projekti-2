const selectFilter = document.querySelector(".select-filter");

selectFilter.addEventListener("click", filter);

function filter(event) {
  event.preventDefault();
  switch (event.target.value) {
    case "select-history":
      console.log("gaming history selected");
      table_element.style.display = "flex";
      scoreboard_element.style.display = "none";
      break;
    case "select-scoreboard":
      console.log("scoreboard selected");
      scoreboard_element.style.display = "flex";
      table_element.style.display = "none";
      break;
  }
}
