document.addEventListener('DOMContentLoaded', function () {
	const hotspots = document.querySelectorAll('.hotspot');
	const lookbookImage = document.querySelector('.lookbook-image');
	const productDetail = document.querySelector('.product-detail');
	const closeButton = productDetail.querySelector('.product-card__close');
	
	hotspots.forEach(hotspot => {
		hotspot.addEventListener('click', function (event) {
			event.preventDefault();
			
			const productImage = productDetail.querySelector('.product-card__image');
			const productTitle = productDetail.querySelector('.product-card__title');
			const productPrice = productDetail.querySelector('.product-card__price');
			const productLink = productDetail.querySelector('.product-card__button');
			
			const selectedImage = this.getAttribute('data-product-image');
			const selectedTitle = this.getAttribute('data-product-title');
			const selectedPrice = this.getAttribute('data-product-price');
			const selectedUrl = this.getAttribute('data-product-url');
			
			// Verifica se o produto já está ativo
			if (productDetail.dataset.currentProduct === selectedTitle) {
				closeProductDetail();
				return;
			}
			
			// Atualiza detalhes do produto
			productImage.src = selectedImage;
			productTitle.textContent = selectedTitle;
			productPrice.textContent = selectedPrice;
			productLink.href = selectedUrl;
			
			// Calcula a posição do hotspot e ajusta a posição do card
			const hotspotRect = this.getBoundingClientRect();
			const lookbookImageRect = lookbookImage.getBoundingClientRect();
			let cardWidth = getWidthBeforeVisible(productDetail);
			const cardHeight = getHeightBeforeVisible(productDetail);
			
			// Posição do card em relação ao hotspot
			let topPosition;
			let leftPosition = hotspotRect.left - lookbookImageRect.left;
			
			// Ajuste da posição lateral
			if (leftPosition > cardWidth) {
				leftPosition = hotspotRect.left - (window.innerWidth/8); // O número é uma margem de segurança que pode ser ajustada
			}
			if (leftPosition < cardWidth) {
				leftPosition = hotspotRect.right + (window.innerWidth/8); // O número é uma margem de segurança que pode ser ajustada
			}
      
			// Ajuste da posição na altura
			if (hotspotRect.top < cardHeight*0.6) {
				topPosition = Math.abs(hotspotRect.top + window.scrollY) + cardHeight*0.55; // Adiciona 55% da altura do card para dentro da tela
			}
			if (hotspotRect.bottom > cardHeight) {
				topPosition = Math.abs(hotspotRect.bottom + window.scrollY) - cardHeight*0.5; // Adiciona 60% da altura do card para dentro da tela
			}
			if (hotspotRect.top > cardHeight*0.6 && hotspotRect.bottom < cardHeight) {
				topPosition = hotspotRect.y + window.scrollY;
			}

			productDetail.style.top = `${topPosition}px`;
			productDetail.style.left = `${leftPosition}px`;
			productDetail.style.position = 'absolute';
			
			if (window.innerWidth < 1023) {
				productDetail.style.position = 'fixed';
				productDetail.style.top = `50%`;
				productDetail.style.left = `50%`;
				productDetail.style.transform = 'translate(-50%, -50%)';// Ajuste para o estilo absoluto no mobile
			}
			
			// Mostra os detalhes do produto com animação
			productDetail.dataset.currentProduct = selectedTitle;
			productDetail.style.display = 'flex';
			setTimeout(() => (productDetail.style.opacity = '1'), 10);
			lookbookImage.style.zIndex = '0'; // Garante que a imagem fique atrás do produto
		});
	});
	
	function getHeightBeforeVisible(element) {
		const originalDisplay = element.style.display;
		element.style.display = 'block';
		
		const height = element.clientHeight || element.scrollHeight;
		element.style.display = originalDisplay;
		
		return height;
	}
	function getWidthBeforeVisible(element) {
		const originalDisplay = element.style.display;
		element.style.display = 'block';
		
		const width = element.clientWidth || element.scrollWidth;
		element.style.display = originalDisplay;
		
		return width;
	}
	
	// Botão de fechar
	closeButton.addEventListener('click', function (event) {
		// Esconder o popup com transição
		event.preventDefault();
		closeProductDetail();
	});
	
	document.addEventListener('click', function (event) {
		event.preventDefault();
		if (!event.target.closest('.hotspot') && !event.target.closest('.product-detail')) {
			closeProductDetail();
		}
	});
	
	function closeProductDetail() {
		productDetail.style.opacity = '0';
		setTimeout(function() {
			productDetail.style.display = 'none';
			productDetail.dataset.currentProduct = ''; // Limpa o produto atual
		}, 300);
	}
});
