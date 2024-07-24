async function loadImages() {
    try {
        const response = await fetch('https://fotos-back.vercel.app/images');
        const images = await response.json();
        if (Array.isArray(images)) {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = ''; // Limpar a galeria antes de adicionar novas imagens

            images.forEach(image => {
                const container = document.createElement('div'); // Contêiner para imagem e nome
                container.className = 'image-container'; // Classe para estilização

                let top = Math.floor(Math.random() * 100);
                let left = Math.floor(Math.random() * 100);
                let rotate = rotateGenerator();
                while (rotate < -35 || rotate > 35) {
                    rotate = rotateGenerator();
                }

                container.style.top = `${top}vh`;
                container.style.left = `${left}vw`;
                container.style.rotate = `${rotate}deg`;
                container.style.zIndex = '-1';

                const img = document.createElement('img');
                img.src = `data:${image.contentType};base64,${image.base64}`;
                img.alt = image.name; // Adicionar texto alternativo

                const nameDiv = document.createElement('h4');
                nameDiv.className = 'nomes'; // Classe para estilização
                nameDiv.textContent = image.names; // Adiciona o nome da imagem

                container.appendChild(img);
                container.appendChild(nameDiv);
                gallery.appendChild(container);
            });

        } else {
            console.error('Erro: a resposta não é uma matriz:', images);
        }
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
    }
}

function rotateGenerator() {
    let r = Math.floor(Math.random() * 100);
    if (Math.random() < 0.5) {
        r = r - 100;
    }
    return r;
}

document.addEventListener('DOMContentLoaded', function () {
    loadImages();
});
