(function () {

  var scene;
  var camera;
  var renderer;
  var light;
  var geometry;
  var material;
  var cube;

  function init () {
    createScene();
    renderScene();
    createLight();
    createCube();
    render();
    animate();
  }

  function createScene () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    renderer = new THREE.WebGLRenderer();
  }

  function renderScene () {
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  }

  function createLight () {
    light = new THREE.PointLight(0xF2DE2E, 1, 80);
    light.position.set(4, 4, 6);
    scene.add(light);
  }

  function createCube () {
    geometry = new THREE.BoxGeometry( 2, 2, 2 );
    // material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('images/logo.jpg') });
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
  }

  function render() {
    camera.position.z = 8;
  	requestAnimationFrame( render );
  	renderer.render( scene, camera );
  }

  function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }

  init();

}());
