var container;
var camera,
  scene,
  renderer,
  camera2,
  scene2,
  renderer2,
  camera3,
  scene3,
  renderer3,
  camera4,
  scene4,
  renderer4;
var uniforms;

init();
animate();

function init() {
  container1 = document.getElementById("circle1");
  container2 = document.getElementById("circle2");
  container3 = document.getElementById("circle3");
  container4 = document.getElementById("circle4");

  camera = new THREE.Camera();
  camera.position.z = 1;

  camera2 = new THREE.Camera();
  camera2.position.z = 1;

  camera3 = new THREE.Camera();
  camera3.position.z = 1;

  camera4 = new THREE.Camera();
  camera4.position.z = 1;

  scene = new THREE.Scene();
  scene2 = new THREE.Scene();
  scene3 = new THREE.Scene();
  scene4 = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(2, 2);

  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
  };

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent
  });

  var material2 = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader2").textContent
  });

  var material3 = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader3").textContent
  });

  var material4 = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader4").textContent
  });

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var mesh2 = new THREE.Mesh(geometry, material2);
  scene2.add(mesh2);

  var mesh3 = new THREE.Mesh(geometry, material3);
  scene3.add(mesh3);

  var mesh4 = new THREE.Mesh(geometry, material4);
  scene4.add(mesh4);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer2 = new THREE.WebGLRenderer();
  renderer2.setPixelRatio(window.devicePixelRatio);

  renderer3 = new THREE.WebGLRenderer();
  renderer3.setPixelRatio(window.devicePixelRatio);

  renderer4 = new THREE.WebGLRenderer();
  renderer4.setPixelRatio(window.devicePixelRatio);

  container1.appendChild(renderer.domElement);
  container2.appendChild(renderer2.domElement);
  container3.appendChild(renderer3.domElement);
  container4.appendChild(renderer4.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.onmousemove = function(e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };
}

function onWindowResize(event) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer3.setSize(window.innerWidth, window.innerHeight);
  renderer4.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += 0.05;
  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);
  renderer3.render(scene3, camera3);
  renderer4.render(scene4, camera4);
}
