const apiKey = 'GR2OkN6spwwFdJHdA1WCss26gRjvnSPk'; 
const apiUrlSearch = 'https://api.giphy.com/v1/gifs/search';
const apiUrlRandom = 'https://api.giphy.com/v1/gifs/random';

async function searchGiphy() {
    const searchInput = document.getElementById('searchInput').value;
    
    if (!searchInput) {
        alert('Please enter a search term.');
        return;
    }

    const url = `${apiUrlSearch}?api_key=${apiKey}&q=${encodeURIComponent(searchInput)}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Get the results and display them
        const resultsContainer = document.getElementById('giphy-results');
        resultsContainer.innerHTML = '';  // Clear previous results

        if (data.data.length === 0) {
            resultsContainer.innerHTML = '<p>No results found</p>';
            return;
        }

        data.data.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url;
            img.alt = gif.title;
            img.classList.add('giphy-image');
            resultsContainer.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching data from Giphy:', error);
        alert('An error occurred while fetching GIFs.');
    }
}

// Function to fetch a random GIF
async function getRandomGif() {
    const url = `${apiUrlRandom}?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Get the results and display the random GIF
        const resultsContainer = document.getElementById('giphy-results');
        resultsContainer.innerHTML = '';  // Clear previous results

        if (!data.data || !data.data.images.fixed_height) {
            resultsContainer.innerHTML = '<p>No random GIF found</p>';
            return;
        }

        const gif = data.data;
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.classList.add('giphy-image');
        resultsContainer.appendChild(img);
    } catch (error) {
        console.error('Error fetching random GIF from Giphy:', error);
        alert('An error occurred while fetching a random GIF.');
    }
}

// Event listener for the random button
document.getElementById('randomButton').addEventListener('click', getRandomGif);

