// =====================================
// 0. INISIALISASI FIREBASE & FIRESTORE
// =====================================
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLMQVwyHZKCbZ99We9KWu9CQXq2NKD0zs",
  authDomain: "kelas-8d.firebaseapp.com",
  databaseURL: "https://kelas-8d-default-rtdb.firebaseio.com",
  projectId: "kelas-8d",
  storageBucket: "kelas-8d.firebasestorage.app",
  messagingSenderId: "943935144208",
  appId: "1:943935144208:web:237df529c9aecb3624a595",
  measurementId: "G-NQ5H57RTH7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =====================================
  // 1. NAVIGASI HALAMAN
  // =====================================
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const backToTop = document.getElementById("back-to-top");

  function bukaHalaman(nama) {
    const tujuan = document.getElementById("page-" + nama);
    if (!tujuan) {
      console.warn("Halaman tidak ditemukan:", nama);
      return;
    }

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

  document.querySelectorAll("[data-home]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      bukaHalaman("beranda");
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

    const daftar = jadwal[hari] || [];

    if (daftar.length === 0) {
      const pesan = document.createElement("p");
      pesan.textContent = "Jadwal belum tersedia.";
      scheduleBody.appendChild(pesan);
      return;
    }

    daftar.forEach(function (data, index) {
      const baris = document.createElement("div");
      baris.className = "schedule-item";

      const waktu = document.createElement("span");
      waktu.className = "schedule-time";
      waktu.textContent = data[0];

      const pelajaran = document.createElement("span");
      pelajaran.className = "schedule-subject";
      pelajaran.textContent = data[1];

      const ikon = document.createElement("span");
      ikon.textContent = ["🐠", "🐬", "🐙", "🪼", "🐚"][index % 5];

      baris.append(waktu, pelajaran, ikon);
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
  // 3. JADWAL PIKET KELAS 8D
  // =====================================
  const piket = {
    Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
    Selasa: ["Wildan", "Vergy", "Ega", "Vio", "Ifa"],
    Rabu: ["Sany", "Tristan", "Arif", "Najwa", "Aqila"],
    Kamis: ["Aenzy", "Aqla", "Khian", "Vea", "Dipa", "Ayu"],
    Jumat: ["Wahyu", "Alfa", "Zoga", "Jesicca", "Nita", "Tika"],
    Sabtu: ["Arka", "Rendy", "Kayla", "Icha", "Lita"]
  };

  const piketTabs = document.getElementById("piket-tabs");
  const piketTitle = document.getElementById("piket-title");
  const daftarPiket = document.getElementById("daftar-piket");

  const emojiLaut = [
    "🐠", "🐟", "🐡", "🦀", "🐙", "🪼",
    "🐚", "🦈", "🐬", "🦑", "🪸", "⭐"
  ];

  function tampilkanPiket(hari) {
    if (!piketTitle || !daftarPiket) return;

    piketTitle.textContent = "🌊 Petugas Piket " + hari;
    daftarPiket.replaceChildren();

    const petugas = piket[hari] || [];

    if (petugas.length === 0) {
      const pesan = document.createElement("li");
      pesan.className = "piket-item";
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
  // 4. DAFTAR TUGAS (MENGGUNAKAN FIRESTORE)
  // =====================================
  const taskForm = document.getElementById("task-form");
  const taskName = document.getElementById("task-name");
  const taskSubject = document.getElementById("task-subject");
  const taskDate = document.getElementById("task-date");
  const taskSummary = document.getElementById("task-summary");
  const taskList = document.getElementById("task-list");
  const clearCompleted = document.getElementById("clear-completed");

  let daftarTugas = [];

  // Fungsi untuk mengambil data tugas dari Firestore
  async function muatTugasDariFirebase() {
    try {
      const querySnapshot = await getDocs(collection(db, "tugas"));
      daftarTugas = [];
      querySnapshot.forEach((docSnap) => {
        daftarTugas.push({
          id: docSnap.id,
          ...docSnap.data()
        });
      });
      renderTugas();
    } catch (error) {
      console.warn("Gagal memuat data dari Firestore:", error);
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

      if (tugas.selesai) item.classList.add("completed");

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

      selesai.addEventListener("change", async function () {
        tugas.selesai = selesai.checked;
        try {
          const taskRef = doc(db, "tugas", tugas.id);
          await updateDoc(taskRef, { selesai: tugas.selesai });
          renderTugas();
        } catch (error) {
          console.warn("Gagal memperbarui status tugas:", error);
        }
      });

      const hapus = document.createElement("button");
      hapus.type = "button";
      hapus.className = "btn-delete";
      hapus.textContent = "🗑️";
      hapus.setAttribute("aria-label", "Hapus tugas");

      hapus.addEventListener("click", async function () {
        try {
          await deleteDoc(doc(db, "tugas", tugas.id));
          daftarTugas = daftarTugas.filter(function (t) {
            return t.id !== tugas.id;
          });
          renderTugas();
        } catch (error) {
          console.warn("Gagal menghapus tugas:", error);
        }
      });

      item.append(informasi, selesai, hapus);
      taskList.appendChild(item);
    });
  }

  if (taskForm && taskName && taskSubject) {
    taskForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const nama = taskName.value.trim();
      const mapel = taskSubject.value.trim();

      if (!nama || !mapel) {
        alert("Isi nama tugas dan mata pelajaran terlebih dahulu.");
        return;
      }

      const tugasBaru = {
        nama: nama,
        mapel: mapel,
        tanggal: taskDate ? taskDate.value : "",
        selesai: false
      };

      try {
        const docRef = await addDoc(collection(db, "tugas"), tugasBaru);
        daftarTugas.push({
          id: docRef.id,
          ...tugasBaru
        });
        renderTugas();
        taskForm.reset();
      } catch (error) {
        console.warn("Gagal menambahkan tugas ke Firestore:", error);
      }
    });
  }

  if (clearCompleted) {
    clearCompleted.addEventListener("click", async function () {
      try {
        const tugasSelesai = daftarTugas.filter(function (tugas) {
          return tugas.selesai;
        });

        for (const tugas of tugasSelesai) {
          await deleteDoc(doc(db, "tugas", tugas.id));
        }

        daftarTugas = daftarTugas.filter(function (tugas) {
          return !tugas.selesai;
        });
        renderTugas();
      } catch (error) {
        console.warn("Gagal membersihkan tugas selesai:", error);
      }
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
  // 6. INISIALISASI
  // =====================================
  tampilkanJadwal("Senin");
  tampilkanPiket("Senin");
  muatTugasDariFirebase(); // Memuat data tugas dari database Cloud Firestore

  console.log("KELAS 8D: JavaScript & Firebase Firestore berhasil dijalankan!");
});
