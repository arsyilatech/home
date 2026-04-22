// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const header = document.getElementById("header");
  if (section) {
    const headerHeight = header.offsetHeight;
    const targetPosition = section.offsetTop - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Navbar Section ===============================
// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Smooth scrolling and active navigation
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Update active navigation on scroll
function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href").substring(1);
        if (href === sectionId) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Porfolio Section =====================
// Portfolio Pagination With Slider Animation
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("portfolioTrack");
  const paginationTop = document.getElementById("paginationTop");
  const paginationBottom = document.getElementById("paginationBottom");
  const filterBtns = document.querySelectorAll(".filter-btn");

  const itemsPerPage = 6;
  let currentPage = 0;
  let currentCategory = "website";

  const allItems = Array.from(track.children);

  function renderPortfolio() {
    track.innerHTML = "";
    paginationTop.innerHTML = "";
    paginationBottom.innerHTML = "";

    const filtered = allItems.filter(
      (item) => item.dataset.category === currentCategory,
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
      const page = document.createElement("div");
      page.classList.add("portfolio-page");

      const start = i * itemsPerPage;
      const end = start + itemsPerPage;

      filtered.slice(start, end).forEach((item) => {
        page.appendChild(item.cloneNode(true));
      });

      track.appendChild(page);
    }

    createPagination(totalPages);
    updateSlide();
  }

  function createPagination(totalPages) {
    function addBtn(container, text, clickFn, pageIndex = null) {
      const btn = createBtn(text, clickFn);

      if (pageIndex !== null) {
        btn.classList.add("page-number");
        btn.dataset.page = pageIndex;
      }

      container.appendChild(btn);
    }

    // PREV
    addBtn(paginationTop, "Prev", () => {
      if (currentPage > 0) {
        currentPage--;
        updateSlide();
      }
    });

    addBtn(paginationBottom, "Prev", () => {
      if (currentPage > 0) {
        currentPage--;
        updateSlide();
      }
    });

    // NUMBER BUTTONS
    for (let i = 0; i < totalPages; i++) {
      addBtn(
        paginationTop,
        i + 1,
        () => {
          currentPage = i;
          updateSlide();
        },
        i,
      );

      addBtn(
        paginationBottom,
        i + 1,
        () => {
          currentPage = i;
          updateSlide();
        },
        i,
      );
    }

    // NEXT
    addBtn(paginationTop, "Next", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateSlide();
      }
    });

    addBtn(paginationBottom, "Next", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updateSlide();
      }
    });
  }

  function createBtn(text, clickFn) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("page-btn");
    btn.addEventListener("click", clickFn);
    return btn;
  }

  function updateSlide() {
    track.style.transform = `translateX(-${currentPage * 100}%)`;

    document.querySelectorAll(".page-number").forEach((btn) => {
      btn.classList.remove("active");
      if (parseInt(btn.dataset.page) === currentPage) {
        btn.classList.add("active");
      }
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.dataset.category;
      currentPage = 0;

      renderPortfolio();
    });
  });

  renderPortfolio();
});

// FAQ Section ===================================
// ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const icon = question.querySelector(".icon");

  question.addEventListener("click", () => {
    if (item.classList.contains("active")) {
      answer.style.height = "0px";
      answer.style.paddingBottom = "0px";
      icon.textContent = "+";
      item.classList.remove("active");
    } else {
      item.classList.add("active");
      answer.style.height = answer.scrollHeight + "px";
      answer.style.paddingBottom = "40px";
      icon.textContent = "−";
    }
  });
});

// SEARCH FAQ

const searchInput = document.getElementById("faqSearch");

searchInput.addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();

  faqItems.forEach((item) => {
    let text = item.innerText.toLowerCase();

    if (text.includes(filter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
