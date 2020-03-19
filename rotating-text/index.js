let materialFirstCylinder, materialSecondCylinder;

const fullCircle = 2 * Math.PI;
const timing = 9;

// canvas conatiner
const container = document.getElementById("container");

// camera setup
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 350;
camera.position.y = 0;

// scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// light setup
const pointLight = new THREE.DirectionalLight(0xffffff, 1);
pointLight.position.set(100, 100, 500);
pointLight.target.position.set(0, -100, -100);
scene.add(pointLight);

new TweenMax.to(pointLight, 1, {
  intensity: 2,
  delay: 0
});

// 3D models wrapper container
let cylinderContainer = new THREE.Object3D();

// 3D model geometry
const geometry = new THREE.CylinderBufferGeometry(150, 150, 50, 32, 1, true);

// object materials
materialFirstCylinder = new THREE.MeshStandardMaterial({
  color: "#751414",
  transparent: true,
  side: THREE.DoubleSide,
  alphaTest: 0.5
});

materialSecondCylinder = new THREE.MeshStandardMaterial({
  color: "#005085",
  transparent: true,
  side: THREE.DoubleSide,
  alphaTest: 0.5
});

// text textures
let firstTex = document.createElement("canvas");
let firstContext = firstTex.getContext("2d");
let secondTex = document.createElement("canvas");
let secondContext = secondTex.getContext("2d");

firstTex.width = 4096;
secondTex.width = 3496;

firstTex.height = secondTex.height = 256;

firstContext.font = secondContext.font = "Bold 300px Gill Sans";

firstContext.fillStyle = secondContext.fillStyle = "white";

firstContext.fillText("FIRST FIRST FIRST FIRST FIRST ", 0, 240, 4096);
secondContext.fillText("TEXT TEXT TEXT TEXT ", 0, 240, 3496);

var firstTexture = new THREE.Texture(firstTex);
var secondTexture = new THREE.Texture(secondTex);

firstTexture.needsUpdate = secondTexture.needsUpdate = true;

materialFirstCylinder.alphaMap = firstTexture;
materialSecondCylinder.alphaMap = secondTexture;

materialFirstCylinder.alphaMap.magFilter = materialSecondCylinder.alphaMap.magFilter =
  THREE.NearestFilter;

materialFirstCylinder.alphaMap.wrapT = materialSecondCylinder.alphaMap.wrapT =
  THREE.RepeatWrapping;

materialFirstCylinder.alphaMap.repeat.y = materialSecondCylinder.alphaMap.repeat.y = 1;

// init objects
cylinder1 = new THREE.Mesh(geometry, materialFirstCylinder);
cylinder2 = new THREE.Mesh(geometry, materialSecondCylinder);

// add objects to main object wrapper
cylinderContainer.add(cylinder1);
cylinderContainer.add(cylinder2);

// positioning objects
cylinder1.position.y = 25;
cylinder2.position.y = -25;

// positioning main object wrapper
cylinderContainer.position.z = -300;
cylinderContainer.position.x = 0;
cylinderContainer.rotation.x = -Math.PI / 6;
cylinderContainer.rotation.y = Math.PI / 2;
cylinderContainer.rotation.z = Math.PI / 4;

// adding main object wrapper to scene
scene.add(cylinderContainer);

// animations (negative)
const tweenNegative = TweenMax.fromTo(
  [cylinder1.rotation, cylinder2.rotation],
  timing,
  {
    y: 0
  },
  {
    y: -fullCircle,
    repeat: -1,
    yoyo: false,
    ease: Power0.easeNone
  }
);

// WebGL renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// add canvas to dom
container.appendChild(renderer.domElement);

//
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
