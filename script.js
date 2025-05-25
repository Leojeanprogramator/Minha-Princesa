document.addEventListener("DOMContentLoaded", () => {
  const musics = [
    {name: "Lisboa - ANAVITORIA", src: "https://files.catbox.moe/zsxwo2.mp3", cover: "https://i.postimg.cc/3Rh1w9fK/Whats-App-Image-2025-05-25-at-01-45-27.jpg"},
    {name: "Dona dos Meus Sonhos - Grupo Clareou", src: "https://files.catbox.moe/ccmtiz.mp3", cover: "https://i.postimg.cc/HnxQJNwC/Whats-App-Image-2025-05-25-at-01-45-27-1.jpg"},
    {name: "Escuro - Anavitória", src: "https://files.catbox.moe/ekykbd.mp3", cover: "https://i.postimg.cc/0jbw5wvk/Whats-App-Image-2025-05-25-at-01-45-27-2.jpg"},
    {name: "Ana Lua - Armandinho", src: "https://files.catbox.moe/hztd83.mp3", cover: "https://i.postimg.cc/JzWqrMTf/Whats-App-Image-2025-05-25-at-01-45-28.jpg"},
    {name: "Mas Eu Gosto Dela - Armandinho", src: "https://files.catbox.moe/xn0wa8.mp3", cover: "https://i.postimg.cc/hjHm216k/Whats-App-Image-2025-05-25-at-01-45-28-1.jpg"},
    {name: "Pupila - ANAVITÓRIA, Vitor Kley", src: "https://files.catbox.moe/q5cw44.mp3", cover: "https://i.postimg.cc/9MzSdcHx/Whats-App-Image-2025-05-25-at-01-49-33.jpg"}
  ];

  let currentMusicIndex = 0;
  const audio = document.getElementById("audio-player");
  const audioSource = document.getElementById("audio-source");
  const musicName = document.getElementById("music-name");
  const musicCover = document.getElementById("music-cover");

  window.nextMusic = function() {
    currentMusicIndex = (currentMusicIndex + 1) % musics.length;
    updateMusic();
  }

  window.prevMusic = function() {
    currentMusicIndex = (currentMusicIndex - 1 + musics.length) % musics.length;
    updateMusic();
  }

  function updateMusic() {
    audioSource.src = musics[currentMusicIndex].src;
    musicName.textContent = musics[currentMusicIndex].name;
    musicCover.src = musics[currentMusicIndex].cover;
    audio.load();
    audio.play();
  }

  updateMusic();

  // Popup cartinha
  const popup = document.getElementById("love-note-popup");

  window.togglePopup = function() {
    if (popup.style.display === "block") {
      popup.style.display = "none";
    } else {
      popup.style.display = "block";
    }
  };

  // Galeria imagens ampliadas
  const fullImageView = document.getElementById("full-image-view");
  const fullImage = document.getElementById("full-image");

  window.openFullImage = function(img) {
    fullImage.src = img.src;
    fullImageView.style.display = "flex";
  };

  window.closeFullImage = function() {
    fullImageView.style.display = "none";
  };

  // Corações ao clicar
  document.body.addEventListener("click", function(e) {
    if(e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'audio' || e.target.closest('.music-player')) {
      return; // evita criar corações em cliques nos controles
    }
    const heart = document.createElement("div");
    heart.classList.add("click-heart");
    heart.style.left = e.pageX + "px";
    heart.style.top = e.pageY + "px";
    heart.textContent = "💖";
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 1000);
  });

  // Fundo animado - estrelas, pétalas e balões
  const canvas = document.getElementById("background-canvas");
  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor(x, y, size, speedY, type) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedY = speedY;
      this.type = type;
      this.alpha = 1;
    }
    update() {
      this.y += this.speedY;
      if(this.y > height + this.size) {
        this.y = -this.size;
        this.x = Math.random() * width;
        this.alpha = 1;
      }
      this.alpha -= 0.002;
      if(this.alpha < 0) this.alpha = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      if(this.type === "star") {
        ctx.fillStyle = "#ffc0cb";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for(let i=0; i<5; i++) {
          ctx.lineTo(this.x + this.size * Math.cos((18 + i * 72) / 180 * Math.PI),
                     this.y - this.size * Math.sin((18 + i * 72) / 180 * Math.PI));
          ctx.lineTo(this.x + this.size/2 * Math.cos((54 + i * 72) / 180 * Math.PI),
                     this.y - this.size/2 * Math.sin((54 + i * 72) / 180 * Math.PI));
        }
        ctx.closePath();
        ctx.fill();
      } else if(this.type === "petal") {
        ctx.fillStyle = "#ffb6c1";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size * 0.6, this.size * 1.2, Math.PI / 6, 0, 2 * Math.PI);
        ctx.fill();
      } else if(this.type === "balloon") {
        ctx.fillStyle = "#ff6699";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size * 1.3, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#cc3366";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.size * 1.3);
        ctx.lineTo(this.x, this.y + this.size * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  const particles = [];
  for(let i=0; i<50; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height, 7, 0.3 + Math.random() * 0.5, "star"));
  }
  for(let i=0; i<20; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height, 10, 0.7 + Math.random() * 0.3, "petal"));
  }
  for(let i=0; i<10; i++) {
    particles.push(new Particle(Math.random() * width, Math.random() * height, 12, 0.9 + Math.random() * 0.4, "balloon"));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
});

