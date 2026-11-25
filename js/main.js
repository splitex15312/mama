/**
 * Birthday Greeting Website for Mom
 * Interactive script: Canvas particles, Confetti, Cake Candles,
 * Gallery Lightbox, Wishes Generator, and Music Synthesizer Fallback.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. BACKGROUND CANVAS PARTICLES (Petals & Hearts)
     ========================================================== */
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 28;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.type = Math.random() > 0.45 ? 'petal' : 'heart';
      // Gentle pastel colors
      const colors = ['#fbcfe8', '#fecdd3', '#fda4af', '#fef08a', '#e9d5ff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.6 + this.speedX;
      this.rotation += this.rotationSpeed;

      if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.type === 'heart') {
        const s = this.size * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.5, 0, s * 1.3);
        ctx.bezierCurveTo(s * 1.2, s * 0.5, s, -s * 0.5, 0, s * 0.3);
        ctx.fill();
      } else {
        // Rose Petal shape
        const w = this.size;
        const h = this.size * 1.4;
        ctx.beginPath();
        ctx.ellipse(0, 0, w / 2, h / 2, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  /* ==========================================================
     2. CELEBRATORY CONFETTI ENGINE
     ========================================================== */
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.position = 'fixed';
  confettiCanvas.style.top = '0';
  confettiCanvas.style.left = '0';
  confettiCanvas.style.width = '100%';
  confettiCanvas.style.height = '100%';
  confettiCanvas.style.pointerEvents = 'none';
  confettiCanvas.style.zIndex = '999';
  document.body.appendChild(confettiCanvas);
  const cCtx = confettiCanvas.getContext('2d');

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  let confettiPieces = [];

  class Confetto {
    constructor(x, y) {
      this.x = x || confettiCanvas.width / 2;
      this.y = y || confettiCanvas.height / 2;
      this.size = Math.random() * 8 + 6;
      this.speedX = (Math.random() - 0.5) * 16;
      this.speedY = -(Math.random() * 12 + 6);
      this.gravity = 0.35;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.2;
      const palette = ['#e85073', '#ff7597', '#fbbf24', '#f59e0b', '#38bdf8', '#a855f7', '#34d399', '#ffffff'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
      this.opacity = 1;
      this.decay = Math.random() * 0.01 + 0.008;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravity;
      this.speedX *= 0.98;
      this.rotation += this.rotSpeed;
      this.opacity -= this.decay;
    }

    draw() {
      if (this.opacity <= 0) return;
      cCtx.save();
      cCtx.translate(this.x, this.y);
      cCtx.rotate(this.rotation);
      cCtx.globalAlpha = Math.max(0, this.opacity);
      cCtx.fillStyle = this.color;
      cCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.3);
      cCtx.restore();
    }
  }

  function launchConfetti(originX, originY, count = 90) {
    const x = originX !== undefined ? originX : confettiCanvas.width / 2;
    const y = originY !== undefined ? originY : confettiCanvas.height * 0.45;
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new Confetto(x, y));
    }
  }

  function updateConfetti() {
    cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const c = confettiPieces[i];
      c.update();
      c.draw();
      if (c.opacity <= 0 || c.y > confettiCanvas.height + 30) {
        confettiPieces.splice(i, 1);
      }
    }
    requestAnimationFrame(updateConfetti);
  }
  updateConfetti();

  // Remove confettiBtn check as requested



  /* ==========================================================
     3. WEB AUDIO SYNTHESIZER (Sounds & Background Ambient)
     ========================================================== */
  let audioCtx = null;

  function initAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play a celebratory bright harp / chime chord
  function playSynthChime() {
    initAudioCtx();
    if (!audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + 1.3);
        } catch (e) {
          // ignore audio errors
        }
      }, idx * 90);
    });
  }

  // Soft candle blow sound effect (white noise puff)
  function playBlowSound() {
    initAudioCtx();
    if (!audioCtx) return;

    try {
      const bufferSize = audioCtx.sampleRate * 0.6;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.5);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noise.start();
    } catch (e) {
      // ignore
    }
  }

  // Soft Ambient Music Synthesizer (Lullaby chord progression)
  let synthMusicPlaying = false;
  let synthMusicTimer = null;
  const melodyChords = [
    [261.63, 329.63, 392.00, 523.25], // C
    [220.00, 261.63, 329.63, 440.00], // Am
    [174.61, 220.00, 261.63, 349.23], // F
    [196.00, 246.94, 293.66, 392.00], // G
  ];
  let currentChordIdx = 0;

  function playAmbientStep() {
    if (!synthMusicPlaying || !audioCtx) return;
    const chord = melodyChords[currentChordIdx % melodyChords.length];
    currentChordIdx++;

    chord.forEach((freq, i) => {
      setTimeout(() => {
        if (!synthMusicPlaying) return;
        try {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

          gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start();
          osc.stop(audioCtx.currentTime + 2.6);
        } catch (err) {}
      }, i * 350);
    });

    synthMusicTimer = setTimeout(playAmbientStep, 2400);
  }

  function startSynthAmbient() {
    initAudioCtx();
    synthMusicPlaying = true;
    currentChordIdx = 0;
    playAmbientStep();
  }

  function stopSynthAmbient() {
    synthMusicPlaying = false;
    if (synthMusicTimer) {
      clearTimeout(synthMusicTimer);
      synthMusicTimer = null;
    }
  }

  /* ==========================================================
     4. MUSIC CONTROLS (MP3 Piano Audio)
     ========================================================== */
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicText = document.getElementById('musicText');
  const bgAudio = document.getElementById('bgAudio');

  function updateMusicUI(active) {
    if (!musicToggleBtn) return;
    const isMobile = window.innerWidth <= 480;
    if (active) {
      musicToggleBtn.classList.add('music-playing');
      if (musicText) musicText.textContent = isMobile ? 'Пауза 🎶' : 'Музыка играет 🎶';
      musicToggleBtn.title = 'Нажми, чтобы выключить';
    } else {
      musicToggleBtn.classList.remove('music-playing');
      if (musicText) musicText.textContent = isMobile ? 'Музыка 🎵' : 'Включить музыку 🎵';
      musicToggleBtn.title = 'Включить нежную музыку';
    }
  }

  function toggleMusic() {
    initAudioCtx();
    if (!bgAudio) return;

    if (bgAudio.paused) {
      bgAudio.volume = 0.85;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updateMusicUI(true);
        }).catch((err) => {
          console.warn("Direct play failed, trying reload:", err);
          bgAudio.load();
          bgAudio.play().then(() => {
            updateMusicUI(true);
          }).catch(e => {
            console.error("Playback failed, activating fallback ambient:", e);
            startSynthAmbient();
            updateMusicUI(true);
          });
        });
      }
    } else {
      bgAudio.pause();
      stopSynthAmbient();
      updateMusicUI(false);
    }
  }

  if (bgAudio) {
    bgAudio.addEventListener('play', () => updateMusicUI(true));
    bgAudio.addEventListener('pause', () => updateMusicUI(false));
    bgAudio.addEventListener('ended', () => updateMusicUI(false));
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }


  /* ==========================================================
     5. INTERACTIVE BIRTHDAY CAKE & WISH
     ========================================================== */
  const birthdayCake = document.getElementById('birthdayCake');
  const wishReveal = document.getElementById('wishReveal');
  const relightCakeBtn = document.getElementById('relightCakeBtn');
  let isCakeBlown = false;

  function blowOutCake() {
    if (isCakeBlown) return;
    isCakeBlown = true;

    playBlowSound();
    birthdayCake.classList.add('blown-out');

    const cakeRect = birthdayCake.getBoundingClientRect();
    const centerX = cakeRect.left + cakeRect.width / 2;
    const centerY = cakeRect.top + 30;

    // Launch double confetti burst
    setTimeout(() => {
      launchConfetti(centerX - 40, centerY, 60);
      launchConfetti(centerX + 40, centerY, 60);
      playSynthChime();
    }, 250);

    setTimeout(() => {
      if (wishReveal) {
        wishReveal.classList.add('active');
      }
    }, 600);
  }

  function relightCake() {
    isCakeBlown = false;
    birthdayCake.classList.remove('blown-out');
    if (wishReveal) {
      wishReveal.classList.remove('active');
    }
    playSynthChime();
  }

  if (birthdayCake) {
    birthdayCake.addEventListener('click', blowOutCake);
  }

  if (relightCakeBtn) {
    relightCakeBtn.addEventListener('click', relightCake);
  }


  /* ==========================================================
     6. MEMORY ALBUM / LIGHTBOX MODAL
     ========================================================== */
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentPhotoIndex = 0;
  const photoData = [];

  polaroids.forEach((card, idx) => {
    const img = card.querySelector('.polaroid-img');
    const caption = card.getAttribute('data-caption') || card.querySelector('.caption-title').textContent;
    photoData.push({
      src: img.src,
      caption: caption
    });

    card.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    currentPhotoIndex = index;
    updateLightboxContent();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const data = photoData[currentPhotoIndex];
    if (!data) return;
    lightboxImg.src = data.src;
    lightboxCaption.textContent = data.caption;
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoData.length;
    updateLightboxContent();
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });


  /* ==========================================================
     7. REASONS CARDS (Touch / Mobile Friendly Flip)
     ========================================================== */
  const reasonCards = document.querySelectorAll('.reason-card');
  reasonCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });


  /* ==========================================================
     8. COMPLIMENTS & WISHES JAR GENERATOR
     ========================================================== */
  const jarMessage = document.getElementById('jarMessage');
  const newWishBtn = document.getElementById('newWishBtn');

  const wishes = [
    "«Мамочка, пусть каждый день твоей жизни будет наполнен радостными улыбками, приятными сюрпризами и беззаботным счастьем!» 💖",
    "«Желаю тебе крепчайшего здоровья, лёгкости во всём и неиссякаемого запаса бодрости и вдохновения!» 🌸",
    "«Пусть все твои мечты, даже самые смелые, исполняются легко и с улыбкой!» ✨",
    "«Спасибо за твои добрые руки и золотое сердце. Ты — самая лучшая мама на свете!» 🌷",
    "«Пусть в твоём доме всегда царят гармония, достаток, звонкий смех и тёплый уют!» 🏡",
    "«Ты остаёшься невероятно красивой, молодой, женственной и ослепительной каждый день!» 👑",
    "«Пусть судьба преподносит тебе только радостные события, верных друзей и прекрасные новости!» 🎁",
    "«Желаю, чтобы твои глаза сияли только от счастья, гордости и умиления!» ☀️",
    "«Пусть весна всегда живёт в твоём сердце, а вокруг расцветают твои любимые цветы!» 💐",
    "«Каждая минута рядом с тобой — это настоящий подарок и праздник для нас всех!» ❤️",
    "«Желаю спокойствия на душе, безмятежности и моря поводов для искренней улыбки!» 🌺",
    "«Пусть удача идёт с тобой рука об руку во всех твоих начинаниях и делах!» 🍀"
  ];

  let lastWishIndex = 0;

  if (newWishBtn && jarMessage) {
    newWishBtn.addEventListener('click', () => {
      jarMessage.classList.add('fade-out');

      setTimeout(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * wishes.length);
        } while (newIndex === lastWishIndex && wishes.length > 1);

        lastWishIndex = newIndex;
        jarMessage.textContent = wishes[newIndex];
        jarMessage.classList.remove('fade-out');
        jarMessage.classList.add('fade-in');

        // Tiny confetti burst on new wish
        const rect = newWishBtn.getBoundingClientRect();
        launchConfetti(rect.left + rect.width / 2, rect.top, 30);
      }, 250);

      setTimeout(() => {
        jarMessage.classList.remove('fade-in');
      }, 500);
    });
  }

});
