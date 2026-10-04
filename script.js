/* ==========================================================================
   ITZFIZZ - Scroll-Driven Hero Section Animation JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Element References
    const navbar = document.querySelector('.navbar');
    const heroAnims = document.querySelectorAll('.hero-anim');
    const mainHeadline = document.getElementById('mainHeadline');
    const introCards = document.querySelectorAll('.intro-card');
    const scrollTrackSection = id('scrollTrackSection');
    const carWrapper = id('carWrapper');
    const roadTrail = id('roadTrail');
    const speedValue = id('speedValue');
    const progressBar = id('progressBar');
    const progressPercent = id('progressPercent');
    const floatCard1 = id('floatCard1');
    const floatCard2 = id('floatCard2');
    const floatCard3 = id('floatCard3');
    const floatCard4 = id('floatCard4');
    const soundToggle = id('soundToggle');
    const replayBtn = id('replayIntro');

    function id(str) { return document.getElementById(str); }

    // 2. Initial Page Load Entry Timeline
    const introTL = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    function runIntroAnimation() {
        introTL.clear();
        
        // Navbar Reveal
        introTL.to(navbar, {
            y: 0,
            duration: 0.8,
            ease: 'power4.out',
            onStart: () => navbar.classList.remove('navbar-hidden')
        });

        // Headline & Subtitle reveal
        introTL.fromTo(heroAnims, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.9 },
            "-=0.4"
        );

        // Intro Stat Cards & Counter Animation
        introTL.fromTo(introCards,
            { opacity: 0, scale: 0.9, y: 20 },
            { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                stagger: 0.12, 
                duration: 0.8,
                onComplete: animateIntroCounters 
            },
            "-=0.5"
        );
    }

    // Number Counter Helper
    function animateIntroCounters() {
        introCards.forEach(card => {
            const numEl = card.querySelector('.stat-number');
            const target = parseFloat(numEl.getAttribute('data-target'));
            const suffix = numEl.getAttribute('data-suffix') || '';
            const barFill = card.querySelector('.bar-fill');
            const fillWidth = barFill.style.getPropertyValue('--fill-width') || '50%';

            // Animate bar width
            barFill.style.width = fillWidth;

            let obj = { val: 0 };
            gsap.to(obj, {
                val: target,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                    numEl.textContent = Math.round(obj.val) + suffix;
                }
            });
        });
    }

    // Run intro on load
    runIntroAnimation();


    // 3. Core Feature: GSAP ScrollTrigger Pinned Car & Trail Animation
    const carTrackTL = gsap.timeline({
        scrollTrigger: {
            trigger: scrollTrackSection,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.sticky-viewport',
            scrub: 1, // Smooth easing/interpolation
            onUpdate: (self) => {
                const progress = self.progress;
                const progressPct = Math.round(progress * 100);

                // Update Progress UI
                if (progressBar) progressBar.style.width = `${progressPct}%`;
                if (progressPercent) progressPercent.textContent = `${progressPct}%`;

                // Calculate Scroll Velocity (KM/H simulation)
                const velocity = Math.min(260, Math.round(Math.abs(self.getVelocity()) / 12));
                if (speedValue) {
                    speedValue.textContent = String(velocity).padStart(3, '0');
                }

                // Audio Pitch modulation based on velocity if active
                if (audioContext && isSoundOn && engineGain) {
                    engineGain.gain.setTargetAtTime(Math.min(0.2, velocity / 1000), audioContext.currentTime, 0.1);
                    if (engineOsc) {
                        engineOsc.frequency.setTargetAtTime(60 + velocity * 1.2, audioContext.currentTime, 0.1);
                    }
                }

                // Floating Stat Cards Reveal triggers at key progress milestones
                updateFloatingCards(progress);
            }
        }
    });

    // Horizontal Movement of Car Across the Road Track (-10vw to 95vw)
    carTrackTL.fromTo(carWrapper,
        { x: '-15vw' },
        { x: '95vw', ease: 'none' },
        0
    );

    // Expanding Green Trail behind the car (0% to 100% width)
    carTrackTL.fromTo(roadTrail,
        { width: '0%' },
        { width: '100%', ease: 'none' },
        0
    );

    // Floating Metric Cards Trigger Logic based on Scroll Progress
    function updateFloatingCards(progress) {
        // Milestone 1: Card 1 (58% Increase) at ~12% - 35%
        toggleCard(floatCard1, progress >= 0.10 && progress < 0.40);

        // Milestone 2: Card 2 (27% Efficiency) at ~35% - 60%
        toggleCard(floatCard2, progress >= 0.35 && progress < 0.65);

        // Milestone 3: Card 3 (23% Phone Calls) at ~60% - 85%
        toggleCard(floatCard3, progress >= 0.60 && progress < 0.85);

        // Milestone 4: Card 4 (99.9% Performance) at ~82% - 100%
        toggleCard(floatCard4, progress >= 0.82);
    }

    function toggleCard(element, shouldShow) {
        if (!element) return;
        if (shouldShow) {
            if (!element.classList.contains('visible')) {
                element.classList.add('visible');
                // Trigger counter if card has counter
                animateCardCounter(element);
            }
        } else {
            element.classList.remove('visible');
        }
    }

    function animateCardCounter(card) {
        const statEl = card.querySelector('.card-big-stat');
        if (!statEl || card.dataset.animated === 'true') return;
        card.dataset.animated = 'true';

        const target = parseFloat(statEl.getAttribute('data-count'));
        const suffix = statEl.getAttribute('data-suffix') || '';
        let obj = { val: 0 };

        gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
                statEl.textContent = (target % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
            }
        });
    }


    // 4. Replay Intro Button Handler
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 0.8 });
            setTimeout(() => {
                runIntroAnimation();
            }, 400);
        });
    }


    // 5. Web Audio API Engine SFX Synthesizer
    let audioContext = null;
    let engineOsc = null;
    let engineGain = null;
    let isSoundOn = false;

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            if (!audioContext) {
                initAudio();
            }

            isSoundOn = !isSoundOn;
            const iconOff = soundToggle.querySelector('.icon-sound-off');
            const iconOn = soundToggle.querySelector('.icon-sound-on');

            if (isSoundOn) {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                engineGain.gain.setTargetAtTime(0.05, audioContext.currentTime, 0.1);
                iconOff.classList.add('hidden');
                iconOn.classList.remove('hidden');
                soundToggle.style.borderColor = 'var(--trail-green)';
            } else {
                if (engineGain) {
                    engineGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.1);
                }
                iconOff.classList.remove('hidden');
                iconOn.classList.add('hidden');
                soundToggle.style.borderColor = 'var(--bg-card-border)';
            }
        });
    }

    function initAudio() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioCtx();

            engineOsc = audioContext.createOscillator();
            engineGain = audioContext.createGain();

            engineOsc.type = 'sawtooth';
            engineOsc.frequency.setValueAtTime(60, audioContext.currentTime); // Low engine rumble base

            engineGain.gain.setValueAtTime(0, audioContext.currentTime);

            engineOsc.connect(engineGain);
            engineGain.connect(audioContext.destination);

            engineOsc.start();
        } catch (e) {
            console.warn('Web Audio API not supported on this browser.');
        }
    }
});
