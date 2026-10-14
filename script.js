```javascript
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const nav = document.getElementById("main-nav");
  const menuToggle = document.getElementById("menu-toggle");
  const backToTop = document.getElementById("back-to-top");

  // Navigasi halaman
  function showPage(pageName) {
    const target = document.getElementById(`page-${pageName}`);
    if (!target) return;

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

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    menuToggle.textContent = "☰";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => showPage(link.dataset.page));
  });

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.go));
  });

  document.querySelectorAll(".brand[data-page]").forEach((brand) => {
    brand.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(brand.dataset.page);
    });
  });

  // Menu HP
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Jadwal pelajaran.
  // Ganti contoh di bawah dengan jadwal resmi kelasmu.
  const schedules = {
    Senin: [
      ["07.00–07.40", "Upacara / Pembiasaan"],
      ["07.40–08.20", "Bahasa Indonesia"],
      ["08.20–09.00", "Matematika"],
      ["09.00–09.40", "Bahasa Inggris"],
      ["09.40–10.00", "Istirahat"],
      ["10.00–10.40", "IPA"],
      ["10.40–11.20", "IPS"]
    ],
    Selasa: [
      ["07.00–07.40", "Pendidikan Agama"],
      ["07.40–08.20", "Matematika"],
      ["08.20–09.00", "Bahasa Indonesia"],
      ["09.00–09.40", "PPKn"],
      ["09.40–10.00", "Istirahat"],
      ["10.00–10.40", "IPA"],
      ["10.40–11.20", "PJOK"]
    ],
    Rabu: [
      ["07.00–07.40", "Bahasa Inggris"],
      ["07.40–08.20", "IPS"],
      ["08.20–09.00", "Matematika"],
      ["09.00–09.40", "Informatika"],
      ["09.40–10.00", "Istirahat"],
      ["10.00–10.40", "Bahasa Indonesia"],
      ["10.40–11.20", "Seni Budaya"]
    ],
    Kamis: [
      ["07.00–07.40", "IPA"],
      ["07.40–08.20", "Bahasa Indonesia"],
      ["08.20–09.00", "Pendidikan Agama"],
      ["09.00–09.40", "Bahasa Inggris"],
      ["09.40–10.00", "Istirahat"],
      ["10.00–10.40", "Matematika"],
      ["10.40–11.20", "PPKn"]
    ],
    Jumat: [
      ["07.00–07.40", "Pembiasaan Pagi"],
      ["07.40–08.20", "PJOK"],
      ["08.20–09.00", "IPS"],
      ["09.00–09.40", "Bahasa Indonesia"],
      ["09.40–10.00", "Istirahat"],
      ["10.00–10.40", "Seni Budaya"]
    ],
    Sabtu: [
      ["07.00–07.40", "Kegiatan Sekolah"],
      ["07.40–08.20", "Muatan Lokal"],
      ["08.20–09.00", "Kegiatan Kelas"]
    ]
  };

  const scheduleTitle = document.getElementById("schedule-title");
  const scheduleBody = document.getElementById("schedule-body");
  const dayTabs = document.querySelectorAll(".day-tab");

  function renderSchedule(day) {
    scheduleTitle.textContent = `Jadwal Hari ${day}`;
    scheduleBody.replaceChildren();

    (schedules[day] || []).forEach((item, index) => {
      const row = document.createElement("tr");
      const numberCell = document.createElement("td");
      const timeCell = document.createElement("td");
      const subjectCell = document.createElement("td");

      numberCell.textContent = String(index + 1);
      timeCell.textContent = item[0];
      subjectCell.textContent = item[1];

      row.append(numberCell, timeCell, subjectCell);
      scheduleBody.appendChild(row);
    });

    dayTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.day === day);
    });
  }

  dayTabs.forEach((tab) => {
    tab.addEventListener("click", () => renderSchedule(tab.dataset.day));
  });

  renderSchedule("Senin");

  // Daftar tugas: tersimpan di browser yang digunakan.
  const taskForm = document.getElementById("task-form");
  const taskName = document.getElementById("task-name");
  const taskSubject = document.getElementById("task-subject");
  const taskDate = document.getElementById("task-date");
  const tasksContainer = document.getElementById("tasks-container");
  const taskCount = document.getElementById("task-count");

  const storageKey = "kelas8d-tasks-v1";
  let tasks = [];

  try {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];
    if (Array.isArray(parsed)) tasks = parsed;
  } catch (error) {
    console.warn("Data tugas tidak dapat dibaca dari penyimpanan browser.", error);
  }

  function saveTasks() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Data tugas tidak dapat disimpan.", error);
    }
  }

  function renderTasks() {
    tasksContainer.replaceChildren();

    const completed = tasks.filter((task) => task.done).length;
    taskCount.textContent = `${tasks.length} tugas · ${completed} selesai`;

    if (tasks.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Belum ada tugas. Tambahkan tugas pertamamu!";
      tasksContainer.appendChild(empty);
      return;
    }

    tasks.forEach((task) => {
      const item = document.createElement("div");
      item.className = `task-item${task.done ? " done" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-check";
      checkbox.checked = Boolean(task.done);
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
      meta.textContent = `${task.subject}${task.date ? " · Tenggat: " + task.date : ""}`;

      details.append(name, meta);

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-task";
      deleteButton.textContent = "Hapus";
      deleteButton.addEventListener("click", () => {
        tasks = tasks.filter((entry) => entry.id !== task.id);
        saveTasks();
        renderTasks();
      });

      item.append(checkbox, details, deleteButton);
      tasksContainer.appendChild(item);
    });
  }

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = taskName.value.trim();
    const subject = taskSubject.value.trim();

    if (!name || !subject) return;

    tasks.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      subject,
      date: taskDate.value,
      done: false
    });

    saveTasks();
    renderTasks();
    taskForm.reset();
    taskName.focus();
  });

  renderTasks();

  // Tombol kembali ke atas
  function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 350);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateBackToTop();
});
```
