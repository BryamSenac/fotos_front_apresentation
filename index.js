// script.js

// Firebase Configuração e Inicialização
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-storage.js';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
            const names = metadata.customMetadata?.nomes || 'N/A';
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

document.addEventListener('DOMContentLoaded', function () {
    loadImages();
});
