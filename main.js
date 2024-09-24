let currentPage = 0;
const images = [];
const leftPage = document.getElementById('left-page');
const rightPage = document.getElementById('right-page');

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

let url = "https://66edced2380821644cde0b48.mockapi.io/Images";

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            images.push(item.image);
        });
        
        updatePages();
    })
    .catch(error => console.error('Error:', error));

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePages(true); 
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentPage < images.length ) {
        updatePages(false); 
        currentPage++;
    }
});

function updatePages(isPrevious) {
    leftPage.style.display = 'block'; 
    rightPage.style.display = 'block'; 
    
    
    leftPage.innerHTML = currentPage > 0 ? `<img src="${images[currentPage - 1]}" alt="Image">` : '';
    rightPage.innerHTML = `<img src="${images[currentPage]}" alt="Image">`;
    
    document.getElementById('prev').disabled = currentPage === 0;

    if (isPrevious) {
        leftPage.classList.remove('flip'); 
        rightPage.classList.add('flip'); 
        setTimeout(() => {
            rightPage.classList.remove('flip'); 
        }, 600);
    } else {
        leftPage.classList.add('flip'); 
        setTimeout(() => {
            leftPage.classList.remove('flip'); 
        }, 600);
    }
}