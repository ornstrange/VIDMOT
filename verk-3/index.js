// SETTINGS
const width     = window.innerWidth;
      height    = window.innerHeight,
      viewAngle = 45,
      aspect    = width / height,
      near      = 0.1,
      far       = 10000;

// ANIMATEABLES
var lightZ = -300;

// SETUP
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  viewAngle,
  aspect,
  near,
  far
);
const scene = new THREE.Scene();
scene.add(camera);
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

// MATERIALS
const SphereMaterial =
  new THREE.MeshLambertMaterial({
    color: 0xF12300
  });

// LIGHTS
const PointLight = new THREE.PointLight(0xFFFFFF);
PointLight.position.x = 10;
PointLight.position.y = 50;
PointLight.position.z = -300;
scene.add(PointLight);

// SPHERE OBJECT
const RADIUS    = 50;
const SEGMENTS  = 16;
const RINGS     = 16;

const Sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    RADIUS,
    SEGMENTS,
    RINGS),
  SphereMaterial
);
Sphere.position.z = -300;
scene.add(Sphere);

// RENDER
function render() {
  renderer.render(scene, camera);
  PointLight.position.z = lightZ;
  if (lightZ >= 0) { lightZ = -300 }
  else { lightZ += 1 }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);