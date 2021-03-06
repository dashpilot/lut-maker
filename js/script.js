window.canvas = new fabric.Canvas("c");
const haldCanvas = new fabric.Canvas("hald-canvas");
const filters = {};

init()
async function init() {

  /*
  const [width, height] = [window.innerWidth, window.innerHeight / 2];

  // Setting the canvas size
  canvas.setWidth(width);
  canvas.setHeight(height);
  canvas.calcOffset();
  */

  // load the image
  var img = new Image();
  img.crossOrigin = "";
  await new Promise(res => {
    img.onload = res;
    img.src = `img/preview-image.jpg`;
  });
  window.image = new fabric.Image(img).scaleToWidth(800, false);
  canvas.add(image)

  // Create and register the filters in `filters` object
  const filters = {
    brightness: new fabric.Image.filters.Brightness(),
    contrast: new fabric.Image.filters.Contrast(),
    saturation: new fabric.Image.filters.Saturation(),
    vibrance: new fabric.Image.filters.Vibrance(),
    hue: new fabric.Image.filters.HueRotation(),
    gamma: new fabric.Image.filters.Gamma(),
  }

  // - Brightness
  // Attach the filter to the image
  image.filters.push(filters.brightness);
  const brightnessInput = document.querySelector("#brightness")
  brightnessInput.oninput = () => {
    const value = parseFloat(brightnessInput.value);
    // Edit the filter value
    filters.brightness.brightness = value;
    // Apply the changes
    image.applyFilters();
    // Display the result
    canvas.renderAll();
  }

  // - Contrast
  // Attach the filter to the image
  image.filters.push(filters.contrast);
  const contrastInput = document.querySelector("#contrast")
  contrastInput.oninput = () => {
    const value = parseFloat(contrastInput.value);
    // Edit the filter value
    filters.contrast.contrast = value;
    // Apply the changes
    image.applyFilters();
    // Display the result
    canvas.renderAll();
  }

  // - Saturation
  // Attach the filter to the image
  image.filters.push(filters.saturation);
  const saturationInput = document.querySelector("#saturation")
  saturationInput.oninput = () => {
    const value = parseFloat(saturationInput.value);
    // Edit the filter value
    filters.saturation.saturation = value;
    // Apply the changes
    image.applyFilters();
    // Display the result
    canvas.renderAll();
  }

  // - Vibrance
  // Attach the filter to the image
  image.filters.push(filters.vibrance);
  const vibranceInput = document.querySelector("#vibrance")
  vibranceInput.oninput = () => {
    const value = parseFloat(vibranceInput.value);
    // Edit the filter value
    filters.vibrance.vibrance = value;
    // Apply the changes
    image.applyFilters();
    // Display the result
    canvas.renderAll();
  }

  // - Gamma
  // Attach the filter to the image
  image.filters.push(filters.gamma);
  const redInput = document.querySelector("#red")
  const greenInput = document.querySelector("#green")
  const blueInput = document.querySelector("#blue")

  redInput.oninput = () => {
    filters.gamma.gamma = [parseFloat(redInput.value), parseFloat(greenInput.value), parseFloat(blueInput.value)];
    image.applyFilters();
    canvas.renderAll();
  }

  greenInput.oninput = () => {
    filters.gamma.gamma = [parseFloat(redInput.value), parseFloat(greenInput.value), parseFloat(blueInput.value)];
    image.applyFilters();
    canvas.renderAll();
  }

  blueInput.oninput = () => {
    filters.gamma.gamma = [parseFloat(redInput.value), parseFloat(greenInput.value), parseFloat(blueInput.value)];
    image.applyFilters();
    canvas.renderAll();
  }

  // - Hue
  // Attach the filter to the image
  image.filters.push(filters.hue);
  const hueInput = document.querySelector("#hue")
  hueInput.oninput = () => {
    const value = parseFloat(hueInput.value);
    // Edit the filter value
    filters.hue.rotation = value;
    // Apply the changes
    image.applyFilters();
    // Display the result
    canvas.renderAll();
  }

  /*--- Export LUT ---*/

  // click to add image
  var exportButton = document.getElementById('export');
  exportButton.addEventListener('click', () => {
    setTimeout(function() {
      addImg_d()
    }, 100);
  });

  var img_url = "img/Neutral_25.png"

  // add image to fabriccanvas
  function addImg_d() {
    fabric.Image.fromURL(img_url, function(hald) {

      //new fabric.Image.filters.Brightness(brightness.value)
      hald.filters.push(filters.brightness);
      hald.filters.push(filters.contrast);
      hald.filters.push(filters.saturation);
      hald.filters.push(filters.vibrance);
      hald.filters.push(filters.hue);
      hald.filters.push(filters.gamma);

      hald.applyFilters();
      hald.scale(1);
      haldCanvas.add(hald);

      setTimeout(function() {

        var pngURL = haldCanvas.toDataURL();
        document.querySelector('#placeholder').innerHTML = `<img id="image-export" src="${pngURL}"/>`;

        setTimeout(function() {
          generateCube();
        }, 200);

      }, 100)

    }, {
      crossOrigin: 'anonymous'
    });


  };
}

document.getElementById('fileInput').addEventListener('change', function(e) {

  var width = 1600;
  var imgUpload = new Image();
  imgUpload.onload = function() {
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext("2d"),
      oc = document.createElement('canvas'),
      octx = oc.getContext('2d');
    canvas.width = width; // destination canvas size
    canvas.height = canvas.width * imgUpload.height / imgUpload.width;
    var cur = {
      width: Math.floor(imgUpload.width * 0.5),
      height: Math.floor(imgUpload.height * 0.5)
    }
    oc.width = cur.width;
    oc.height = cur.height;
    octx.drawImage(imgUpload, 0, 0, cur.width, cur.height);
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

    window.image.setSrc(base64Image, function() {
      window.canvas.renderAll();
    });


  }
  imgUpload.src = URL.createObjectURL(e.target.files[0]);
});

document.getElementById('choose-image').addEventListener('click', function(e) {
  document.getElementById('fileInput').click();
});


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