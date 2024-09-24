function Login() {
    window.location.href = 'Login.html';
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

const url = 'https://66edced2380821644cde0b48.mockapi.io/Images';

async function loadImages() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let cardContainer = document.getElementById('cardContainer');

        data.forEach(item => {
            console.log(item);
            
            let card = document.createElement('div');
            card.classList.add('col-md-4', 'col-12', 'mb-3');

            card.innerHTML = `
                <div class="card cardHome">
                    <img class="card-img-top cardimg" src="${item.image}" alt="Image">
                </div>
            `;

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching the images:', error);
    }
}

loadImages();
