document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("guestform");
    const guestNameInput = document.getElementById("guestName");
    const timeInput = document.getElementById("time");
    const categorySelect = document.getElementById("type");
    const guestList = document.getElementById("guestList");
  
    let guestCounter = 1;
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const guestName = guestNameInput.value.trim();
      const guestTime = timeInput.value;
      const guestCategory = categorySelect.value;
  
      if (!guestName || !guestTime || guestCategory === "Guest Category") {
        alert("Please fill in all fields and select a valid category.");
        return;
      }
  
      // Create table row
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-6 py-4">${guestCounter++}</td>
        <td class="px-6 py-4 font-semibold text-gray-900">${guestName} <span class="text-sm text-gray-500">(${guestCategory})</span></td>
        <td class="px-6 py-4">${new Date(guestTime).toLocaleString()}</td>
      `;
  
      guestList.appendChild(row);
  
      // Clear form
      guestNameInput.value = "";
      timeInput.value = "";
      categorySelect.selectedIndex = 0;
    });
  });
  