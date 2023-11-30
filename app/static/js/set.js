setMain();

async function setMain() {
    // Get the card ID from somewhere (e.g., URL parameter)
    const setId = window.location.pathname.split("/").pop();

    const queryParams = new URLSearchParams();
    queryParams.append('set_id', setId);

    
    const userData = await fetch(`/user_card?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${yourAuthToken}` // Replace with your authentication token
        },
        params: JSON.stringify({
          set_id: setId, 
        })
      })
      .then(response => response.json())
      .catch(error => console.error('Error fetching card details:', error));

     const setData = await fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching card details:', error));
        
    createView(setData, userData)
    
}

function createView(setData, userData) {
    console.log(userData)
    document.getElementById("set-logo").setAttribute('src', `${setData.logo}.png`)
    // Set name and symbol
    // document.getElementById("set-symbol").innerHTML = `<img src="${data.symbol}.png" alt="Set Symbol">`;
    document.getElementById("set-name").textContent = setData.name;

    // Series name
    document.getElementById("series-name").textContent = setData.serie.name;

    // Release date
    document.getElementById("release-date").textContent = setData.releaseDate;

    // Cards count
    document.getElementById("cards-count").textContent = setData.cardCount.total;
    const cardsCount = [...new Set(userData.data.cards.map(item => item.card_id))].length;
    document.getElementById("user-cards-count").textContent = cardsCount;
    const cardsPercentage = (cardsCount / setData.cardCount.total)
    // document.getElementById("user-cards-percentage").textContent = `${Math.ceil(cardsPercentage * 100)} %`;
    console.log(document.getElementById("user-cards-percentage").parentElement.clientWidth)
    console.log(document.getElementById("user-cards-percentage").clientWidth)
    document.getElementById("user-cards-percentage").style.width = `${Math.ceil(document.getElementById("user-cards-percentage").parentElement.clientWidth * cardsPercentage)}px`


    // Cards container
    var cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ''; // Clear existing content

    const baseUrl = window.location.pathname;

    // Loop through cards and append to the container
    setData.cards.forEach(function(card) {

        const hasCardInCollection = !! userData.data?.cards?.some(userCard => userCard.card_id == card.localId);
        var cardElement = document.createElement("div");
        cardElement.innerHTML = `
            <a href="${baseUrl}/${card.localId}" class="relative">
                <img src="${card.image}/low.webp" alt="${card.name}" class="rounded-md">
                ${! hasCardInCollection
                ? '<div class="absolute h-full w-full bg-white z-10 top-0 left-0 opacity-50 hover:opacity-0"></div>'
                : ''
            }
                
            </a>
            `;
        cardsContainer.appendChild(cardElement);
    });
}
