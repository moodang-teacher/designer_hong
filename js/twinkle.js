document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('star-container');
	const numStars = 200; // 생성할 별의 개수

	// 무작위 숫자를 생성하는 헬퍼 함수
	function getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	// 별 생성 로직
	for (let i = 0; i < numStars; i++) {
		const star = document.createElement('div');
		star.classList.add('star');

		// 1. 무작위 위치 설정 (화면 전체)
		const x = getRandom(0, 100); // 0% ~ 100%
		const y = getRandom(0, 100); // 0% ~ 100%
		star.style.left = `${x}vw`; // viewport width 기준
		star.style.top = `${y}vh`; // viewport height 기준

		// 2. 무작위 크기 설정 (1px ~ 3px)
		const size = getRandom(1, 3);
		star.style.setProperty('--star-size', `${size}px`);

		// 3. 무작위 애니메이션 속도 및 지연 시간 설정 (가장 중요한 반짝임 요소)
		const duration = getRandom(1.5, 4); // 애니메이션 지속 시간 (1.5초 ~ 4초)
		const delay = getRandom(0, 5); // 애니메이션 시작 지연 시간 (0초 ~ 5초)

		star.style.setProperty('--twinkle-duration', `${duration}s`);
		star.style.setProperty('--twinkle-delay', `${delay}s`);

		// 컨테이너에 별 추가
		container.appendChild(star);
	}
	// ***************************
	// Parallax Effect
	// ***************************
	// document.addEventListener('mousemove', (e) => {
	// 	const mouseX = e.clientX;
	// 	const mouseY = e.clientY;
	//
	// 	const stars = document.querySelectorAll('.star');
	// 	stars.forEach((star) => {
	// 		// 각 별마다 조금씩 다른 움직임 계수를 적용하기 위해 크기(size) 변수를 활용하거나 랜덤값 사용
	// 		// 여기서는 간단하게 모든 별에 대해 화면 중심 기준 마우스 위치에 따라 반대로 움직이게 설정
	// 		const speed =
	// 			star.style.getPropertyValue('--star-size').replace('px', '') * 0.05;
	//
	// 		const x = (window.innerWidth / 2 - mouseX) * speed;
	// 		const y = (window.innerHeight / 2 - mouseY) * speed;
	//
	// 		star.style.transform = `translate(${x}px, ${y}px)`;
	// 	});
	// });
});
