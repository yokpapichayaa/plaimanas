function includeHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(error));
}

includeHTML("head", "pages/head.html");
includeHTML("header", "pages/components/header.html");
includeHTML("home", "pages/home.html");
includeHTML("footer", "pages/components/footer.html");

setTimeout(() => {
  const dropdown = document.querySelector(".dropdown-toggle");
  const list = document.querySelector(".dropdown-menu");
  dropdown.addEventListener("mouseenter", () => {
    list.classList.add("onhover");
  });

  dropdown.addEventListener("mouseleave", () => {
    list.classList.remove("onhover");
  });

// เมนูหลัก
  const dropdownMenu = document.querySelector(".dropdown-l");
  const listMenu = document.querySelector(".menu-drop");
  const items = document.querySelectorAll(".menu-drop-item");
// ถ้า hover menu editorial จะขึ้น class onhover
  dropdownMenu.addEventListener("mouseenter", () => {
    dropdownMenu.classList.add("onhover");
    listMenu.classList.add("onhover");
  });

  dropdownMenu.addEventListener("mouseleave", () => {
    dropdownMenu.classList.remove("onhover");
    listMenu.classList.remove("onhover");
  });

  
  // ถ้าเอาเม้าส์ hover ตัวหนังสืออยู่ ถ้าไกลกว่า 50px dropdown menu จะหลุดออก
  items.forEach((item) => {
    listMenu.addEventListener("mouseenter", () => {
      dropdownMenu.classList.add("onhover");
      listMenu.classList.add("onhover");
    });

    document.addEventListener("mousemove", (e) => {
      let isInsideAnyItem = false;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();

        if (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        ) {
          isInsideAnyItem = true;
        }
      });

      if (!isInsideAnyItem) {
        listMenu.classList.remove("onhover");
        dropdownMenu.classList.remove("onhover");
      }
    });
  });

  // ส่วน collection1 ที่ hover แล้วปิดรูปออก
  const wrapcol = document.querySelector(".wrap-col .box-col");
  const boxImage = document.querySelector(".wrap-col .box-image");
  wrapcol.addEventListener("mouseenter", () => {
    boxImage.classList.add("onhover");
  });

  wrapcol.addEventListener("mouseleave", () => {
    boxImage.classList.remove("onhover");
  });

  //ส่วน collection ที่ hover แล้วเอารูปออก
  const wraps = document.querySelectorAll(".box-colmid .wrapper");

  wraps.forEach((wrap) => {
    const image = wrap.querySelector(".box-imagecol");

    if (image) {
      wrap.addEventListener("mouseenter", () => {
        image.classList.add("onhover");
      });

      wrap.addEventListener("mouseleave", () => {
        image.classList.remove("onhover");
      });
    }
  });

  //annountment
  const track = document.querySelector(".announcement__track");
  const groups = document.querySelectorAll(".announcement__group");

  function duplicateGroups() {
    const trackWidth = track.scrollWidth;
    const screenWidth = window.innerWidth;

    // clone จนกว่าจะกว้างพออย่างน้อย 2 เท่าหน้าจอ
    while (track.scrollWidth < screenWidth * 2) {
      groups.forEach(group => {
        const clone = group.cloneNode(true);
        track.appendChild(clone);
      });
    }
  }

duplicateGroups();

  const selectBox = document.querySelector(".select-box");
  const options = document.querySelector(".options");
  const selected = document.getElementById("selected");
  const arrow = document.querySelector(".arrow");

  selectBox.addEventListener("click", () => {
    options.classList.toggle("active");
    arrow.classList.toggle("rotate");
  });

  document.querySelectorAll(".options li").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      options.classList.remove("active");
      arrow.classList.remove("rotate");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) {
      options.classList.remove("active");
      arrow.classList.remove("rotate");
    }
  });

const inputs = document.querySelectorAll(".input-re input");

inputs.forEach(input => {
  input.addEventListener("focus", function() {
    const label = document.querySelector(
      `.contact-title[for="${this.id}"]`
    );
    label.classList.add("active");
  });

  input.addEventListener("blur", function() {
    const label = document.querySelector(
      `.contact-title[for="${this.id}"]`
    );

    if (this.value === "") {
      label.classList.remove("active");
    }
  });
});

//Menu mobile
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-mobile");
const dropdownToggle = document.querySelector(".dropdown-tog");
const dropdownmobile = document.querySelector(".dropdown-show");

