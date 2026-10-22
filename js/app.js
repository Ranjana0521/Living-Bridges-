/**
 * LIVING BRIDGES — Canine Biometric Snout Recognition Platform
 * Light Theme Prototype Engine with Interactive WhatsApp Snout Bot
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mock Canine Biometric Database
  const DOGS_DATA = {
    leo: {
      id: 'leo',
      name: 'Leo',
      snoutId: '#LB-8829-SNOUT',
      breed: 'Golden Retriever',
      age: '3 Years • 31 kg',
      gender: 'Male (Neutered)',
      photo: 'assets/images/dog_profile_leo.jpg',
      snoutPhoto: 'assets/images/snout_scan_hero.jpg',
      dermalConfidence: '99.8%',
      temperament: 'Calm, gentle, responds to "Leo", loves humans and children.',
      medications: {
        current: 'Apoquel 16mg & Monthly Heartgard',
        schedule: 'Daily at 6:30 PM with evening meal',
        allergies: 'Poultry & Chicken (Requires Salmon or Lamb food only)',
        specialDiet: 'Hypoallergenic grain-free formula',
        primaryVet: 'Dr. Katherine Cole, Metro Animal Clinic'
      },
      caregiver: {
        name: 'Elena Rostova',
        avatarText: 'ER',
        relation: 'Registered Caregiver & Guardian',
        phone: '+1 (555) 392-8174',
        neighborhood: 'Oakridge Green District, Sector 4'
      }
    },
    luna: {
      id: 'luna',
      name: 'Luna',
      snoutId: '#LB-4932-SNOUT',
      breed: 'French Bulldog',
      age: '5 Years • 12.5 kg',
      gender: 'Female (Spayed)',
      photo: 'assets/images/snout_scan_hero.jpg',
      snoutPhoto: 'assets/images/snout_scan_hero.jpg',
      dermalConfidence: '99.7%',
      temperament: 'Sensitive to heat, gentle, enjoys quiet indoor spaces.',
      medications: {
        current: 'Vetsulin (Canine Insulin) — 4 IU',
        schedule: 'Twice daily at 8:00 AM & 8:00 PM with food',
        allergies: 'Bee stings, Corn & Wheat derivatives',
        specialDiet: 'High-fiber diabetic veterinary prescription diet',
        primaryVet: 'Dr. Marcus Vance, BlueCross Pet Clinic'
      },
      caregiver: {
        name: 'Dr. David & Sophia Lin',
        avatarText: 'DL',
        relation: 'Registered Caregivers',
        phone: '+1 (555) 883-2940',
        neighborhood: 'Bayside Marina Heights, Tower 2'
      }
    },
    max: {
      id: 'max',
      name: 'Max',
      snoutId: '#LB-1049-SNOUT',
      breed: 'German Shepherd',
      age: '2 Years • 36 kg',
      gender: 'Male',
      photo: 'assets/images/dog_profile_leo.jpg',
      snoutPhoto: 'assets/images/snout_scan_hero.jpg',
      dermalConfidence: '99.9%',
      temperament: 'Certified search & agility companion, obedient and friendly.',
      medications: {
        current: 'NexGard Spectra & Glucosamine Joint Chews',
        schedule: '1st day of each month with breakfast',
        allergies: 'None reported',
        specialDiet: 'Active sport high-protein nutrition',
        primaryVet: 'Apex Veterinary Specialists'
      },
      caregiver: {
        name: 'Tyler Brooks',
        avatarText: 'TB',
        relation: 'Primary Handler & Guardian',
        phone: '+1 (555) 749-1102',
        neighborhood: 'Highland Pines Reserve, Sector 9'
      }
    }
  };

  let activeDogKey = 'leo';
  let isScanningConsole = false;

  // DOM Elements - Console
  const consoleDogTabs = document.querySelectorAll('.console-tab-btn');
  const petNameEl = document.getElementById('petName');
  const petBreedAgeEl = document.getElementById('petBreedAge');
  const petSnoutIdEl = document.getElementById('petSnoutId');
  const petMedActiveEl = document.getElementById('petMedActive');
  const petMedScheduleEl = document.getElementById('petMedSchedule');
  const petMedAllergiesEl = document.getElementById('petMedAllergies');
  const petVetEl = document.getElementById('petVet');
  const petCaregiverNameEl = document.getElementById('petCaregiverName');
  const petCaregiverAreaEl = document.getElementById('petCaregiverArea');
  const petCaregiverAvatarEl = document.getElementById('petCaregiverAvatar');
  const criticalBannerEl = document.getElementById('criticalBanner');
  const criticalBannerText = document.getElementById('criticalBannerText');
  const snoutFrame = document.getElementById('snoutFrame');
  const triggerScanBtn = document.getElementById('triggerScanBtn');

  // Interactive Dog Switching
  function updateConsoleProfile(key) {
    const dog = DOGS_DATA[key];
    if (!dog) return;

    petNameEl.textContent = dog.name;
    petBreedAgeEl.textContent = `${dog.breed} • ${dog.age} • ${dog.dermalConfidence} Biometric Confidence`;
    petSnoutIdEl.textContent = `ID: ${dog.snoutId}`;
    petMedActiveEl.textContent = dog.medications.current;
    petMedScheduleEl.textContent = dog.medications.schedule;
    petMedAllergiesEl.textContent = dog.medications.allergies;
    petVetEl.textContent = dog.medications.primaryVet;

    petCaregiverNameEl.textContent = dog.caregiver.name;
    petCaregiverAreaEl.textContent = `${dog.caregiver.neighborhood} • ${dog.caregiver.relation}`;
    petCaregiverAvatarEl.textContent = dog.caregiver.avatarText;

    if (dog.id === 'luna') {
      criticalBannerEl.style.display = 'flex';
      criticalBannerText.innerHTML = `<strong>URGENT HEALTH NOTE:</strong> Luna is insulin-dependent! Requires Vetsulin injection at 8:00 AM/PM. Contact caregiver immediately.`;
    } else if (dog.id === 'leo') {
      criticalBannerEl.style.display = 'flex';
      criticalBannerText.innerHTML = `<strong>DIETARY NOTICE:</strong> Severe chicken allergy. Do NOT offer commercial poultry treats or table scraps.`;
    } else {
      criticalBannerEl.style.display = 'none';
    }
  }

  consoleDogTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      consoleDogTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeDogKey = tab.getAttribute('data-dog');
      updateConsoleProfile(activeDogKey);
      showToast(`Switched profile to ${DOGS_DATA[activeDogKey].name}`);
    });
  });

  // Snout Scan Button Action
  triggerScanBtn.addEventListener('click', () => {
    if (isScanningConsole) return;
    isScanningConsole = true;

    triggerScanBtn.disabled = true;
    triggerScanBtn.textContent = 'Analyzing Snout Dermal Ridges...';
    snoutFrame.classList.add('scanning');

    setTimeout(() => {
      snoutFrame.classList.remove('scanning');
      triggerScanBtn.disabled = false;
      triggerScanBtn.textContent = 'Scan Snout via WhatsApp AI';
      isScanningConsole = false;
      showToast(`Snout verified: ${DOGS_DATA[activeDogKey].name} (${DOGS_DATA[activeDogKey].dermalConfidence} Match)`);
    }, 2000);
  });

  // Connect Caregiver Buttons
  const btnConnectCaregiver = document.getElementById('btnConnectCaregiver');
  if (btnConnectCaregiver) {
    btnConnectCaregiver.addEventListener('click', () => {
      const dog = DOGS_DATA[activeDogKey];
      showToast(`Connecting to ${dog.caregiver.name} on WhatsApp...`);
      openFloatingChatWithPrompt(`Hi! I just scanned ${dog.name}'s snout on Living Bridges.`);
    });
  }

  // Toast Functionality
  const toast = document.getElementById('lightToast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimeout;

  function showToast(text) {
    clearTimeout(toastTimeout);
    toastMsg.textContent = text;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // ==========================================================================
  // FLOATING WHATSAPP BOT INTERACTION
  // ==========================================================================

  const waLauncher = document.getElementById('waFloatingLauncher');
  const waChatWindow = document.getElementById('waChatWindow');
  const waCloseBtn = document.getElementById('waCloseBtn');
  const waChatBody = document.getElementById('waChatBody');
  const waInputField = document.getElementById('waInputField');
  const waSendBtn = document.getElementById('waSendBtn');
  const waUnreadBadge = document.getElementById('waUnreadBadge');

  let isChatOpen = false;

  function toggleChatWindow() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      waChatWindow.classList.add('open');
      if (waUnreadBadge) waUnreadBadge.style.display = 'none';
      scrollChatToBottom();
    } else {
      waChatWindow.classList.remove('open');
    }
  }

  waLauncher.addEventListener('click', toggleChatWindow);
  waCloseBtn.addEventListener('click', () => {
    isChatOpen = false;
    waChatWindow.classList.remove('open');
  });

  function scrollChatToBottom() {
    waChatBody.scrollTop = waChatBody.scrollHeight;
  }

  function appendOutgoingMsg(text, imgSrc = null) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = 'wa-message-bubble wa-msg-out';
    
    let innerHtml = '';
    if (imgSrc) {
      innerHtml += `<img src="${imgSrc}" class="wa-msg-img-preview" alt="Snout Photo">`;
    }
    innerHtml += `<div>${text}</div><div class="bubble-time">${timeStr} ✔✔</div>`;
    msgDiv.innerHTML = innerHtml;
    waChatBody.appendChild(msgDiv);
    scrollChatToBottom();
  }

  function appendBotTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'wa-message-bubble wa-msg-in wa-typing-indicator';
    typingDiv.id = 'waTypingIndicator';
    typingDiv.innerHTML = `<span style="font-style:italic; color:#128c7e; font-size:0.8rem;">Living Bridges Snout AI is analyzing... 🐾</span>`;
    waChatBody.appendChild(typingDiv);
    scrollChatToBottom();
  }

  function removeBotTypingIndicator() {
    const ind = document.getElementById('waTypingIndicator');
    if (ind) ind.remove();
  }

  function appendBotMsg(htmlContent) {
    removeBotTypingIndicator();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = 'wa-message-bubble wa-msg-in';
    msgDiv.innerHTML = `${htmlContent}<div class="bubble-time">${timeStr}</div>`;
    waChatBody.appendChild(msgDiv);
    scrollChatToBottom();
  }

  // Quick Action Chips inside the WhatsApp Chat
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('wa-action-chip')) {
      const action = e.target.getAttribute('data-action');
      handleBotAction(action);
    }
  });

  function handleBotAction(action) {
    const dog = DOGS_DATA[activeDogKey];

    if (action === 'scan-snout') {
      appendOutgoingMsg('📸 Sending photo of canine snout for identification...', 'assets/images/snout_scan_hero.jpg');
      appendBotTypingIndicator();
      setTimeout(() => {
        appendBotMsg(`
          <div class="bot-tag">✨ SNOUT BIOMETRIC MATCH FOUND (99.8%)</div>
          <strong>Canine Identified: ${dog.name}</strong> (${dog.breed}, ${dog.age})<br>
          <div class="passport-card-mini" style="margin-top:8px;">
            <div class="mini-row"><span class="mini-label">SNOUT-ID:</span> <span class="mini-val">${dog.snoutId}</span></div>
            <div class="mini-row"><span class="mini-label">Active Meds:</span> <span class="mini-val">${dog.medications.current}</span></div>
            <div class="mini-row"><span class="mini-label">Caregiver:</span> <span class="mini-val">${dog.caregiver.name}</span></div>
          </div>
          <div class="wa-quick-actions">
            <div class="wa-action-chip" data-action="view-meds">💊 View Detailed Medication Schedule</div>
            <div class="wa-action-chip" data-action="connect-owner">👤 Chat with Caregiver (${dog.caregiver.name})</div>
          </div>
        `);
      }, 1500);
    } else if (action === 'view-meds') {
      appendOutgoingMsg(`Can you show ${dog.name}'s full medication & dietary schedule?`);
      appendBotTypingIndicator();
      setTimeout(() => {
        appendBotMsg(`
          <strong>📋 Full Medical Passport for ${dog.name}:</strong><br>
          • <strong>Medications:</strong> ${dog.medications.current}<br>
          • <strong>Schedule:</strong> ${dog.medications.schedule}<br>
          • <strong>Food Allergies:</strong> ${dog.medications.allergies}<br>
          • <strong>Special Diet:</strong> ${dog.medications.specialDiet}<br>
          • <strong>Primary Vet:</strong> ${dog.medications.primaryVet}
        `);
      }, 1200);
    } else if (action === 'connect-owner') {
      appendOutgoingMsg(`Connect me with ${dog.caregiver.name}.`);
      appendBotTypingIndicator();
      setTimeout(() => {
        appendBotMsg(`
          <strong>Direct WhatsApp Reconnection:</strong><br>
          We've notified <strong>${dog.caregiver.name}</strong> that ${dog.name} was scanned.<br><br>
          <a href="https://wa.me/?text=Hello%20${encodeURIComponent(dog.caregiver.name)},%20I%20scanned%20${dog.name}%20using%20Living%20Bridges%20Snout%20AI!" target="_blank" class="btn btn-wa-action" style="padding:6px 14px; font-size:0.8rem; text-decoration:none; display:inline-block; margin-top:4px;">
            Chat on WhatsApp
          </a>
        `);
      }, 1200);
    }
  }

  // Handle custom input in WhatsApp widget
  function sendUserMessage() {
    const text = waInputField.value.trim();
    if (!text) return;
    waInputField.value = '';

    appendOutgoingMsg(text);
    appendBotTypingIndicator();

    setTimeout(() => {
      const dog = DOGS_DATA[activeDogKey];
      appendBotMsg(`
        Hello! You can send any dog's snout picture here. Currently viewing <strong>${dog.name}</strong> (${dog.breed}).
        <div class="wa-quick-actions" style="margin-top:8px;">
          <div class="wa-action-chip" data-action="scan-snout">📸 Scan Snout Photo Now</div>
          <div class="wa-action-chip" data-action="view-meds">💊 View Medication Timetable</div>
        </div>
      `);
    }, 1200);
  }

  waSendBtn.addEventListener('click', sendUserMessage);
  waInputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendUserMessage();
    }
  });

  function openFloatingChatWithPrompt(promptText) {
    if (!isChatOpen) toggleChatWindow();
    appendOutgoingMsg(promptText);
    appendBotTypingIndicator();
    setTimeout(() => {
      handleBotAction('scan-snout');
    }, 1000);
  }

  // Initial load
  updateConsoleProfile(activeDogKey);
});
