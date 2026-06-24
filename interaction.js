/**
 * Adi's Portfolio - Interaction System (Performance-Optimized & Neural Growth)
 * Hardware-accelerated cursor trails, hover particle effects, and scroll-driven neural networks.
 */

(function () {
    // 1. Mobile Hamburger Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = document.body.classList.toggle('nav-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 2. Feature Check: Disable custom cursor and trails on touchscreen devices
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    // Setup scroll tracking for mobile/touch too (path growth is visual and doesn't require pointer)
    const axonPath = document.getElementById('axon-grow-path');
    const axonDouble = document.getElementById('axon-sketch-double');

    let pathLength = 0;

    // Initialize primary axon paths
    if (axonPath) {
        pathLength = axonPath.getTotalLength();
        axonPath.style.strokeDasharray = pathLength;
        axonPath.style.strokeDashoffset = pathLength;
    }
    if (axonDouble) {
        axonDouble.style.strokeDasharray = pathLength;
        axonDouble.style.strokeDashoffset = pathLength;
    }

    // Initialize side branching arbors
    const branches = [
        { el: document.getElementById('branch-story'), startScroll: 0.12, endScroll: 0.28 },
        { el: document.getElementById('branch-skills'), startScroll: 0.32, endScroll: 0.48 },
        { el: document.getElementById('branch-projects'), startScroll: 0.52, endScroll: 0.68 },
        { el: document.getElementById('branch-hobbies'), startScroll: 0.69, endScroll: 0.79 },
        { el: document.getElementById('branch-contact'), startScroll: 0.81, endScroll: 0.96 }
    ];

    branches.forEach(b => {
        if (b.el) {
            const len = b.el.getTotalLength ? b.el.getTotalLength() : 500;
            b.len = len;
            b.el.style.strokeDasharray = len;
            b.el.style.strokeDashoffset = len;
        }
    });

    // Dynamically calculate myelin thresholds based on closest path points
    const myelinThresholds = [];
    const myelinSegments = document.querySelectorAll('.myelin-segment');

    function calculateMyelinThresholds() {
        if (!axonPath || !pathLength) return;
        myelinThresholds.length = 0;
        myelinSegments.forEach(segment => {
            let cx = 0, cy = 0;
            if (segment.tagName.toLowerCase() === 'rect') {
                const x = parseFloat(segment.getAttribute('x') || 0);
                const y = parseFloat(segment.getAttribute('y') || 0);
                const w = parseFloat(segment.getAttribute('width') || 0);
                const h = parseFloat(segment.getAttribute('height') || 0);
                cx = x + w / 2;
                cy = y + h / 2;
            } else {
                try {
                    const bbox = segment.getBBox();
                    cx = bbox.x + bbox.width / 2;
                    cy = bbox.y + bbox.height / 2;
                } catch (e) {
                    cx = 480;
                    cy = 690;
                }
            }

            let minD = Infinity;
            let closestT = 0;
            const samples = 200;
            for (let i = 0; i <= samples; i++) {
                const t = i / samples;
                try {
                    const pt = axonPath.getPointAtLength(t * pathLength);
                    const dx = pt.x - cx;
                    const dy = pt.y - cy;
                    const dist = dx * dx + dy * dy;
                    if (dist < minD) {
                        minD = dist;
                        closestT = t;
                    }
                } catch (e) { }
            }
            myelinThresholds.push({ el: segment, t: closestT });
        });
        myelinThresholds.sort((a, b) => a.t - b.t);
    }

    calculateMyelinThresholds();
    window.addEventListener('resize', () => {
        calculateMyelinThresholds();
    });

    // Exit mouse trail setup if mobile, but keep scroll drawing
    if (isTouchDevice) {
        // Setup simplified scroll observer for mobile device path growth
        window.addEventListener('scroll', () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            updateAxonGrowth(scrollFraction);
        });
        return;
    }

    // Enable custom cursor styles in CSS
    document.body.classList.add('has-custom-cursor');

    // 3. Setup Canvas & Context
    const canvas = document.getElementById('interaction-canvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 4. Mouse Coordinate Tracking & Interpolation
    let mouse = { x: width / 2, y: height / 2 };
    let cursor = { x: width / 2, y: height / 2 };
    let lastSpawnMouse = { x: width / 2, y: height / 2 };
    let isMouseActive = false;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        isMouseActive = true;

        // Calculate distance since last binary particle spawn
        const dx = mouse.x - lastSpawnMouse.x;
        const dy = mouse.y - lastSpawnMouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 15) {
            spawnBinaryParticle(mouse.x, mouse.y);
            lastSpawnMouse.x = mouse.x;
            lastSpawnMouse.y = mouse.y;
        }
    });

    window.addEventListener('mouseenter', () => {
        isMouseActive = true;
    });

    window.addEventListener('mouseleave', () => {
        isMouseActive = false;
    });

    // 5. Custom Cursor Snapping and Hover Link States
    let isHoveringLink = false;
    let cursorRingRadius = 8;
    let cursorRingAlpha = 0.35;

    function setupLinkHoverListeners() {
        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => { isHoveringLink = true; });
            link.addEventListener('mouseleave', () => { isHoveringLink = false; });
        });
    }
    setupLinkHoverListeners();

    const observer = new MutationObserver(setupLinkHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // 6. Particle Arrays & Emitters
    const binaryParticles = [];
    const hoverParticles = [];
    const neuralPulses = []; // Array to track active glowing pulses traveling along axon path

    const randomRange = (min, max) => Math.random() * (max - min) + min;

    // 7. Spawn Binary Trail Particles
    function spawnBinaryParticle(x, y) {
        binaryParticles.push({
            x: x,
            y: y,
            char: Math.random() > 0.5 ? '1' : '0',
            vx: randomRange(-0.3, 0.3),
            vy: randomRange(-0.7, -0.2),
            scale: randomRange(0.7, 1.2),
            alpha: 1.0,
            rotation: randomRange(-0.2, 0.2),
            rotationSpeed: randomRange(-0.01, 0.01),
            decay: randomRange(0.012, 0.02)
        });

        if (binaryParticles.length > 50) {
            binaryParticles.shift();
        }
    }

    // 8. Spawn Name Hover Explosion Particles
    function spawnHoverParticles(x, y) {
        const count = 3;
        const colors = ['#d5ded7', '#a2b49e', '#829488', '#21332a'];

        for (let i = 0; i < count; i++) {
            const angle = randomRange(0, Math.PI * 2);
            const speed = randomRange(1.2, 3.5);
            hoverParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - randomRange(0.3, 1.2),
                radius: randomRange(1.5, 4),
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1.0,
                gravity: 0.06,
                friction: 0.96,
                decay: randomRange(0.025, 0.045)
            });
        }

        if (hoverParticles.length > 100) {
            hoverParticles.splice(0, hoverParticles.length - 100);
        }
    }

    // Bind Name Hover Logic with Throttle
    let lastHoverSpawnTime = 0;
    const titleWords = document.querySelectorAll('.title-word');

    titleWords.forEach(word => {
        word.addEventListener('mousemove', (e) => {
            const now = performance.now();
            if (now - lastHoverSpawnTime > 25) {
                spawnHoverParticles(e.clientX, e.clientY);
                lastHoverSpawnTime = now;
            }
        });
    });

    // 9. Update Axon Growth Elements (stroke-dashoffsets)
    function updateAxonGrowth(scrollFraction) {
        // Amplify scroll fraction for earlier path activation — user sees illumination in real-time
        // Cap at 1.0 so it doesn't overshoot at page bottom
        const amplified = Math.min(scrollFraction * 1.55, 1.0);

        if (axonPath && pathLength) {
            const drawOffset = pathLength * (1 - amplified);
            axonPath.style.strokeDashoffset = drawOffset;
        }
        if (axonDouble && pathLength) {
            const drawOffset = pathLength * (1 - amplified);
            axonDouble.style.strokeDashoffset = drawOffset;
        }

        // Sprout side arbors when their scroll triggers are reached
        branches.forEach(b => {
            if (b.el && b.len) {
                if (amplified < b.startScroll) {
                    b.el.style.strokeDashoffset = b.len;
                    b.el.classList.remove('active');
                } else if (amplified > b.endScroll) {
                    b.el.style.strokeDashoffset = 0;
                    b.el.classList.add('active');
                } else {
                    const f = (amplified - b.startScroll) / (b.endScroll - b.startScroll);
                    b.el.style.strokeDashoffset = b.len * (1 - f);
                    if (f > 0.8) {
                        b.el.classList.add('active');
                    } else {
                        b.el.classList.remove('active');
                    }
                }
            }
        });

        // Activate myelin segments precisely as the growth line reaches them
        myelinThresholds.forEach(m => {
            if (amplified >= m.t) {
                m.el.classList.add('active');
            } else {
                m.el.classList.remove('active');
            }
        });
    }

    // 10. Scroll & Active Section Navbar Highlights
    window.addEventListener('scroll', () => {
        // Active navbar section links tracking
        const sections = document.querySelectorAll('main, section');
        let currentSectionId = 'hero';

        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            const scroll = window.scrollY;

            if (scroll >= top && scroll < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 10b. Soma Interaction Zone — hover to illuminate neuron head + show popup
    const somaZone = document.getElementById('soma-hover-zone');
    const somaPopup = document.getElementById('soma-popup');
    const neuronSvg = document.getElementById('neuron-svg');

    if (somaZone) {
        somaZone.addEventListener('mouseenter', () => {
            if (neuronSvg) neuronSvg.classList.add('soma-active');
            if (somaPopup) somaPopup.classList.add('visible');
        });
        somaZone.addEventListener('mouseleave', () => {
            if (neuronSvg) neuronSvg.classList.remove('soma-active');
            if (somaPopup) somaPopup.classList.remove('visible');
        });
    }

    // 11. Main Animation Loop
    function updateAndDraw() {
        ctx.clearRect(0, 0, width, height);

        // A. Use direct scroll position — no smoothing lag, updates instantly with scroll
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        updateAxonGrowth(scrollFraction);

        // B. Update and Draw Glowing Neural Pulses (Signals)
        if (axonPath && pathLength && scrollFraction > 0.05) {
            // Randomly spawn pulses at the soma (origin t = 0)
            if (Math.random() < 0.015 && neuralPulses.length < 6) {
                neuralPulses.push({
                    t: 0,
                    speed: randomRange(0.002, 0.005),
                    radius: randomRange(2.5, 4.5)
                });
            }

            for (let i = neuralPulses.length - 1; i >= 0; i--) {
                const pulse = neuralPulses[i];
                pulse.t += pulse.speed;

                // Terminate pulse if it catches up to the un-drawn parts of the axon
                if (pulse.t >= scrollFraction || pulse.t >= 1) {
                    neuralPulses.splice(i, 1);
                    continue;
                }

                try {
                    // Extract exact coordinates along the SVG path
                    const pt = axonPath.getPointAtLength(pulse.t * pathLength);

                    // Canvas coordinates are viewport-fixed; adjust for absolute document scroll
                    const drawX = pt.x;
                    const drawY = pt.y - window.scrollY;

                    // Draw glowing pulse particle
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(drawX, drawY, pulse.radius, 0, Math.PI * 2);
                    ctx.fillStyle = '#d5ded7';
                    ctx.shadowColor = '#a2b49e';
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.restore();
                } catch (e) {
                    // Fail gracefully if path calculations fail on resize
                    neuralPulses.splice(i, 1);
                }
            }
        }

        // C. Update and Draw Binary Cursor Trail
        ctx.font = 'normal 400 14px "Bungee", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = binaryParticles.length - 1; i >= 0; i--) {
            const p = binaryParticles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                binaryParticles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.scale(p.scale, p.scale);
            ctx.fillStyle = `rgba(130, 148, 136, ${p.alpha * 0.7})`;
            ctx.fillText(p.char, 0, 0);
            ctx.restore();
        }

        // D. Update and Draw Name Hover Particles
        for (let i = hoverParticles.length - 1; i >= 0; i--) {
            const p = hoverParticles[i];

            p.vx *= p.friction;
            p.vy *= p.friction;
            p.vy += p.gravity;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                hoverParticles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha * 0.85;
            ctx.fill();
            ctx.restore();
        }

        // E. Draw Custom Cursor Follower
        if (isMouseActive) {
            cursor.x += (mouse.x - cursor.x) * 0.16;
            cursor.y += (mouse.y - cursor.y) * 0.16;

            const targetRadius = isHoveringLink ? 20 : 8;
            const targetAlpha = isHoveringLink ? 0.85 : 0.35;

            cursorRingRadius += (targetRadius - cursorRingRadius) * 0.2;
            cursorRingAlpha += (targetAlpha - cursorRingAlpha) * 0.2;

            ctx.save();
            ctx.beginPath();
            ctx.arc(cursor.x, cursor.y, cursorRingRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(213, 222, 215, ${cursorRingAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.arc(cursor.x, cursor.y, isHoveringLink ? 2 : 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(213, 222, 215, 0.85)';
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(updateAndDraw);
    }

    requestAnimationFrame(updateAndDraw);

    // 12. Interactive Phonebook Speed Dial Event Handler
    const keypadButtons = document.querySelectorAll('.key-button');
    const directoryItems = document.querySelectorAll('.directory-item');
    const phoneStatus = document.getElementById('phone-status');

    // Vintage Phone Tone Generator (Web Audio API)
    let audioCtx = null;
    function playDialBeep(freq1, freq2 = 0) {
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const osc1 = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            osc1.type = 'sine';
            osc1.frequency.value = freq1;

            let osc2 = null;
            if (freq2 > 0) {
                osc2 = audioCtx.createOscillator();
                osc2.type = 'sine';
                osc2.frequency.value = freq2;
                osc2.connect(gainNode);
            }

            osc1.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

            osc1.start();
            if (osc2) osc2.start();

            osc1.stop(audioCtx.currentTime + 0.16);
            if (osc2) osc2.stop(audioCtx.currentTime + 0.16);
        } catch (e) {
            // Audio context not allowed or failed, fail silently
        }
    }

    // DTMF Frequencies mapping
    const dtmfMap = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '0': [941, 1336], 'clear': [941, 1209], 'dial': [941, 1477]
    };

    keypadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-key');
            const action = btn.getAttribute('data-action');
            const mapKey = key || action;

            // Play DTMF tone
            if (dtmfMap[mapKey]) {
                playDialBeep(dtmfMap[mapKey][0], dtmfMap[mapKey][1]);
            }

            if (key) {
                // If it's a valid speed dial (1, 2, 3, 4)
                if (['1', '2', '3', '4'].includes(key)) {
                    // Update active button state
                    keypadButtons.forEach(k => k.classList.remove('key-active'));
                    btn.classList.add('key-active');

                    // Update active directory state
                    directoryItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('data-index') === key) {
                            item.classList.add('active');
                            if (phoneStatus) {
                                phoneStatus.innerText = `SELECTED: ${item.getAttribute('data-label')}`;
                            }
                        }
                    });
                } else {
                    // Unassigned speed dial
                    btn.classList.add('key-active');
                    setTimeout(() => { btn.classList.remove('key-active'); }, 150);
                    if (phoneStatus) {
                        phoneStatus.innerText = 'NO SPEED DIAL ASSIGNED';
                        setTimeout(() => {
                            const activeItem = document.querySelector('.directory-item.active');
                            if (activeItem) {
                                phoneStatus.innerText = `SELECTED: ${activeItem.getAttribute('data-label')}`;
                            } else {
                                phoneStatus.innerText = 'READY';
                            }
                        }, 1200);
                    }
                }
            } else if (action === 'clear') {
                // Clear active states
                keypadButtons.forEach(k => k.classList.remove('key-active'));
                directoryItems.forEach(item => item.classList.remove('active'));
                if (phoneStatus) {
                    phoneStatus.innerText = 'CLEARED';
                    setTimeout(() => { phoneStatus.innerText = 'READY'; }, 800);
                }
            } else if (action === 'dial') {
                // Dial active item
                const activeItem = document.querySelector('.directory-item.active');
                if (activeItem) {
                    const link = activeItem.querySelector('.directory-value');
                    if (link) {
                        if (phoneStatus) {
                            phoneStatus.innerText = 'DIALING...';
                        }
                        // Add a slight delay to simulate phone connection before click
                        setTimeout(() => {
                            if (phoneStatus) {
                                phoneStatus.innerText = 'CONNECTED';
                            }
                            link.click();
                        }, 600);
                    }
                } else {
                    if (phoneStatus) {
                        phoneStatus.innerText = 'SELECT SPEED DIAL FIRST';
                        setTimeout(() => { phoneStatus.innerText = 'READY'; }, 1200);
                    }
                }
            }
        });
    });
})();
