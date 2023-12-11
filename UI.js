function toggleImage() {
    var image = document.getElementById("howToPlay");
    var button = document.getElementById("controlsBtn")

    if (image.style.display === "none" || image.style.display === "") {
      image.style.display = "block";
      button.textContent = "Hide Controls"
    } else {
      image.style.display = "none";
      button.textContent = "Show Controls"
    }
  }