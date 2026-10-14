
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
  // 1. NAVIGASI HALAMAN
  // =====================================

  function bukaHalaman(nama) {
    const halamanTujuan = document.getElementById("page-" + nama);

    if (!halamanTujuan) {
      console.warn("Halaman tidak ditemukan:", nama);
      return;
    }

    pages.forEach(function (halaman) {
      halaman.classList.toggle("active", halaman === halamanTujuan);
    });

    navLinks.forEach(function (tombol) {
      const aktif = tombol.dataset.page === nama;

      tombol.classList.toggle("active", aktif);
      tombol.setAttribute("aria-current", aktif ? "page" : "false");
    });

    if (navMenu) navMenu.classList.remove("open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      bukaHalaman(tombol.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      bukaHalaman(tombol.dataset.go);
    });
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const terbuka = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(terbuka));
    });
  }

  // =====================================
  // 2. JADWAL PELAJARAN
  // =====================================

  const jadwalPelajaran = {
    Senin: [
      ["07.00 - 08.00", "Upacara / Wali Kelas"],
      ["08.00 - 09.00", "Bahasa Indonesia"],
      ["09.00 - 10.00", "Matematika"],
      ["10.15 - 11.15", "Bahasa Inggris"],
      ["11.15 - 12.00", "IPA"]
    ],
    Selasa: [
      ["07.00 - 08.00", "Matematika"],
      ["08.00 - 09.00", "IPS"],
      ["09.00 - 10.00", "Bahasa Indonesia"],
      ["10.15 - 11.15", "IPA"],
      ["11.15 - 12.00", "PJOK"]
    ],
    Rabu: [
      ["07.00 - 08.00", "Bahasa Inggris"],
      ["08.00 - 09.00", "IPA"],
      ["09.00 - 10.00", "Matematika"],
      ["10.15 - 11.15", "PPKn"],
      ["11.15 - 12.00", "Seni Budaya"]
    ],
    Kamis: [
      ["07.00 - 08.00", "Bahasa Indonesia"],
      ["08.00 - 09.00", "IPS"],
      ["09.00 - 10.00", "Bahasa Inggris"],
      ["10.15 - 11.15", "Informatika"],
      ["11.15 - 12.00", "Agama"]
    ],
    Jumat: [
      ["07.00 - 08.00", "Kegiatan Keagamaan"],
      ["08.00 - 09.00", "PJOK"],
      ["09.00 - 10.00", "Matematika"],
      ["10.15 - 11.00", "Bahasa Indonesia"]
    ],
    Sabtu: [
      ["07.00 - 08.00", "Pramuka / Kegiatan Sekolah"],
      ["08.00 - 09.00", "Kegiatan Kelas"]
    ]
  };

  const scheduleTabs = document.getElementById("schedule-tabs");
  const scheduleTitle = document.getElementById("schedule-title");
  const scheduleBody = document.getElementById("schedule-body");

  function tampilkanJadwal(hari) {
    if (!scheduleTitle || !scheduleBody) return;

    scheduleTitle.textContent = "📚 Jadwal Hari " + hari;
    scheduleBody.replaceChildren();

    const daftar = jadwalPelajaran[hari] || [];

    if (daftar.length === 0) {
      scheduleBody.textContent = "Jadwal belum tersedia.";
      return;
    }

    daftar.forEach(function (item, index) {
      const baris = document.createElement("div");
      baris.className = "schedule-item";

      const waktu = document.createElement("span");
      waktu.className = "schedule-time";
      waktu.textContent = item[0];

      const pelajaran = document.createElement("span");
      pelajaran.className = "schedule-subject";
      pelajaran.textContent = item[1];

      const ikon = document.createElement("span");
      ikon.textContent = ["🐠", "🐬", "🐙", "🪼", "🐚"][index % 5];

      baris.append(waktu, pelajaran, ikon);
      scheduleBody.appendChild(baris);
    });
  }

  if (scheduleTabs) {
    scheduleTabs.querySelectorAll("[data-day]").forEach(function (tombol) {
      tombol.addEventListener("click", function () {
        scheduleTabs.querySelectorAll("[data-day]").forEach(function (tab) {
          tab.classList.toggle("active", tab === tombol);
        });

        tampilkanJadwal(tombol.dataset.day);
      });
    });
  }

  // =====================================
  // 3. JADWAL PIKET
  // =====================================

  const jadwalPiket = {
    Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
    Selasa: ["Nama Petugas 1", "Nama Petugas 2", "Nama Petugas 3"],
    Rabu: ["Nama Petugas 1", "Nama Petugas 2", "Nama Petugas 3"],
    Kamis: ["Nama Petugas 1", "Nama Petugas 2", "Nama Petugas 3"],
    Jumat: ["Nama Petugas 1", "Nama Petugas 2", "Nama Petugas 3"],
    Sabtu: ["Nama Petugas 1", "Nama Petugas 2", "Nama Petugas 3"]
  };

  const piketTabs = document.getElementById("piket-tabs");
  const piketTitle = document.getElementById("piket-title");
  const daftarPiket = document.getElementById("daftar-piket");

  const emojiLaut = [
    "🐠", "🐟", "🐡", "🦀", "🐙",
    "🪼", "🐚", "🦈", "🐬", "🦑", "🪸", "⭐"
  ];

  function tampilkanPiket(hari) {
    if (!piketTitle || !daftarPiket) return;

    piketTitle.textContent = "🌊 Petugas Piket " + hari;
    daftarPiket.replaceChildren();

    const petugas = jadwalPiket[hari] || [];

    if (petugas.length === 0) {
      const pesan = document.createElement("li");
      pesan.textContent = "Petugas belum ditentukan.";
      daftarPiket.appendChild(pesan);
      return;
    }

    petugas.forEach(function (nama, index) {
      const item = document.createElement("li");
      item.className = "piket-item";

      const emoji = document.createElement("span");
      emoji.className = "piket-emoji";
      emoji.textContent = emojiLaut[index % emojiLaut.length];

      const nomor = document.createElement("span");
      nomor.className = "piket-number";
      nomor.textContent = String(index + 1);

      const namaPetugas = document.createElement("span");
      namaPetugas.className = "piket-name";
      namaPetugas.textContent = nama;

      item.append(emoji, nomor, namaPetugas);
      daftarPiket.appendChild(item);
    });
  }

  if (piketTabs) {
    piketTabs.querySelectorAll("[data-piket]").forEach(function (tombol) {
      tombol.addEventListener("click", function () {
        piketTabs.querySelectorAll("[data-piket]").forEach(function (tab) {
          tab.classList.toggle("active", tab === tombol);
        });

        tampilkanPiket(tombol.dataset.piket);
      });
    });
  }

  // =====================================
  // 4. DAFTAR TUGAS
  // =====================================

  const taskForm = document.getElementById("task-form");
  const taskName = document.getElementById("task-name");
  const taskSubject = document.getElementById("task-subject");
  const taskDate = document.getElementById("task-date");
  const taskSummary = document.getElementById("task-summary");
  const taskList = document.getElementById("task-list");
  const clearCompleted = document.getElementById("clear-completed");

  const storageKey = "kelas8d_tugas_v1";
  let daftarTugas = [];

  try {
    const tersimpan = localStorage.getItem(storageKey);
    if (tersimpan) {
      const hasil = JSON.parse(tersimpan);
      if (Array.isArray(hasil)) daftarTugas = hasil;
    }
  } catch (error) {
    console.warn("Data tugas tidak dapat dibaca.", error);
  }

  function simpanTugas() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(daftarTugas));
    } catch (error) {
      console.warn("Data tugas tidak dapat disimpan.", error);
    }
  }

  function renderTugas() {
    if (!taskList || !taskSummary) return;

    taskList.replaceChildren();

    const belumSelesai = daftarTugas.filter(function (tugas) {
      return !tugas.selesai;
    }).length;

    taskSummary.textContent =
      "📝 " + belumSelesai + " tugas belum selesai dari " +
      daftarTugas.length + " tugas.";

    if (daftarTugas.length === 0) {
      const pesan = document.createElement("p");
      pesan.textContent = "🐚 Belum ada tugas. Tambahkan tugas di atas!";
      taskList.appendChild(pesan);
      return;
    }

    daftarTugas.forEach(function (tugas) {
      const item = document.createElement("div");
      item.className = "task-item";

      const informasi = document.createElement("div");
      informasi.className = "task-info";

      const nama = document.createElement("strong");
      nama.textContent = tugas.nama;

      const detail = document.createElement("p");
      detail.textContent = tugas.mapel +
        (tugas.tanggal ? " • Batas: " + tugas.tanggal : "");

      informasi.append(nama, detail);

      const selesai = document.createElement("input");
      selesai.type = "checkbox";
      selesai.checked = Boolean(tugas.selesai);
      selesai.setAttribute("aria-label", "Tandai tugas selesai");

      selesai.addEventListener("change", function () {
        tugas.selesai = selesai.checked;
        simpanTugas();
        renderTugas();
      });

      const hapus = document.createElement("button");
      hapus.type = "button";
      hapus.className = "btn-delete";
      hapus.textContent = "🗑️";
      hapus.setAttribute("aria-label", "Hapus tugas");

      hapus.addEventListener("click", function () {
        daftarTugas = daftarTugas.filter(function (itemTugas) {
          return itemTugas.id !== tugas.id;
        });

        simpanTugas();
        renderTugas();
      });

      if (tugas.selesai) item.classList.add("completed");

      item.append(informasi, selesai, hapus);
      taskList.appendChild(item);
    });
  }

  if (taskForm) {
    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nama = taskName.value.trim();
      const mapel = taskSubject.value.trim();

      if (!nama || !mapel) {
        alert("Isi nama tugas dan mata pelajaran terlebih dahulu.");
        return;
      }

      daftarTugas.push({
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        nama: nama,
        mapel: mapel,
        tanggal: taskDate ? taskDate.value : "",
        selesai: false
      });

      simpanTugas();
      renderTugas();
      taskForm.reset();
    });
  }

  if (clearCompleted) {
    clearCompleted.addEventListener("click", function () {
      daftarTugas = daftarTugas.filter(function (tugas) {
        return !tugas.selesai;
      });

      simpanTugas();
      renderTugas();
    });
  }

  // =====================================
  // 5. TOMBOL KEMBALI KE ATAS
  // =====================================

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =====================================
  // 6. JALANKAN SAAT HALAMAN DIBUKA
  // =====================================

  tampilkanJadwal("Senin");
  tampilkanPiket("Senin");
  renderTugas();

  console.log("KELAS 8D: JavaScript berhasil dijalankan!");
});