// เปิด/ปิด main menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// เปิด/ปิด dropdown
const navToggle = document.querySelector(".nav-toggle");
const navItem = document.querySelector(".nav-submenu");
const arrowSub = document.querySelector(".nav-arrow");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navItem.classList.toggle("open");
  arrowSub.classList.toggle("open");
});

//new

const logo = document.querySelector('.logo');
const boxwrap = document.querySelectorAll('.box-wrap');
let ticking = false;

function update() {

  const logoRect = logo.getBoundingClientRect();

  boxwrap.forEach(wrap => {

    const inner = wrap.querySelector('.box-text-inner');
    if (!inner) return;

    const wrapRect = wrap.getBoundingClientRect();

    let move = 0;

    // 🔥 เงื่อนไขสำคัญ
    // ทำงานเฉพาะตอน logo อยู่ในแนวตั้งของ wrap เท่านั้น
    const isInRange =
      logoRect.bottom >= wrapRect.top &&
      logoRect.top <= wrapRect.bottom;

    if (isInRange) {

      const titleStart =
        wrapRect.top +
        (wrapRect.height - inner.offsetHeight) / 2;

      const overlap = logoRect.bottom - titleStart;

      if (overlap > 0) {

        const maxMove =
          wrapRect.bottom -
          (titleStart + inner.offsetHeight);

        move = Math.min(overlap, maxMove);
      }
    }

    move = Math.max(0, move);

    inner.style.transform = `translate3d(0, ${move}px, 0)`;

  });

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
});

// let ticking = false;

// function update() {

//  const logoRect = logo.getBoundingClientRect();

//   sections.forEach(section => {

//     const wrap = section.querySelector('.sec-new .box-wrap');
//     const inner = section.querySelector('.sec-new .box-text-inner');

//     if (!wrap || !inner) return;

//     const wrapRect = wrap.getBoundingClientRect();

//     // ตำแหน่งเริ่มต้นของ title (อยู่กลางกล่อง)
//     const titleStart = wrapRect.top + 
//       (wrapRect.height - inner.offsetHeight) / 2;

//     let move = 0;

//     const overlap = logoRect.bottom - titleStart;

//     if (overlap > 0) {

//       // 🔥 คำนวณจุดล่างจริงของ wrap ใน viewport
//       const maxMove = wrapRect.bottom - 
//                       (titleStart + inner.offsetHeight);

//       move = Math.min(overlap, maxMove);
//     }

//     // กันค่าติดลบ
//     move = Math.max(0, move);

//     inner.style.transform = `translate3d(0, ${move}px, 0)`;

//   });

//   ticking = false;
// }

// window.addEventListener('scroll', () => {
//   if (!ticking) {
//     requestAnimationFrame(update);
//     ticking = true;
//   }
// });

//
// const logoc = document.querySelector('.logo');
// const sectionsbest = document.querySelectorAll('.sec-bestseller');

// let tickinc = false;

// function update() {

//  const logoRect = logoc.getBoundingClientRect();

//   sectionsbest.forEach(sectionsbest => {

//     const wrap = sectionsbest.querySelector('.sec-bestseller .box-wrap');
//     const inner = sectionsbest.querySelector('.sec-bestseller .box-text-inner');

//     if (!wrap || !inner) return;

//     const wrapRect = wrap.getBoundingClientRect();

//     // ตำแหน่งเริ่มต้นของ title (อยู่กลางกล่อง)
//     const titleStart = wrapRect.top + 
//       (wrapRect.height - inner.offsetHeight) / 2;

//     let move = 0;

//     const overlap = logoRect.bottom - titleStart;

//     if (overlap > 0) {

//       // 🔥 คำนวณจุดล่างจริงของ wrap ใน viewport
//       const maxMove = wrapRect.bottom - (titleStart + inner.offsetHeight);

//       move = Math.min(overlap, maxMove);
//     }

//     // กันค่าติดลบ
//     move = Math.max(0, move);

//     inner.style.transform = `translate3d(0, ${move}px, 0)`;

//   });

//   tickinc = false;
// }

// window.addEventListener('scroll', () => {
//   if (!tickinc) {
//     requestAnimationFrame(update);
//     tickinc = true;
//   }
// });

// const logo = document.querySelector('.logo');
// const sections = document.querySelectorAll('.sec-new');

// let ticking = false;

// function update() {

//   const logoRect = logo.getBoundingClientRect();

//   sections.forEach(section => {

