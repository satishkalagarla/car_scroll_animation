# 🏎️ ITZFIZZ — Scroll-Driven Hero Section Animation

A modern, high-performance, interactive scroll-driven automotive hero section web application. Built with **HTML5, CSS3, JavaScript (ES6+), GSAP 3 (ScrollTrigger)**, and **Lenis Smooth Scroll**. Inspired by state-of-the-art interactive web experiences.

---

## 🔗 Project Submission Links

- **Live Demo Webpage**: [https://YOUR_USERNAME.github.io/car-scroll-animation](https://YOUR_USERNAME.github.io/car-scroll-animation)
- **GitHub Repository**: [https://github.com/YOUR_USERNAME/car-scroll-animation](https://github.com/YOUR_USERNAME/car-scroll-animation)

*(Replace `YOUR_USERNAME` with your actual GitHub username)*

---

## 📌 Project Overview & Description

This project recreates and elevates a scroll-driven hero section animation featuring a top-view supercar driving along a track, revealing dynamic trail effects, unmasking letter-spaced text, and triggering real-time telemetry statistics cards as the user scrolls.

### 🌟 Key Features

1. **Hero Section Layout (Above the Fold)**
   - **Letter-Spaced Headline**: `W E L C O M E   I T Z F I Z Z` rendered with modern dark-mode typography and ambient lighting effects.
   - **Impact Metrics Grid**: Initial statistics cards showcasing key performance percentages (`58%` pickup point use, `27%` expansion rate, `23%` support reduction) with animated progress bars.
   - **Scroll Prompt**: Interactive pulsing mouse wheel indicator inviting users to scroll down.

2. **Initial Load Entry Animation**
   - Staggered entrance sequence powered by a GSAP timeline (`power3.out`).
   - Navbar slides into view gracefully from the top.
   - Headline and impact metrics fade and translate up into place with staggered timing.
   - Interactive numerical counters count up smoothly from `0%` to their target values on page load.

3. **Scroll-Driven Hero Motion (Core Feature)**
   - **Pinned Sticky Track**: Multi-screen pinned viewport (`300vh` scroll length) powered by GSAP `ScrollTrigger` (`pin: true`, `scrub: 1`).
   - **Horizontal Car Motion**: Top-view supercar graphic (`car.png`) glides across the road asphalt bound strictly to the user's scroll progress (not time-based autoplay).
   - **Dynamic Trail Expansion**: A bright neon green trail (`#45db7d`) expands directly behind the moving car.
   - **Unmasked Text Reveal**: Static background text `W E L C O M E   I T Z F I Z Z` is unmasked into high-contrast black text inside the trail as the car moves over it.
   - **Interactive Telemetry Cards**: Floating metric cards (`58%`, `27%`, `23%`, `99.9%`) slide and scale into view at specific scroll progress milestones (10%, 35%, 60%, 82%).

4. **Speedometer Telemetry & Web Audio Synthesizer**
   - **Velocity Meter**: Dynamic speed calculation (`KM/H`) derived from the user's scroll velocity.
   - **Track Progress Indicator**: Displays real-time scroll completion percentage (`0%` to `100%`).
   - **Engine Audio Synthesizer**: Web Audio API engine oscillator with pitch modulation tied to scroll speed (toggleable via the top navigation bar).

5. **Performance & Motion Engineering Guidelines**
   - **Hardware Acceleration**: Only GPU-friendly properties (`transform: translateX()`, `scale()`, `opacity`, `clip-path`) are animated, preventing expensive browser layout reflows.
   - **Fluid Scroll Easing**: Integrated **Lenis Smooth Scroll** to standardize scroll wheel deceleration across touchpads and mice.
   - **Responsive Design**: Full breakpoint adaptability for desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

- **Markup**: HTML5 (Semantic Structure)
- **Styling**: Vanilla CSS3 (CSS Custom Properties, Glassmorphism, Modern Flexbox/Grid Layouts)
- **Scripting**: Modern JavaScript (ES6+ Modules & Web Audio API)
- **Animation Engine**: GSAP 3.12 (GreenSock Animation Platform) + **ScrollTrigger Plugin**
- **Smooth Scrolling**: Lenis Smooth Scroll 1.1

---

## 📁 File Structure

```text
car-scroll-animation/
├── index.html        # Main HTML structure & semantic layout
├── style.css         # Styling, dark mode design system & keyframe animations
├── script.js        # GSAP timelines, ScrollTrigger, Lenis scroll & Web Audio SFX
├── car.png           # High-resolution top-view supercar graphic asset
└── README.md         # Comprehensive project documentation & submission guide
```

---

## 💻 Local Setup & Execution

### Option 1: Direct File Access
Simply double-click [`index.html`](file:///c:/Car%20Scroll%20Animation/index.html) in your browser.

### Option 2: Local Development Server
Run a lightweight HTTP server using Python:
```bash
python -m http.server 8085
```
Then navigate to `http://localhost:8085` in your browser.

---

## 🚀 GitHub Pages Deployment Steps

1. Create a repository on GitHub named `car-scroll-animation`.
2. Push your project files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Scroll-Driven Hero Section Animation"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/car-scroll-animation.git
   git push -u origin main
   ```
3. Enable **GitHub Pages**:
   - Go to repository **Settings** → **Pages**.
   - Under **Build and deployment** > **Branch**, select `main` and `/root`.
   - Click **Save**.
