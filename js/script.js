/*
function choose() {
  document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', function(e) {
  var width = preview_img.width;
  var img = new Image();
  img.onload = function() {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext("2d"),
      oc = document.createElement('canvas'),
      octx = oc.getContext('2d');
    canvas.width = width; // destination canvas size
    canvas.height = canvas.width * img.height / img.width;
    var cur = {
      width: Math.floor(img.width * 0.5),
      height: Math.floor(img.height * 0.5)
    }
    oc.width = cur.width;
    oc.height = cur.height;
    octx.drawImage(img, 0, 0, cur.width, cur.height);
    while (cur.width * 0.5 > width) {
      cur = {
        width: Math.floor(cur.width * 0.5),
        height: Math.floor(cur.height * 0.5)
      };
      octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
    }
    ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
    var base64Image = canvas.toDataURL('image/jpeg')
    // console.log(base64Image);
    document.querySelector('#preview-img').src = base64Image;
    setTimeout(function() {
      filter();
    }, 50);

  }
  img.src = URL.createObjectURL(e.target.files[0]);
});
*/

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