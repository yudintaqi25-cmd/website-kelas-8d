
/* ==========================================
   KELAS 8D - JAVASCRIPT PERBAIKAN HP
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ========================================
  // 1. NAVIGASI DAN MENU HP
  // ========================================

  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(pageName) {
    const targetPage = document.getElementById("page-" + pageName);

    if (!targetPage) {
      console.warn("Halaman tidak ditemukan:", pageName);
      return;
    }

    pages.forEach(function (page) {
      page.classList.remove("active");
    });

    targetPage.classList.add("active");

    navLinks.forEach(function (link) {
      const active = link.dataset.page === pageName;
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "page" : "false");
    });

    if (nav) nav.classList.remove("open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  // Gunakan click agar bekerja pada mouse dan sentuhan HP.
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      showPage(link.dataset.page);
    });
  });

  document.querySelectorAll("[data-go]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      showPage(button.dataset.go);
    });
  });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function (event) {
      event.preventDefault();

      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
      );
    });
  }

  // ========================================
  // 2. TOMBOL KEMBALI KE ATAS
  // ========================================

  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("show", window.scrollY > 350);
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (!scheduleBody || !scheduleTitle || !schedules[day]) return;

    scheduleTitle.textContent = "Hari " + day;
    scheduleBody.replaceChildren();

    schedules[day].forEach(function (lesson, index) {
      const row = document.createElement("tr");

      [index + 1, lesson[0], lesson[1]].forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      scheduleBody.appendChild(row);
    });

    dayTabs.forEach(function (tab) {
      const selected = tab.dataset.day === day;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });
  }

  dayTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      renderSchedule(tab.dataset.day);
    });
  });

  renderSchedule("Senin");

  // ========================================
  // 4. JADWAL PIKET
  // ========================================

  const jadwalPiket = {
    Senin: ["Taqi", "Abi", "Wafiy", "Retha", "Jihan"],
    Selasa: ["Wildan", "Vergy", "Ega", "Ifa", "Vio"],
    Rabu: ["Sany", "Tristan", "Arif", "Najwa", "Aqila"],
    Kamis: ["Aenzy", "Aqla", "Khian", "Vea", "Dipa", "Ayu"],
    Jumat: ["Wahyu", "Arka", "Zoga", "Jesicca", "Nita", "Tika"],
    Sabtu: ["Arka", "Rendy", "Kayla", "Icha", "Lita"]
  };

  const ikonHari = {
    Senin: "🐠",
    Selasa: "🐬",
    Rabu: "🐢",
    Kamis: "🪼",
    Jumat: "🐙",
    Sabtu: "🐳"
  };

  const wadahPiket = document.getElementById("daftar-piket");

  if (wadahPiket) {
    wadahPiket.replaceChildren();

    Object.entries(jadwalPiket).forEach(function ([hari, siswa]) {
      const kartu = document.createElement("article");
      kartu.className = "piket-card";

      const judul = document.createElement("h3");
      judul.textContent = ikonHari[hari] + " " + hari;

      const daftar = document.createElement("ul");

      siswa.forEach(function (nama, index) {
        const item = document.createElement("li");
        item.textContent = (index + 1) + ". " + nama;
        daftar.appendChild(item);
      });

      kartu.append(judul, daftar);
      wadahPiket.appendChild(kartu);
    });
  }

  // ========================================
  // 5. DAFTAR TUGAS
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
      const saved = localStorage.getItem(TASK_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(parsed)) return [];

      return parsed.filter(function (task) {
        return task &&
          typeof task.name === "string" &&
          typeof task.subject === "string";
      }).map(function (task, index) {
        return {
          id: String(task.id ?? ("task-" + index)),
          name: task.name,
          subject: task.subject,
          date: typeof task.date === "string" ? task.date : "",
          done: task.done === true
        };
      });
    } catch (error) {
      console.warn("Tidak dapat membaca tugas:", error);
      return [];
    }
  }

  let tasks = loadTasks();

  function saveTasks() {
    try {
      localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
      return true;
    } catch (error) {
      alert("Tugas tidak bisa disimpan oleh browser saat ini.");
      console.error(error);
      return false;
    }
  }

  function renderTasks() {
    if (!tasksContainer || !taskCount) return;

    tasksContainer.replaceChildren();
    taskCount.textContent = tasks.length + " tugas";

    if (tasks.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "🎉 Belum ada tugas. Semoga harimu menyenangkan!";
      tasksContainer.appendChild(empty);
      return;
    }

    tasks.forEach(function (task) {
      const item = document.createElement("div");
      item.className = "task-item" + (task.done ? " done" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-check";
      checkbox.checked = task.done;
      checkbox.setAttribute("aria-label", "Tandai tugas selesai");

      checkbox.addEventListener("change", function () {
        const previous = task.done;
        task.done = checkbox.checked;

        if (saveTasks()) {
          renderTasks();
        } else {
          task.done = previous;
          renderTasks();
        }
      });

      const details = document.createElement("div");
      details.className = "task-details";

      const name = document.createElement("div");
      name.className = "task-name";
      name.textContent = task.name;

      const meta = document.createElement("div");
      meta.className = "task-meta";
      meta.textContent = task.subject +
        (task.date ? " · Tenggat: " + task.date : " · Tenggat belum ditentukan");

      details.append(name, meta);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-task";
      deleteButton.type = "button";
      deleteButton.textContent = "Hapus";

      deleteButton.addEventListener("click", function () {
        const previousTasks = tasks;
        tasks = tasks.filter(function (other) {
          return other.id !== task.id;
        });

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

  if (taskForm && taskNameInput && taskSubjectInput && taskDateInput) {
    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = taskNameInput.value.trim();
      const subject = taskSubjectInput.value.trim();
      const date = taskDateInput.value;

      if (!name || !subject) {
        alert("Isi nama tugas dan mata pelajaran terlebih dahulu.");
        return;
      }

      const newTask = {
        id: String(Date.now()) + "-" + Math.random().toString(16).slice(2),
        name: name,
        subject: subject,
        date: date,
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
  // 6. TAHUN FOOTER
  // ========================================

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  console.log("Website Kelas 8D berhasil memuat JavaScript.");
});
