import '../style/style.css'
import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera)

const geometry = new THREE.ConeGeometry(10, 30, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: "#FFFFFF"});

const cone = new THREE.Mesh(geometry, material)

scene.add(cone);

const pointLight = new THREE.PointLight(0xffffff)

function animate() {
    requestAnimationFrame( animate ) ;
    cone.rotation.x += 0.01
    cone.rotation.y += 0.05
    cone.rotation.z += 0.01

    renderer.render( scene, camera );
}

animate()