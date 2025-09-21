const mainImg = document.querySelector(".product-main-img");
const thumbs = document.querySelectorAll(".thumb-list img");

thumbs.forEach((img) => {
  img.addEventListener("click", () => {
    mainImg.style.backgroundImage = `url('${img.src}')`;
  });
});

// 輪播按鈕
document.addEventListener("DOMContentLoaded", () => {
  // 找到所有橫向輪播容器
  const carousels = document.querySelectorAll(".scroll");
  if (!carousels.length) return;

  carousels.forEach((container) => {
    const cards = container.querySelectorAll(".card");
    if (!cards.length) return;

    // 優先找 container 內的 prev/next 按鈕，如果沒有就 fallback 全局找
    const btnPrev =
      container.querySelector(".carousel-prev") ||
      container.querySelector(".left--70");
    const btnNext =
      container.querySelector(".carousel-next") ||
      container.querySelector(".right--70");

    // 計算每次滾動距離
    function calcStep() {
      const c = cards[0];
      const style = getComputedStyle(c);
      const marginRight = parseFloat(style.marginRight) || 0;
      return Math.round(c.offsetWidth + marginRight);
    }
    let step = calcStep();

    // 更新按鈕狀態
    function updateButtons() {
      const maxScroll = Math.max(
        0,
        container.scrollWidth - container.clientWidth - 1
      );
      if (btnPrev) btnPrev.disabled = container.scrollLeft <= 0;
      if (btnNext) btnNext.disabled = container.scrollLeft >= maxScroll;
    }

    // 按鈕行為
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        container.scrollBy({ left: -step, behavior: "smooth" });
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        container.scrollBy({ left: step, behavior: "smooth" });
      });
    }

    // 點卡片置中
    function selectCard(card) {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");

      const targetLeft =
        card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
    }

    cards.forEach((card) => {
      card.addEventListener("click", () => selectCard(card));
    });

    // 滑動時更新按鈕
    let rafId = null;
    container.addEventListener("scroll", () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateButtons);
    });

    // resize 時重新計算 step
    window.addEventListener("resize", () => {
      step = calcStep();
      updateButtons();
    });

    // 初始狀態
    if (cards[0]) cards[0].classList.add("active");
    updateButtons();
  });
});

// const mainImgDiv = document.querySelector(".product-main-img");
// const thumbBtns = document.querySelectorAll(".product-pic-thumb-btn");
// const indicatorBtns = document.querySelectorAll(
//   ".product-pic-img-change-btn"
// );

// // 清除所有按鈕的 active 與背景色
// function clearActive() {
//   thumbBtns.forEach((btn) => {
//     btn.classList.remove("active");
//     btn.style.backgroundColor = ""; // 清除背景色
//   });
//   indicatorBtns.forEach((btn) => btn.classList.remove("active"));
// }

// function changeImage(index) {
//   const src = thumbBtns[index].querySelector("img").src;
//   mainImgDiv.style.backgroundImage = `url(${src})`;

//   clearActive();

//   // 給小圖和按鈕加 active
//   thumbBtns[index].classList.add("active");
//   indicatorBtns[index].classList.add("active");

//   // 點擊的小圖按鈕背景變白
//   thumbBtns[index].style.backgroundColor = "white";
// }

// // 小圖按鈕事件
// thumbBtns.forEach((btn, index) => {
//   btn.addEventListener("click", () => changeImage(index));
// });

// // 指標按鈕事件
// indicatorBtns.forEach((btn, index) => {
//   btn.addEventListener("click", () => changeImage(index));
// });

// // 初始化第一張圖
// changeImage(0);

// new

// DOM 選取
const mainImgDiv = document.querySelector(".product-main-img");
const thumbBtns = document.querySelectorAll(".product-pic-thumb-btn"); // 小圖按鈕
const indicatorBtns = document.querySelectorAll(".product-pic-img-change-btn"); // 自定義圓點按鈕
const carouselIndicators = document.querySelectorAll(".img-change-btn"); // Bootstrap Carousel 原生指標

const carousel = document.querySelector("#carouselExampleIndicators");
const carouselInstance = bootstrap.Carousel.getInstance(carousel);

// 清除所有 active 與背景
function clearActive() {
  thumbBtns.forEach((btn) => {
    btn.classList.remove("active");
    btn.style.backgroundColor = "";
  });
  indicatorBtns.forEach((btn) => btn.classList.remove("active"));
  carouselIndicators.forEach((btn) => {
    btn.classList.remove("active");
    btn.style.backgroundColor = ""; // 可加這行同步清除圓點背景
  });
}

// 切換圖片
function changeImage(index) {
  // 改主圖
  const src = thumbBtns[index].querySelector("img").src;
  mainImgDiv.style.backgroundImage = `url(${src})`;

  // 清除舊的 active
  clearActive();

  // 設定新的 active
  thumbBtns[index].classList.add("active");
  indicatorBtns[index].classList.add("active");
  carouselIndicators[index].classList.add("active");

  // 小圖背景變白
  thumbBtns[index].style.backgroundColor = "white";

  // 下方圓點背景變白（如果想要）
  carouselIndicators[index].style.backgroundColor = "white";

  // Bootstrap Carousel 跳轉
  if (carouselInstance) {
    carouselInstance.to(index);
  }
}

// 綁定小圖事件
thumbBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => changeImage(index));
});

// 綁定下方自定義圓點事件
indicatorBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => changeImage(index));
});

// 初始化第一張圖
changeImage(0);
