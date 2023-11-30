fetch(`https://api.tcgdex.net/v2/en/series`)
  .then(response => response.json())
  .then(seriesData => {
    // Display total number of expansions
    // document.getElementById("total-expansions").textContent = `Total Expansions: ${seriesData.length}`;

    // // Sort series based on the selected option
    // const sortOption = document.getElementById("sort-option").value;
    // seriesData.sort((a, b) => (sortOption === "series") ? a.name.localeCompare(b.name) : a.releaseDate.localeCompare(b.releaseDate));

    // Iterate through series and fetch set data
    seriesData.forEach(series => {
      const seriesContainer = document.createElement("div");
      seriesContainer.classList.add("series-container");
      seriesContainer.innerHTML = `<h2 class="font-bold mb-2">${series.name} Series</h2>`;
      const setContainer = document.createElement("div");
      setContainer.classList.add("set-container");
      document.getElementById("series").appendChild(seriesContainer);
      seriesContainer.appendChild(setContainer);

      // Fetch set data for each series
      fetch(`https://api.tcgdex.net/v2/en/series/${series.id}`)
        .then(response => response.json())
        .then(setData => {
          // Display sets for the current series
          setData.sets.forEach(set => {
            const setCard = document.createElement("div");
            setCard.classList.add("set-card");
            const logoUrl = set.logo
             ? `${set.logo}.png`
             : 'https://icon2.cleanpng.com/20180605/ijl/kisspng-computer-icons-image-file-formats-no-image-5b16ff0d2414b5.0787389815282337411478.jpg'

            setCard.innerHTML = `
            <div class="flex w-72 h-40 overflow-hidden bg-gray-100 rounded-lg shadow-lg py-2 px-3 gap-3">
              <div class="w-1/3 flex justify-center items-center">
                <img src="${logoUrl}" alt="${set.logo}.png Logo">
              </div>
              <div class="w-2/3 flex-col flex justify-between">
                <div>
                  <div class="flex justify-between gap-1 items-start">
                    <h1 class="text-lg font-bold text-gray-900">
                    ${set.name}
                    </h1>

                    <div class="flex justify-center items-center w-5 h-auto ${set.symbol ? '' : 'hidden'}">
                      <img src="${set.symbol}.png" alt="${set.name} Symbol">
                    </div>
                  </div>
                  <h2 class="text-gray-500 text-xs">Released on <span class="text-blue-500">24 Oct, 1999</span></h2>
                </div>
          

                <div class="">
                  <div class="w-full h-4 bg-gray-400 rounded-lg mt-3">
                    <div class="w-3/4 h-full text-center text-xs text-white bg-blue-500 rounded-lg text-xs">
                        30/${set.cardCount.total}
                    </div>
                  </div>
                </div>
                
                <a href="/expansions/${set.id}" class="px-3 py-2 text-xs text-center font-bold text-white uppercase bg-blue-600 rounded hover:bg-blue-700">
                  View Details
                </a>
              </div>
            </div>
                            `;
            setContainer.appendChild(setCard);
          });
        })
        .catch(error => console.error('Error fetching set details:', error));
    });
  })
  .catch(error => console.error('Error fetching series details:', error));