//     const wrap = section.querySelector('.sec-new .box-wrap');
//     const inner = section.querySelector('.sec-new .box-text-inner');

//     if (!wrap || !inner) return;

//     const wrapRect = wrap.getBoundingClientRect();

//     let move = 0;

//     // ใช้ wrap.top แทน inner.top
//     const overlap = logoRect.bottom - wrapRect.top;

//     if (overlap > 0) {

//       const maxMove = wrapRect.height - inner.offsetHeight;

//       move = Math.min(overlap, maxMove);
//     }

//     inner.style.transform = `translate3d(0, ${move}px, 0)`;

//   });

//   ticking = false;
// }

// window.addEventListener('scroll', () => {
//   if (!ticking) {
//     window.requestAnimationFrame(update);
//     ticking = true;
//   }
// });
// const logo = document.querySelector('.logo');
// const sections = document.querySelectorAll('.sec-new');

// let ticking = false;

// function update() {

//   const logoRect = logo.getBoundingClientRect();

//   sections.forEach(section => {

//     const wrap = section.querySelector('.sec-new .box-wrap');
//     const inner = section.querySelector('.sec-new .box-text-inner');

//     if (!wrap || !inner) return;

//     const wrapRect = wrap.getBoundingClientRect();
//     const innerRect = inner.getBoundingClientRect();

//     let move = 0;

//     const overlap = logoRect.bottom - innerRect.top;

//     if (overlap > 0) {
//       const maxMove = wrapRect.bottom - innerRect.top - innerRect.height;
//       move = Math.min(overlap, maxMove);
//     }

//     // ป้องกันการ set style ซ้ำ ๆ
//     if (inner._lastMove !== move) {
//       inner.style.transform = `translateY(${move}px)`;
//       inner._lastMove = move;
//     }

//   });

//   ticking = false;
// }

// window.addEventListener('scroll', () => {
//   if (!ticking) {
//     window.requestAnimationFrame(update);
//     ticking = true;
//   }
// });
// const logo = document.querySelector('.logo');
// const sections = document.querySelectorAll('.sec-new');

// window.addEventListener('scroll', () => {

//   const logoRect = logo.getBoundingClientRect();

//   sections.forEach(section => {
//     const title = section.querySelector('.sec-new .box-text');
//     const sectionRect = section.getBoundingClientRect();
//     const titleRect = title.getBoundingClientRect();

//     // ระยะที่ logo ชน title
//     const overlap = logoRect.bottom - titleRect.top;

//     if (overlap > 0) {

//       // คำนวณระยะที่ดันได้สูงสุด (ไม่เกิน section)
//       const maxMove = sectionRect.bottom - titleRect.top - titleRect.height;

//       const moveAmount = Math.min(overlap, maxMove);

//       title.style.transform = `translateY(${moveAmount}px)`;
//     } else {
//       title.style.transform = `translateY(0px)`;
//     }
//   });

// });
// const sectionHero = document.querySelector(".sec-new");
// const heroTitle = sectionHero.querySelector(".sec-new .box-text");
// const heroTitleClone = sectionHero.querySelector(".sec-new .box-text-clone");
// const heroImgWrapper = sectionHero.querySelector(".sec-new .box-wrap");
// const speed = 1.1;

// window.addEventListener("load", setPos);
// window.addEventListener("resize", setPos);

// function setPos() {
//   const { x: heroTitleX, y: heroTitleY } = heroTitle.getBoundingClientRect();
//   const {
//     x: heroImgWrapperX,
//     y: heroImgWrapperY
//   } = heroImgWrapper.getBoundingClientRect();

//   heroTitleClone.style.top = `${heroTitleY - getSpeed() - heroImgWrapperY}px`;
//   heroTitleClone.style.left = `${heroTitleX - heroImgWrapperX}px`;
// }

// window.addEventListener("scroll", function () {
//   const speed = `translateY(${getSpeed()}px)`;
//   heroTitle.style.transform = speed;
//   heroTitleClone.style.transform = speed;
// });

// function getSpeed() {
//   return window.pageYOffset * speed;
// }

  // window.addEventListener('scroll', () => {
  //   const scrollY = window.scrollY;

  //   if (scrollY > triggerPoint) {

  //     let move = scrollY - triggerPoint;

  //     if (move > maxMove) {
  //       move = maxMove;
  //     }

  //     title.style.transform = `translateY(${move}px)`;

  //   } else {
  //     title.style.transform = `translateY(0px)`;
  //   }
  // });

}, 1000);