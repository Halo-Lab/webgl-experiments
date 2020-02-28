import * as THREE from "three";
import picture from "../img/fox.jpg";
import displacement from "../img/displacement.png";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import * as dat from "dat.gui";

import { TimelineMax } from "gsap";
let OrbitControls = require("three-orbit-controls")(THREE);

export default class Sketch {
  constructor(selector) {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);

    this.container = document.getElementById("container");
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.raycaster = new THREE.Raycaster();

    this.camera.position.set(0, 0, 1);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;

    this.paused = false;

    this.setupResize();

    this.addObjects();
    this.resize();
    this.render();
    // this.settings();

    this.mouseEvent();
  }

  mouseEvent() {
    let that = this;
    this.mouse = new THREE.Vector2();

    function onMouseMove(event) {
      that.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      that.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // update the picking ray with the camera and mouse position
      that.raycaster.setFromCamera(that.mouse, that.camera);

      // calculate objects intersecting the picking ray
      var intersects = that.raycaster.intersectObjects(that.scene.children);

      if (intersects.length > 0) {
        that.material.uniforms.mouse.value = intersects[0].point;
      }
    }

    window.addEventListener("mousemove", onMouseMove, false);
  }

  settings() {
    let that = this;
    this.settings = {
      time: 0,
      progress: 0
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.01);
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.imageAspect = 2110 / 3165;
    let a1;
    let a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable"
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: {
          type: "f",
          value: 0
        },
        progress: {
          type: "f",
          value: 0
        },
        mouse: {
          type: "v3",
          value: new THREE.Vector3()
        },
        image: {
          type: "t",
          value: new THREE.TextureLoader().load(picture)
        },
        displacement: {
          type: "t",
          value: new THREE.TextureLoader().load(displacement)
        },
        resolution: {
          typ: "v4",
          value: new THREE.Vector4()
        },
        uvRate1: {
          value: new THREE.Vector2(1, 1)
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.paused = true;
  }

  play() {
    this.paused = false;
    this.render();
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}

new Sketch("container");
