document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // ***************************
  // GSAP
  // ***************************

  const title = SplitText.create(".home-title h1", { type: "chars" });
  gsap.from(title.chars, {
    delay: 1,
    duration: 1.6,
    y: 100,
    autoAlpha: 0,
    stagger: 0.05,
    ease: "elastic.out(1, 0.6)",
    repeat: -1,
    yoyo: true,
    repeatDelay: 1,
  });

  const portfolioItems = gsap.utils.toArray(".portfolio-item");

  const portfolioTL = gsap.timeline({
    defaults: { duration: 1, ease: "power2.out" },
  });

  portfolioItems.forEach((item, index) => {
    portfolioTL.from(item, {
      y: 100,
      autoAlpha: 0,
      rotation: -10,
    });
    portfolioTL.from({}, { duration: 1 });
    portfolioTL.to(item, {
      // autoAlpha: 0.2,
      // transformOrigin: "50% 50%",
      scale: 0.99,
      y: (index + 1) * 20,
    });
  });

  ScrollTrigger.create({
    trigger: "#portfolio",
    start: "top 0%",
    end: `+=${portfolioTL.duration() * 1000}`,
    pin: true,
    scrub: 1,
    // markers: true,
    animation: portfolioTL,
  });

  // designer hong
  const designerHong = document.querySelector(".designer-hong");
  const hongsEye = designerHong.querySelector(".eye");

  // 눈 깜빡이기
  setInterval(() => {
    hongsEye.classList.add("blink");
    setTimeout(() => {
      hongsEye.classList.remove("blink");
    }, 700);
  }, 5000);

  function shaking() {
    designerHong.classList.add("active");
    setTimeout(() => {
      designerHong.classList.remove("active");
    }, 1000);
  }

  // 초기 상태 설정
  stand(); // 처음 로딩될 때 서있는 상태

  // 클릭 이벤트
  let isMoved = false;
  designerHong.addEventListener("click", () => {
    if (!isMoved) {
      hide(); // 클릭하면 hide 상태
    } else {
      move(); // 다시 클릭하면 move 상태
    }
    isMoved = !isMoved;
  });

  function hide() {
    gsap.to(designerHong, {
      xPercent: 120,
      y: 100,
      rotation: -15,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
    });
    shaking();
  }
  function move() {
    gsap.to(designerHong, {
      xPercent: 100,
      y: 50,
      rotation: -30,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
    });
    shaking();
  }

  function stand() {
    gsap.to(designerHong, {
      xPercent: -50,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
    });
    shaking();
  }

  // 스크롤 트리거와 함께 designerHong을 움직이기
  gsap.to(designerHong, {
    scrollTrigger: {
      trigger: designerHong,
      start: "bottom 70%",
      end: "bottom 60%",
      // markers: true,
      onEnter: () => move(),
      onEnterBack: () => stand(),
    },
  });

  // contact에 도달하면 홍 원 위치
  // 글자도 애니메이션되어야 하기 때문에 -> 해야될 동작이 여러개니까 -> 타임라인 설정
  const contactTL = gsap.timeline({
    defaults: { ease: "power4.out" },
  });
  contactTL.to(".contact-content h2", { xPercent: 80 });
  contactTL.to(".contact-content dl dt", { xPercent: 80 }, "-=0.3");
  contactTL.to(".contact-content dl dd", { xPercent: 80 }, "-=0.3");

  ScrollTrigger.create({
    trigger: "#contact",
    start: "top 40%",
    end: "top 30%",
    // markers: true,
    animation: contactTL,
    toggleActions: "play none reverse reverse",
    onEnter: () => stand(),
    onEnterBack: () => move(),
  });

  // ***************************
  // Swiper.js
  // ***************************

  // banner
  const bannerSlider = new Swiper(".banner-slider", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    // slidesPerView: "auto",
    slidesPerView: "4.5",
    spaceBetween: 28,
    centeredSlides: true,
    // grabCursor: true,
    speed: 1000,

    // If we need pagination
    pagination: {
      el: ".banner-slider-wrap .swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".banner-slider-wrap .swiper-button-next",
      prevEl: ".banner-slider-wrap .swiper-button-prev",
    },
  });
});
