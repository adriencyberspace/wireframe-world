import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* ----- BASE ----- */
// Canvas
const canvas = document.querySelector('canvas.webgl')

const fov = 40
const aspect = 1920/ 1080
const near = 1.0
const far = 1000


// Scene
const scene = new THREE.Scene()

// Plane
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 300, 300),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
)
plane.rotation.x = -Math.PI / 2;
scene.add(plane)

// Object

const group = new THREE.Group()
// group.position.y = 2
// group.rotation.y = 0
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
)
cube1.position.x = -3
cube1.position.y = 2
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
)
cube2.position.x = -1.5
cube2.position.y = 3
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
)
cube3.position.x = 0
cube3.position.y = 4
group.add(cube3)

const cube4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
)
cube4.position.x = 1.5
cube4.position.y = 3
group.add(cube4)

const cube5 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
)
cube5.position.x = 3
cube5.position.y = 2
group.add(cube5)

// Sphere / Sun
const geometry = new THREE.SphereGeometry( 5, 32, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.set(50, 50, -200)
scene.add( sphere );

// Rotations
// cube1.rotation.z = Math.PI * .25
// cube2.rotation.y = Math.PI * .25
// cube3.rotation.x = Math.PI * .25

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Axes Helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/* ----- RESIZE SCREEN ----- */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})


/* ----- CAMERA ----- */
// Base camera
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, .5, 25)
camera.lookAt(group)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* ----- RENDERER ----- */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor( 0x0000ff, 1)

/* ----- ANIMATE ----- */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()