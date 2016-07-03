(function () {

  var scene;
  var camera;
  var renderer;
  var light;
  var spotLight;
  var geometry;
  var material;
  var cube;

  function init () {
    createScene();
    renderScene();

    createCube();
    createPlane();

    // createLight();
    createSpotLight();

    render();
    // animate();
  }

  function createScene () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    var axis = new THREE.AxisHelper(10);
    scene.add(axis);

    var grid = new THREE.GridHelper(50, 5, 0xFFFFFF);
    scene.add(grid);
  }

  function renderScene () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    render.shadowMapSoft = true;
    document.body.appendChild(renderer.domElement);
  }

  function createLight () {
    light = new THREE.PointLight(0xffffff, 1, 80);
    light.position.set(5, 8, 5);
    scene.add(light);
  }

  function createSpotLight () {
    spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.castShadow = true;
    spotLight.position.set(15, 30, 50);

    scene.add(spotLight);
  }

  function createCube () {
    cubeGeometry = new THREE.BoxGeometry( 5, 5, 5 );
    // cubeMaterial = new THREE.MeshLambertMaterial({color: 0xfff000});
    cubeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/logo.jpg') });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = 2.5;
    cube.position.y = 2.5;
    cube.position.z = 2.5;
    cube.castShadow = true;

    scene.add(cube);
  }

  function createPlane () {
    var planeGeometry = new THREE.PlaneGeometry(30, 30, 30);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0x0E7C28});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;

    scene.add(plane);
  }

  function render() {
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 20;

    camera.lookAt(scene.position);

  	requestAnimationFrame(render);
  	renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  init();

}());
