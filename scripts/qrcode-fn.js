/**
 * showTextIntoQRcode
 * @param {*} target 
 * @param {*} text 
 */
function showTextIntoQRcode(target, text) {
  QRCode.toCanvas(target, text, function(err) {
    if(err) {
      console.error(err);
    }
    console.log('success!');
  });
}
/**
 * clearQRcode
 * @param {*} target 
 */
function clearQRcode(target) {
  let ctx = target.getContext("2d");
  ctx.clearRect(0, 0, target.width, target.height);
}

document.getElementById('showQRcode').addEventListener('click', (event) => {
  let canvas = document.getElementById('canvas');
  showTextIntoQRcode(canvas, 'test-string');
});

document.getElementById('clearQRcode').addEventListener('click', (event) => {
  let canvas = document.getElementById('canvas');
  clearQRcode(canvas);
  canvas.style.height = 0;
  canvas.style.width = 0;
});