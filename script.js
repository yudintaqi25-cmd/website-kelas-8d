/* =========================================
   KELAS 8D — JAVASCRIPT LENGKAP
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const backToTop = document.getElementById("back-to-top");

  // =====================================
  // 1. NAVIGASI MENU
  // =====================================

  function bukaHalaman(nama) {
    const halamanTujuan = document.getElementById("page-" + nama);

    if (!halamanTujuan) return;

    pages.forEach(function (halaman) {
      halaman.classList.toggle("active", halaman === halamanTujuan);
    });

    navLinks.forEach(function (tombol) {
      const aktif = tombol.dataset.page === nama;

      tombol.classList.toggle("active", aktif);
      tombol.setAttribute("aria-current", aktif ? "page" : "false");
    });

    navMenu?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  navLinks.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      bukaHalaman(tombol.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach(function (tombol) {
