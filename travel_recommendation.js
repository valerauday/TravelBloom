document.querySelector(".search-btn").addEventListener("click", function () {
  const searchInput = document
    .querySelector(".navbar-search input")
    .value.toLowerCase();
  searchRecommendations(searchInput);
});

// Event listener for the clear button
document.querySelector(".clear-btn").addEventListener("click", function () {
    clearSearch();
  });

function searchRecommendations(keyword) {
  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredResults = [];

      // Search in countries
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(keyword)) {
            filteredResults.push(city);
          }
        });
      });

      // Search in temples
      data.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(keyword)) {
          filteredResults.push(temple);
        }
      });

      // Search in beaches
      data.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(keyword)) {
          filteredResults.push(beach);
        }
      });

      console.log(filteredResults); // Log the filtered results to check what matches the keyword
      displayRecommendations(filteredResults);
    })
    .catch((error) => console.error("Error fetching recommendations:", error));
}

function displayRecommendations(recommendations) {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = '';  // Clear previous suggestions

    if (recommendations.length === 0) {
        suggestionBox.style.display = 'none';  // Hide if no results
        return;
    }

    suggestionBox.style.display = 'block';  // Show suggestion box

    recommendations.forEach(recommendation => {
        const suggestionHTML = `
            <div class="suggestion-item">
                <img src="${recommendation.imageUrl}" alt="${recommendation.name}" class="suggestion-image"/>
                <div class="suggestion-text">
                    <strong class="suggestion-name">${recommendation.name}</strong>
                    <p class="suggestion-description">${recommendation.description}</p>
                </div>
            </div>
        `;
        suggestionBox.innerHTML += suggestionHTML;
    });
}

// Function to clear the search input and hide the suggestion box
function clearSearch() {
    const searchInput = document.querySelector(".navbar-search input");
    searchInput.value = '';  // Clear the input field
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = '';  // Clear the suggestion box content
    suggestionBox.style.display = 'none';  // Hide the suggestion box
  }