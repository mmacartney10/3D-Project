(function () {

  var scene;
  var camera;
  var renderer;
  var controls;
  var light;
  var spotLight;
  var geometry;
  var material;
  var cube;

  var guiControls;

  var boxSize = 5;
  var planeSize = 30;

  function init () {
    createScene();
    renderScene();

    createCube();

    createPlane(true);
    // createPlane(false);

    // createLight();
    createSpotLight();

    createGUIControls();

    render();
    // animate();
    document.onkeydown = checkKey;
  }

  function createScene () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', render);

    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    // controls.enableZoom = false;

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
    cubeGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    cubeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/logo.jpg') });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = 2.5;
    cube.position.y = 2.5;
    cube.position.z = 2.5;
    cube.castShadow = true;

    scene.add(cube);
  }

  var plane;

  function createPlane (rotate) {
    var planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
    var planeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/grass.jpg') });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // if (rotate) {
      plane.rotation.x = -0.5 * Math.PI;
    // } else {
      // plane.position.y = 15;
      // plane.position.z = -15;
    // }

    plane.receiveShadow = true;

    scene.add(plane);
  }

  function createGUIControls () {

    guiControls = new function () {
      this.rotationX = 0.01;
      this.rotationY = 0.01;
      this.rotationZ = 0.01;
    }();

    var gui = new dat.GUI();
    gui.add(guiControls, 'rotationX', 0, 1);
    gui.add(guiControls, 'rotationY', 0, 1);
    gui.add(guiControls, 'rotationZ', 0, 1);
  }

  function render() {
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 20;

    camera.lookAt(scene.position);

  	requestAnimationFrame(render);
    // controls.update();
  	renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += guiControls.rotationX;
    cube.rotation.y += guiControls.rotationY;
    cube.rotation.z += guiControls.rotationZ;
    controls.update();
    renderer.render(scene, camera);
  }

  function checkKey(e) {

    e = e || window.event;

    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;

    switch (e.keyCode) {
      case left:
        if (hasNotColided(cube.position.x, true)) {
          cube.position.x -= 1;
        }

        break;
      case up:
        if (hasNotColided(cube.position.z, true)) {
          cube.position.z -= 1;
        }

        break;
      case right:
        if (hasNotColided(cube.position.x, false)) {
          cube.position.x += 1;
        }

        break;
      case down:
        if (hasNotColided(cube.position.z, false)) {
          cube.position.z += 1;
        }

        break;
    }

    function hasNotColided (position, isNegative) {
      var axisPostion = position;
      var planeEdge = planeSize / 2;
      var halfBoxSize = boxSize / 2;

      if (isNegative) {
        axisPostion -= halfBoxSize;
        planeEdge *= -1;
        if (axisPostion > planeEdge) return true;
      } else {
        axisPostion += halfBoxSize;
        if (axisPostion < planeEdge) return true;
      }

      return false;
    }
}

  init();

}());
