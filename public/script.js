// Count-up animation
function countUp(elementId, target, duration) {
  const counter = document.getElementById(elementId);
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start >= target) {
      counter.textContent = Math.round(target) + "+";
    } else {
      counter.textContent = Math.round(start);
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Intersection Observer to trigger count-up when element is visible
function setupObserverForCountUp(selector, target, duration) {
  const element = document.querySelector(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start counting when the element is visible
        countUp(entry.target.id, target, duration);
        observer.unobserve(entry.target); // Stop observing after the count starts
      }
    });
  }, { threshold: 0.3 }); // Adjust the threshold as needed

  observer.observe(element);
}

// Dynamically setup counters with IntersectionObserver
const stats = [
  { id: 'stat1', target: 20, duration: 1000 },
  { id: 'stat2', target: 300, duration: 2000 },
  { id: 'stat3', target: 1000, duration: 3000 },
  { id: 'stat4', target: 10, duration: 500 },
];

// Set up IntersectionObserver for each stat element
stats.forEach(({ id, target, duration }) => setupObserverForCountUp(`#${id}`, target, duration));

// Navbar scroll effect
const navbar = document.getElementById("nav");
const firstSection = document.getElementById('home');
let threshold = firstSection.offsetHeight * 0.9;

window.addEventListener('resize', () => {
  threshold = firstSection.offsetHeight * 0.9;
});

window.addEventListener('scroll', () => {
  if (window.scrollY > threshold) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll to contact section
function scrollToDiv() {
  const targetDiv = document.getElementById('contact');
  targetDiv.scrollIntoView({ behavior: 'smooth' });
}

// Intersection Observer
function setupObserver(selector, className = "visible", threshold = 0.3) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  elements.forEach((element) => observer.observe(element));
}

setupObserver(".stat");
setupObserver(".about-me");
setupObserver(".products");
setupObserver(".services");
setupObserver(".form");
setupObserver("#map");

// Hamburger menu
const hamburgerMenu = document.getElementById('hamburgerMenu');
const nav = document.getElementById('nav');

hamburgerMenu.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('#nav') && !e.target.closest('#hamburgerMenu')) {
    nav.classList.remove('active');
    hamburgerMenu.classList.remove('active');
  }
});


 // Form submit event listener
 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const submitResult = document.getElementById("submit");

  form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
          // Simulate sending email (replace the URL with your server endpoint)
          const response = await fetch("/send", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              submitResult.textContent = "Your message has been sent successfully!";
              submitResult.style.color = "green";
              form.reset(); // Clear the form
          } else {
              submitResult.textContent = "Failed to send your message. Please try again.";
              submitResult.style.color = "red";
          }
      } catch (error) {
          submitResult.textContent = "An error occurred. Please try again later.";
          submitResult.style.color = "red";
      }
  });
});
