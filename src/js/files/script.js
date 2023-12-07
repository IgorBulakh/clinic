// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const beforeAfter = document.querySelector(".before-after");

if (beforeAfter) {
  const beforeAfterArrow = document.querySelector(".before-after__arrow");
  const afterItem = document.querySelector(".before-after__item--after");

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

  beforeAfterArrow.addEventListener("mousedown", function (e) {
    const beforeAfterSize = {
      with: beforeAfter.offsetWidth,
      left: beforeAfter.getBoundingClientRect().left - scrollX,
    };

    function beforeAfterArrowMove(e) {
      const posLeft = e.clientX - beforeAfterSize.left;

      if (posLeft <= beforeAfterSize.with && posLeft > 0) {
        const way = 100 - (posLeft / beforeAfterSize.with) * 100;

        beforeAfterArrow.style.cssText = `left: ${posLeft}px`;
        afterItem.style.cssText = `width: ${way}%`;
      }
    }
    // beforeAfterArrow.addEventListener("dragstart", function (e) {
    //   e.preventDefault();
    // });

    document.addEventListener("mousemove", beforeAfterArrowMove);
    document.addEventListener(
      "mouseup",
      function (e) {
        document.removeEventListener("mousemove", beforeAfterArrowMove);
        // beforeAfterArrow.removeEventListener("dragstart", function (e) {
        //   e.preventDefault();
        // });
      },
      { once: true }
    );
  });
}
