(function (cube, enemy) {

  var boxSize = 5;
  var planeSize = 30;

  var moveLeftDisabled = false;
  var moveUpDisabled = false;
  var moveRightDisabled = false;
  var moveDownDisabled = false;

  function init () {
    console.log('this is a test');
    document.onkeydown = checkKey;
  }

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
        if (moveLeftDisabled === false) cube.position.x -= incrementValue;

        if (!moveUpDisabled && !moveRightDisabled && !moveDownDisabled) moveLeftDisabled = cubeCollitionWithEnemy();
        break;
      case up:
        if (hasColidedWithEdge(cube.position.z, true)) return;
        if (moveUpDisabled === false) cube.position.z -= incrementValue;

        if (!moveLeftDisabled && !moveRightDisabled && !moveDownDisabled) moveUpDisabled = cubeCollitionWithEnemy();
        break;
      case right:
        if (hasColidedWithEdge(cube.position.x, false)) return;
        if (moveRightDisabled === false) cube.position.x += incrementValue;

        if (!moveLeftDisabled && !moveUpDisabled && !moveDownDisabled) moveRightDisabled = cubeCollitionWithEnemy();
        break;
      case down:
        if (hasColidedWithEdge(cube.position.z, false)) return;
        if (moveDownDisabled === false) cube.position.z += incrementValue;

        if (!moveLeftDisabled && !moveUpDisabled && !moveRightDisabled) moveDownDisabled = cubeCollitionWithEnemy();
        break;
    }
  }

  function hasColidedWithEdge (position, isDirectionNegative) {
    var axisPostion = position;
    var planeEdge = planeSize / 2;
    var halfBoxSize = boxSize / 2;

    if (isDirectionNegative) {
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

  init();

}());
