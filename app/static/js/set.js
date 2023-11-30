// Get the card ID from somewhere (e.g., URL parameter)
const setId = window.location.pathname.split("/").pop();

console.log(setId)

// Fetch card details from the Pokemon TCG API
fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`)
    .then(response => response.json())
    .then(data => {
        console.log("HEREE", data);
        document.getElementById("set-logo").setAttribute('src', `${data.logo}.png`)

        // Set name and symbol
        // document.getElementById("set-symbol").innerHTML = `<img src="${data.symbol}.png" alt="Set Symbol">`;
        document.getElementById("set-name").textContent = data.name;

        // Series name
        document.getElementById("series-name").textContent = data.serie.name;

        // Release date
        document.getElementById("release-date").textContent = data.releaseDate;

        // Cards count
        document.getElementById("cards-count").textContent = data.cardCount.total;

        // Cards container
        var cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = ''; // Clear existing content

        const baseUrl = window.location.pathname;

        // Loop through cards and append to the container
        data.cards.forEach(function(card) {
            var cardElement = document.createElement("div");
            cardElement.innerHTML = `
                <a href="${baseUrl}/${card.localId}" class="relative">
                    <img src="${card.image}/low.webp" alt="${card.name}" class="rounded-md">
                    <div class="absolute h-full w-full bg-white z-10 top-0 left-0 opacity-50 hover:opacity-0"></div>
                </a>
                `;
            cardsContainer.appendChild(cardElement);
        });
    })
    .catch(error => console.error('Error fetching card details:', error));