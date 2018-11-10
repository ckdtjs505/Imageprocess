var c = $('#myCanvas')[0];
var ctx = c.getContext('2d');
var img_t = new Image();
function drawImageData(image) {
    // image.height *= c.offsetWidth / image.width;
    // image.width = c.offsetWidth;
    //
    // if(image.height > c.offsetHeight){
    //     image.width *= c.offsetHeight / image.height;
    //     image.height = c.offsetHeight;
    // }
    image.width = c.offsetWidth;
    image.height = c.offsetHeight;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    console.log(ctx.getImageData(0,0, c.width, c.height));
}
// click input button
$('#loadButton').on('change', function (e) {
    var file = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            img_t =image;
            drawImageData(img_t);
        }
    };
    fileReader.readAsDataURL(file);
});

function turnback() {
  // ctx.fillRect(0,0,600,600);
  // ctx.fillStyle = "#fff";
  // ctx.fill();
  ctx.drawImage(img_t, 0, 0, img_t.width, img_t.height);
}

  function invert() {
      var imgData = ctx.getImageData(0, 0, c.width, c.height);
      for (i = 0; i < imgData.data.length ; i += 4) {
          imgData.data[i] = 255 - imgData.data[i];       // R
          imgData.data[i+1] = 255 - imgData.data[i+1];   // G
          imgData.data[i+2] = 255 - imgData.data[i+2];   // B
          imgData.data[i+3] = 255;                       // A(알파)
      }
      ctx.putImageData(imgData, 0, 0);
  };
  function Brightness() {
    ctx.drawImage(c, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // filter
    for (i = 0; i < imgData.data.length ; i += 4) {
        imgData.data[i] +=  300 / 3;
        imgData.data[i+1] +=  300 / 3;
        imgData.data[i+2] +=  300 / 3;
    }
    ctx.putImageData(imgData, 0, 0);
  }
  function darkness() {
    ctx.drawImage(c, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    for (i = 0; i < imgData.data.length ; i += 4) {
        imgData.data[i] -=  300 / 3;
        imgData.data[i+1] -=  300 / 3;
        imgData.data[i+2] -=  300 / 3;
    }
    ctx.putImageData(imgData, 0, 0);
  }
  function grayscale() {
    ctx.drawImage(c, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // invert colors
    for (i = 0; i < imgData.data.length ; i += 4) {
        var r = imgData.data[i]
        var g = imgData.data[i+1]
        var b = imgData.data[i+2]
        imgData.data[i] =  imgData.data[i+1] = imgData.data[i+2] = (r + g + b) /3;
    }
    ctx.putImageData(imgData, 0, 0);
  }
