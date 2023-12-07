AFRAME.registerComponent("gameplay", {
  schema: {
    elementId: { type: 'string', default: "" },
    times: {type:"number", default:0}
  },
  init: function () {
    var dur = 300;
    var timerEl = document.querySelector("#timer");
    this.startTimer(dur, timerEl);
  },
  startTimer: function (dur, timerEl) {
    var min, sec;
    var gameState = this.data.gameState;
    setInterval(() => {
      gameState = this.data.gameState;
      if (dur >= 0) {
        min = parseInt(dur / 60);
        sec = parseInt(dur % 60);
        if (min < 10) { min = "0" + min };
        if (sec < 10) { sec = "0" + sec };
        timerEl.setAttribute("text", { value: min + ":" + sec });
        dur -= 1;
      } else {
        this.gameOver();
      };
    }, 1000);
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },
  isCollided: function (elementId) {
    const element = document.querySelector(elementId);
    element.addEventListener("collide", (e) => {
      if(this.data.times === 0){
        if (elementId.includes("#jelly")) {
          document.getElementById("scene").removeChild(element);
          this.updateJellies();
          this.updateScore();
        }
      this.data.times = 1;
    }});
  },
  updateJellies: function () {
    var element = document.querySelector("#jellies");
    var count = element.getAttribute("text").value;

    var jelly = parseInt(count);
    jelly -= 1;

    if (jelly === 0) {
      var textEl = document.querySelector("#gameover");
      textEl.setAttribute("visible", true);
      textEl.setAttribute("text", { value: "YOU WIN" });
    }

    element.setAttribute("text", { value: jelly });
  },
  updateScore: function () {
    var element = document.querySelector("#score");
    var count = element.getAttribute("text").value;

    var score = parseInt(count);
    score += 50;

    element.setAttribute("text", { value: score });
  },
  gameOver: function () {
    var textEl = document.querySelector("#gameover");
    textEl.setAttribute("visible", true);
  }
});