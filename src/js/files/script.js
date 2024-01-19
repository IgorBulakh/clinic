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
      } else if (posLeft >= beforeAfterSize.with) {
        beforeAfterArrow.style.cssText = `left: ${beforeAfterSize.with}px`;
        afterItem.style.cssText = `width: 0%`;
      } else if (posLeft <= 0) {
        beforeAfterArrow.style.cssText = `left: 0px`;
        afterItem.style.cssText = `width: 100%`;
      }
    }
    beforeAfterArrow.addEventListener(
      "dragstart",
      function (e) {
        e.preventDefault();
      },
      { once: true }
    );

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

const doctor = document.querySelector(".doctors");

if (doctor) {
  loadDoctor();
}

async function loadDoctor() {
  const response = await fetch("files/data/doctors.json", {
    method: "GET",
  });
  if (response.ok) {
    const responseResult = await response.json();
    initDoctors(responseResult);
  } else {
    alert("Помилка");
  }
}

const doctorsList = document.querySelector(".body-doctors__list");
const doctorsPhoto = document.querySelector(".body-doctors__main-picture");
const doctorsSkills = document.querySelector(".info-service__line");
const doctorsStat = document.querySelector(".info-service__stat");
const doctorsGallery = document.querySelector(".doctors__gallery");
const doctorLIstActiveElement = `_active`;

function initDoctors(data) {
  let doctorLIstElement = ``;

  data.doctors.forEach((doctor) => {
    const isActive = doctor.isActive;

    if (isActive) {
      buildDoctor(doctor);
    }

    // lists
    doctorLIstElement += `
      <a data-id="${doctor.id}" class="list-doctor__item link-box ${
        doctor.isActive ? doctorLIstActiveElement : null
      }" href="#">
        <div class="link-box__image-ibg">
          <img src="img/${doctor.media.avatar}" alt="portrait doctor">
        </div>
        <div class="link-box__body">
          <div class="link-box__name">${doctor.name}</div>
          <div class="link-box__text">
            ${doctor.position}
          </div>
        </div>
      </a>
    `;
  });
  doctorsList.innerHTML = doctorLIstElement;

  document.addEventListener("click", doctorListActions);
  function doctorListActions(e) {
    const targetElement = e.target;

    if (targetElement.closest(".link-box")) {
      const currentItem = targetElement.closest(".link-box");
      const doctorId = +currentItem.dataset.id;

      const activeListItem = document.querySelector(".link-box._active");
      activeListItem.classList.remove("_active");
      currentItem.classList.add("_active");

      const activeDoctorArray = data.doctors.filter(
        (item) => item.id === doctorId
      );
      const activeDoctor = activeDoctorArray[0];
      buildDoctor(activeDoctor);
      e.preventDefault();
    }
  }
}

// doctorsInfo

function buildDoctor(activeDoctor) {
  const mainPhoto = activeDoctor.media.main;
  const skills = activeDoctor.skils;
  const stats = activeDoctor.stat;
  const gallerySmall = activeDoctor.media.gallery.small;
  const galleryBig = activeDoctor.media.gallery.big;

  let skillItems = ``;
  let statItems = ``;
  let galleryItems = ``;

  // main photo
  mainPhoto
    ? (doctorsPhoto.innerHTML = `<img src ="img/${mainPhoto}" alt="portraits doctor">`)
    : null;

  // skills
  for (const item in skills) {
    skillItems += `
        <div class="skill-service__item">
          <div style="min-width: ${skills[item]}%" class=" skill-service__info">
            <div class="skill-service__label">${item}</div>
            <div class="skill-service__value">${skills[item]}%</div>
          </div>
          <div style="width: ${skills[item]}%;" class="skill-service__line skill-service__line--green"></div>
        </div>`;
  }

  doctorsSkills.innerHTML = skillItems;

  // stats
  for (const item in stats) {
    statItems += `
        <li class="statistic__item">
          <div data-digits-counter class="statistic__value">${stats[item]}</div>
          <div class="statistic__label">${item}</div>
        </li>`;
  }

  doctorsStat.innerHTML = statItems;

  // gallery

  gallerySmall.forEach((picture, index) => {
    galleryItems += `
            <a class="prof-gallery__item-ibg" href="img/${galleryBig[index]}">
              <img src="img/${picture}" alt="marker bubs">
            </a>
          `;
  });

  doctorsGallery.innerHTML = galleryItems;
  flsModules.gallery[0].galleryClass.refresh();
}

// slideScroll

const gallery = document.querySelector(".slider-gallery");
if (gallery && !isMobile.any()) {
  window.addEventListener("scroll", function (e) {
    const gWidth = gallery.offsetWidth;
    const gRow = document.querySelectorAll(".slider-gallery__row");
    const wHeight = window.innerHeight;
    gRow.forEach((gRowItem, index) => {
      const gItems = gRowItem.querySelectorAll(".slider-gallery__item");
      let dRowWidth = 0;
      gItems.forEach((gItem) => {
        dRowWidth += gItem.offsetWidth + 20;
      });

      dRowWidth = dRowWidth - 20;

      const gWay = dRowWidth - gWidth;

      if (gWay > 0) {
        const gRowHeight = gRowItem.offsetHeight;
        const gRowTopPos = gRowItem.getBoundingClientRect().top;
        const gRowTop = wHeight - gRowTopPos;
        const slideDirection = index % 2 === 0 ? -1 : 1;

        if (gRowTop >= gRowHeight) {
          const sWay = ((gRowTop - gRowHeight) / (wHeight - gRowHeight)) * 100;

          gRowItem.style.cssText = `transform: translateX(${
            (gWay / 100) * sWay * slideDirection
          }px)`;

          if (gRowTop >= wHeight) {
            gRowItem.style.cssText = `transform: translateX(${
              gWay * slideDirection
            }px)`;
          }
        } else {
          gRowItem.style.cssText = `transform: translateX(0) `;
        }
      }
    });
  });
}

// activePage

const currentPage = window.location.href;

const menuLinks = document.querySelectorAll(".menu__list a");
menuLinks.forEach(function (link) {
  if (link.href === currentPage) {
    link.classList.add("activeCurrent");
  }
});
