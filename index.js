import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
// const geometry = new THREE.SphereGeometry(80);
const material = new THREE.MeshPhongMaterial({ 
    color: 0x00ffff,
    shininess:1000,
    specular:0xffffff,
    side: THREE.DoubleSide,    
    transparent: true,//开启透明
    opacity: 0.5,//设置透明度
});
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0,10,0);
console.log('',mesh.position)
const ambient=new THREE.AmbientLight(0xfffff, 0.1)

const axesHelper = new THREE.AxesHelper(120);

const directionalLight=new THREE.DirectionalLight(0xfffff, 1.0);

directionalLight.position.set(50,200,300);

scene.add(ambient);
scene.add(directionalLight);
scene.add(mesh);
scene.add(axesHelper);

const width = window.innerWidth;
const height =window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 4000);

camera.position.set(200, 200, 200); 

camera.lookAt(0,0,0);


//GUI Setting
const gui=new GUI();
gui.domElement.style.right='0px';
gui.domElement.style.width='200px';
gui.domElement.style.height='500px';

const mat=gui.addFolder('Position');
const mat1=gui.addFolder('Attribute');

const obj={
    x:0,
    y:0,
    z:0,
    color:0x00ffff,
    bool: false,
  }
mat.add(mesh.position,'x',0,100).name('xAsix').step(2);
mat.add(obj,'y',0,100).name('yAsix').onChange(function(value){
    mesh.position.y=value;
    //renderer.render(scene, camera);
  });

mat.add(obj,'z',[0,100,200]);
mat.addFolder('subfolder');
mat.close();
//mat1 setting
mat1.add(ambient, 'intensity', 0, 2.0).name('环境光强度');
mat1.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度');
mat1.add(mesh.position,'x',{right:0,left:100,center:200}).name('位置');
gui.add(obj, 'bool').name('旋转动画');
mat1.addColor(obj, 'color').onChange(function(value){
    mesh.material.color.set(value);
    //renderer.render(scene, camera); 
});





const renderer = new THREE.WebGLRenderer({
    antialias:true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x444444)
  renderer.setSize(width, height);
  //renderer.render(scene, camera);
  
  document.body.appendChild(renderer.domElement);

  function render(){
    if (obj.bool) mesh.rotateY(0.01);
    renderer.render(scene,camera);
    requestAnimationFrame(render);
  }
  render();

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.update();
controls.addEventListener('change', function () {
  renderer.render(scene, camera);
  
});
window.onresize=function(){
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    //renderer.render(scene, camera);
  }



