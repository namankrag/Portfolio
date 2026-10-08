# 🚀 Naman Kumar Agrawal — AI & ML Engineer Portfolio

A modern, high-tech, and aesthetic personal portfolio and landing page built specifically for **Naman Kumar Agrawal** (B.E. AI & ML @ BMS College of Engineering, Bengaluru).

---

## ✨ Key Features

1. **Interactive AI Neural Canvas**:
   - Dynamic canvas mesh background connecting nodes and pulsing real-time data packets with mouse interactivity.
2. **Interactive Live Simulators & Demonstrators**:
   - **LoanSense AI Simulator**: Live credit underwriting engine with interactive sliders for Credit Score, Debt-to-Income (DTI), Income, Loan Amount, and threshold sensitivity. Features real-time SVG circular gauge and SHAP-style feature attribution bars.
   - **SmartClass AI Biometrics Lab**: Live simulated optical scanner with passive FFT anti-spoofing frequency spectrum bars, micro-tilt angle normalization (±15° pass), and Resemblyzer 256-D voice waveform visualizer.
3. **Theme Engine & Color Palette**:
   - Dark Mode 🌙 (Obsidian / Slate) & Light Mode ☀️.
   - 4 Dynamic Neon Accents: Cyan Neon, Emerald Matrix, Violet Nebula, and Amber Sun.
4. **Interactive Profile Avatar**:
   - Features a high-resolution 3D AI Engineer avatar with an in-browser live photo uploader tool.
5. **Dynamic Typewriter & Live Benchmarks**:
   - Typewriter animation highlighting key competencies.
   - Animated counter benchmarks (8.7 CGPA, 0.991 ROC-AUC, 95.8% Accuracy, 256-D biometrics).
6. **Filterable Technical Arsenal**:
   - Filter skills by *All*, *AI & Machine Learning*, *Programming Languages*, *Web & Backend*, and *Databases & Tools*.
7. **Comprehensive Resume Modal & Direct Connect**:
   - Pop-up quick view modal with print-friendly layout.
   - One-click copy email & phone, and direct message draft generation.

---

## 📁 Project Structure

```
Landing/
├── index.html          # Master semantic HTML5 document
├── css/
│   └── style.css       # Theme tokens, custom animations, glassmorphism & responsive styles
├── js/
│   ├── particles.js    # Canvas neural network particle graph
│   ├── demos.js        # LoanSense AI & SmartClass AI live simulators
│   └── main.js         # Theme switcher, typewriter, filters, modal & sound engine
├── assets/
│   └── avatar.jpg      # Profile avatar image
├── package.json        # NPM scripts for local development
└── README.md           # Documentation & guides
```

---

## 🏃 How to Run Locally

### Option 1: Direct Browser
Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python HTTP Server
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000).

### Option 3: Using Node / NPM
```bash
npm start
```

---

## 📸 Updating Your Profile Picture

You can update your picture in two easy ways:
1. **Direct File Replacement**: Place your photo at `assets/avatar.jpg` (replaces default avatar).
2. **In-Browser Preview**: Hover over your avatar on the live page and click **"Upload Photo"** to preview your real photograph immediately.

---

## 🚀 Deployment Options

This portfolio is static and zero-dependency:
- **GitHub Pages**: Push this repo to GitHub and enable Pages in `Settings -> Pages`.
- **Vercel / Netlify**: Drag-and-drop the project directory or import the repository.
