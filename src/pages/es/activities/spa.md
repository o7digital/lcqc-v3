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
<!-- Spa Reservation Popup -->
<div id="spaReservationPopup" class="hidden fixed z-50 inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full" onclick="if(event.target===this){this.classList.add('hidden');}">
  <div class="relative top-20 mx-auto p-5 border -mt-8 max-w-4xl shadow-lg rounded-md bg-white">
    <div class="mt-3 text-center ">
      <h3 class="text-3xl  md:text-5xl leading-6  font-bold">Reserva tu tratamiento de Spa</h3>
      <button onclick="document.getElementById('spaReservationPopup').classList.add('hidden')" class="absolute right-4 top-4 text-black/70 hover:text-black">✕</button>
      <div class="mt-2 px-7 py-3">
        <p class="text-sm md:text-base max-w-xl mx-auto text-balance mb-4 text-black/90">
          Las reservas en línea están disponibles hasta con 24 horas de anticipación. Para reservas el mismo día, por favor llámanos: <a href="tel:+527555557030">+52 755 555 7030</a>.
        </p>
        <form id="spaReservationForm" class="space-y-4  max-w-3xl mx-auto">
  <div class="grid md:grid-cols-2 gap-4">
