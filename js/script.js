

document.addEventListener('DOMContentLoaded', () => {
    // Dark-Light Mode Script
    const toggleSwitch = document.querySelector('#toggle-dark-mode');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', function (e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Footer script
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    // Error fixing
    const element = document.getElementById('myElement');
    if (element) {
        element.style.color = 'red';
    }

    // Skillsets
        const bars  = document.querySelectorAll('.bar-fill');
    const ptags = document.querySelectorAll('[id^="p"]');

    function animatePct(el, target, duration) {
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(ease * target) + '%';
        if (prog < 1) requestAnimationFrame(step);
        else el.textContent = target + '%';
      }
      requestAnimationFrame(step);
    }

    function triggerAll() {
      bars.forEach((bar, i) => {
        const pct = parseInt(bar.dataset.pct);
        setTimeout(() => {
          bar.style.width = pct + '%';
          animatePct(ptags[i], pct, 1400);
        }, i * 130);
      });
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { triggerAll(); obs.disconnect(); }
      });
    }, { threshold: 0.2 });

    obs.observe(document.getElementById('skillsWrap'));

    // Hamburger icon
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('#nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});


// JavaScript for Popup Form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// Form validation and success message display
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const nameParts = name.split(" ");
    if (nameParts.length >= 2 && email && subject && message) {
        document.getElementById("contactForm").reset();
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";
        setTimeout(() => {
            successMessage.style.display = "none";
            closeForm();
        }, 3000);
    } else {
        if (nameParts.length < 2) {
            alert("Please enter your full name (first and last name)!");
        } else {
            alert("Please fill all the fields!");
        }
    }
}


