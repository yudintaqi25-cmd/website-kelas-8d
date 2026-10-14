
document.addEventListener("DOMContentLoaded", function () {
  // =====================================
  // 1. NAVIGASI
  // =====================================
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const backToTop = document.getElementById("back-to-top");

  function bukaHalaman(nama) {
    const tujuan = document.getElementById("page-" + nama);
    if (!tujuan) return;

    pages.forEach(function (page) {
      page.classList.toggle("active", page === tujuan);
    });

    navLinks.forEach(function (link) {
      const aktif = link.dataset.page === nama;
      link.classList.toggle("active", aktif);
      link.setAttribute("aria-current", aktif ? "page" : "false");
    });

    if (navMenu) navMenu.classList.remove("open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      bukaHalaman(link.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach(function (button) {
    button.addEventListener("click", function () {
      bukaHalaman(button.dataset.go);
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
  const jadwal = {
    Senin: ["Upacara / Wali Kelas", "Bahasa Indonesia", "Matematika", "Bahasa Inggris", "IPA"],
    Selasa: ["Matematika", "IPS", "Bahasa Indonesia", "IPA", "PJOK"],
    Rabu: ["Bahasa Inggris", "IPA", "Matematika", "PPKn", "Seni Budaya"],
    Kamis: ["Bahasa Indonesia", "IPS", "Bahasa Inggris", "Informatika", "Agama"],
    Jumat: ["Kegiatan Keagamaan", "PJOK", "Matematika", "Bahasa Indonesia"],
    Sabtu: ["Pramuka / Kegiatan Sekolah", "Kegiatan Kelas"]
  };

  const scheduleTabs = document.getElementById("schedule-tabs");
  const scheduleTitle = document.getElementById("schedule-title");
  const scheduleBody = document.getElementById("schedule-body");

  function tampilkanJadwal(hari) {
    if (!scheduleTitle || !scheduleBody) return;

    scheduleTitle.textContent = "📚 Jadwal Hari " + hari;
    scheduleBody.replaceChildren();

    (jadwal[hari] || []).forEach(function (mapel, index) {
      const baris = document.createElement("div");
      baris.className = "schedule-item";

      const waktu = document.createElement("span");
      waktu.className = "schedule-time";
      waktu.textContent = "Pelajaran " + (index + 1);

      const nama = document.createElement("span");
      nama.className = "schedule-subject";
      nama.textContent = mapel;

      const emoji = document.createElement("span");
      emoji.textContent = ["🐠", "🐬", "🐙", "🪼", "🐚"][index % 5];

      baris.append(waktu, nama, emoji);
      scheduleBody.appendChild(baris);
    });
  }

  if (scheduleTabs) {
    scheduleTabs.querySelectorAll("[data-day]").forEach(function (button) {
      button.addEventListener("click", function () {
        scheduleTabs.querySelectorAll("[data-day]").forEach(function (tab) {
          tab.classList.toggle("active", tab === button);
        });
        tampilkanJadwal(button.dataset.day);
      });
    });
  }

  // =====================================
  // 3. JADWAL PIKET
  // =====================================
  const piket = {
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
  const emojiLaut = ["🐠", "🐟", "🐡", "🦀", "🐙", "🪼", "🐚", "🦈", "🐬", "🦑", "🪸", "⭐"];

  function tampilkanPiket(hari) {
    if (!piketTitle || !daftarPiket) return;

    piketTitle.textContent = "🌊 Petugas Piket " + hari;
    daftarPiket.replaceChildren();

    (piket[hari] || []).forEach(function (nama, index) {
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
    piketTabs.querySelectorAll("[data-piket]").forEach(function (button) {
      button.addEventListener("click", function () {
        piketTabs.querySelectorAll("[data-piket]").forEach(function (tab) {
          tab.classList.toggle("active", tab === button);
        });
        tampilkanPiket(button.dataset.piket);
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
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(data)) daftarTugas = data;
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

    const belum = daftarTugas.filter(function (t) {
      return !t.selesai;
    }).length;

    taskSummary.textContent = "📝 " + belum + " tugas belum selesai dari " + daftarTugas.length + " tugas.";

    if (daftarTugas.length === 0) {
      const pesan = document.createElement("p");
      pesan.textContent = "🐚 Belum ada tugas. Tambahkan tugas di atas!";
      taskList.appendChild(pesan);
      return;
    }

    daftarTugas.forEach(function (tugas) {
      const item = document.createElement("div");
      item.className = "task-item";
      if (tugas.selesai) item.classList.add("completed");

      const info = document.createElement("div");
      info.className = "task-info";

      const nama = document.createElement("strong");
      nama.textContent = tugas.nama;

      const detail = document.createElement("p");
      detail.textContent = tugas.mapel + (tugas.tanggal ? " • Batas: " + tugas.tanggal : "");
      info.append(nama, detail);

      const cek = document.createElement("input");
      cek.type = "checkbox";
      cek.checked = Boolean(tugas.selesai);
      cek.setAttribute("aria-label", "Tandai tugas selesai");
      cek.addEventListener("change", function () {
        tugas.selesai = cek.checked;
        simpanTugas();
        renderTugas();
      });

      const hapus = document.createElement("button");
      hapus.type = "button";
      hapus.className = "btn-delete";
      hapus.textContent = "🗑️";
      hapus.setAttribute("aria-label", "Hapus tugas");
      hapus.addEventListener("click", function () {
        daftarTugas = daftarTugas.filter(function (t) {
          return t.id !== tugas.id;
        });
        simpanTugas();
        renderTugas();
      });

      item.append(info, cek, hapus);
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
      daftarTugas = daftarTugas.filter(function (t) {
        return !t.selesai;
      });
      simpanTugas();
      renderTugas();
    });
  }

  // =====================================
  // 5. KEMBALI KE ATAS
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
  // 6. MULAI
  // =====================================
  tampilkanJadwal("Senin");
  tampilkanPiket("Senin");
  renderTugas();

  console.log("KELAS 8D: JavaScript berhasil dijalankan!");
});
