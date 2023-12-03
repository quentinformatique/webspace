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

// geometry
const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshStandardMaterial({ color: "#FFFFFF"});
const cone = new THREE.Mesh(geometry, material)

scene.add(cone);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// add stars
function addStarts() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff} );
    const star = new THREE.Mesh(geometry, material);

    // generate random positions for the stars
    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}
// change the number top change the stars numbers
Array(200).fill().forEach(addStarts);

function animate() {
    requestAnimationFrame( animate ) ;
    cone.rotation.x += 0.01
    cone.rotation.y += 0.005
    cone.rotation.z += 0.01

    controls.update();
    renderer.render(scene, camera );
}

animate()