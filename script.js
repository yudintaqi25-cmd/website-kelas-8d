
// ================================
// KELAS 8D - JAVASCRIPT
// ================================

// Navigasi halaman
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

  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

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

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Tombol kembali ke atas
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========================================
// JADWAL PELAJARAN
// Silakan cocokkan dengan jadwal resmi.
// ========================================

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
  scheduleTitle.textContent = `Hari ${day}`;
  scheduleBody.replaceChildren();

  const lessons = schedules[day] || [];

  lessons.forEach((lesson, index) => {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    const subjectCell = document.createElement("td");
    const teacherCell = document.createElement("td");

    numberCell.textContent = index + 1;
    subjectCell.textContent = lesson[0];
    teacherCell.textContent = lesson[1];

    row.append(numberCell, subjectCell, teacherCell);
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

// Tampilkan jadwal Senin saat halaman dibuka
renderSchedule("Senin");

// ========================================
// PIKET KELAS
// Data disimpan di browser perangkat ini.
// ========================================

const piketDays = [
  "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"
];

function loadPiket() {
  piketDays.forEach(day => {
    const field = document.getElementById(`piket-${day}`);
    const saved = localStorage.getItem(`kelas8d-piket-${day}`);

    if (saved !== null) {
      field.value = saved;
    }
  });
}

document.getElementById("save-piket").addEventListener("click", () => {
  piketDays.forEach(day => {
    const field = document.getElementById(`piket-${day}`);
    localStorage.setItem(`kelas8d-piket-${day}`, field.value);
  });

  const message = document.getElementById("piket-message");
  message.textContent = "✅ Jadwal piket berhasil disimpan di browser ini.";

  window.setTimeout(() => {
    message.textContent = "";
  }, 3500);
});

loadPiket();

// ========================================
// DAFTAR TUGAS KELAS
// ========================================

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

  if (!Array.isArray(tasks)) {
    tasks = [];
  }
} catch {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem("kelas8d-tasks", JSON.stringify(tasks));
}

function renderTasks() {
  tasksContainer.replaceChildren();
  taskCount.textContent = `${tasks.length} tugas`;

  if (tasks.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "🎉 Belum ada tugas. Semoga harimu menyenangkan!";
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

    const dueDate = task.date
      ? ` · Tenggat: ${task.date}`
      : " · Tenggat belum ditentukan";

    meta.textContent = `${task.subject}${dueDate}`;
    details.append(name, meta);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "Hapus";
    deleteButton.setAttribute("aria-label", `Hapus tugas ${task.name}`);

    deleteButton.addEventListener("click", () => {
      tasks = tasks.filter(item => item.id !== task.id);
      saveTasks();
      renderTasks();
    });

    item.append(checkbox, details, deleteButton);
    tasksContainer.appendChild(item);
  });
}

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

renderTasks();

const jadwalPiket = {
  Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
  Selasa: ["Wildan", "Vergy", "Ega", "Ifa", "Vio"],
  Rabu: ["Sany", "Tristan", "Arif", "Najwa", "Aqila"],
  Kamis: ["Aenzy", "Aqla", "Khian", "Vea", "Dipa", "Ayu"],
  Jumat: ["Wahyu", "Arka", "Zoga", "Jesicca", "Nita", "Tika"],
  Sabtu: ["Arka", "Rendy", "Kayla", "Icha", "Lita"]
};

// Menampilkan jadwal piket ke halaman website
function tampilkanJadwalPiket() {
  const wadah =
    document.getElementById("daftar-piket") ||
    document.getElementById("jadwal-piket");

  if (!wadah) {
    console.warn(
      "Elemen jadwal piket tidak ditemukan. " +
      "Tambahkan id='daftar-piket' pada bagian jadwal piket di index.html."
    );
    return;
  }

  wadah.innerHTML = "";

  const ikonHari = {
    Senin: "🐠",
    Selasa: "🐬",
    Rabu: "🐢",
    Kamis: "🪼",
    Jumat: "🐙",
    Sabtu: "🐳"
  };

  for (const [hari, siswa] of Object.entries(jadwalPiket)) {
    const kartu = document.createElement("div");
    kartu.className = "piket-card";

    const judul = document.createElement("h3");
    judul.textContent = `${ikonHari[hari]} ${hari}`;

    const daftar = document.createElement("ul");

    siswa.forEach((nama) => {
      const item = document.createElement("li");
      item.textContent = nama;
      daftar.appendChild(item);
    });

    kartu.appendChild(judul);
    kartu.appendChild(daftar);
    wadah.appendChild(kartu);
  }
}

document.addEventListener("DOMContentLoaded", tampilkanJadwalPiket);
