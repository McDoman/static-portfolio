document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Load data and render
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      renderProfile(data.profile);
      renderStats(data.profile.stats);
      renderCapabilities(data.capabilities);
      renderProjects(data.projects);
      renderHistory(data.employment, 'employment-list');
      renderEducation(data.education);
      
      // Initialize animations after rendering
      initScrollReveal();
    })
    .catch(error => console.error('Error loading data:', error));

  // Navbar scroll effect
  const nav = document.querySelector('.glass-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});

function renderProfile(profile) {
  document.getElementById('hero-summary').textContent = profile.summary;
  document.getElementById('hero-linkedin').href = profile.linkedin;
  document.getElementById('contact-email').href = `mailto:${profile.email}`;
  document.getElementById('footer-github').href = profile.github;
  document.getElementById('footer-linkedin').href = profile.linkedin;
}

function renderStats(stats) {
  const container = document.getElementById('stats-grid');
  container.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-num">${stat.value}</div>
      <div class="stat-text">${stat.label}</div>
    </div>
  `).join('');
}

function renderCapabilities(capabilities) {
  const container = document.getElementById('skills-grid');
  container.innerHTML = capabilities.map(cap => `
    <div class="glass-card">
      <div class="skill-header">
        <i class="ph ph-${cap.icon} skill-icon"></i>
        <h3>${cap.category}</h3>
      </div>
      <div class="tags">
        ${cap.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderProjects(projects) {
  const container = document.getElementById('project-list');
  container.innerHTML = projects.map(proj => `
    <div class="project-card glass-card">
      <h3>${proj.title}</h3>
      <div class="project-role">${proj.role}</div>
      <p class="project-desc">${proj.description}</p>
      <div class="tags">
        ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function renderHistory(employment, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = employment.map(job => `
    <div class="history-card glass-card">
      <h4>${job.role}</h4>
      <div class="history-meta">${job.company} | ${job.duration}</div>
    </div>
  `).join('');
}

function renderEducation(education) {
  const container = document.getElementById('education-list');
  container.innerHTML = education.map(edu => {
    const isDistinction = edu.honor.includes('Distinction');
    const badgeClass = isDistinction ? 'distinction' : 'upper';
    return `
    <div class="history-card glass-card">
      <h4>${edu.degree}</h4>
      <div class="history-meta">${edu.institution} | ${edu.duration}</div>
      <div class="edu-badge ${badgeClass}">${edu.honor}</div>
    </div>
    `;
  }).join('');
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(reveal => {
    observer.observe(reveal);
  });
  
  // Trigger once on load
  setTimeout(() => {
    reveals.forEach(reveal => {
      const rect = reveal.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        reveal.classList.add('active');
      }
    });
  }, 100);
}