// Get the card ID from somewhere (e.g., URL parameter)
const [setId, cardId] = window.location.pathname.split("/").slice(-2);
const tableContainer = document.getElementById('variantsContainer');

const queryParams = new URLSearchParams();
queryParams.append('card_id', cardId);
queryParams.append('set_id', setId);


const userData = fetch(`/user_card?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${yourAuthToken}` // Replace with your authentication token
    },
    params: JSON.stringify({
      card_id: cardId,
      set_id: setId, 
    })
  })
  .then(response => response.json())
  .then(async data => {
    const setData = await fetchSet();
    
    Object.entries(setData.variants)
            .filter(([_, hasVariant]) => hasVariant)
            .forEach(([variantName, _]) => createVariantRow(variantName, data));

        // Update card image source
        document.getElementById('card-img').src = `${setData.image}/high.webp`;
        // document.getElementById('set-icon').src = `${data.set.symbol}.png`;
        
  })

async function fetchSet() {
    return fetch(`https://api.tcgdex.net/v2/en/sets/${setId}/${cardId}`)
        .then(response => response.json())
}


const conditions = ['Mint', 'Near Mint', 'Lightly Played', 'Damaged'];

// Initialize table



// Function to create variant row
function createVariantRow(variant, userData) {
    const rowContainer = document.createElement('div');
    rowContainer.className = 'flex justify-between items-center p-2 border-b border-gray-200';

    const variantName = document.createElement('div');
    variantName.className = 'grid grid-cols-2 w-full';
    variantName.innerHTML = `
        <span>${variant}</span>
        <span class="monospace text-right mr-4" id="${variant}-total">0</span>
    `;

    const expandIcon = document.createElement('div');
    expandIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>';
    expandIcon.addEventListener('click', () => toggleExpand(variant));

    rowContainer.appendChild(variantName);
    rowContainer.appendChild(expandIcon);

    // Expandable Content
    const expandContent = document.createElement('div');
    expandContent.className = 'hidden bg-white p-4 col-span-2';
    expandContent.id = `${variant}-expandContent`;

    // Condition Rows
    conditions.forEach(condition => {
        const currentQuantity = userData?.data?.cards?.find(card => card.condition == condition && card.variant == variant)?.quantity || 0;
        const conditionRow = document.createElement('div');
        conditionRow.className = 'flex justify-between items-center p-2';
        conditionRow.innerHTML = `
            <span>${condition}</span>
            <div class="flex items-center justify-between w-20">
                <button class="bg-blue-500 w-6 h-6 text-sm text-white font-bold rounded" onclick="updateQuantity('${variant}', '${condition}', -1)">-</button>
                <span id="${variant}-${condition}">${currentQuantity}</span>
                <button class="bg-blue-500 w-6 h-6 text-sm text-white font-bold rounded" onclick="updateQuantity('${variant}', '${condition}', 1)">+</button>
            </div>
        `;
        expandContent.appendChild(conditionRow);
    });

    tableContainer.appendChild(rowContainer);
    tableContainer.appendChild(expandContent);
    updateTotal(variant)
}

// Function to toggle expand
function toggleExpand(variant) {
    const expandContent = document.getElementById(`${variant}-expandContent`);
    expandContent.classList.toggle('hidden');
}


// Function to update total quantity for a variant
function updateTotal(variant) {
    const totalElement = document.getElementById(`${variant}-total`);
    let totalQuantity = 0;

    conditions.forEach(condition => {
        const quantityElement = document.getElementById(`${variant}-${condition}`);
        totalQuantity += parseInt(quantityElement.innerText, 10);
    });

    totalElement.innerText = totalQuantity;
}

async function updateQuantity(variant, condition, change) {
    const quantityElement = document.getElementById(`${variant}-${condition}`);
    const originalQuantity = parseInt(quantityElement.innerText, 10);
    const updatedQuantity = originalQuantity + change;

    try {
      const response = await fetch('/user_card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${yourAuthToken}` // Replace with your authentication token
        },
        body: JSON.stringify({
          card_id: cardId,
          set_id: setId, 
          variant: variant,
          condition: condition,
          quantity: updatedQuantity
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
        quantityElement.innerText = result.data.quantity;
        updateTotal(variant)
        // Update your UI or do something else on success
      } else {
        console.error(result.error || result.message);
        // Handle errors or display an error message to the user
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle network errors or other exceptions
    }
  }
