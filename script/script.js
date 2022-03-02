import config from "./config.js";

// Global variables
const animationDuration = 500;
let menuOpened = false;

// Functions
const headerFading = () => {
  if (menuOpened) return (header.style.animation = "colorFadeIn 1s forwards");

  if (document.querySelector("html").scrollTop > 0)
    return (header.style.animation = "colorFadeIn 1s forwards");

  return (header.style.animation = "colorFadeOut 1s forwards");
};

const smoothScroll = (cssSelector) => {
  const destination = $(cssSelector);
  const scrollPosition =
    destination.offset().top - destination.offset().top * 0.05;

  $("html").animate(
    {
      scrollTop: scrollPosition,
    },
    animationDuration
  );
};

const toggleMenu = () => {
  if (!menuOpened) {
    menuOpened = !menuOpened;
    headerFading();

    $("#burger-icon").fadeOut(animationDuration);
    $("#dropdown-menu").fadeIn(animationDuration);
    setTimeout(() => {
      $("#close-icon").fadeIn(animationDuration);
    }, animationDuration);
  } else {
    menuOpened = !menuOpened;
    headerFading();

    $("#close-icon").fadeOut(animationDuration);
    $("#dropdown-menu").fadeOut(animationDuration);
    setTimeout(() => {
      $("#burger-icon").fadeIn(animationDuration);
    }, animationDuration);
  }
};

const addToDom = (domCssSelector, array) => {
  if (typeof domCssSelector !== "string" || array.length === 0)
    return $(domCssSelector).remove();

  const htmlElementString = (domCssSelector, item) => {
    switch (domCssSelector) {
      case "#skills-container":
        return `<div class="skills-flex">
    ${item.icon}
    <p class="paragraph">${item.name}</p>
  </div>`;

      case ".project-cards-container":
        return `<div class="project-cards">
        <div class="flex-container">
          <p class="project-cards-title paragraph">${item.title}</p>
          <div>
            <a
              class="links"
              target="_blank"
              rel="noopener noreferrer"
              href=${item.liveURL}
              ><p class="paragraph">View live</p></a
            >
            <a
              class="links"
              target="_blank"
              rel="noopener noreferrer"
              href=${item.srcCodeURL}
              ><p class="paragraph">View source</p></a
            >
          </div>
        </div>
      </div>`;

      case "#contacts-container":
        return `<p><a class="links" href=${
          item.type ? `mailto:${item.text}` : item.text
        }>kingram2@una.edu</a></p>`;

      case ".social-icons-container":
        return `<a
        class="links"
        target="_blank"
        rel="noopener noreferrer"
        href=${item.link}
        >${item.icon}</a>`;
    }
  };

  return array.forEach((item) => {
    $(domCssSelector).append(htmlElementString(domCssSelector, item));
  });
};

// Select elements
const header = document.querySelector("header");

// JS interactions
window.addEventListener("scroll", headerFading);

$().ready(() => {
  // Add projects to DOM
  addToDom("#skills-container", config["skills"]);
  addToDom(".project-cards-container", config["projects"]);
  addToDom("#contacts-container", config["contacts"]);
  addToDom(".social-icons-container", config["socials"]);

  // nav-links
  $(".nav-links").on("click", (event) => {
    const destination = event.currentTarget.attributes.href.nodeValue;
    smoothScroll(destination);
    toggleMenu();
  });

  // dropdown-menu
  $("#burger-menu").on("click", toggleMenu);

  // read-more button
  $("#read-more").on("click", () => smoothScroll("#introduction"));

  // other-stuff-cards;
  $(".card-inner").on("click", (event) =>
    event.currentTarget.classList.toggle("card-flip")
  );
});