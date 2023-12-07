AFRAME.registerComponent("player-movement", {
  init: function () {
    this.swim();
  },
  swim: function () {
    window.addEventListener("keydown", e => {
      var key = e.key;
      if (
        key === "w" || key === "W" ||
        key === "a" || key === "A" ||
        key === "s" || key === "S" ||
        key === "d" || key === "D"
      ) {
        var sound = document.querySelector("#swim");
        sound.components.sound.playSound();
      }
    })
  }
});

AFRAME.registerComponent("collider", {
  tick: function() {
    var colliderEl = document.getElementById("collider");
    var cameraPos = document.getElementById("camera-rig").getAttribute("position");
    colliderEl.setAttribute("position", {x: cameraPos.x, y: 10.5, z: cameraPos.z})
  }
})