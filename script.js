
// ================================
// KELAS 8D - JAVASCRIPT
// ================================

// NAVIGASI HALAMAN
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function showPage(pageName) {
  const targetPage = document.getElementById(`page-${pageName}`);
  if (!targetPage) return;

  pages.forEach(page => page.classList.remove("active"));
  targetPage.classList.add("active");

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  if (nav) nav.classList.remove("open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => showPage(link.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showPage(button.dataset.go);
  });
});

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// TOMBOL KEMBALI KE ATAS
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 350);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================================
// JADWAL PELAJARAN
// ================================

const schedules = {
  Senin: [
    ["Upacara", "Kegiatan sekolah"],
    ["IPS", "Amalia Zhafira Fani"],
    ["Pendidikan Agama", "Nadia Fadilla Dianty"],
    ["Bahasa Indonesia", "Yuan Malista Ayu Septiwi"],
    ["Literasi", "Nadia Fadilla Dianty"]
  ],
  Selasa: [
    ["IPS", "Amalia Zhafira Fani"],
    ["Matematika", "Iska Agustina"],
    ["Seni Budaya", "Cindy Lovina"],
    ["IPA", "Nurmala Maulidina Helayanti"],
    ["Sholat Dhuhur", "Kegiatan sekolah"]
  ],
  Rabu: [
    ["IPA", "Nurmala Maulidina Helayanti"],
    ["Matematika", "Iska Agustina"],
    ["Bahasa Inggris", "Sri Sulistijo Andajani"],
    ["Literasi", "Kegiatan literasi"]
  ],
  Kamis: [
    ["Bahasa Jawa", "Drs. Budiono"],
    ["PJOK", "Oki Dwijayanto"],
    ["Bahasa Indonesia", "Yuan Malista Ayu Septiwi"],
    ["Literasi Bersama", "Kegiatan literasi"]
  ],
  Jumat: [
    ["Jum'ani & Literasi", "Kegiatan sekolah"],
    ["Informatika", "Riski Dian Ratri"],
    ["BK", "Ana Listyarini"],
    ["MBG & Tegur", "Kegiatan sekolah"]
  ],
  Sabtu: [
    ["Senam & Adiwiyata", "Kegiatan sekolah"],
    ["PPKN", "Diana Novita Latifatul L."],
    ["Kokurikuler Tema", "Iska Agustina"],
    ["Kokurikuler Tema", "Cindy Lovina"]
  ]
};

const scheduleBody = document.getElementById("schedule-body");
const scheduleTitle = document.getElementById("schedule-day-title");
const dayTabs = document.querySelectorAll(".day-tab");

function renderSchedule(day) {
  if (!scheduleBody || !scheduleTitle) return;

  scheduleTitle.textContent = `Hari ${day}`;
  scheduleBody.replaceChildren();

  (schedules[day] || []).forEach((lesson, index) => {
    const row = document.createElement("tr");

    [index + 1, lesson[0], lesson[1]].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    scheduleBody.appendChild(row);
  });
}

dayTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    dayTabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    renderSchedule(tab.dataset.day);
  });
});

renderSchedule("Senin");

// ================================
// JADWAL PIKET KELAS 8D
// ================================

const jadwalPiket = {
  Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
  Selasa: ["Wildan", "Vergy", "Ega", "Ifa", "Vio"],
  Rabu: ["Sany", "Tristan", "Arif", "Najwa", "Aqila"],
  Kamis: ["Aenzy", "Aqla", "Khian", "Vea", "Dipa", "Ayu"],
  Jumat: ["Wahyu", "Arka", "Zoga", "Jesicca", "Nita", "Tika"],
  Sabtu: ["Arka", "Rendy", "Kayla", "Icha", "Lita"]
};

function tampilkanJadwalPiket() {
  const wadah =
    document.getElementById("daftar-piket") ||
    document.getElementById("jadwal-piket");

  if (!wadah) {
    console.warn(
      "Bagian piket belum ditemukan. Tambahkan " +
      '<div id="daftar-piket"></div> di bagian piket index.html.'
    );
    return;
  }

  wadah.replaceChildren();

  const ikonHari = {
    Senin: "🐠",
    Selasa: "🐬",
    Rabu: "🐢",
    Kamis: "🪼",
    Jumat: "🐙",
    Sabtu: "🐳"
  };

  Object.entries(jadwalPiket).forEach(([hari, siswa]) => {
    const kartu = document.createElement("div");
    kartu.className = "piket-card";

    const judul = document.createElement("h3");
    judul.textContent = `${ikonHari[hari]} ${hari}`;

    const daftar = document.createElement("ul");

    siswa.forEach(nama => {
      const item = document.createElement("li");
      item.textContent = nama;
      daftar.appendChild(item);
    });

    kartu.append(judul, daftar);
    wadah.appendChild(kartu);
  });
}

// ================================
// DAFTAR TUGAS KELAS
// ================================

const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskSubjectInput = document.getElementById("task-subject");
const taskDateInput = document.getElementById("task-date");
const tasksContainer = document.getElementById("tasks-container");
const taskCount = document.getElementById("task-count");

let tasks = [];

try {
  const storedTasks = localStorage.getItem("kelas8d-tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];

  if (!Array.isArray(tasks)) tasks = [];
} catch {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem("kelas8d-tasks", JSON.stringify(tasks));
}

function renderTasks() {
  if (!tasksContainer || !taskCount) return;

  tasksContainer.replaceChildren();
  taskCount.textContent = `${tasks.length} tugas`;

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent =
      "🎉 Belum ada tugas. Semoga harimu menyenangkan!";
    tasksContainer.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement("div");
    item.className = `task-item${task.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", `Tandai ${task.name} selesai`);

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const details = document.createElement("div");
    details.className = "task-details";

    const name = document.createElement("div");
    name.className = "task-name";
    name.textContent = task.name;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent =
      `${task.subject}${task.date ? " · Tenggat: " + task.date : " · Tenggat belum ditentukan"}`;

    details.append(name, meta);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "Hapus";

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, details, deleteButton);
    tasksContainer.appendChild(item);
  });
}

if (taskForm && taskNameInput && taskSubjectInput && taskDateInput) {
  taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = taskNameInput.value.trim();
    const subject = taskSubjectInput.value.trim();
    const date = taskDateInput.value;

    if (!name || !subject) return;

    tasks.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      subject,
      date,
      done: false
    });

    saveTasks();
    renderTasks();
    taskForm.reset();
  });
}

renderTasks();

// Tampilkan jadwal piket setelah dokumen siap.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", tampilkanJadwalPiket);
} else {
  tampilkanJadwalPiket();
}
