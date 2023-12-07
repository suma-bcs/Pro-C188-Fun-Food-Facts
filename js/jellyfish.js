AFRAME.registerComponent("jellyfish", {
  init: function () {
    for (var i = 0; i < 50; i++) {
      var id = `jelly${i}`;

      var posX = (Math.random() * 200 + (-100));
      var posY = (Math.random() * 3 + (9));
      var posZ = (Math.random() * 200 + (-100));
      var position = { x: posX, y: posY, z: posZ };

      this.create_jelly(id, position);
    }
  },
  create_jelly(id, position) {
    var jelly = document.createElement("a-entity");
    jelly.setAttribute("id", id);
    jelly.setAttribute("class", "jelly")
    jelly.setAttribute("position", position);

    var scale = 0.01;
    jelly.setAttribute("scale", { x: scale, y: scale, z: scale });

    jelly.setAttribute("gltf-model", "./assets/jellyfish/scene.gltf");
    jelly.setAttribute("static-body", {position});

    jelly.setAttribute("gameplay", { elementId: `#${id}` });

    var scene = document.querySelector("#scene");
    scene.appendChild(jelly);
  }
});

AFRAME.registerComponent("jellyfish-shoot", {
  schema: {
    times: {type:"number", default:0}
  },
  init: function () {
    setInterval(this.shootBullet, 20000);
  },
  shootBullet: function () {
    var els = document.querySelectorAll(".jelly");

    for (var i = 0; i < els.length; i++) {
      var jellyStingC = document.createElement("a-entity");
      var jellySting = document.createElement("a-entity");

      jellyStingC.setAttribute("geometry", {
        primitive: "sphere",
        radius: 0.5,
      });
      jellySting.setAttribute("geometry", {
        primitive: "sphere",
        radius: 0.5,
      });

      jellySting.setAttribute("material", { src: "./assets/ball.png" });
      jellyStingC.setAttribute("material",{opacity:0})

      var pos = els[i].getAttribute("position")

      jellyStingC.setAttribute("position", {
        x: pos.x + 1.5,
        y: pos.y+5,
        z: pos.z,
      });
      jellySting.setAttribute("position", {
        x: pos.x + 1.5,
        y: pos.y,
        z: pos.z,
      });

      var scene = document.querySelector("#scene");
      scene.appendChild(jellyStingC);
      scene.appendChild(jellySting);

      var jelly = els[i].object3D;
      var player = document.querySelector("#collider").object3D;

      var pos1 = new THREE.Vector3();
      var pos2 = new THREE.Vector3();

      player.getWorldPosition(pos1);
      jelly.getWorldPosition(pos2);

      var direction = new THREE.Vector3();
      direction.subVectors(pos1, pos2).normalize();

      jellyStingC.setAttribute("velocity", direction.multiplyScalar(10));
      jellyStingC.setAttribute("dynamic-body", { mass: 0, shape: "sphere" });
      jellySting.setAttribute("velocity", direction.multiplyScalar(1));

      var countLife = document.querySelector("#lives");
      var countLifeInt = parseInt(countLife.getAttribute("text").value);

      jellyStingC.addEventListener("collide", function (e) {
        if (e.detail.body.el.id === "collider") {
          if (countLifeInt > 0) {
            countLifeInt -= 1;
            countLife.setAttribute("text", { value: countLifeInt });
          }
          if (countLifeInt <= 0) {
            var text = document.querySelector("#gameover");
            text.setAttribute("visible", true)

            var jelly = document.querySelectorAll(".jelly")
            for (var i = 0; i < jelly.length; i++) {
              scene.removeChild(jelly[i]);
            }
          }
        }
      });
    }
  },

});