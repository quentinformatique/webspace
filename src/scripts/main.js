import '../style/style.css'
import * as THREE from 'three'
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera
camera.position.setZ(20);
renderer.render(scene, camera)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 250, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(pointLight, ambientLight);

// helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// add stars
function addStarts() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial( { color: 0xfffec8, } );
    const star = new THREE.Mesh(geometry, material);

    // generate random positions for the stars
    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}
// change the number top change the stars numbers
Array(400).fill().forEach(addStarts);

// space background
const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
scene.background = spaceTexture;

// Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: normalTexture,
    })
);

scene.add(earth);
earth.position.z = 0;
earth.position.setX(0);



function animate() {
    requestAnimationFrame( animate ) ;
    earth.rotation.y += 0.001

    controls.update();
    renderer.render(scene, camera );
}

animate()