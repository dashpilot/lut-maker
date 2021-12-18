function getRadius(lutSize) {
  let radius = document.getElementsByName("lutSize");
  if (radius[2].checked)
    lutSize = 144;
  else if (radius[1].checked)
    lutSize = 64;
  else
    lutSize = 25;
  return lutSize;
}

function generateHald(number) {
  console.log('here')
  let hald = new Hald(number);
  hald.createHald();
}

function generateCube() {
  Hald.exportCube();
}