document.addEventListener("DOMContentLoaded", () => {
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
        option.value = country.name.common;
        option.textContent = country.name.common;
        billingCountry.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching country data:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("clientPassword");
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    togglePasswordIcon.classList.toggle("fa-eye");
    togglePasswordIcon.classList.toggle("fa-eye-slash");
  });
});
