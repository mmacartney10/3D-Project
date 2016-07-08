(function () {

  var scene;
  var camera;
  var renderer;
  var spotLight;
  var geometry;
  var material;

  var cube;
  var cubeGeometry;
  var cubeMaterial;

  var enemy;
  var enemyGeometry;
  var enemyMaterial;

  var boxSize = 5;
  var planeSize = 30;

  function init () {
    createScene();
    renderScene();

    createCube();
    createEnemy();
    createPlane(true);
    // createLine();
    createSpotLight();

    render();

    document.onkeydown = checkKey;
    window.addEventListener( 'resize', onWindowResize, false );
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

  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
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

    // var edges = new THREE.EdgesHelper( cube, 0x00ff00 );
    var edges = new THREE.WireframeHelper( cube, 0x00ff00 );


    cube.position.x = 0;
    cube.position.y = 2.5;
    cube.position.z = 10;
    cube.castShadow = true;

    scene.add(cube);
    scene.add(edges);
  }

  function createEnemy () {
    enemyGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    enemyMaterial = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
    enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);

    enemy.position.x = 0;
    enemy.position.y = 2.5;
    enemy.position.z = 0;
    enemy.castShadow = true;

    scene.add(enemy);

    // animateEnemy();
  }

  var line;
  var lineGeometry;
  var lineMaterial;

  function createLine () {
    lineMaterial = new THREE.LineBasicMaterial({color: 0xFF00F0});
    lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3(-15, 5, 0));
    lineGeometry.vertices.push(new THREE.Vector3(15, 5, 0));

    line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
  }

  var plane;

  function createPlane () {
    var planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize);
    var planeMaterial = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/grass.jpg') });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

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

  var moveLeftDisabled = false;
  var moveUpDisabled = false;
  var moveRightDisabled = false;
  var moveDownDisabled = false;

  function checkKey(e) {

    e = e || window.event;

    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;
    var incrementValue = 0.5;

    switch (e.keyCode) {
      case left:
        if (hasColidedWithEdge(cube.position.x, true)) return;
        if (moveLeftDisabled === false || moveUpDisabled || moveRightDisabled || moveDownDisabled) cube.position.x -= incrementValue;
        if (!moveUpDisabled && !moveRightDisabled && !moveDownDisabled) moveLeftDisabled = cubeCollitionWithEnemy();
        break;
      case up:
        if (hasColidedWithEdge(cube.position.z, true)) return;
        if (moveUpDisabled === false || moveLeftDisabled || moveRightDisabled || moveDownDisabled) cube.position.z -= incrementValue;
        if (!moveLeftDisabled && !moveRightDisabled && !moveDownDisabled) moveUpDisabled = cubeCollitionWithEnemy();
        break;
      case right:
        if (hasColidedWithEdge(cube.position.x, false)) return;
        if (moveRightDisabled === false || moveLeftDisabled || moveUpDisabled || moveDownDisabled) cube.position.x += incrementValue;
        if (!moveLeftDisabled && !moveUpDisabled && !moveDownDisabled) moveRightDisabled = cubeCollitionWithEnemy();
        break;
      case down:
        if (hasColidedWithEdge(cube.position.z, false)) return;
        if (moveDownDisabled === false || moveLeftDisabled || moveUpDisabled || moveRightDisabled) cube.position.z += incrementValue;
        if (!moveLeftDisabled && !moveUpDisabled && !moveRightDisabled) moveDownDisabled = cubeCollitionWithEnemy();
        break;
    }

    function hasColidedWithEdge (position, isNegative) {
      var axisPostion = position;
      var planeEdge = planeSize / 2;
      var halfBoxSize = boxSize / 2;

      if (isNegative) {
        axisPostion -= halfBoxSize;
        planeEdge *= -1;
        if (axisPostion > planeEdge) return false;
      } else {
        axisPostion += halfBoxSize;
        if (axisPostion < planeEdge) return false;
      }

      return true;
    }

    function cubeCollitionWithEnemy () {
      var cubeMaxX = cube.position.x + 2.5;
      var cubeMinX = cube.position.x - 2.5;
      var cubeMaxZ = cube.position.z + 2.5;
      var cubeMinZ = cube.position.z - 2.5;

      var enemyMaxX = enemy.position.x + 2.5;
      var enemyMinX = enemy.position.x - 2.5;
      var enemyMaxZ = enemy.position.z + 2.5;
      var enemyMinZ = enemy.position.z - 2.5;

      return (enemyMinX <= cubeMaxX && enemyMaxX >= cubeMinX) && (enemyMinZ <= cubeMaxZ && enemyMaxZ >= cubeMinZ);
    }
}

  init();

}());
