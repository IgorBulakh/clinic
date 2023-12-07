// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const beforeAfter = document.querySelector(".before-after");

if (beforeAfter) {
  const beforeAfterArrow = document.querySelector(".before-after__arrow");

  beforeAfter.addEventListener("mouseover", function (e) {
    const targetElement = e.target;
    if (!targetElement.classList.contains("before-after__arrow")) {
      if (targetElement.closest(".before-after__item--before")) {
        beforeAfterArrow.classList.remove("before-after__arrow--right");
        beforeAfterArrow.classList.add("before-after__arrow--left");
      } else {
        beforeAfterArrow.classList.add("before-after__arrow--right");
        beforeAfterArrow.classList.remove("before-after__arrow--left");
      }
    }
  });

  beforeAfter.addEventListener("mouseleave", function () {
    beforeAfterArrow.classList.remove("before-after__arrow--left");
    beforeAfterArrow.classList.remove("before-after__arrow--right");
  });
}
