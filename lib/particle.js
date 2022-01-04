import html2canvas from 'html2canvas';

const forceRGBColorArray = [255,0,0,0]

export const exploseElement = (btn) => {

}



export const attacheParticule = (btn) => {

var ctx;

var colorInfoElem = document.querySelector("#colorInfo");
html2canvas(btn).then(canvas => {
  ctx = canvas.getContext("2d");
  
  createParticleCanvas();
  
  let reductionFactor = 17;
  btn.addEventListener("click", e => {
    //console.log(e)
    // Get the color data for our button
    let width = btn.offsetWidth;
    let height = btn.offsetHeight
    let colorData = ctx.getImageData(0, 0, width, height).data;

    // Keep track of how many times we've iterated (in order to reduce
    // the total number of particles create)
    let count = 0;

    // Go through every location of our button and create a particle
    for(let localX = 0; localX < width; localX++) {
      for(let localY = 0; localY < height; localY++) {
        if(count % reductionFactor === 0) {
          let index = (localY * width + localX) * 4;
          let rgbaColorArr = colorData.slice(index, index + 4);

          let bcr = btn.getBoundingClientRect();
          let globalX = bcr.left + localX;
          let globalY = bcr.top + localY;

          createParticleAtPoint(globalX, globalY, rgbaColorArr);
        }
        count++;
      }
    }
  btn.style.display = "none"
  });
});

/* An "exploding" particle effect that uses circles */
var ExplodingParticle = function() {
  // Set how long we want our particle to animate for
  this.animationDuration = 1000; // in ms

  // Set the speed for our particle
 /* this.speed = {
    x: -5 + Math.random() * 10,
    y: -5 + Math.random() * 10
  };
  
  // Size our particle
  this.radius = 5 + Math.random() * 5;
*/

  this.speed = {
    x: -1 + Math.random() * 3,
    y: -1 + Math.random() * 3
  };
  
  // Size our particle
  this.radius = 2 + Math.random() * 3;

   
  
  // Set a max time to live for our particle
  this.life = 30 + Math.random() * 10;
  this.remainingLife = this.life;
  
  // This function will be called by our animation logic later on
  this.draw = ctx => {
    let p = this;

    if(this.remainingLife > 0
    && this.radius > 0) {
      // Draw a circle at the current location
      ctx.beginPath();
      ctx.arc(p.startX, p.startY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
      ctx.fill();
      
      // Update the particle's location and life
      p.remainingLife--;
      p.radius -= 0.25;
      p.startX += p.speed.x;
      p.startY += p.speed.y;
    }
  }
}
var particles = [];
function createParticleAtPoint(x, y, colorData) {
  let particle = new ExplodingParticle();
  particle.rgbArray = colorData; // forceRGBColorArray
  particle.startX = x;
  particle.startY = y;
  particle.startTime = Date.now();
  
  particles.push(particle);
}

var particleCanvas, particleCtx;
function createParticleCanvas() {
  // Create our canvas
  particleCanvas = document.createElement("canvas");
  particleCtx = particleCanvas.getContext("2d");
  
  // Size our canvas
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
  
  // Position out canvas
  particleCanvas.style.position = "absolute";
  particleCanvas.style.top = "0";
  particleCanvas.style.left = "0";
  
  // Make sure it's on top of other elements
  particleCanvas.style.zIndex = "1001";
  
  // Make sure other elements under it are clickable
  particleCanvas.style.pointerEvents = "none";
  
  // Add our canvas to the page
  document.body.appendChild(particleCanvas);
}

function update() {
  // Clear out the old particles
  if(typeof particleCtx !== "undefined") {
    particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  // Draw all of our particles in their new location
  for(let i = 0; i < particles.length; i++) {
    particles[i].draw(particleCtx);
    
    // Simple way to clean up if the last particle is done animating
    if(i === particles.length - 1) {
      let percent = (Date.now() - particles[i].startTime) / particles[i].animationDuration;
      
      if(percent > 1) {
        particles = [];
      }
    }
  }
  
  // Animate performantly
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

}



export const desintegrate = (elementID) => {


  function pop (e) {
    let amount = 30;
    switch (e.target.dataset.type) {
      case 'shadow':
      case 'line':
        amount = 60;
        break;
    }
    // Quick check if user clicked the button using a keyboard
    if (e.clientX === 0 && e.clientY === 0) {
      const bbox = e.target.getBoundingClientRect();
      const x = bbox.left + bbox.width / 2;
      const y = bbox.top + bbox.height / 2;
      for (let i = 0; i < 30; i++) {
        // We call the function createParticle 30 times
        // We pass the coordinates of the button for x & y values
        createParticle(x, y, e.target.dataset.type);
      }
    } else {
      for (let i = 0; i < amount; i++) {
        createParticle(e.clientX, e.clientY + window.scrollY, e.target.dataset.type);
      }
    }
  }
  function createParticle (x, y, type) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    let width = Math.floor(Math.random() * 30 + 8);
    let height = width;
    let destinationX = (Math.random() - 0.5) * 300;
    let destinationY = (Math.random() - 0.5) * 300;
    let rotation = Math.random() * 520;
    let delay = Math.random() * 200;
    
    switch (type) {
      case 'square':
        particle.style.background = `hsl(${Math.random() * 90 + 270}, 70%, 60%)`;
        particle.style.border = '1px solid white';
        break;
      case 'emoji':
        particle.innerHTML = ['❤','🧡','💛','💚','💙','💜','🤎'][Math.floor(Math.random() * 7)];
        particle.style.fontSize = `${Math.random() * 24 + 10}px`;
        width = height = 'auto';
        break;
      case 'mario':
        particle.style.backgroundImage = 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mario-face.png)';
        break;
      case 'shadow':
        var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
        particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        width = height = Math.random() * 5 + 4;
        break;
      case 'line':
        var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
        particle.style.background = 'black';
        height = 1;
        rotation += 1000;
        delay = Math.random() * 1000;
        break;
    }
    
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;
    const animation = particle.animate([
      {
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
        opacity: 1
      },
      {
        transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
        opacity: 0
      }
    ], {
      duration: Math.random() * 1000 + 5000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: delay
    });
    animation.onfinish = removeParticle;
  }
  function removeParticle (e) {
    e.srcElement.effect.target.remove();
  }
  
  if (document.body.animate) {
    document.getElementById(elementID).addEventListener('click', pop)
  }
  

}