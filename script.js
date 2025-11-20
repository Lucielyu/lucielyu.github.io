document.addEventListener("DOMContentLoaded", () => {
  /* Typing effect */
  const roles = [
    "a proud Wolverine",
    "a lifelong learner",
    "a humble individual",
    "an aspiring CFA",
    "an avid gamer",
    "an analyst",
  ];

  const typingSpan = document.getElementById("typing-text");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const pause = 1200;

  function type() {
    if (!typingSpan) return;

    const current = roles[roleIndex];

    if (!isDeleting) {
      typingSpan.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, pause);
        return;
      }
    } else {
      typingSpan.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(type, isDeleting ? typeSpeed / 2 : typeSpeed);
  }

  if (typingSpan) type();

  /* Skills reveal */
  const skillColumns = document.querySelectorAll(".skill-column");
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("skills-show");
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  skillColumns.forEach((col) => skillsObserver.observe(col));

  /* Timeline swoosh */
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("timeline-show");
        } else {
          entry.target.classList.remove("timeline-show");
        }
      });
    },
    { threshold: 0.2 }
  );
  timelineItems.forEach((item) => timelineObserver.observe(item));

  /* Active nav on scroll */
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveNav() {
    let currentId = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  /* Theme toggle */
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleImg = themeToggle
    ? themeToggle.querySelector("img")
    : null;

  const LIGHT_ICON = "icons/theme-light.svg";
  const DARK_ICON = "icons/theme-dark.svg";

  function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggleImg) {
      themeToggleImg.src = isDark ? DARK_ICON : LIGHT_ICON;
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  const storedTheme = localStorage.getItem("theme");
  applyTheme(storedTheme === "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentlyDark = document.body.classList.contains("dark-mode");
      applyTheme(!currentlyDark);
    });
  }

  /* Contact form -> compose email via mailto */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").toString();
      const email = (formData.get("email") || "").toString();
      const topic = (formData.get("topic") || "").toString();
      const message = (formData.get("message") || "").toString();

      const subject = topic
        ? `[Portfolio] ${topic}`
        : "[Portfolio] New message";

      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        "",
        message,
      ];

      const mailtoUrl = `mailto:schwann.yu.8888@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      window.location.href = mailtoUrl;
    });
  }


});
