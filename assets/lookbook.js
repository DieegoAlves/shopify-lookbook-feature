class LookbookInteractive {
	constructor(config = {}) {
		this.defaults = {
			cardMargin: 0.125, // Margem para cálculo da posição do card em relação ao hotspot (12.5%)
			mobileBreakpoint: 1024, // Largura máxima para dispositivos móveis
			fadeDuration: 300, // Duração da transição em milissegundos
			zIndexActive: '10', // Z-index para exibir o card no topo
			zIndexInactive: '0', // Z-index para a imagem do lookbook
			cardTopOffsetFactor: 0.6, // Fator de altura para ajuste ao topo do hotspot
			cardBottomOffsetFactor: 0.5, // Fator de altura para ajuste ao fundo do hotspot
			cardAdditionalOffsetFactor: 0.55, // Fator adicional para posicionamento vertical
		};
		
		this.settings = { ...this.defaults, ...config };
		
		this.hotspots = document.querySelectorAll('.hotspot');
		this.lookbookImage = document.querySelector('.lookbook-image');
		this.productDetail = document.querySelector('.product-detail');
		this.closeButton = this.productDetail.querySelector('.product-card__close');
		this.productImage = this.productDetail.querySelector('.product-card__image');
		this.productTitle = this.productDetail.querySelector('.product-card__title');
		this.productPrice = this.productDetail.querySelector('.product-card__price');
		this.productLink = this.productDetail.querySelector('.product-card__button');
		
		this.init();
	}
	
	init() {
		this.bindHotspotEvents();
		this.bindCloseButton();
		this.bindOutsideClick();
	}
	
	bindHotspotEvents() {
		this.hotspots.forEach(hotspot => {
			hotspot.addEventListener('click', this.handleHotspotClick.bind(this, hotspot));
		});
	}
	
	handleHotspotClick(hotspot, event) {
		event.preventDefault();
		
		const selectedImage = hotspot.getAttribute('data-product-image');
		const selectedTitle = hotspot.getAttribute('data-product-title');
		const selectedPrice = hotspot.getAttribute('data-product-price');
		const selectedUrl = hotspot.getAttribute('data-product-url');
		
		if (this.productDetail.dataset.currentProduct === selectedTitle) {
			this.closeProductDetail();
			return;
		}
		
		this.updateProductDetails(selectedImage, selectedTitle, selectedPrice, selectedUrl);
		this.positionProductDetail(hotspot);
		this.showProductDetail(selectedTitle);
	}
	
	updateProductDetails(image, title, price, url) {
		this.productImage.src = image;
		this.productTitle.textContent = title;
		this.productPrice.textContent = price;
		this.productLink.href = url;
	}
	
	positionProductDetail(hotspot) {
		const hotspotRect = hotspot.getBoundingClientRect();
		const lookbookImageRect = this.lookbookImage.getBoundingClientRect();
		const cardWidth = this.getHiddenElementWidth(this.productDetail);
		const cardHeight = this.getHiddenElementHeight(this.productDetail);
		
		const margin = window.innerWidth * this.settings.cardMargin;
		const scrollY = window.scrollY;
		
		// Cálculo da posição horizontal (left)
		let leftPosition = hotspotRect.left - lookbookImageRect.left;
		if (leftPosition > cardWidth) {
			leftPosition -= margin;
		} else {
			leftPosition = hotspotRect.right + margin;
		}
		
		// Cálculo da posição vertical (top)
		let topPosition = hotspotRect.top + scrollY; // Posição base
		if (hotspotRect.top < cardHeight * this.settings.cardTopOffsetFactor) {
			topPosition += cardHeight * this.settings.cardAdditionalOffsetFactor;
		} else if (hotspotRect.bottom > cardHeight) {
			topPosition -= cardHeight * this.settings.cardBottomOffsetFactor;
		}
		
		// Ajuste para dispositivos móveis
		if (window.innerWidth < this.settings.mobileBreakpoint) {
			this.productDetail.style.position = 'fixed';
			this.productDetail.style.top = '50%';
			this.productDetail.style.left = '50%';
			this.productDetail.style.transform = 'translate(-50%, -50%)';
		} else {
			this.productDetail.style.position = 'absolute';
			this.productDetail.style.top = `${topPosition}px`;
			this.productDetail.style.left = `${leftPosition}px`;
		}
	}
	
	showProductDetail(currentTitle) {
		this.productDetail.dataset.currentProduct = currentTitle;
		this.productDetail.style.display = 'flex';
		setTimeout(() => (this.productDetail.style.opacity = '1'), 10);
		this.lookbookImage.style.zIndex = this.settings.zIndexInactive;
	}
	
	closeProductDetail() {
		this.productDetail.style.opacity = '0';
		setTimeout(() => {
			this.productDetail.style.display = 'none';
			this.productDetail.dataset.currentProduct = '';
		}, this.settings.fadeDuration);
	}
	
	bindCloseButton() {
		this.closeButton.addEventListener('click', this.closeProductDetail.bind(this));
	}
	
	bindOutsideClick() {
		document.addEventListener('click', event => {
			if (!event.target.closest('.hotspot') && !event.target.closest('.product-detail')) {
				this.closeProductDetail();
			}
		});
	}
	
	getHiddenElementHeight(element) {
		const originalDisplay = element.style.display;
		element.style.display = 'block';
		const height = element.clientHeight || element.scrollHeight;
		element.style.display = originalDisplay;
		return height;
	}
	
	getHiddenElementWidth(element) {
		const originalDisplay = element.style.display;
		element.style.display = 'block';
		const width = element.clientWidth || element.scrollWidth;
		element.style.display = originalDisplay;
		return width;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new LookbookInteractive();
});
