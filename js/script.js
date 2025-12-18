document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);

	// ***************************
	// Lenis.js
	// ***************************
	const lenis = new Lenis({
		duration: 1.2,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
		direction: 'vertical', // vertical, horizontal
		gestureDirection: 'vertical', // vertical, horizontal, both
		smooth: true,
		mouseMultiplier: 1,
		smoothTouch: false, // smooth touch scrolling
		touchMultiplier: 2, // controls the smoothness of the scroll, with values between 0 and 1
		infinite: false, // infinite scrolling
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);

	// ***************************
	// GNB 연결, scroll-behehavior 사용이 더 나아보임
	// ***************************
	// const sections = gsap.utils.toArray("section");
	// const sectionIds = sections.map((section) => section.id);
	// // console.log(sectionIds);

	// const menus = gsap.utils.toArray(".gnb li a");

	// menus.forEach((menu, index) => {
	//   menu.addEventListener("click", (e) => {
	//     e.preventDefault();
	//     gsap.to(window, { scrollTo: "#" + sectionIds[index] });
	//   });
	// });

	// ***************************
	// GNB 연결, lenis.js의 scrollTo() 메서드 사용 👍
	// ***************************
	const menus = gsap.utils.toArray('.gnb li a');
	console.log(menus);

	menus.forEach((menu, index) => {
		menu.addEventListener('click', (e) => {
			e.preventDefault();
			// gsap.to(window, { scrollTo: menu.hash });
			lenis.scrollTo(menu.hash);
		});
	});

	// snap
	// ScrollTrigger.create({
	//   trigger: "body",
	//   start: "top top",
	//   end: "max",
	//   markers: true,
	//   snap: {
	//     duration: 0.8,
	//     ease: "power4.out",

	//     snapTo: (progress, self) => {
	//       let snapPoints = sections.map((section) => {
	//         return section.offsetTop / self.end; // return!!
	//       });
	//       return gsap.utils.snap(snapPoints, progress);
	//     },
	//   },
	// });

	// ***************************
	// header 숨기기
	// ***************************
	const header = document.querySelector('.header');
	let lastScroll = 0;

	ScrollTrigger.create({
		start: 'top 0%',
		end: 'max',
		// markers: true,
		onUpdate: (self) => {
			const direction = self.direction;
			const currentScroll = self.scroll();
			// console.log(direction, lastScroll, currentScroll); // 내리면 1, 올리면 -1 & 스크롤값

			if (currentScroll <= 100) {
				gsap.to(header, { yPercent: 0, duration: 0.3 });
				lastScroll = currentScroll;
				return;
			}

			if (direction === 1) {
				gsap.to(header, { yPercent: -100, duration: 0.3 });
			} else if (direction === -1) {
				gsap.to(header, { yPercent: 0, duration: 0.3 });
			}

			lastScroll = currentScroll;
		},
	});

	// ***************************
	// GSAP
	// ***************************

	const title = SplitText.create('.home-title h1', { type: 'chars' });
	gsap.from(title.chars, {
		delay: 1,
		duration: 1.6,
		y: 100,
		autoAlpha: 0,
		stagger: 0.05,
		ease: 'elastic.out(1, 0.6)',
		repeat: -1,
		yoyo: true,
		repeatDelay: 1,
	});

	const portfolioItems = gsap.utils.toArray('.portfolio-item');

	const portfolioTL = gsap.timeline({
		defaults: { duration: 1, ease: 'power2.out' },
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
		trigger: '#portfolio',
		start: 'top 0%',
		end: `+=${portfolioTL.duration() * 1000}`,
		pin: true,
		scrub: 1,
		// markers: true,
		animation: portfolioTL,
	});

	// designer hong
	const designerHong = document.querySelector('.designer-hong');
	const hongsEye = designerHong.querySelector('.eye');

	// 눈 깜빡이기
	setInterval(() => {
		hongsEye.classList.add('blink');
		setTimeout(() => {
			hongsEye.classList.remove('blink');
		}, 700);
	}, 5000);

	function shaking() {
		designerHong.classList.add('active');
		setTimeout(() => {
			designerHong.classList.remove('active');
		}, 1000);
	}

	// 초기 상태 설정
	stand(); // 처음 로딩될 때 서있는 상태

	// 클릭 이벤트
	let isMoved = false;
	designerHong.addEventListener('click', () => {
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
			ease: 'elastic.out(1, 0.6)',
		});
		shaking();
	}
	function move() {
		gsap.to(designerHong, {
			xPercent: 100,
			y: 50,
			rotation: -30,
			duration: 1,
			ease: 'elastic.out(1, 0.6)',
		});
		shaking();
	}

	function stand() {
		gsap.to(designerHong, {
			xPercent: -50,
			y: 0,
			rotation: 0,
			duration: 1,
			ease: 'elastic.out(1, 0.6)',
		});
		shaking();
	}

	// 스크롤 트리거와 함께 designerHong을 움직이기
	gsap.to(designerHong, {
		scrollTrigger: {
			trigger: designerHong,
			start: 'bottom 70%',
			end: 'bottom 60%',
			// markers: true,
			onEnter: () => move(),
			onEnterBack: () => stand(),
		},
	});

	// contact에 도달하면 홍 원 위치
	// 글자도 애니메이션되어야 하기 때문에 -> 해야될 동작이 여러개니까 -> 타임라인 설정
	const contactTL = gsap.timeline({
		defaults: { ease: 'power4.out' },
	});
	contactTL.to('.contact-content h2', { xPercent: 80 });
	contactTL.to('.contact-content dl dt', { xPercent: 80 }, '-=0.3');
	contactTL.to('.contact-content dl dd', { xPercent: 80 }, '-=0.3');

	ScrollTrigger.create({
		trigger: '#contact',
		start: 'top 40%',
		end: 'top 30%',
		// markers: true,
		animation: contactTL,
		toggleActions: 'play none reverse reverse',
		onEnter: () => stand(),
		onEnterBack: () => move(),
	});

	// ***************************
	// Swiper.js
	// ***************************

	// banner
	const bannerSlider = new Swiper('.banner-slider', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		// slidesPerView: "auto",
		slidesPerView: '4.5',
		spaceBetween: 28,
		centeredSlides: true,
		// grabCursor: true,
		speed: 1000,

		// If we need pagination
		pagination: {
			el: '.banner-slider-wrap .swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.banner-slider-wrap .swiper-button-next',
			prevEl: '.banner-slider-wrap .swiper-button-prev',
		},
	});

	// 두 슬라이더를 변수로 먼저 선언 (controller 옵션에서 상호 참조가 가능하도록)
	let textSlider = null;
	let picSlider = null;

	textSlider = new Swiper('.text-slider', {
		direction: 'horizontal',
		// effect: "fade",
		loop: true,
		autoplay: false,
		// ⭐ 추가: 사용자의 터치(드래그/스와이프) 이동을 금지합니다.
		allowTouchMove: false,
		speed: 1000,
		watchSlidesProgress: true,

		// ⭐ 중요: picSlider를 제어하도록 설정
		controller: {
			control: picSlider,
		},
	});

	picSlider = new Swiper('.pic-slider', {
		direction: 'horizontal',
		loop: true,
		autoplay: false,
		speed: 1000,
		pagination: {
			el: '.pic-slider-wrap .swiper-pagination',
		},
		navigation: {
			nextEl: '.pic-slider-wrap .swiper-button-next',
			prevEl: '.pic-slider-wrap .swiper-button-prev',
		},
		// thumbs 제거 (controller와 thumbs 동시 사용은 혼동을 야기할 수 있음)
		// thumbs: { swiper: textSlider, },

		// ⭐ 중요: textSlider를 제어하도록 설정
		controller: {
			control: textSlider,
		},
	});
});
