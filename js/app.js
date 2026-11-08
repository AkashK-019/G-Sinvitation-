(function (window, document) {
  'use strict';

  var params = new URLSearchParams(window.location.search);
  var guest = params.get('guest') || params.get('to') || params.get('name');
  if (guest) {
    var cleanGuest = decodeURIComponent(guest).trim();
    var personalizedBadge = document.getElementById('personalizedBadge');
    if (personalizedBadge) {
      personalizedBadge.textContent = 'Special Invitation for ' + cleanGuest;
      personalizedBadge.style.display = 'inline-block';
    }
  }

  var mainScroller = document.getElementById('mainScroller');
  var pinnedStage = document.getElementById('pinnedStage');
  var stageCover = document.getElementById('stageCover');
  var stageLanding = document.getElementById('stageLanding');
  var sectionInvitation = document.getElementById('sectionInvitation');
  var invitationReel = document.getElementById('invitationReel');
  var invitationCrest = document.getElementById('invitationCrest');

  var cueToSection2 = document.getElementById('cueToSection2');
  var cueToSection3 = document.getElementById('cueToSection3');

  var invocationText = document.getElementById('invocationText');
  var shlokaBox = document.getElementById('shlokaBox');
  var shlokaLine1 = document.getElementById('shlokaLine1');
  var shlokaLine2 = document.getElementById('shlokaLine2');
  var typeCursor = document.getElementById('typeCursor');

  // Prime audio buffer
  if (weddingMusic && weddingMusic.load) {
    try { weddingMusic.load(); } catch (e) {}
  }

  var progressBar = document.getElementById('progressBar');
  var progressIndicator = document.getElementById('progressIndicator');

  var weddingMusic = document.getElementById('weddingMusic');
  var musicToggleBtn = document.getElementById('musicToggleBtn');

  var MUTE_KEY = 'rn_wedding_muted';
  var VOLUME = 0.55;
  var fadeTimer = null;
  var musicStarted = false;

  function storedMute() {
    try { return window.localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { return false; }
  }
  function rememberMute(muted) {
    try { window.localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {}
  }

  function fadeTo(target, ms, done) {
    window.clearInterval(fadeTimer);
    var from = weddingMusic ? weddingMusic.volume : 0;
    var start = Date.now();
    fadeTimer = window.setInterval(function () {
      if (!weddingMusic) return;
      var t = Math.min(1, (Date.now() - start) / ms);
      weddingMusic.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (t >= 1) {
        window.clearInterval(fadeTimer);
        if (done) done();
      }
    }, 40);
  }

  function setMusicButtonState(muted) {
    if (!musicToggleBtn) return;
    musicToggleBtn.classList.toggle('muted', muted);
    musicToggleBtn.setAttribute('aria-label', muted ? 'Turn the music on' : 'Turn the music off');
  }

  function startMusic() {
    if (!weddingMusic || musicStarted) return;
    musicStarted = true;
    if (storedMute()) {
      setMusicButtonState(true);
      return;
    }
    weddingMusic.volume = 0;
    var played = weddingMusic.play();
    if (played && played.catch) {
      played.catch(function () {
        musicStarted = false;
        setMusicButtonState(true);
      });
    }
    fadeTo(VOLUME, 1500);
    setMusicButtonState(false);
  }

  if (musicToggleBtn && weddingMusic) {
    setMusicButtonState(storedMute());
    musicToggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var muted = musicToggleBtn.classList.contains('muted') || weddingMusic.paused;
      if (muted) {
        weddingMusic.play();
        fadeTo(VOLUME, 700);
        setMusicButtonState(false);
        rememberMute(false);
      } else {
        fadeTo(0, 450, function () { weddingMusic.pause(); });
        setMusicButtonState(true);
        rememberMute(true);
      }
    });
  }

  function tryFirstInteractionMusic() {
    if (!musicStarted && !storedMute()) {
      startMusic();
    }
    if (musicStarted) {
      window.removeEventListener('click', tryFirstInteractionMusic);
      window.removeEventListener('touchstart', tryFirstInteractionMusic);
    }
  }
  window.addEventListener('click', tryFirstInteractionMusic, { passive: true });
  window.addEventListener('touchstart', tryFirstInteractionMusic, { passive: true });

  var INVOCATION = '॥ श्री गणेशाय नमः ॥';
  var SHLOKA_1 = 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।';
  var SHLOKA_2 = 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥';
  var typewriterStarted = false;

  if (invocationText) {
    invocationText.textContent = INVOCATION;
  }

  function getGraphemes(text) {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      var seg = new Intl.Segmenter('hi', { granularity: 'grapheme' });
      return Array.from(seg.segment(text), function (s) { return s.segment; });
    }
    return Array.from(text);
  }

  function startTypewriterSequence() {
    if (typewriterStarted) return;
    typewriterStarted = true;

    var chars1 = getGraphemes(SHLOKA_1);
    var chars2 = getGraphemes(SHLOKA_2);

    var idx1 = 0;
    var idx2 = 0;
    var speed = 40;

    if (shlokaLine1) shlokaLine1.textContent = '';
    if (shlokaLine2) shlokaLine2.textContent = '';
    
    if (typeCursor) {
      typeCursor.classList.remove('done');
      if (shlokaLine1) {
        shlokaLine1.appendChild(typeCursor);
      }
    }

    function typeLine1() {
      if (idx1 < chars1.length) {
        var ch = chars1[idx1++];
        if (typeCursor && typeCursor.parentNode === shlokaLine1) {
          shlokaLine1.insertBefore(document.createTextNode(ch), typeCursor);
        } else if (shlokaLine1) {
          shlokaLine1.textContent += ch;
        }
        setTimeout(typeLine1, speed);
      } else {
        setTimeout(function () {
          if (typeCursor && shlokaLine2) {
            shlokaLine2.appendChild(typeCursor);
          }
          setTimeout(typeLine2, 220);
        }, 220);
      }
    }

    function typeLine2() {
      if (idx2 < chars2.length) {
        var ch = chars2[idx2++];
        if (typeCursor && typeCursor.parentNode === shlokaLine2) {
          shlokaLine2.insertBefore(document.createTextNode(ch), typeCursor);
        } else if (shlokaLine2) {
          shlokaLine2.textContent += ch;
        }
        setTimeout(typeLine2, speed);
      } else {
        setTimeout(function () {
          if (typeCursor) typeCursor.classList.add('done');
        }, 1200);
      }
    }

    setTimeout(typeLine1, 300);
  }

  var minAllowedTop = 0;
  var isAutoScrolling = false;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(element, targetY, duration, callback) {
    if (!element) return;
    var startY = element.scrollTop;
    var diff = targetY - startY;
    if (Math.abs(diff) < 2) {
      element.scrollTop = targetY;
      if (callback) callback();
      return;
    }
    isAutoScrolling = true;
    var startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      var elapsed = currentTime - startTime;
      var progress = Math.min(1, elapsed / duration);
      var eased = easeInOutCubic(progress);
      element.scrollTop = startY + diff * eased;

      renderScrollState();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.scrollTop = targetY;
        isAutoScrolling = false;
        renderScrollState();
        if (callback) callback();
      }
    }

    requestAnimationFrame(step);
  }

  var section2UnlockedAt = 0;

  function advanceToSection(targetSec) {
    if (!mainScroller) return;
    var h = mainScroller.clientHeight || window.innerHeight;
    var targetTop = (targetSec - 1) * h;
    
    // Balanced royal scroll duration
    var isMobile = window.innerWidth <= 600;
    var duration = targetSec === 2 ? (isMobile ? 1400 : 1350) : (isMobile ? 1200 : 1050); 

    // Prevent immediate double-advance while transitioning to section 2
    if (targetSec === 2) {
      section2UnlockedAt = Date.now() + duration + 200;
    }

    smoothScrollTo(mainScroller, targetTop, duration, function () {
      if (targetSec === 2) {
        minAllowedTop = h;
        section2UnlockedAt = Date.now() + 200; // Brief settle cooldown
        if (musicToggleBtn) musicToggleBtn.classList.add('is-active');
        if (stageLanding) {
          stageLanding.style.opacity = '1';
          stageLanding.style.pointerEvents = 'auto';
          stageLanding.style.transform = 'none';
          stageLanding.style.clipPath = 'none';
        }
        startTypewriterSequence();
      } else if (targetSec === 3) {
        minAllowedTop = h * 2;
        if (musicToggleBtn) musicToggleBtn.classList.add('is-active');
        if (sectionInvitation) {
          sectionInvitation.style.opacity = '1';
          sectionInvitation.style.clipPath = 'none';
          sectionInvitation.style.webkitClipPath = 'none';
          sectionInvitation.style.pointerEvents = 'auto';
          sectionInvitation.style.transform = 'none';
        }
        if (invitationReel) {
          invitationReel.scrollTop = 0;
        }
      }
    });
  }

  if (cueToSection2 && mainScroller) {
    cueToSection2.addEventListener('click', function (e) {
      e.stopPropagation();
      startMusic();
      advanceToSection(2);
    });
    cueToSection2.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        startMusic();
        advanceToSection(2);
      }
    });
  }

  if (cueToSection3 && mainScroller) {
    cueToSection3.addEventListener('click', function (e) {
      e.stopPropagation();
      advanceToSection(3);
    });
    cueToSection3.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        advanceToSection(3);
      }
    });
  }

  var touchStartY = 0;
  var touchStartSection = 1;
  if (mainScroller) {
    mainScroller.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches.length) {
        touchStartY = e.touches[0].clientY;
        var h = mainScroller ? mainScroller.clientHeight : 0;
        touchStartSection = (h > 0) ? Math.round(mainScroller.scrollTop / h) + 1 : 1;
      }
    }, { passive: true });

    mainScroller.addEventListener('touchmove', function (e) {
      if (!e.touches || !e.touches.length) return;
      var curY = e.touches[0].clientY;
      var deltaY = curY - touchStartY;
      var h = mainScroller ? mainScroller.clientHeight : 0;

      // Section 3: Allow free native momentum scrolling inside invitationReel
      if (h > 0 && minAllowedTop >= h * 2) {
        return;
      }

      if (deltaY > 0 && mainScroller.scrollTop <= minAllowedTop + 1) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Section 1 -> 2: Small swipe initiates Section 2
      if (touchStartSection === 1 && minAllowedTop === 0 && deltaY < -8 && !isAutoScrolling) {
        if (e.cancelable) e.preventDefault();
        startMusic();
        advanceToSection(2);
        return;
      // Section 2 -> 3: Sensitive to any small scroll / swipe
      } else if (touchStartSection === 2 && h > 0 && minAllowedTop === h) {
        if (deltaY < -6) {
          if (e.cancelable) e.preventDefault();
          if (!isAutoScrolling && Date.now() >= section2UnlockedAt) {
            advanceToSection(3);
          }
          return;
        } else if (deltaY > 0) {
          if (e.cancelable) e.preventDefault();
          return;
        }
      }
    }, { passive: false });

    mainScroller.addEventListener('touchend', function () {
      var h = mainScroller ? mainScroller.clientHeight : 0;
      if (h > 0 && minAllowedTop === h && !isAutoScrolling && Date.now() >= section2UnlockedAt) {
        if (mainScroller.scrollTop > h + 4) {
          advanceToSection(3);
        }
      }
    }, { passive: true });
  }

  function onWheelAction(e) {
    var delta = e.deltaY;
    var h = mainScroller ? mainScroller.clientHeight : 0;

    // SECTION 3: Allow free scrolling up and down inside invitationReel
    if (h > 0 && minAllowedTop >= h * 2) {
      if (!invitationReel) return;
      if (invitationReel.contains(e.target)) {
        // Pointer is inside the reel: let the browser scroll natively and freely!
        return;
      }
      // Pointer is outside the card: forward the wheel to invitationReel so user can scroll anywhere
      var step = delta;
      if (e.deltaMode === 1) step *= 16;
      else if (e.deltaMode === 2) step *= invitationReel.clientHeight;
      invitationReel.scrollTop += step;
      if (e.cancelable) e.preventDefault();
      return;
    }

    if (delta < 0 && mainScroller && mainScroller.scrollTop <= minAllowedTop + 1) {
      if (e.cancelable) e.preventDefault();
      return;
    }

    if (isAutoScrolling) {
      if (e.cancelable) e.preventDefault();
      return;
    }

    // SECTION 1: Small wheel down triggers Section 2
    if (minAllowedTop === 0) {
      if (delta > 0) {
        if (e.cancelable) e.preventDefault();
        startMusic();
        advanceToSection(2);
      }
      return;
    }

    // SECTION 2: Small wheel down triggers Section 3 smoothly
    if (h > 0 && minAllowedTop === h) {
      if (delta > 0) {
        if (e.cancelable) e.preventDefault();
        if (!isAutoScrolling && Date.now() >= section2UnlockedAt) {
          advanceToSection(3);
        }
        return;
      }
    }
  }

  window.addEventListener('wheel', onWheelAction, { passive: false });

  window.addEventListener('keydown', function (e) {
    var h = mainScroller ? mainScroller.clientHeight : 0;

    // SECTION 3: Keyboard controls invitationReel freely
    if (h > 0 && minAllowedTop >= h * 2 && invitationReel) {
      var page = invitationReel.clientHeight * 0.82;
      if (e.key === 'ArrowDown') { invitationReel.scrollTop += 64; e.preventDefault(); }
      else if (e.key === 'ArrowUp') { invitationReel.scrollTop -= 64; e.preventDefault(); }
      else if (e.key === 'PageDown' || e.key === ' ') { invitationReel.scrollTop += page; e.preventDefault(); }
      else if (e.key === 'PageUp') { invitationReel.scrollTop -= page; e.preventDefault(); }
      else if (e.key === 'Home') { invitationReel.scrollTop = 0; e.preventDefault(); }
      else if (e.key === 'End') { invitationReel.scrollTop = invitationReel.scrollHeight; e.preventDefault(); }
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      if (minAllowedTop === 0) {
        e.preventDefault();
        if (!isAutoScrolling) {
          startMusic();
          advanceToSection(2);
        }
      } else if (h > 0 && minAllowedTop === h) {
        e.preventDefault();
        if (!isAutoScrolling && Date.now() >= section2UnlockedAt) {
          advanceToSection(3);
        }
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (mainScroller && mainScroller.scrollTop <= minAllowedTop + 1) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  var ticking = false;

  function renderScrollState() {
    if (!mainScroller) return;
    var h = mainScroller.clientHeight;
    if (h <= 0) return;
    var top = mainScroller.scrollTop;

    if (top < minAllowedTop) {
      mainScroller.scrollTop = minAllowedTop;
      top = minAllowedTop;
    }

    // Safety auto-snap: If user scrolled past section 2 by even a tiny bit, immediately advance to section 3
    if (minAllowedTop === h && top > h + 5 && !isAutoScrolling && Date.now() >= section2UnlockedAt) {
      advanceToSection(3);
      return;
    }

    // --- TRANSITION FROM SECTION 1 to SECTION 2 ---
    if (top <= h) {
      var p = Math.min(1, Math.max(0, top / h));

      if (sectionInvitation) {
        sectionInvitation.style.opacity = '0';
        sectionInvitation.style.pointerEvents = 'none';
        sectionInvitation.style.clipPath = 'inset(0 0 100% 0)';
        sectionInvitation.style.webkitClipPath = 'inset(0 0 100% 0)';
      }

      if (pinnedStage) {
        pinnedStage.style.transform = 'translateY(0)';
        pinnedStage.style.opacity = '1';
        pinnedStage.style.pointerEvents = 'none';
      }

      if (cueToSection2) {
        var cueOp1 = Math.max(0, 1 - p * 4);
        cueToSection2.style.opacity = cueOp1.toFixed(3);
        cueToSection2.style.pointerEvents = cueOp1 > 0.1 ? 'auto' : 'none';
      }

      // SECTION 1 -> 2: Same Elegant Curtain Wipe & Fade as Section 3
      if (p <= 0.40) {
        var pCover = p / 0.40;
        var wipeCover = (pCover * 100).toFixed(2);

        stageCover.style.opacity = Math.max(0, 1 - pCover).toFixed(3);
        stageCover.style.clipPath = 'inset(0 0 ' + wipeCover + '% 0)';
        stageCover.style.webkitClipPath = 'inset(0 0 ' + wipeCover + '% 0)';
        stageCover.style.transform = 'none';
        stageCover.style.pointerEvents = 'none';

        stageLanding.style.opacity = '0';
        stageLanding.style.pointerEvents = 'none';
        stageLanding.style.clipPath = 'inset(0 0 100% 0)';
        stageLanding.style.webkitClipPath = 'inset(0 0 100% 0)';

      } else if (p > 0.40 && p <= 0.48) {
        stageCover.style.opacity = '0';
        stageCover.style.pointerEvents = 'none';

        stageLanding.style.opacity = '0';
        stageLanding.style.pointerEvents = 'none';
        stageLanding.style.clipPath = 'inset(0 0 100% 0)';
        stageLanding.style.webkitClipPath = 'inset(0 0 100% 0)';

      } else {
        stageCover.style.opacity = '0';
        stageCover.style.pointerEvents = 'none';

        var pLanding = (p - 0.48) / 0.52;
        var wipeLanding = ((1 - pLanding) * 100).toFixed(2);

        stageLanding.style.opacity = pLanding.toFixed(3);
        stageLanding.style.clipPath = 'inset(0 0 ' + wipeLanding + '% 0)';
        stageLanding.style.webkitClipPath = 'inset(0 0 ' + wipeLanding + '% 0)';
        stageLanding.style.transform = 'translateZ(0)';
        stageLanding.style.pointerEvents = pLanding > 0.85 ? 'auto' : 'none';
      }

      if (p >= 0.99) {
        stageLanding.style.opacity = '1';
        stageLanding.style.clipPath = 'none';
        stageLanding.style.webkitClipPath = 'none';
        stageLanding.style.pointerEvents = 'auto';
        stageLanding.style.transform = 'none';
      }

      if (cueToSection3) {
        var cueOp2 = p > 0.90 ? Math.min(1, (p - 0.90) * 10) : 0;
        cueToSection3.style.opacity = cueOp2.toFixed(3);
        cueToSection3.style.pointerEvents = cueOp2 > 0.5 ? 'auto' : 'none';
      }

      if (musicToggleBtn) {
        if (p >= 0.20 || minAllowedTop >= h) {
          musicToggleBtn.classList.add('is-active');
        } else if (minAllowedTop === 0 && p < 0.10) {
          musicToggleBtn.classList.remove('is-active');
        }
      }

      if (p >= 0.96 && !typewriterStarted) {
        startTypewriterSequence();
        startMusic();
      }

    } else {
      // --- TRANSITION FROM SECTION 2 to SECTION 3 ---
      var p2 = Math.min(1, Math.max(0, (top - h) / h));

      if (stageCover) {
        stageCover.style.opacity = '0';
        stageCover.style.pointerEvents = 'none';
      }

      if (pinnedStage) {
        pinnedStage.style.transform = 'translateY(0)';
        pinnedStage.style.opacity = '1';
        pinnedStage.style.pointerEvents = 'none';
      }

      if (cueToSection3) {
        var cueOp3 = Math.max(0, 1 - p2 * 4);
        cueToSection3.style.opacity = cueOp3.toFixed(3);
        cueToSection3.style.pointerEvents = 'none';
      }

      // Section 2: Gracefully wipe and fade upward
      if (p2 <= 0.45) {
        var pOut = p2 / 0.45;
        var wipeOut = (pOut * 100).toFixed(2);
        stageLanding.style.opacity = Math.max(0, 1 - pOut).toFixed(3);
        stageLanding.style.clipPath = 'inset(0 0 ' + wipeOut + '% 0)';
        stageLanding.style.webkitClipPath = 'inset(0 0 ' + wipeOut + '% 0)';
        stageLanding.style.transform = 'none';
        stageLanding.style.pointerEvents = 'none';
      } else {
        stageLanding.style.opacity = '0';
        stageLanding.style.pointerEvents = 'none';
        stageLanding.style.clipPath = 'inset(0 0 100% 0)';
        stageLanding.style.webkitClipPath = 'inset(0 0 100% 0)';
      }

      // Section 3: Unveils seamlessly with overlap (no empty void gap)
      if (p2 >= 0.10) {
        var pIn = Math.min(1, (p2 - 0.10) / 0.90);
        var wipeIn = ((1 - pIn) * 100).toFixed(2);
        if (sectionInvitation) {
          sectionInvitation.style.opacity = pIn.toFixed(3);
          sectionInvitation.style.clipPath = 'inset(0 0 ' + wipeIn + '% 0)';
          sectionInvitation.style.webkitClipPath = 'inset(0 0 ' + wipeIn + '% 0)';
          sectionInvitation.style.transform = 'translateZ(0)';
          sectionInvitation.style.pointerEvents = pIn > 0.85 ? 'auto' : 'none';
        }
      } else {
        if (sectionInvitation) {
          sectionInvitation.style.opacity = '0';
          sectionInvitation.style.pointerEvents = 'none';
          sectionInvitation.style.clipPath = 'inset(0 0 100% 0)';
          sectionInvitation.style.webkitClipPath = 'inset(0 0 100% 0)';
        }
      }

      if (p2 >= 0.98) {
        if (sectionInvitation) {
          sectionInvitation.style.opacity = '1';
          sectionInvitation.style.clipPath = 'none';
          sectionInvitation.style.webkitClipPath = 'none';
          sectionInvitation.style.pointerEvents = 'auto';
          sectionInvitation.style.transform = 'none';
        }
      }
    }
  }

  function onMainScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        renderScrollState();
        ticking = false;
      });
      ticking = true;
    }
  }

  if (mainScroller) {
    mainScroller.addEventListener('scroll', onMainScroll, { passive: true });
    renderScrollState();
  }

  var shrinkElements = null;

  function updateProgress() {
    if (!invitationReel || !progressIndicator) return;
    var max = invitationReel.scrollHeight - invitationReel.clientHeight;
    var ratio = max > 0 ? invitationReel.scrollTop / max : 0;
    progressIndicator.style.height = (ratio * 100).toFixed(1) + '%';

    if (!shrinkElements) {
      shrinkElements = invitationReel.querySelectorAll(
        '.invitation-crest, .hero-eyebrow, .hero-names, .hero-line, .ceremony-title, ' +
        '.divider-royal, .divider-starlet, .family, .panel-title, .reception-meta-box, ' +
        '.venue-address-box, .venue-map-frame, ' +
        '.closing-warm, .closing-signature'
      );
    }

    var reelH = invitationReel.clientHeight;
    if (reelH <= 0 || !shrinkElements.length) return;
    var reelRect = invitationReel.getBoundingClientRect();
    // 25% Top Fade Zone Threshold - fully responsive to any screen height
    var fadeThreshold = reelH * 0.25;

    for (var i = 0; i < shrinkElements.length; i++) {
      var el = shrinkElements[i];
      var rect = el.getBoundingClientRect();
      var elTop = rect.top - reelRect.top;

      if (elTop < fadeThreshold) {
        // Enters the top fade zone: smoothly shrink down similar to Ganpati logo
        var p = (fadeThreshold - elTop) / (fadeThreshold * 0.88);
        if (p < 0) p = 0;
        if (p > 1) p = 1;

        // Shrink by 12% as it ascends through the fade, with subtle upward float
        var scale = 1 - 0.12 * p;
        var shift = -6 * p;
        el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0) scale(' + scale.toFixed(3) + ')';
      } else {
        if (el.style.transform) {
          el.style.transform = '';
        }
      }
    }
  }

  var reelTicking = false;
  function onReelScroll() {
    if (!reelTicking) {
      reelTicking = true;
      requestAnimationFrame(function () {
        updateProgress();
        reelTicking = false;
      });
    }
  }

  if (invitationReel) {
    invitationReel.addEventListener('scroll', onReelScroll, { passive: true });
    window.addEventListener('resize', function () {
      updateProgress();
    }, { passive: true });
  }

})(window, document);