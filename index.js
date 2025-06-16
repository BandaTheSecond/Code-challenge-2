document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("guestform");
    const guestNameInput = document.getElementById("guestName");
    const timeInput = document.getElementById("time");
    const categorySelect = document.getElementById("type");
    const guestList = document.getElementById("guestList");
  //assign guests numbers incrementally
    let guestCounter = 1;
  //will handle form submission and prevent the default action of the page from reloading
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Check current number of guests to ensure limit is not exceeded 
      const currentGuests = guestList.getElementsByTagName("tr").length;
      if (currentGuests >= 10) {
        alert("Guest limit reached. You can only add up to 10 guests.");
        return;
      }
  
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
        <td class="px-6 py-4">${guestCounter}</td>
        <td class="px-6 py-4 font-semibold text-gray-900">
          ${guestName} <span class="text-sm text-gray-500">(${guestCategory})</span>
        </td>
        <td class="px-6 py-4">${new Date(guestTime).toLocaleString()}</td>
        <td class="px-6 py-4">
          <span class="rsvp-status text-green-600 font-medium">Attending</span>
        </td>
        <td class="px-6 py-4 space-x-2">
          <button class="toggle-rsvp text-blue-500 hover:underline">Toggle RSVP</button>
          <button class="delete-btn text-red-500 hover:underline">Remove</button>
        </td>
      `;
  
      guestList.appendChild(row);
      guestCounter++;
  
      // Clear form
      guestNameInput.value = "";
      timeInput.value = "";
      categorySelect.selectedIndex = 0;
    });
  
    // Handle delete and RSVP toggle via event delegation
    guestList.addEventListener("click", function (event) {
      const target = event.target;
  
      // Remove guest row
      if (target.classList.contains("delete-btn")) {
        const row = target.closest("tr");
        row.remove();
        updateGuestNumbers();
      }
  
      // Toggle RSVP status
      if (target.classList.contains("toggle-rsvp")) {
        const row = target.closest("tr");
        const rsvpSpan = row.querySelector(".rsvp-status");
  
        if (rsvpSpan.textContent === "Attending") {
          rsvpSpan.textContent = "Not Attending";
          rsvpSpan.classList.remove("text-green-600");
          rsvpSpan.classList.add("text-red-600");
        } else {
          rsvpSpan.textContent = "Attending";
          rsvpSpan.classList.remove("text-red-600");
          rsvpSpan.classList.add("text-green-600");
        }
      }
    });
  
    // Re-number guests after a deletion
    function updateGuestNumbers() {
      const rows = guestList.querySelectorAll("tr");
      guestCounter = 1;
      rows.forEach((row) => {
        row.cells[0].textContent = guestCounter++;
      });
    }
  });
  