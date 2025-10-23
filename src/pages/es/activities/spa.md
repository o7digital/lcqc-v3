---
title: "Spa by Clarins"
description: "El único spa Clarins en México"
layout: "@layouts/LayoutOneCol.astro"
justifyText: true
showBack: false
items:
- image: "/activities/spabyclarins.jpg"
- image: "/activities/spa-1.jpg"
- image: "/activities/spa-2.jpg"
- image: "/activities/spa-3.jpg"
- image: "/activities/spa-4.jpg"
- image: "/activities/spa-5.jpg"
---
<div class="grid gap-6">
  <p>Entre el mar y el cielo, descubre un santuario de serenidad donde el arte del cuidado según Clarins revela su máxima expresión. Cada tratamiento combina el poder de los extractos naturales de plantas con el toque experto característico de Clarins, creando una experiencia que nutre el cuerpo, la mente y el espíritu.</p>
  <p>Un momento de armonía absoluta, inspirado por el océano y diseñado exclusivamente para La Casa Que Canta.</p>
  <p class="text-xl font-bold">Lunes a domingo — 10:00 – 18:00 hrs.</p>
  <div class="flex flex-wrap mt-8 gap-4 justify-center">
    <div class="relative">
      <a href="/menu_spa.pdf" target="_blank" class="bg-black/90 font-semibold uppercase py-3 px-6 text-white hover:bg-black/60">Tratamientos de Spa</a>
    </div>
    <div class="relative mt-6 md:mt-0">
      <a href="#" id="spaReservationBtn" onclick="document.getElementById('spaReservationPopup').classList.remove('hidden'); return false;" class="bg-black/90 font-semibold uppercase py-3 px-6 text-white hover:bg-black/60">Reservar Spa</a>
    </div>
  </div>
</div>

<!-- Popup de Reservación de Spa (ES) -->
<div id="spaReservationPopup" class="hidden fixed z-50 inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" onclick="if(event.target===this){this.classList.add('hidden');}">
  <div class="relative top-20 mx-auto p-5 border -mt-8 max-w-4xl shadow-lg rounded-md bg-white">
    <div class="mt-3 text-center ">
      <h3 class="text-3xl  md:text-5xl leading-6  font-bold">Reserva tu tratamiento de Spa</h3>
      <button onclick="document.getElementById('spaReservationPopup').classList.add('hidden')" class="absolute right-4 top-4 text-black/70 hover:text-black">✕</button>
      <div class="mt-2 px-7 py-3">
        <p class="text-sm md:text-base max-w-xl mx-auto text-balance mb-4 text-black/90">
          Las reservas en línea están disponibles hasta con 24 horas de anticipación. Para reservas el mismo día, por favor llámanos: <a href="tel:+527555557030">+52 755 555 7030</a>.
        </p>
        <form id="spaReservationForm" action="https://formsubmit.co/olivier.steineur@icloud.com" method="POST" class="space-y-4 max-w-3xl mx-auto">
          <input type="hidden" name="_subject" value="Reserva Spa - Sitio web">
          <input type="hidden" name="_template" value="table">
          <input type="hidden" name="_captcha" value="false">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="text-base text-left font-medium text-black/90 block">Nombre</label>
              <input type="text" id="firstName" placeholder="Nombre" name="firstName" required class="border border-black/60 p-2 w-full text-gray-500">
            </div>
            <div>
              <label for="lastName" class="text-base text-left font-medium text-black/90 block">Apellidos</label>
              <input type="text" id="lastName" placeholder="Apellidos" name="lastName" required class="border border-black/60 p-2 w-full text-gray-500">
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="email" class="text-base text-left font-medium text-black/90 block">Correo electrónico</label>
              <input type="email" id="email" name="email" placeholder="Correo electrónico" required class="border border-black/60 p-2 w-full text-gray-500">
            </div>
            <div>
              <label for="phone" class="text-base text-left font-medium text-black/90 block">Teléfono</label>
              <input type="tel" id="phone" name="phone" placeholder="Teléfono" required class="border border-black/60 p-2 w-full text-gray-500">
            </div>
          </div>
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label for="guests" class="text-base text-left font-medium text-black/90 block">Huéspedes</label>
              <select id="guests" name="guests" required class="border border-black/60 p-2 w-full text-gray-500">
                <option value="">Seleccionar</option>
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
                <option value="10+">10+ más</option>
              </select>
            </div>
            <div>
              <label for="hours" class="text-base text-left font-medium text-black/90 block">Horas</label>
              <select id="hours" name="hours" required class="border border-black/60 p-2 w-full text-gray-500">
                <option value="">Seleccionar</option>
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
              <label for="date" class="text-base text-left font-medium text-black/90 block">Fecha</label>
              <input type="date" id="date" name="date" required class="border border-black/60 p-2 w-full text-gray-500">
            </div>
          </div>
          <div>
            <label for="message" class="text-base text-left font-medium text-black/90 block">Mensaje</label>
            <textarea id="message" name="message" rows="3" class="border border-black/60 p-2 w-full text-gray-500"></textarea>
          </div>
          <button type="submit" class="bg-black/90 font-semibold uppercase py-3 px-6 text-white hover:bg-black/60">
            Reservar tu sesión de spa
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
      openButton.addEventListener('click', (e) => { e.preventDefault(); popup.classList.remove('hidden'); });
    }
    // dejar que el formulario envíe normalmente al backend de email
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initSpaReservation); } else { initSpaReservation(); }
</script>
