function extractCaption(img: HTMLImageElement): string {
	const parentP = img.closest('p');
	const nextEl = parentP?.nextElementSibling;

	if (
		nextEl instanceof HTMLParagraphElement &&
		nextEl.children.length === 1 &&
		nextEl.firstElementChild?.tagName === 'EM'
	) {
		const onlyWhitespaceAroundEm = Array.from(nextEl.childNodes).every(
			(node) =>
				node === nextEl.firstElementChild ||
				(node.nodeType === Node.TEXT_NODE && (node.textContent ?? '').trim() === ''),
		);
		if (onlyWhitespaceAroundEm) {
			const captionText = nextEl.firstElementChild.textContent?.trim() ?? '';
			if (captionText.length > 0) return captionText;
		}
	}

	return img.alt.trim();
}

export function initImageLightbox(): void {
	const dialog = document.querySelector<HTMLDialogElement>('dialog[data-image-lightbox]');
	if (!dialog || dialog.dataset.initialized === 'true') return;

	const images = Array.from(document.querySelectorAll<HTMLImageElement>('.case-prose img'));
	if (images.length === 0) return;

	const lightboxImg = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]');
	const captionEl = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
	const counterEl = dialog.querySelector<HTMLElement>('[data-lightbox-counter]');
	const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
	const prevBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
	const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');

	if (!lightboxImg || !captionEl || !counterEl || !closeBtn || !prevBtn || !nextBtn) return;

	const modal = dialog;
	const targetImg = lightboxImg;
	const targetCaption = captionEl;
	const targetCounter = counterEl;
	const btnClose = closeBtn;
	const btnPrev = prevBtn;
	const btnNext = nextBtn;

	modal.dataset.initialized = 'true';

	const captions = images.map(extractCaption);
	const hasMultiple = images.length > 1;
	let currentIndex = 0;

	btnPrev.hidden = !hasMultiple;
	btnNext.hidden = !hasMultiple;
	targetCounter.hidden = !hasMultiple;

	function showSlide(index: number): void {
		currentIndex = ((index % images.length) + images.length) % images.length;
		const source = images[currentIndex];
		targetImg.src = source.currentSrc || source.getAttribute('src') || source.src;
		targetImg.alt = source.alt;

		const caption = captions[currentIndex];
		if (caption) {
			targetCaption.textContent = caption;
			targetCaption.hidden = false;
		} else {
			targetCaption.textContent = '';
			targetCaption.hidden = true;
		}

		if (hasMultiple) {
			targetCounter.textContent = `${currentIndex + 1} / ${images.length}`;
		}
	}

	function openAt(index: number): void {
		showSlide(index);
		document.documentElement.classList.add('lightbox-open');
		if (!modal.open) {
			modal.showModal();
		}
	}

	images.forEach((img, index) => {
		img.dataset.zoomable = 'true';
		img.tabIndex = 0;
		img.setAttribute('role', 'button');
		img.setAttribute('aria-haspopup', 'dialog');
		img.setAttribute(
			'aria-label',
			img.alt ? `Enlarge image: ${img.alt}` : 'Enlarge image',
		);

		img.addEventListener('click', () => {
			openAt(index);
		});

		img.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				openAt(index);
			}
		});
	});

	btnClose.addEventListener('click', () => {
		modal.close();
	});

	btnPrev.addEventListener('click', () => {
		if (hasMultiple) showSlide(currentIndex - 1);
	});

	btnNext.addEventListener('click', () => {
		if (hasMultiple) showSlide(currentIndex + 1);
	});

	modal.addEventListener('click', (event) => {
		const target = event.target as Element | null;
		if (!target) return;
		if (target.closest('button, [data-lightbox-caption], [data-lightbox-counter]')) return;
		modal.close();
	});

	modal.addEventListener('keydown', (event) => {
		if (!modal.open || !hasMultiple) return;
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			showSlide(currentIndex - 1);
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			showSlide(currentIndex + 1);
		}
	});

	modal.addEventListener('close', () => {
		document.documentElement.classList.remove('lightbox-open');
		targetImg.removeAttribute('src');
		targetImg.alt = '';
		images[currentIndex]?.focus({ preventScroll: true });
	});
}
