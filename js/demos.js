/**
 * Interactive AI/ML Project Demonstrations
 * Author: Naman Kumar Agrawal Portfolio
 * Showcasing: LoanSense AI & SmartClass AI live client-side simulators
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoanSenseSimulator();
  initSmartClassSimulator();
});

/* ==========================================================================
   1. LOANSENSE AI - CREDIT RISK UNDERWRITING SIMULATOR
   ========================================================================== */
function initLoanSenseSimulator() {
  const creditScoreInput = document.getElementById('sim-credit-score');
  const dtiInput = document.getElementById('sim-dti');
  const incomeInput = document.getElementById('sim-income');
  const loanAmountInput = document.getElementById('sim-loan-amount');
  const cutoffInput = document.getElementById('sim-cutoff');

  if (!creditScoreInput || !dtiInput || !incomeInput || !loanAmountInput) return;

  // Value Display Elements
  const creditScoreVal = document.getElementById('val-credit-score');
  const dtiVal = document.getElementById('val-dti');
  const incomeVal = document.getElementById('val-income');
  const loanAmountVal = document.getElementById('val-loan-amount');
  const cutoffVal = document.getElementById('val-cutoff');

  // Result Elements
  const gaugeProgress = document.getElementById('loan-gauge-progress');
  const probValueDisplay = document.getElementById('loan-prob-value');
  const riskBadge = document.getElementById('loan-risk-badge');
  const decisionText = document.getElementById('loan-decision-text');
  const featDtiBar = document.getElementById('feat-dti-bar');
  const featCreditBar = document.getElementById('feat-credit-bar');
  const featIncomeBar = document.getElementById('feat-income-bar');

  function calculateRisk() {
    const creditScore = parseFloat(creditScoreInput.value);
    const dti = parseFloat(dtiInput.value); // percentage (e.g. 25%)
    const income = parseFloat(incomeInput.value);
    const loanAmount = parseFloat(loanAmountInput.value);
    const cutoff = cutoffInput ? parseFloat(cutoffInput.value) : 65;

    // Update labels
    if (creditScoreVal) creditScoreVal.textContent = creditScore;
    if (dtiVal) dtiVal.textContent = dti + '%';
    if (incomeVal) incomeVal.textContent = '$' + income.toLocaleString();
    if (loanAmountVal) loanAmountVal.textContent = '$' + loanAmount.toLocaleString();
    if (cutoffVal) cutoffVal.textContent = cutoff + '%';

    // Model Emulation (Normalized weights reflecting Gradient Boosting EDA findings)
    // Credit score normalized (300 to 850) -> -2 to +2
    const normCredit = (creditScore - 600) / 120;
    // DTI normalized (0% to 70%) -> lower is better
    const normDTI = (35 - dti) / 15;
    // Loan-to-Income ratio
    const lti = loanAmount / Math.max(income, 1000);
    const normLTI = (0.35 - lti) * 2;

    // Weighted Logit Score (DTI ~52%, Credit ~38%, LTI/Income ~10%)
    const logit = (normDTI * 1.55) + (normCredit * 1.25) + (normLTI * 0.45) + 0.35;
    
    // Sigmoid function to get probability 0 to 1
    const rawProb = 1 / (1 + Math.exp(-logit));
    const probPercent = Math.round(Math.min(Math.max(rawProb * 100, 3), 99));

    // Update SVG Circular Gauge
    // Circumference for r=40 is 2 * PI * 40 ≈ 251.3
    const circumference = 251.3;
    const offset = circumference - (probPercent / 100) * circumference;
    
    if (gaugeProgress) {
      gaugeProgress.style.strokeDashoffset = offset;
      
      if (probPercent >= cutoff) {
        gaugeProgress.style.stroke = '#10b981'; // Emerald
      } else if (probPercent >= cutoff - 15) {
        gaugeProgress.style.stroke = '#f59e0b'; // Amber
      } else {
        gaugeProgress.style.stroke = '#ef4444'; // Rose / Red
      }
    }

    if (probValueDisplay) {
      probValueDisplay.textContent = probPercent + '%';
    }

    // Risk Classification
    if (riskBadge && decisionText) {
      if (probPercent >= cutoff + 10) {
        riskBadge.className = 'status-pill text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
        riskBadge.innerHTML = '<span class="pulse-dot"></span> Low Risk • Instant Approval';
        decisionText.textContent = `Excellent credit metrics. Debt-to-Income (${dti}%) and credit tier (${creditScore}) comfortably satisfy underwriting thresholds.`;
      } else if (probPercent >= cutoff) {
        riskBadge.className = 'status-pill text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
        riskBadge.innerHTML = '<span class="pulse-dot bg-cyan-400"></span> Moderate Risk • Standard Approval';
        decisionText.textContent = `Application cleared by ensemble classifier. Metrics fall within acceptable risk bounds at the ${cutoff}% decision cutoff.`;
      } else if (probPercent >= cutoff - 18) {
        riskBadge.className = 'status-pill text-amber-400 bg-amber-500/10 border-amber-500/30';
        riskBadge.innerHTML = '<span class="pulse-dot bg-amber-400"></span> Elevated Risk • Manual Review Required';
        decisionText.textContent = `Borderline risk profile. Higher DTI ratio (${dti}%) flags caution. Additional collateral or secondary underwriter verification recommended.`;
      } else {
        riskBadge.className = 'status-pill text-rose-400 bg-rose-500/10 border-rose-500/30';
        riskBadge.innerHTML = '<span class="pulse-dot bg-rose-400"></span> High Risk • Application Declined';
        decisionText.textContent = `High default probability calculated. Significant debt burden (${dti}% DTI) and sub-optimal credit rating (${creditScore}) exceed model tolerance.`;
      }
    }

    // Dynamic SHAP Feature Attribution bars
    if (featDtiBar) {
      const dtiImpact = Math.min(Math.abs(normDTI) * 28 + 20, 95);
      featDtiBar.style.width = dtiImpact + '%';
      featDtiBar.className = normDTI >= 0 ? 'h-full bg-emerald-400 rounded-full' : 'h-full bg-rose-400 rounded-full';
    }
    if (featCreditBar) {
      const credImpact = Math.min(Math.abs(normCredit) * 25 + 18, 90);
      featCreditBar.style.width = credImpact + '%';
      featCreditBar.className = normCredit >= 0 ? 'h-full bg-emerald-400 rounded-full' : 'h-full bg-rose-400 rounded-full';
    }
    if (featIncomeBar) {
      const ltiImpact = Math.min(Math.abs(normLTI) * 20 + 12, 75);
      featIncomeBar.style.width = ltiImpact + '%';
      featIncomeBar.className = normLTI >= 0 ? 'h-full bg-emerald-400 rounded-full' : 'h-full bg-rose-400 rounded-full';
    }
  }

  // Bind input listeners
  [creditScoreInput, dtiInput, incomeInput, loanAmountInput, cutoffInput].forEach(elem => {
    if (elem) elem.addEventListener('input', calculateRisk);
  });

  // Preset button actions
  window.setLoanPreset = function(type) {
    if (type === 'prime') {
      creditScoreInput.value = 780;
      dtiInput.value = 18;
      incomeInput.value = 95000;
      loanAmountInput.value = 25000;
    } else if (type === 'moderate') {
      creditScoreInput.value = 650;
      dtiInput.value = 36;
      incomeInput.value = 55000;
      loanAmountInput.value = 22000;
    } else if (type === 'subprime') {
      creditScoreInput.value = 520;
      dtiInput.value = 54;
      incomeInput.value = 38000;
      loanAmountInput.value = 30000;
    }
    calculateRisk();
  };

  // Initial run
  calculateRisk();
}

