document.addEventListener("DOMContentLoaded", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("countrySelect");

      const sortedData = data
        .filter(
          (country) =>
            country.car && country.car.signs && country.car.signs.length > 0
        )
        .sort((a, b) =>
          a.name.common.localeCompare(b.name.common, "ro", {
            sensitivity: "base",
          })
        );

      sortedData.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.car.signs[0];
        option.textContent = `${country.name.common} (${country.car.signs[0]})`;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching country data:", error));
});
