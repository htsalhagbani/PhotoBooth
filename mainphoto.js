function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let img, frame;

document.getElementById('upload').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        img = new Image();
        img.onload = draw;
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

function selectFrame(frameSrc) {
    frame = new Image();
    frame.onload = draw;
    frame.src = frameSrc;
}
let imgH,imgx;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (img) {
        if (frame.src.includes('f6-1.png')) {
            imgWidth = canvas.width * 0.8; 
            imgHeight = img.height*1.3; 
            imgx=40;
            imgH=40;
        } else {
            imgWidth = canvas.width; 
            imgHeight = canvas.height; 
            imgx=0;
            imgH=0;
        }

        if (img) {
            ctx.drawImage(img, imgx,imgH, imgWidth, imgHeight);
        }
    }
    if (frame) {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
    }
    const text = document.getElementById('text').value;
    const color = document.getElementById('color').value;
    const textSize = document.getElementById('textSize').value; 
    ctx.fillStyle = color;
    ctx.font = `${textSize}px Arial`; 
    if (frame.src.includes('f6-1.png')) {
        ctx.fillText(text, 100, 390);
    } else {
        ctx.fillText(text, 20, 390);
    }
}

 document.getElementById('text').addEventListener('input', draw);
document.getElementById('color').addEventListener('input', draw);
document.getElementById('textSize').addEventListener('change', draw); 



let text= document.getElementById('text');

document.getElementById('download').addEventListener('click', function () {
   
    console.log(text);
    
    if (!frame) {
        alert('Please select a frame first!');
        return;
    }
    if (!img) {
        alert('Please upload an image first!');
        return;
    }



    console.log(canvas.toDataURL().length);
   
const scaleFactor = 0.2; 
const dataURL = canvas.toDataURL('image/jpeg', 0.5); 

    fetch('https://66edced2380821644cde0b48.mockapi.io/Images', {
        method: 'POST',
        body: JSON.stringify({
            image: dataURL
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
         .then((data) => console.log(data));

    const link = document.createElement('a');
    link.download = 'my-photobooth-image.png';
    link.href = canvas.toDataURL();
    link.click();


});

