
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link[data-page]");
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const backToTop = document.getElementById("back-to-top");

  // -----------------------------
  // NAVIGASI ANTAR HALAMAN
  // -----------------------------
  function showPage(pageName) {
    const target = document.getElementById(`page-${pageName}`);

    if (!target) {
      console.warn("Halaman tidak ditemukan:", pageName);
      return;
    }

    pages.forEach((page) => {
      page.classList.toggle("active", page === target);
    });

    navLinks.forEach((link) => {
      const active = link.dataset.page === pageName;
      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      showPage(link.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  // -----------------------------
  // MENU HP
  // -----------------------------
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );
  });

  // -----------------------------
  // JADWAL PELAJARAN
  // -----------------------------
  const schedule = {
    Senin: [
      ["07.00–08.00", "Upacara / Wali Kelas"],
      ["08.00–09.20", "Matematika"],
      ["09.40–11.00", "Bahasa Indonesia"],
      ["11.00–12.00", "IPA"]
    ],
    Selasa: [
      ["07.00–08.20", "Bahasa Inggris"],
      ["08.20–09.40", "IPS"],
      ["10.00–11.20", "Matematika"],
      ["11.20–12.00", "Seni Budaya"]
    ],
    Rabu: [
      ["07.00–08.20", "IPA"],
      ["08.20–09.40", "Bahasa Indonesia"],
      ["10.00–11.20", "PJOK"],
      ["11.20–12.00", "PPKn"]
    ],
    Kamis: [
      ["07.00–08.20", "Matematika"],
      ["08.20–09.40", "Bahasa Inggris"],
      ["10.00–11.20", "IPS"],
      ["11.20–12.00", "Informatika"]
    ],
    Jumat: [
      ["07.00–08.00", "Kegiatan Jumat"],
      ["08.00–09.20", "PPKn"],
      ["09.40–10.40", "Bahasa Indonesia"],
      ["10.40–11.30", "Agama"]
    ]
  };

  const scheduleTitle = document.getElementById("schedule-title");
  const scheduleBody = document.getElementById("schedule-body");
  const dayTabs = document.querySelectorAll(".day-tab[data-day]");

  function renderSchedule(day) {
    scheduleTitle.textContent = `Jadwal Hari ${day}`;
    scheduleBody.replaceChildren();

    (schedule[day] || []).forEach(([time, subject]) => {
      const row = document.createElement("div");
      row.className = "schedule-row";

      const timeElement = document.createElement("span");
      timeElement.className = "schedule-time";
      timeElement.textContent = time;

      const subjectElement = document.createElement("span");
      subjectElement.className = "schedule-subject";
      subjectElement.textContent = subject;

      row.append(timeElement, subjectElement);
      scheduleBody.appendChild(row);
    });

    dayTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.day === day);
    });
  }

  dayTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderSchedule(tab.dataset.day);
    });
  });

  renderSchedule("Senin");

  // -----------------------------
  // JADWAL PIKET
  // -----------------------------
  const piketData = {
    Senin: ["Nama siswa 1", "Nama siswa 2", "Nama siswa 3", "Nama siswa 4"],
    Selasa: ["Nama siswa 5", "Nama siswa 6", "Nama siswa 7", "Nama siswa 8"],
    Rabu: ["Nama siswa 9", "Nama siswa 10", "Nama siswa 11", "Nama siswa 12"],
    Kamis: ["Nama siswa 13", "Nama siswa 14", "Nama siswa 15", "Nama siswa 16"],
    Jumat: ["Nama siswa 17", "Nama siswa 18", "Nama siswa 19", "Nama siswa 20"]
  };

  const piketTitle = document.getElementById("piket-title");
  const piketList = document.getElementById("daftar-piket");
  const piketTabs = document.querySelectorAll("[data-piket]");

  function renderPiket(day) {
    piketTitle.textContent = `Petugas Piket ${day}`;
    piketList.replaceChildren();

    (piketData[day] || []).forEach((name) => {
      const item = document.createElement("li");
      item.textContent = name;
      piketList.appendChild(item);
    });

    piketTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.piket === day);
    });
  }

  piketTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderPiket(tab.dataset.piket);
    });
  });

  renderPiket("Senin");

  // -----------------------------
  // DAFTAR TUGAS + PENYIMPANAN
  // -----------------------------
  const taskForm = document.getElementById("task-form");
  const taskName = document.getElementById("task-name");
  const taskSubject = document.getElementById("task-subject");
  const taskDate = document.getElementById("task-date");
  const taskList = document.getElementById("task-list");
  const taskSummary = document.getElementById("task-summary");
  const clearCompleted = document.getElementById("clear-completed");

  let tasks = [];
  let storageAvailable = true;

  try {
    const savedTasks = localStorage.getItem("kelas8d-tasks");
    tasks = savedTasks ? JSON.parse(savedTasks) : [];

    if (!Array.isArray(tasks)) {
      tasks = [];
    }
  } catch (error) {
    storageAvailable = false;
    tasks = [];
    console.warn("Penyimpanan tugas tidak tersedia.", error);
  }

  function saveTasks() {
    try {
      localStorage.setItem("kelas8d-tasks", JSON.stringify(tasks));
      storageAvailable = true;
    } catch (error) {
      storageAvailable = false;
      console.warn("Tugas tidak dapat disimpan.", error);
    }
  }

  function renderTasks() {
    taskList.replaceChildren();

    const completedCount = tasks.filter((task) => task.completed).length;
    taskSummary.textContent =
      `${tasks.length} tugas • ${completedCount} selesai • ` +
      `${tasks.length - completedCount} belum selesai`;

    if (!storageAvailable) {
      taskSummary.textContent += " — penyimpanan browser tidak tersedia";
    }

    if (tasks.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Belum ada tugas. Tambahkan tugas pertamamu!";
      taskList.appendChild(empty);
      return;
    }

    tasks.forEach((task) => {
      const item = document.createElement("div");
      item.className = "task-item";
      if (task.completed) item.classList.add("completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Tandai ${task.name} selesai`);

      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const details = document.createElement("div");
      details.className = "task-details";

      const title = document.createElement("strong");
      title.textContent = task.name;

      const meta = document.createElement("small");
      meta.textContent = task.date
        ? `${task.subject} • Batas: ${task.date}`
        : task.subject;

      details.append(title, meta);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-task";
      deleteButton.type = "button";
      deleteButton.textContent = "Hapus";
      deleteButton.setAttribute("aria-label", `Hapus tugas ${task.name}`);

      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter((entry) => entry.id !== task.id);
        saveTasks();
        renderTasks();
      });

      item.append(checkbox, details, deleteButton);
      taskList.appendChild(item);
    });
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = taskName.value.trim();
    const subject = taskSubject.value.trim();

    if (!name || !subject) {
      alert("Isi nama tugas dan mata pelajaran terlebih dahulu.");
      return;
    }

    tasks.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      subject,
      date: taskDate.value,
      completed: false
    });

    saveTasks();
    renderTasks();
    taskForm.reset();
    taskName.focus();
  });

  clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
  });

  renderTasks();

  // -----------------------------
  // TOMBOL KEMBALI KE ATAS
  // -----------------------------
  function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateBackToTop();

  console.log("KELAS 8D: JavaScript berhasil dimuat.");
});
