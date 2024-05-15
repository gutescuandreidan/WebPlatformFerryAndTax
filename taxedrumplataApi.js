document.addEventListener("DOMContentLoaded", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const billingCountry = document.getElementById("billingCountry");

      // Sort the data alphabetically by country name using localeCompare with Romanian locale
      const sortedData = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common, "ro", {
          sensitivity: "base",
        })
      );

      // Create and append option elements for each country
      sortedData.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        billingCountry.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching country data:", error));
});
