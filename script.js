```javascript
// ========================================
// KELAS 8D - JAVASCRIPT
// Tema: Dunia Bawah Laut 🌊
// ========================================

// ========================================
// 1. NAVIGASI HALAMAN
// ========================================

const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function showPage(pageName) {
  const targetPage = document.getElementById(`page-${pageName}`);

  if (!targetPage) return;

  pages.forEach(page => {
    page.classList.remove("active");
  });

  targetPage.classList.add("active");

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageName
    );
  });

  if (nav) nav.classList.remove("open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Navigasi menu
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    showPage(link.dataset.page);
  });
});

// Tombol yang menuju halaman lain
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showPage(button.dataset.go);
  });
});

// Menu untuk layar HP
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });
}

// ========================================
// 2. TOMBOL KEMBALI KE ATAS
// ========================================

const backToTop = document.getElementById("back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle(
      "show",
      window.scrollY > 350
    );
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ========================================
// 3. JADWAL PELAJARAN
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
  if (!scheduleBody || !scheduleTitle) return;

  scheduleTitle.textContent = `Hari ${day}`;
  scheduleBody.replaceChildren();

  const lessons = schedules[day] || [];

  lessons.forEach((lesson, index) => {
    const row = document.createElement("tr");

    const values = [
      index + 1,
      lesson[0],
      lesson[1]
    ];

    values.forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    scheduleBody.appendChild(row);
  });

  dayTabs.forEach(tab => {
    const selected = tab.dataset.day === day;

    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
}

dayTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    renderSchedule(tab.dataset.day);
  });
});

// Jadwal awal
renderSchedule("Senin");

// ========================================
// 4. JADWAL PIKET KELAS 8D
// ========================================

const jadwalPiket = {
  Senin: [
    "Taqi",
    "Abi",
    "Wafiy",
    "Retha",
    "Jihan"
  ],

  Selasa: [
    "Wildan",
    "Vergy",
    "Ega",
    "Ifa",
    "Vio"
  ],

  Rabu: [
    "Sany",
    "Tristan",
    "Arif",
    "Najwa",
    "Aqila"
  ],

  Kamis: [
    "Aenzy",
    "Aqla",
    "Khian",
    "Vea",
    "Dipa",
    "Ayu"
  ],

  Jumat: [
    "Wahyu",
    "Arka",
    "Zoga",
    "Jesicca",
    "Nita",
    "Tika"
  ],

  Sabtu: [
    "Arka",
    "Rendy",
    "Kayla",
    "Icha",
    "Lita"
  ]
};

const ikonHari = {
  Senin: "🐠",
  Selasa: "🐬",
  Rabu: "🐢",
  Kamis: "🪼",
  Jumat: "🐙",
  Sabtu: "🐳"
};

function tampilkanJadwalPiket() {
  const wadah = document.getElementById("daftar-piket");

  if (!wadah) {
    console.warn(
      "Elemen #daftar-piket tidak ditemukan di index.html."
    );
    return;
  }

  wadah.replaceChildren();

  Object.entries(jadwalPiket).forEach(([hari, siswa]) => {
    const kartu = document.createElement("article");
    kartu.className = "piket-card";

    const judul = document.createElement("h3");
    judul.textContent = `${ikonHari[hari]} ${hari}`;

    const daftar = document.createElement("ul");

    siswa.forEach((nama, index) => {
      const item = document.createElement("li");

      const nomor = document.createElement("span");
      nomor.className = "piket-number";
      nomor.textContent = `${index + 1}.`;

      const namaSiswa = document.createElement("span");
      namaSiswa.textContent = nama;

      item.append(nomor, namaSiswa);
      daftar.appendChild(item);
    });

    kartu.append(judul, daftar);
    wadah.appendChild(kartu);
  });
}

tampilkanJadwalPiket();

// ========================================
// 5. DAFTAR TUGAS KELAS
// ========================================

const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskSubjectInput = document.getElementById("task-subject");
const taskDateInput = document.getElementById("task-date");
const tasksContainer = document.getElementById("tasks-container");
const taskCount = document.getElementById("task-count");

const TASK_STORAGE_KEY = "kelas8d-tasks";

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);

    if (!storedTasks) return [];

    const parsedTasks = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) return [];

    return parsedTasks
      .filter(task =>
        task &&
        typeof task.name === "string" &&
        typeof task.subject === "string"
      )
      .map((task, index) => ({
        id: String(task.id ?? `task-${index}`),
        name: task.name,
        subject: task.subject,
        date: typeof task.date === "string" ? task.date : "",
        done: task.done === true
      }));
  } catch (error) {
    console.warn("Data tugas tidak dapat dibaca:", error);
    return [];
  }
}

let tasks = loadTasks();

function saveTasks() {
  try {
    localStorage.setItem(
      TASK_STORAGE_KEY,
      JSON.stringify(tasks)
    );

    return true;
  } catch (error) {
    console.error("Data tugas gagal disimpan:", error);
    alert(
      "Tugas tidak dapat disimpan. Periksa pengaturan penyimpanan browser."
    );

    return false;
  }
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

    // Checkbox selesai
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;
    checkbox.setAttribute(
      "aria-label",
      `Tandai tugas ${task.name} selesai`
    );

    checkbox.addEventListener("change", () => {
      const previousValue = task.done;
      task.done = checkbox.checked;

      if (saveTasks()) {
        renderTasks();
      } else {
        task.done = previousValue;
        renderTasks();
      }
    });

    // Informasi tugas
    const details = document.createElement("div");
    details.className = "task-details";

    const name = document.createElement("div");
    name.className = "task-name";
    name.textContent = task.name;

    const meta = document.createElement("div");
    meta.className = "task-meta";

    meta.textContent = task.date
      ? `${task.subject} · Tenggat: ${task.date}`
      : `${task.subject} · Tenggat belum ditentukan`;

    details.append(name, meta);

    // Tombol hapus
    const deleteButton = document.createElement("button");

    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "Hapus";
    deleteButton.setAttribute(
      "aria-label",
      `Hapus tugas ${task.name}`
    );

    deleteButton.addEventListener("click", () => {
      const previousTasks = [...tasks];

      tasks = tasks.filter(existing => existing.id !== task.id);

      if (saveTasks()) {
        renderTasks();
      } else {
        tasks = previousTasks;
        renderTasks();
      }
    });

    item.append(checkbox, details, deleteButton);
    tasksContainer.appendChild(item);
  });
}

// Tambahkan tugas baru
if (
  taskForm &&
  taskNameInput &&
  taskSubjectInput &&
  taskDateInput
) {
  taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = taskNameInput.value.trim();
    const subject = taskSubjectInput.value.trim();
    const date = taskDateInput.value;

    if (!name || !subject) {
      alert("Isi nama tugas dan mata pelajaran terlebih dahulu.");
      return;
    }

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      subject,
      date,
      done: false
    };

    tasks.push(newTask);

    if (saveTasks()) {
      renderTasks();
      taskForm.reset();
    } else {
      tasks.pop();
      renderTasks();
    }
  });
}

renderTasks();

// ========================================
// 6. TAHUN OTOMATIS JIKA ADA DI FOOTER
// ========================================

const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// ========================================
// SELESAI 🌊
// ========================================
```
