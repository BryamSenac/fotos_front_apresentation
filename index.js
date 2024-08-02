// script.js

// Firebase Configuração e Inicialização
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js';
const firebaseConfig = {
    apiKey: "AIzaSyAMvBiBevtwehlp600lr_oPXEwW38jlYt8",
    authDomain: "imgs-7b388.firebaseapp.com",
    projectId: "imgs-7b388",
    storageBucket: "imgs-7b388.appspot.com",
    messagingSenderId: "831912228261",
    appId: "1:831912228261:web:4b5d6aabe135405deaa44c",
    measurementId: "G-J6195R0VHR"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function loadImages() {
    try {
        const listRef = ref(storage, 'images/');
        const res = await listAll(listRef);

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = ''; // Limpar a galeria antes de adicionar novas imagens

        for (const itemRef of res.items) {
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);
            console.log(metadata);
            
            const names = metadata.customMetadata && metadata.customMetadata.names ? metadata.customMetadata.names : 'N/A';

            const container = document.createElement('div'); // Contêiner para imagem e nome
            container.className = 'image-container'; // Classe para estilização

            let top = Math.floor(Math.random() * 100);
            while (top < 15|| top > 70) {
                top = rotateGenerator();
            }
            let left = Math.floor(Math.random() * 100);
            while (left < 5 || left > 85) {
                left = rotateGenerator();
            }
            let rotate = rotateGenerator();
            while (rotate < -35 || rotate > 35) {
                rotate = rotateGenerator();
            }

            container.style.top = `${top}vh`;
            container.style.left = `${left}vw`;
            container.style.rotate = `${rotate}deg`;
            container.style.zIndex = '-1';

            const img = document.createElement('img');
            img.src = url;
            img.alt = names; // Adicionar texto alternativo

            const nameDiv = document.createElement('h4');
            nameDiv.className = 'nomes'; // Classe para estilização
            nameDiv.textContent = names; // Adiciona o nome da imagem

            container.appendChild(img);
            container.appendChild(nameDiv);
            gallery.appendChild(container);
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

async function loadRandomImage() {
    try {
        const listRef = ref(storage, 'images/');
        const res = await listAll(listRef);

        if (res.items.length === 0) {
            console.error('Nenhuma imagem encontrada.');
            return;
        }

        // Seleciona um item aleatório da lista
        const randomIndex = Math.floor(Math.random() * res.items.length);
        const randomItemRef = res.items[randomIndex];

        // Pega a URL e metadados da imagem aleatória
        const url = await getDownloadURL(randomItemRef);
        const metadata = await getMetadata(randomItemRef);

        const names = metadata.customMetadata && metadata.customMetadata.names ? metadata.customMetadata.names : 'N/A';

        const sorteado = document.getElementById('sorteado');
        sorteado.innerHTML = ''; // Limpar a galeria antes de adicionar a nova imagem

        const container = document.createElement('div'); // Contêiner para imagem e nome
        container.className = 'image-sorteado'; // Classe para estilização

        const img = document.createElement('img');
        img.src = url;
        img.alt = names; // Adicionar texto alternativo

        const nameDiv = document.createElement('h6');
        nameDiv.textContent = names; // Adiciona o nome da imagem

        container.appendChild(img);
        sorteado.appendChild(container);
        sorteado.appendChild(nameDiv);

    } catch (error) {
        console.error('Erro ao carregar imagem aleatória:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadImages();
});
