
document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link[data-page]");
  const navMenu = document.getElementById("nav-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const backToTop = document.getElementById("back-to-top");

  // NAVIGASI
  function showPage(name) {
    const target = document.getElementById(`page-${name}`);
    if (!target) return;

    pages.forEach(page => page.classList.toggle("active", page === target));

    navLinks.forEach(link => {
      const active = link.dataset.page === name;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => showPage(link.dataset.page));
  });

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.go));
  });

  // MENU HP
  menuToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });

  // JADWAL PELAJARAN
  const schedule = {
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

  const scheduleTitle = document.getElementById("schedule-title");
  const scheduleBody = document.getElementById("schedule-body");
  const scheduleTabs = document.querySelectorAll("[data-day]");

  function renderSchedule(day) {
    scheduleTitle.textContent = `Jadwal Hari ${day}`;
    scheduleBody.replaceChildren();

    (schedule[day] || []).forEach(([subject, teacher]) => {
      const row = document.createElement("div");
      row.className = "schedule-row";

      const subjectElement = document.createElement("span");
      subjectElement.className = "schedule-subject";
      subjectElement.textContent = subject;

      const teacherElement = document.createElement("span");
      teacherElement.className = "schedule-time";
      teacherElement.textContent = teacher;

      row.append(subjectElement, teacherElement);
      scheduleBody.appendChild(row);
    });

    scheduleTabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.day === day);
    });
  }

  scheduleTabs.forEach(tab => {
    tab.addEventListener("click", () => renderSchedule(tab.dataset.day));
  });

  renderSchedule("Senin");

  // JADWAL PIKET
  const piketData = {
    Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
    Selasa: ["Wildan", "Vergy", "Ega", "Ifa", "Vio"],
    Rabu: ["Sany", "Tristan", "Arif", "Najwa", "Aqila"],
    Kamis: ["Aenzy", "Aqla", "Khian", "Vea", "Dipa", "Ayu"],
    Jumat: ["Wahyu", "Arka", "Zoga", "Jesicca", "Nita", "Tika"],
    Sabtu: ["Arka", "Rendy", "Kayla", "Icha", "Lita"]
  };

  const piketTitle = document.getElementById("piket-title");
  const piketList = document.getElementById("daftar-piket");
  const piketTabs = document.querySelectorAll("[data-piket]");

  function renderPiket(day) {
    piketTitle.textContent = `Petugas Piket ${day}`;
    piketList.replaceChildren();

    (piketData[day] || []).forEach(name => {
      const item = document.createElement("li");
      item.textContent = name;
      piketList.appendChild(item);
    });

    piketTabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.piket === day);
    });
  }

  piketTabs.forEach(tab => {
    tab.addEventListener("click", () => renderPiket(tab.dataset.piket));
  });

  renderPiket("Senin");

  // DAFTAR TUGAS
  const taskForm = document.getElementById("task-form");
  const taskName = document.getElementById("task-name");
  const taskSubject = document.getElementById("task-subject");
  const taskDate = document.getElementById("task-date");
  const taskList = document.getElementById("task-list");
  const taskSummary = document.getElementById("task-summary");
  const clearCompleted = document.getElementById("clear-completed");

  let tasks = [];

  try {
    const saved = localStorage.getItem("kelas8d-tasks");
    const parsed = saved ? JSON.parse(saved) : [];
    tasks = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Data tugas tidak dapat dibaca.", error);
  }

  function saveTasks() {
    try {
      localStorage.setItem("kelas8d-tasks", JSON.stringify(tasks));
    } catch (error) {
      console.warn("Data tugas tidak dapat disimpan.", error);
    }
  }

  function renderTasks() {
    taskList.replaceChildren();

    const completed = tasks.filter(task => task.completed).length;
    taskSummary.textContent =
      `${tasks.length} tugas • ${completed} selesai • ` +
      `${tasks.length - completed} belum selesai`;

    if (tasks.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Belum ada tugas. Tambahkan tugas pertamamu!";
      taskList.appendChild(empty);
      return;
    }

    tasks.forEach(task => {
      const item = document.createElement("div");
      item.className = "task-item";
      if (task.completed) item.classList.add("completed");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = Boolean(task.completed);
      checkbox.setAttribute("aria-label", "Tandai tugas selesai");
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const details = document.createElement("div");
      details.className = "task-details";

      const title = document.createElement("strong");
      title.textContent = task.name;

      const info = document.createElement("small");
      info.textContent = task.date
        ? `${task.subject} • Batas: ${task.date}`
        : task.subject;

      details.append(title, info);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "delete-task";
      remove.textContent = "Hapus";
      remove.addEventListener("click", () => {
        tasks = tasks.filter(entry => entry.id !== task.id);
        saveTasks();
        renderTasks();
      });

      item.append(checkbox, details, remove);
      taskList.appendChild(item);
    });
  }

  taskForm.addEventListener("submit", event => {
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
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
  });

  renderTasks();

  // KEMBALI KE ATAS
  function updateBackToTop() {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateBackToTop();
  console.log("Website KELAS 8D berhasil dimuat.");
});
