
/* ==========================================
   KELAS 8D - DUNIA BAWAH LAUT
   JavaScript lengkap
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // DATA JADWAL PELAJARAN
  // Silakan ubah sesuai jadwal sekolah.
  // ------------------------------
  const jadwalPelajaran = {
    Senin: [
      ["07.00 - 07.40", "Upacara / Wali Kelas"],
      ["07.40 - 08.20", "Matematika"],
      ["08.20 - 09.00", "Bahasa Indonesia"],
      ["09.00 - 09.20", "Istirahat"],
      ["09.20 - 10.00", "IPA"],
      ["10.00 - 10.40", "Bahasa Inggris"]
    ],
    Selasa: [
      ["07.00 - 07.40", "Bahasa Indonesia"],
      ["07.40 - 08.20", "Matematika"],
      ["08.20 - 09.00", "IPS"],
      ["09.00 - 09.20", "Istirahat"],
      ["09.20 - 10.00", "Bahasa Inggris"],
      ["10.00 - 10.40", "PJOK"]
    ],
    Rabu: [
      ["07.00 - 07.40", "IPA"],
      ["07.40 - 08.20", "Bahasa Inggris"],
      ["08.20 - 09.00", "Matematika"],
      ["09.00 - 09.20", "Istirahat"],
      ["09.20 - 10.00", "IPS"],
      ["10.00 - 10.40", "Informatika"]
    ],
    Kamis: [
      ["07.00 - 07.40", "Matematika"],
      ["07.40 - 08.20", "Bahasa Indonesia"],
      ["08.20 - 09.00", "PPKn"],
      ["09.00 - 09.20", "Istirahat"],
      ["09.20 - 10.00", "IPA"],
      ["10.00 - 10.40", "Seni Budaya"]
    ],
    Jumat: [
      ["07.00 - 07.40", "Pendidikan Agama"],
      ["07.40 - 08.20", "Bahasa Indonesia"],
      ["08.20 - 09.00", "PJOK"],
      ["09.00 - 09.20", "Istirahat"],
      ["09.20 - 10.00", "Wali Kelas"]
    ],
    Sabtu: [
      ["07.00 - 07.40", "Kegiatan Sekolah"],
      ["07.40 - 08.20", "Prakarya"],
      ["08.20 - 09.00", "Pengembangan Diri"]
    ]
  };

  // ------------------------------
  // DATA PETUGAS PIKET
  // Nama mengikuti contoh yang kamu berikan.
  // Silakan sesuaikan hari lainnya.
  // ------------------------------
  const jadwalPiket = {
    Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
    Selasa: ["Nama siswa 1", "Nama siswa 2", "Nama siswa 3", "Nama siswa 4", "Nama siswa 5"],
    Rabu: ["Nama siswa 1", "Nama siswa 2", "Nama siswa 3", "Nama siswa 4", "Nama siswa 5"],
    Kamis: ["Nama siswa 1", "Nama siswa 2", "Nama siswa 3", "Nama siswa 4", "Nama siswa 5"],
    Jumat: ["Nama siswa 1", "Nama siswa 2", "Nama siswa 3", "Nama siswa 4", "Nama siswa 5"],
    Sabtu: ["Nama siswa 1", "Nama siswa 2", "Nama siswa 3", "Nama siswa 4", "Nama siswa 5"]
  };

  // Ikon laut yang berbeda untuk petugas piket.
  const ikonLaut = ["🐠", "🐡", "🐟", "🦀", "⭐", "🐚", "🪼", "🐬", "🦈", "🐙"];

  // ------------------------------
  // NAVIGASI HALAMAN
  // ------------------------------
  const halaman = document.querySelectorAll(".page");
  const tombolNavigasi = document.querySelectorAll("[data-page]");
  const tombolPindah = document.querySelectorAll("[data-go]");
  const menu = document.getElementById("nav-menu");
  const tombolMenu = document.getElementById("menu-toggle");

  function bukaHalaman(namaHalaman) {
    const target = document.getElementById(`page-${namaHalaman}`);

    if (!target) {
      console.warn(`Halaman "${namaHalaman}" tidak ditemukan.`);
      return;
    }

    halaman.forEach((halamanItem) => {
      halamanItem.classList.toggle("active", halamanItem === target);
    });

    tombolNavigasi.forEach((tombol) => {
      tombol.classList.toggle(
        "active",
        tombol.dataset.page === namaHalaman
      );
    });

    if (menu) menu.classList.remove("open");

    if (tombolMenu) {
      tombolMenu.setAttribute("aria-expanded", "false");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tombolNavigasi.forEach((tombol) => {
    tombol.addEventListener("click", () => {
      bukaHalaman(tombol.dataset.page);
    });
  });

  tombolPindah.forEach((tombol) => {
    tombol.addEventListener("click", () => {
      bukaHalaman(tombol.dataset.go);
    });
  });

  // Tombol logo kembali ke beranda.
  document.querySelectorAll(".brand[data-go]").forEach((logo) => {
    logo.addEventListener("click", (event) => {
      event.preventDefault();
      bukaHalaman(logo.dataset.go);
    });
  });

  // Menu versi HP.
  if (tombolMenu && menu) {
    tombolMenu.addEventListener("click", () => {
      const sedangTerbuka = menu.classList.toggle("open");
      tombolMenu.setAttribute("aria-expanded", String(sedangTerbuka));
    });
  }

  // ------------------------------
  // JADWAL PELAJARAN
  // ------------------------------
  const judulJadwal = document.getElementById("schedule-title");
  const isiJadwal = document.getElementById("schedule-body");
  const tabJadwal = document.querySelectorAll("#schedule-tabs [data-day]");

  function tampilkanJadwal(hari) {
    if (!isiJadwal || !judulJadwal || !jadwalPelajaran[hari]) return;

    judulJadwal.textContent = `🫧 Jadwal Hari ${hari}`;
    isiJadwal.replaceChildren();

    jadwalPelajaran[hari].forEach(([waktu, pelajaran], index) => {
      const baris = document.createElement("div");
      baris.className = "schedule-item";

      const namaWaktu = document.createElement("strong");
      namaWaktu.textContent = `🕒 ${waktu}`;

      const namaPelajaran = document.createElement("span");
      namaPelajaran.textContent =
        `${ikonLaut[index % ikonLaut.length]} ${pelajaran}`;

      baris.append(namaWaktu, namaPelajaran);
      isiJadwal.appendChild(baris);
    });

    tabJadwal.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.day === hari);
    });
  }

  tabJadwal.forEach((tab) => {
    tab.addEventListener("click", () => {
      tampilkanJadwal(tab.dataset.day);
    });
  });

  tampilkanJadwal("Senin");

  // ------------------------------
  // JADWAL PIKET BERTEMA LAUT
  // ------------------------------
  const judulPiket = document.getElementById("piket-title");
  const daftarPiket = document.getElementById("daftar-piket");
  const tabPiket = document.querySelectorAll("#piket-tabs [data-piket]");

  function tampilkanPiketLaut(hari) {
    if (!daftarPiket || !judulPiket || !jadwalPiket[hari]) return;

    judulPiket.textContent = `🐚 Petugas Piket ${hari}`;
    daftarPiket.replaceChildren();

    jadwalPiket[hari].forEach((nama, index) => {
      const item = document.createElement("li");

      const ikon = document.createElement("span");
      ikon.className = "piket-ikon";
      ikon.textContent = ikonLaut[(index + Object.keys(jadwalPiket).indexOf(hari)) % ikonLaut.length];

      const nomor = document.createElement("span");
      nomor.className = "piket-nomor";
      nomor.textContent = `${String(index + 1).padStart(2, "0")}.`;

      const namaSiswa = document.createElement("span");
      namaSiswa.className = "piket-nama";
      namaSiswa.textContent = nama;

      item.append(ikon, nomor, namaSiswa);
      daftarPiket.appendChild(item);
    });

    tabPiket.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.piket === hari);
    });
  }

  tabPiket.forEach((tab) => {
    tab.addEventListener("click", () => {
      tampilkanPiketLaut(tab.dataset.piket);
    });
  });

  // Tampilkan piket hari Senin saat halaman dibuka.
  tampilkanPiketLaut("Senin");

  // ------------------------------
  // DAFTAR TUGAS + PENYIMPANAN
  // ------------------------------
  const formTugas = document.getElementById("task-form");
  const inputNama = document.getElementById("task-name");
  const inputMapel = document.getElementById("task-subject");
  const inputTanggal = document.getElementById("task-date");
  const daftarTugas = document.getElementById("task-list");
  const ringkasanTugas = document.getElementById("task-summary");
  const tombolHapusSelesai = document.getElementById("clear-completed");

  let tugas = [];

  try {
    tugas = JSON.parse(localStorage.getItem("kelas8d-tugas") || "[]");
    if (!Array.isArray(tugas)) tugas = [];
  } catch (error) {
    console.warn("Data tugas tidak dapat dibaca.", error);
    tugas = [];
  }

  function simpanTugas() {
    try {
      localStorage.setItem("kelas8d-tugas", JSON.stringify(tugas));
    } catch (error) {
      console.warn("Data tugas tidak dapat disimpan.", error);
    }
  }

  function gambarTugas() {
    if (!daftarTugas) return;

    daftarTugas.replaceChildren();

    const belumSelesai = tugas.filter((item) => !item.selesai).length;

    if (ringkasanTugas) {
      ringkasanTugas.textContent = tugas.length
        ? `📚 ${belumSelesai} tugas belum selesai dari ${tugas.length} tugas.`
        : "🫧 Belum ada tugas. Tambahkan tugas pertamamu!";
    }

    tugas.forEach((item) => {
      const kartu = document.createElement("article");
      kartu.className = `task-item${item.selesai ? " completed" : ""}`;

      const judul = document.createElement("h3");
      judul.textContent = `${item.selesai ? "✅" : "🪼"} ${item.nama}`;

      const mapel = document.createElement("p");
      mapel.textContent = `📘 Mata pelajaran: ${item.mapel}`;

      const tanggal = document.createElement("p");
      tanggal.textContent = item.tanggal
        ? `📅 Batas pengumpulan: ${item.tanggal}`
        : "📅 Tidak ada tanggal batas.";

      const tombolSelesai = document.createElement("button");
      tombolSelesai.type = "button";
      tombolSelesai.className = "btn btn-secondary";
      tombolSelesai.textContent = item.selesai
        ? "↩ Tandai Belum Selesai"
        : "✓ Tandai Selesai";

      tombolSelesai.addEventListener("click", () => {
        item.selesai = !item.selesai;
        simpanTugas();
        gambarTugas();
      });

      const tombolHapus = document.createElement("button");
      tombolHapus.type = "button";
      tombolHapus.className = "btn btn-primary";
      tombolHapus.textContent = "🗑 Hapus";

      tombolHapus.addEventListener("click", () => {
        tugas = tugas.filter((t) => t.id !== item.id);
        simpanTugas();
        gambarTugas();
      });

      const aksi = document.createElement("div");
      aksi.className = "task-actions";
      aksi.append(tombolSelesai, tombolHapus);

      kartu.append(judul, mapel, tanggal, aksi);
      daftarTugas.appendChild(kartu);
    });
  }

  if (formTugas) {
    formTugas.addEventListener("submit", (event) => {
      event.preventDefault();

      const nama = inputNama?.value.trim();
      const mapel = inputMapel?.value.trim();

      if (!nama || !mapel) {
        alert("Isi nama tugas dan mata pelajaran terlebih dahulu.");
        return;
      }

      tugas.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        nama,
        mapel,
        tanggal: inputTanggal?.value || "",
        selesai: false
      });

      simpanTugas();
      gambarTugas();
      formTugas.reset();
      inputNama?.focus();
    });
  }

  if (tombolHapusSelesai) {
    tombolHapusSelesai.addEventListener("click", () => {
      tugas = tugas.filter((item) => !item.selesai);
      simpanTugas();
      gambarTugas();
    });
  }

  gambarTugas();

  // ------------------------------
  // TOMBOL KEMBALI KE ATAS
  // ------------------------------
  const tombolAtas = document.getElementById("back-to-top");

  if (tombolAtas) {
    tombolAtas.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    function perbaruiTombolAtas() {
      tombolAtas.hidden = window.scrollY < 250;
    }

    window.addEventListener("scroll", perbaruiTombolAtas, {
      passive: true
    });

    perbaruiTombolAtas();
  }

  console.log("🌊 KELAS 8D siap dijelajahi!");
});
