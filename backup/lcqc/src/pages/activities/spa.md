---
title: "Spa by clarins"
description: "See food from the diversity of Zihuatanejo’s coast"
layout: "@layouts/LayoutOneCol.astro"
items:
- image: "/activities/spabyclarins.jpg"
- image: "/activities/spa-1.jpg"
- image: "/activities/spa-2.jpg"
- image: "/activities/spa-3.jpg"
- image: "/activities/spa-4.jpg"
- image: "/activities/spa-5.jpg"


---

<div class="grid gap-6">
  <p>The only Clarins spa in Mexico</p>
  <p>Pamper yourself with the exclusive and world-renowned Clarins treatments.</p>
  <p class="text-xl font-bold">Monday through Sunday — 10:00 – 18:00 hrs.</p>
  <div class="flex flex-wrap mt-8 gap-4 justify-center">
    <div class="relative">
      <a href="/menu_spa.pdf" target="_blank" class="bg-black/90 font-semibold uppercase py-3 px-6 text-white hover:bg-black/60">Spa Treatments</a>
    </div>
    <div class="relative mt-6 md:mt-0">
      <a href="#" id="spaReservationBtn" class="bg-black/90 font-semibold uppercase py-3 px-6 text-white hover:bg-black/60">Spa reservation</a>
    </div>
  </div>
</div>

<!-- Spa Reservation Popup -->
<div id="spaReservationPopup" class="hidden fixed  z-20 inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full">
  <div class="relative top-20 mx-auto p-5 border -mt-8 max-w-4xl shadow-lg rounded-md bg-white">
    <div class="mt-3 text-center ">
      <h3 class="text-3xl  md:text-5xl leading-6  font-bold">Book your Spa treatment</h3>
      <div class="mt-2 px-7 py-3">
        <p class="text-sm md:text-base max-w-xl mx-auto text-balance mb-4 text-black/90">
          Online reservations are available until 24 hours in advance. For same day reservations please call us: <a href="tel:+527555557030">+52 755 555 7030</a>.
        </p>
        <form id="spaReservationForm" class="space-y-4  max-w-3xl mx-auto">
  <div class="grid md:grid-cols-2 gap-4">
    <div>
      <label for="firstName" class="text-base text-left font-medium text-black/90 block">First name</label>
      <input type="text" id="firstName" placeholder="First Name" name="firstName" required class="border border-black/60 p-2 w-full text-gray-500">
    </div>
    <div>
      <label for="lastName" class="text-base text-left font-medium text-black/90 block">Last name</label>
      <input type="text" id="lastName" name="lastName" required class="border border-black/60 p-2 w-full text-gray-500">
    </div>
  </div>
  
  <div class="grid md:grid-cols-2 gap-4">
    <div>
      <label for="email" class="text-base text-left font-medium text-black/90 block">Email</label>
      <input type="email" id="email" name="email" required class="border border-black/60 p-2 w-full text-gray-500">
    </div>
    <div>
      <label for="phone" class="text-base text-left font-medium text-black/90 block">Phone number</label>
      <input type="tel" id="phone" name="phone" required class="border border-black/60 p-2 w-full text-gray-500">
    </div>
  </div>
  
  <div class="grid md:grid-cols-3 gap-4">
    <div>
      <label for="guests" class="text-base text-left font-medium text-black/90 block">Guests Numbers</label>
      <select id="guests" name="guests" required class="border border-black/60 p-2 w-full text-gray-500">
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="10+">10+ more</option>
      </select>
    </div>
    <div>
      <label for="hours" class="text-base text-left font-medium text-black/90 block">Hours</label>
      <select id="hours" name="hours" required class="border border-black/60 p-2 w-full text-gray-500">
        <option value="">Select</option>
        <option value="10">10 h</option>
        <option value="11">11 h</option>
        <option value="12">12 h</option>
        <option value="13">13 h</option>
        <option value="14">14 h</option>
        <option value="15">15 h</option>
        <option value="16">16 h</option>
        <option value="17">17 h</option>
        <option value="18">18 h</option>
      </select>
    </div>
    <div>
      <label for="date" class="text-base text-left font-medium text-black/90 block">Date</label>
      <input type="date" id="date" name="date" required class="border border-black/60 p-2 w-full text-gray-500">
    </div>
  </div>
  
  <div>
    <label for="message" class="text-base text-left font-medium text-black/90 block">Message</label>
    <textarea id="message" name="message" rows="3" class="border border-black/60 p-2 w-full text-gray-500"></textarea>
  </div>
  
  <button type="submit" class="bg-black/90 font-semibold uppercase py-3 px-6 text-white hover:bg-black/60">
    Book your spa session
  </button>
</form>
      </div>
    </div>
  </div>
</div>

<script>
  function initSpaReservation() {
    const popup = document.getElementById("spaReservationPopup");
    const openButton = document.getElementById("spaReservationBtn");
    const form = document.getElementById("spaReservationForm");

    if (openButton) {
      openButton.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.remove('hidden');
      });
    }

    if (popup) {
      popup.addEventListener('click', (e) => {
        if (e.target === popup) {
          popup.classList.add('hidden');
        }
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log("Form submitted");
        popup.classList.add('hidden');
      });
    }
  }

  // Run the initialization function when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpaReservation);
  } else {
    initSpaReservation();
  }
</script>