/* ==========================================================================
   2. SMARTCLASS AI - BIOMETRICS & ANTI-SPOOFING SIMULATOR
   ========================================================================== */
function initSmartClassSimulator() {
  const fftContainer = document.getElementById('fft-bars-container');
  const scenarioSelect = document.getElementById('bio-scenario');
  const testBiometricsBtn = document.getElementById('btn-test-biometrics');
  const bioStatusBox = document.getElementById('bio-status-box');
  const bioEmbedDist = document.getElementById('bio-embed-dist');
  const bioTiltAngle = document.getElementById('bio-tilt-angle');
  const bioSpoofScore = document.getElementById('bio-spoof-score');
  const bioSpeakerSim = document.getElementById('bio-speaker-sim');
  const scanOverlay = document.getElementById('scan-overlay-anim');

  // Build 24 FFT Frequency Bars
  if (fftContainer && fftContainer.children.length === 0) {
    for (let i = 0; i < 24; i++) {
      const bar = document.createElement('div');
      bar.className = 'fft-bar';
      bar.style.height = (10 + Math.random() * 25) + 'px';
      fftContainer.appendChild(bar);
    }
  }

  // Audio Waveform Canvas Animation
  const waveCanvas = document.getElementById('waveform-canvas');
  let waveCtx, waveAnimationId;
  let waveActive = false;
  let wavePhase = 0;

  if (waveCanvas) {
    waveCtx = waveCanvas.getContext('2d');
    function resizeWave() {
      waveCanvas.width = waveCanvas.parentElement.clientWidth || 300;
      waveCanvas.height = 70;
    }
    resizeWave();
    window.addEventListener('resize', resizeWave);

    function drawWave() {
      if (!waveCtx) return;
      waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
      waveCtx.beginPath();
      waveCtx.lineWidth = 2;
      waveCtx.strokeStyle = '#06b6d4';

      const sliceWidth = waveCanvas.width / 50;
      let x = 0;

      for (let i = 0; i < 50; i++) {
        const amplitude = waveActive ? 22 : 4;
        const freq1 = Math.sin(i * 0.2 + wavePhase);
        const freq2 = Math.cos(i * 0.1 + wavePhase * 1.5);
        const y = waveCanvas.height / 2 + (freq1 + freq2) * (amplitude / 2);

        if (i === 0) waveCtx.moveTo(x, y);
        else waveCtx.lineTo(x, y);

        x += sliceWidth;
      }
      waveCtx.stroke();
      wavePhase += waveActive ? 0.15 : 0.03;
      waveAnimationId = requestAnimationFrame(drawWave);
    }
    drawWave();
  }

  // Scenarios Definition
  const scenarios = {
    genuine: {
      title: "Genuine Student (Classroom Lighting)",
      tilt: "+4.2°",
      embedDist: "0.24 (Match Threshold: < 0.60)",
      spoofScore: "0.04 (Threshold: < 0.25)",
      speakerSim: "0.91 (Cosine Match: > 0.82)",
      fftMode: "clean",
      statusHtml: `
        <div class="flex items-center gap-3 text-emerald-400 font-semibold mb-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          AUTHENTICATION PASSED • 100% VERIFIED
        </div>
        <p class="text-xs text-slate-300">dlib 128-D embedding matched enrolled subject. Passive FFT frequency check detected genuine skin reflectance. Resemblyzer voice sample matched student voiceprint.</p>
      `
    },
    spoof_screen: {
      title: "Spoof Attempt: Tablet / Mobile Screen Glare",
      tilt: "0.0° (Flat)",
      embedDist: "0.31 (Apparent Match)",
      spoofScore: "0.89 (SPOOF DETECTED)",
      speakerSim: "N/A (Skipped)",
      fftMode: "spoof",
      statusHtml: `
        <div class="flex items-center gap-3 text-rose-400 font-semibold mb-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          SPOOF ATTACK REJECTED
        </div>
        <p class="text-xs text-slate-300">Passive anti-spoofing FFT spectrum detected high-frequency Moiré grid and rectangular bezel boundaries from an electronic screen display. Attendance rejected.</p>
      `
    },
    tilted_pass: {
      title: "Micro-Tilt Angle Test (±15° In-Class Multi-Pass)",
      tilt: "-13.5° (Valid Range)",
      embedDist: "0.38 (Pass)",
      spoofScore: "0.06 (Genuine)",
      speakerSim: "0.87 (Matched)",
      fftMode: "clean",
      statusHtml: `
        <div class="flex items-center gap-3 text-cyan-400 font-semibold mb-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          MULTI-PASS TILT PASSED
        </div>
        <p class="text-xs text-slate-300">Micro-tilt within ±15° tolerance. Successfully normalized and matched against subject-enrolled embeddings without false rejection.</p>
      `
    },
    cross_class: {
      title: "Cross-Class False Match Prevention",
      tilt: "+2.1°",
      embedDist: "0.78 (No Subject Match)",
      spoofScore: "0.03 (Genuine)",
      speakerSim: "0.41 (Mismatch)",
      fftMode: "clean",
      statusHtml: `
        <div class="flex items-center gap-3 text-amber-400 font-semibold mb-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          STUDENT NOT ENROLLED IN THIS CLASS
        </div>
        <p class="text-xs text-slate-300">Biometric match candidate is not registered for the selected subject. Cross-class isolation prevented unintended attendance marking.</p>
      `
    }
  };

  function updateScenario(key) {
    const data = scenarios[key] || scenarios.genuine;
    if (bioTiltAngle) bioTiltAngle.textContent = data.tilt;
    if (bioEmbedDist) bioEmbedDist.textContent = data.embedDist;
    if (bioSpoofScore) bioSpoofScore.textContent = data.spoofScore;
    if (bioSpeakerSim) bioSpeakerSim.textContent = data.speakerSim;

    // Trigger visual scan animation
    if (scanOverlay) {
      scanOverlay.classList.remove('opacity-0');
      scanOverlay.classList.add('opacity-100');
      setTimeout(() => {
        scanOverlay.classList.remove('opacity-100');
        scanOverlay.classList.add('opacity-0');
      }, 700);
    }

    // Animate FFT Bars
    if (fftContainer) {
      const bars = fftContainer.querySelectorAll('.fft-bar');
      bars.forEach((bar, idx) => {
        if (data.fftMode === 'spoof') {
          // high frequency spike at higher indices
          const height = idx > 16 ? (45 + Math.random() * 12) : (6 + Math.random() * 10);
          bar.style.height = height + 'px';
          bar.style.backgroundColor = idx > 16 ? '#f43f5e' : '#64748b';
        } else {
          // smooth organic frequency decay
          const height = Math.max(50 - idx * 1.8 + (Math.random() * 12 - 6), 6);
          bar.style.height = height + 'px';
          bar.style.backgroundColor = 'var(--accent)';
        }
      });
    }

    // Trigger Voice Wave burst
    waveActive = true;
    setTimeout(() => { waveActive = false; }, 1200);

    // Update Result Box
    if (bioStatusBox) {
      bioStatusBox.innerHTML = data.statusHtml;
    }
  }

  if (scenarioSelect) {
    scenarioSelect.addEventListener('change', (e) => {
      updateScenario(e.target.value);
    });
  }

  if (testBiometricsBtn) {
    testBiometricsBtn.addEventListener('click', () => {
      const current = scenarioSelect ? scenarioSelect.value : 'genuine';
      updateScenario(current);
    });
  }

  // Initial trigger
  updateScenario('genuine');
}
