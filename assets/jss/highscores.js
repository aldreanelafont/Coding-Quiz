function printHighscores() {

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    for (var i = 0; i < highscores.length; i++) {
      var scoreLi = document.createElement("li");
      scoreLi.textContent = highscores[i].initials + ": " + highscores[i].highscore;

      var olEl = document.getElementById("highscores");
      olEl.appendChild(scoreLi);
    }

  }
  
  

  function clearHighscores() {
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  var resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", function () {
    clearHighscores();
  })

  printHighscores();

