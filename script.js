console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

let counter = -1;
let counter1 = 0;

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

	let CardEl = cardsContainerEl.querySelectorAll(".card");
	let BgImageEl = appBgContainerEl.querySelectorAll(".app__bg__image");

	counter++;
	if (counter > cardInfosContainerEl.querySelectorAll(".info").length-1) {
		counter = 0;
	}
	changeInfo(direction, counter);
	swapCardsClass(counter);

	removeCardEvents(currentCardEl);

	function swapCardsClass(counter) {

		let next;
		let previous;
		let none;
	
		if (counter - 1 < 0) {
			previous = CardEl.length-1;
		} else {
			previous = counter - 1;
		}
	
	
	
		if (counter + 1 > CardEl.length-1) {
			next = 0;
		} else {
			next = counter + 1;
		}
	
		
		if (next + 1 > CardEl.length-1) {
			none = 0;
		} else {
			none = next + 1;
		}

		console.log("prev = " , previous);
		console.log("counter = " , counter);
		console.log("next = " , next);
		console.log("none = " , none);
	

		CardEl[counter].classList.remove("current--card");
		CardEl[previous].classList.remove("previous--card");
		CardEl[next].classList.remove("next--card");
		CardEl[none].classList.remove("none--card");

		BgImageEl[counter].classList.remove("current--image");
		BgImageEl[previous].classList.remove("previous--image");
		BgImageEl[next].classList.remove("next--image");
		CardEl[none].classList.remove("none--image");

		

		CardEl[counter].style.zIndex = "50";
		BgImageEl[counter].style.zIndex = "-2";

		if (direction === "right") {
			CardEl[previous].style.zIndex = "20";
			CardEl[next].style.zIndex = "30";

			BgImageEl[next].style.zIndex = "-1";

			CardEl[counter].classList.add("previous--card");
			CardEl[previous].classList.add("none--card");
			CardEl[next].classList.add("current--card");
			CardEl[none].classList.add("next--card");

			BgImageEl[counter].classList.add("previous--image");
			BgImageEl[previous].classList.add("none--image");
			BgImageEl[next].classList.add("current--image");
			BgImageEl[none].classList.add("next--image");

		} else if (direction === "left") {
			// previousCardEl.style.zIndex = "30";
			// nextCardEl.style.zIndex = "20";

			// previousBgImageEl.style.zIndex = "-1";

			// currentCardEl.classList.add("next--card");
			// previousCardEl.classList.add("current--card");
			// nextCardEl.classList.add("previous--card");

			// currentBgImageEl.classList.add("next--image");
			// previousBgImageEl.classList.add("current--image");
			// nextBgImageEl.classList.add("previous--image");
		}
	}
}

function changeInfo(direction, counter) {
	let infoEl = cardInfosContainerEl.querySelectorAll(".info");
	let next;
	let previous;
	let none;

	if (counter - 1 < 0) {
		previous = infoEl.length-1;
	} else {
		previous = counter - 1;
	}



	if (counter + 1 > infoEl.length-1) {
		next = 0;
	} else {
		next = counter + 1;
	}

	
	if (next + 1 > infoEl.length-1) {
		none = 0;
	} else {
		none = next + 1;
	}

	console.log("prev = " , previous);
	console.log("counter = " , counter);
	console.log("next = " , next);
	console.log("none = " , none);

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 0.5,
			pointerEvents: "none",
		})
		.to(
			infoEl[counter].querySelectorAll(".text"),
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "-120px",
				opacity: 0,
			},
			"-="
		)
		.call(() => {
			swapInfosClass(direction);
		})
		.call(() => initCardEvents())
		.fromTo(
			direction === "right"
				? infoEl[next].querySelectorAll(".text")
				: infoEl[previous].querySelectorAll(".text"),
			{
				opacity: 0,
				translateY: "40px",
			},
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "0px",
				opacity: 1,
			}
		)
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 1,
			pointerEvents: "all",
		});

	function swapInfosClass() {
		infoEl[previous].classList.remove("previous--info");
		infoEl[counter].classList.remove("current--info");
		infoEl[next].classList.remove("next--info");
		infoEl[none].classList.remove("none--info");

		if (direction === "right") {
			infoEl[none].classList.add("next--info");
			infoEl[counter].classList.add("previous--info");
			infoEl[next].classList.add("current--info");
			infoEl[previous].classList.add("none--info");
		} else if (direction === "left") {
			// currentInfoEl.classList.add("next--info");
			// nextInfoEl.classList.add("previous--info");
			// previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
			delay: 0.5,
			duration: 0.4,
			stagger: 0.1,
			opacity: 1,
			translateY: 0,
		})
		.to(
			[buttons.prev, buttons.next],
			{
				duration: 0.4,
				opacity: 1,
				pointerEvents: "all",
			},
			"-=0.4"
		);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
							duration: 0.8,
							opacity: 0,
							pointerEvents: "none",
						})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();
