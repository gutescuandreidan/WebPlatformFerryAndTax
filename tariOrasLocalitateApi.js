document.addEventListener("DOMContentLoaded", () => {
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhbmRyZWlndXRlc2N1MjFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoibUpWZGZyYzl4MEx6azJYLXhFOXQ0dzVtc2Q3SUl1U1hveHB5a0VYLTdvY0IxOU52Z01VcmRBeVBBRVpFSy1WS0cxVSJ9LCJleHAiOjE3MTYxNDY2NTF9.EZFogR8m6KgX2yUHBUY-d2Qwo1NIvRoPVjlYSzQNSCg"; // Replace with your actual access token

  // Function to populate countries
  function populateCountries() {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const billingCountry = document.getElementById("billingCountry");
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common, "ro", {
            sensitivity: "base",
          })
        );
        sortedData.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.name.common; // Use country name for API calls
          option.textContent = country.name.common;
          billingCountry.appendChild(option);
        });

        billingCountry.addEventListener("change", function () {
          console.log("Country selected:", billingCountry.value);
          clearDropdown("billingCounty");
          clearDropdown("billingCity");
          populateCounties(billingCountry.value);
        });
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }

  // Function to populate counties
  function populateCounties(countryName) {
    console.log(`Fetching counties for country: ${countryName}`);
    fetch(`https://www.universal-tutorial.com/api/states/${countryName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Counties data:", data);
        const billingCounty = document.getElementById("billingCounty");
        clearDropdown("billingCounty");
        clearDropdown("billingCity");

        if (data.length === 0) {
          console.error("No counties data found.");
        }

        data.forEach((county) => {
          const option = document.createElement("option");
          option.value = county.state_name; // Ensure this matches the API response
          option.textContent = county.state_name;
          billingCounty.appendChild(option);
        });

        billingCounty.addEventListener("change", function () {
          console.log("County selected:", billingCounty.value);
          if (billingCounty.value === "Bucuresti") {
            sectors();
          } else {
            populateCities(billingCounty.value);
          }
        });
      })
      .catch((error) => console.error("Error fetching county data:", error));
  }

  // Function to populate cities
  function populateCities(countyName) {
    console.log(`Fetching cities for county: ${countyName}`);
    fetch(`https://www.universal-tutorial.com/api/cities/${countyName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cities data:", data);
        const billingCity = document.getElementById("billingCity");
        clearDropdown("billingCity");

        if (data.length === 0) {
          console.error("No cities data found.");
        }

        data.forEach((city) => {
          const option = document.createElement("option");
          option.value = city.city_name; // Ensure this matches the API response
          option.textContent = city.city_name;
          billingCity.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching city data:", error));
  }

  // Function to populate sectors for Bucuresti
  function sectors() {
    console.log("Sectors for Bucuresti");
    const sectors = [
      "Sector 1",
      "Sector 2",
      "Sector 3",
      "Sector 4",
      "Sector 5",
      "Sector 6",
    ];
    const billingCity = document.getElementById("billingCity");
    clearDropdown("billingCity");
    sectors.forEach((sector) => {
      const option = document.createElement("option");
      option.value = sector;
      option.textContent = sector;
      billingCity.appendChild(option);
    });
  }

  // Function to clear dropdown
  function clearDropdown(elementId) {
    const dropdown = document.getElementById(elementId);
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
    }
    const defaultOption = document.createElement("option");
    defaultOption.selected = true;
    defaultOption.textContent = "Alegeți";
    dropdown.appendChild(defaultOption);
  }

  // Initialize the process
  populateCountries();
});
