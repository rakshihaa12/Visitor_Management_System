function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'admin' && password === 'admin') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    showForm();
  } else {
    alert('Invalid credentials');
  }
}

function logout() {
  document.getElementById('mainApp').style.display = 'none';
  document.getElementById('loginPage').style.display = 'block';
}

function showForm() {
  document.getElementById('visitor-form').style.display = 'block';
  document.getElementById('visitor-log').style.display = 'none';
}

function showLog() {
  document.getElementById('visitor-form').style.display = 'none';
  document.getElementById('visitor-log').style.display = 'block';
  displayLog();
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize floating particles
  createFloatingParticles();
  
  const form = document.getElementById('logForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Add loading effect
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      // Simulate processing time
      setTimeout(() => {
        const visitor = {
          name: document.getElementById('name').value,
          address: document.getElementById('address').value,
          department: document.getElementById('department').value,
          contactPerson: document.getElementById('contactPerson').value,
          headCount: document.getElementById('headCount').value,
          expectedDate: document.getElementById('expectedDate').value,
          purpose: document.getElementById('purpose').value,
          remarks: document.getElementById('remarks').value,
          time: document.getElementById('visitTime').value
        };

        let logs = JSON.parse(localStorage.getItem('visitorLogs') || '[]');
        logs.push(visitor);
        localStorage.setItem('visitorLogs', JSON.stringify(logs));

        // Success animation
        showSuccessNotification('Visitor logged successfully!');
        this.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Add input focus effects
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'scale(1)';
    });
  });
});

// Create floating particles
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Success notification
function showSuccessNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #27ae60, #2ecc71);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(39, 174, 96, 0.4);
    z-index: 10000;
    animation: slideInFromTop 0.5s ease-out;
    transform: translateY(-100px);
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateY(-100px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

function displayLog() {
  const logList = document.getElementById('logList');
  logList.innerHTML = '';
  const logs = JSON.parse(localStorage.getItem('visitorLogs') || '[]');
  
  if (logs.length === 0) {
    logList.innerHTML = '<li class="no-visitors">No visitors logged yet</li>';
    return;
  }
  
  logs.forEach((log, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'visitor-item';
    listItem.innerHTML = `
      <span class="visitor-name" onclick="showVisitorDetails(${index})">${log.name}</span>
      <button class="delete-btn" onclick="deleteLog(${index})" title="Delete visitor">×</button>
    `;
    logList.appendChild(listItem);
  });
}

function showVisitorDetails(index) {
  const logs = JSON.parse(localStorage.getItem('visitorLogs') || '[]');
  const visitor = logs[index];
  
  if (!visitor) return;
  
  const visitorDetails = document.getElementById('visitorDetails');
  visitorDetails.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <strong>Visitor Name:</strong>
        <span>${visitor.name}</span>
      </div>
      <div class="detail-item">
        <strong>Company Address:</strong>
        <span>${visitor.address}</span>
      </div>
      <div class="detail-item">
        <strong>Department:</strong>
        <span>${visitor.department}</span>
      </div>
      <div class="detail-item">
        <strong>Contact Person:</strong>
        <span>${visitor.contactPerson}</span>
      </div>
      <div class="detail-item">
        <strong>Head Count:</strong>
        <span>${visitor.headCount}</span>
      </div>
      <div class="detail-item">
        <strong>Expected Date:</strong>
        <span>${visitor.expectedDate}</span>
      </div>
      <div class="detail-item">
        <strong>Time:</strong>
        <span>${visitor.time}</span>
      </div>
      <div class="detail-item">
        <strong>Purpose:</strong>
        <span>${visitor.purpose}</span>
      </div>
      <div class="detail-item">
        <strong>Remarks:</strong>
        <span>${visitor.remarks}</span>
      </div>
    </div>
    <div class="modal-actions">
      <button class="delete-btn-modal" onclick="deleteLogFromModal(${index})">Delete Visitor</button>
    </div>
  `;
  
  document.getElementById('visitorModal').style.display = 'block';
}

function closeVisitorDetails() {
  const modal = document.getElementById('visitorModal');
  const modalContent = modal.querySelector('.modal-content');
  
  // Add closing animation
  modalContent.style.animation = 'modalSlideOut 0.3s ease-in forwards';
  modal.style.animation = 'modalFadeOut 0.3s ease-in forwards';
  
  setTimeout(() => {
    modal.style.display = 'none';
    // Reset animations for next time
    modalContent.style.animation = '';
    modal.style.animation = '';
  }, 300);
}

function deleteLogFromModal(index) {
  if (confirm('Are you sure you want to delete this visitor?')) {
    deleteLog(index);
    closeVisitorDetails();
  }
}

function deleteLog(index) {
  let logs = JSON.parse(localStorage.getItem('visitorLogs') || '[]');
  logs.splice(index, 1);
  localStorage.setItem('visitorLogs', JSON.stringify(logs));
  displayLog();
}
