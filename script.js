```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KELAS 8D | Ocean World</title>
  <meta name="theme-color" content="#063b5b">
  <link rel="stylesheet" href="./style.css">
  <script src="./script.js" defer></script>
</head>
<body>

  <!-- Latar belakang laut -->
  <div class="video-background" aria-hidden="true">
    <video id="background-video" autoplay muted loop playsinline>
      <source src="./assets/background.mp4" type="video/mp4">
    </video>
  </div>
  <div class="background-overlay"></div>

  <div class="ocean-bg" aria-hidden="true">
    <span class="fish fish-1">🐠</span>
    <span class="fish fish-2">🐟</span>
    <span class="fish fish-3">🐡</span>
    <span class="fish fish-4">🐠</span>
    <span class="bubble bubble-1"></span>
    <span class="bubble bubble-2"></span>
    <span class="bubble bubble-3"></span>
    <span class="bubble bubble-4"></span>
    <span class="bubble bubble-5"></span>
  </div>

  <!-- Header -->
  <header class="header">
    <a href="#" class="brand" data-page="beranda">
      <span class="brand-icon">🌊</span>
      <span>
        <strong>KELAS 8D</strong>
        <small>One Class, One Family</small>
      </span>
    </a>

    <button class="menu-toggle" id="menu-toggle"
      aria-label="Buka menu" aria-expanded="false">☰</button>

    <nav class="nav" id="main-nav" aria-label="Navigasi utama">
      <button class="nav-link active" data-page="beranda">🏠 Beranda</button>
      <button class="nav-link" data-page="pelajaran">📚 Pelajaran</button>
      <button class="nav-link" data-page="seragam">👕 Seragam</button>
      <button class="nav-link" data-page="piket">🧹 Piket</button>
      <button class="nav-link" data-page="tugas">📝 Tugas</button>
      <button class="nav-link" data-page="pengumuman">📢 Pengumuman</button>
    </nav>
  </header>

  <main class="container">

    <!-- BERANDA -->
    <section class="page active" id="page-beranda">
      <div class="hero glass">
        <div class="hero-content">
          <span class="eyebrow">WELCOME TO OUR OCEAN</span>
          <h1>Selamat Datang di <span>Kelas 8D!</span></h1>
          <p>
            Tempat kita belajar, tumbuh, bekerja sama, dan menciptakan
            kenangan indah bersama. Jelajahi dunia kelas kita!
          </p>

          <div class="hero-buttons">
            <button class="primary-button" data-go="pelajaran">
              📚 Lihat Pelajaran
            </button>
            <button class="secondary-button" data-go="pengumuman">
              📢 Pengumuman
            </button>
          </div>

          <div class="hero-stats">
            <div><strong>🌊 8D</strong><span>Kelas kita</span></div>
            <div><strong>🤝 Kompak</strong><span>Selalu bersama</span></div>
            <div><strong>⭐ Semangat</strong><span>Raih prestasi</span></div>
          </div>
        </div>

        <div class="hero-art" aria-hidden="true">
          <div class="sun-glow"></div>
          <span class="big-fish">🐬</span>
          <span class="little-fish">🐠</span>
          <span class="coral">🪸</span>
          <span class="shell">🐚</span>
          <span class="art-bubble art-bubble-one"></span>
          <span class="art-bubble art-bubble-two"></span>
          <span class="art-bubble art-bubble-three"></span>
        </div>
      </div>

      <div class="section-heading">
        <span class="eyebrow">EXPLORE OUR CLASS</span>
        <h2>Ada Apa di Kelas Kita?</h2>
        <p>Pilih menu untuk melihat informasi kelas.</p>
      </div>

      <div class="info-grid">
        <button class="info-card" data-go="pelajaran">
          <span class="card-icon blue">📚</span>
          <span class="card-title">Jadwal Pelajaran</span>
          <span class="card-description">Lihat jadwal belajar setiap hari.</span>
          <span class="card-arrow">Buka halaman →</span>
        </button>

        <button class="info-card" data-go="seragam">
          <span class="card-icon orange">👕</span>
          <span class="card-title">Jadwal Seragam</span>
          <span class="card-description">Cari tahu seragam yang digunakan.</span>
          <span class="card-arrow">Buka halaman →</span>
        </button>

        <button class="info-card" data-go="piket">
          <span class="card-icon green">🧹</span>
          <span class="card-title">Jadwal Piket</span>
          <span class="card-description">Jaga kelas agar tetap bersih.</span>
          <span class="card-arrow">Buka halaman →</span>
        </button>

        <button class="info-card" data-go="tugas">
          <span class="card-icon purple">📝</span>
          <span class="card-title">Daftar Tugas</span>
          <span class="card-description">Catat dan pantau tugas sekolah.</span>
          <span class="card-arrow">Buka halaman →</span>
        </button>
      </div>

      <div class="notice glass">
        <span class="notice-icon">💡</span>
        <div>
          <h3>Semangat Belajar!</h3>
          <p>Jangan lupa mengerjakan tugas, menjaga kebersihan,
          dan saling membantu sesama teman.</p>
        </div>
      </div>
    </section>

    <!-- PELAJARAN -->
    <section class="page" id="page-pelajaran">
      <div class="page-heading glass">
        <span class="eyebrow">OUR LEARNING SCHEDULE</span>
        <h1>📚 Jadwal Pelajaran</h1>
        <p>Pilih hari untuk melihat jadwal pelajaran.</p>
      </div>

      <div class="day-tabs" id="day-tabs">
        <button class="day-tab active" data-day="Senin">Senin</button>
        <button class="day-tab" data-day="Selasa">Selasa</button>
        <button class="day-tab" data-day="Rabu">Rabu</button>
        <button class="day-tab" data-day="Kamis">Kamis</button>
        <button class="day-tab" data-day="Jumat">Jumat</button>
        <button class="day-tab" data-day="Sabtu">Sabtu</button>
      </div>

      <div class="table-card glass">
        <div class="table-heading">
          <div>
            <span class="eyebrow">DAFTAR MATA PELAJARAN</span>
            <h2 id="schedule-title">Jadwal Hari Senin</h2>
          </div>
          <span class="table-badge">KELAS 8D</span>
        </div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr><th>No.</th><th>Waktu</th><th>Mata Pelajaran</th></tr>
            </thead>
            <tbody id="schedule-body"></tbody>
          </table>
        </div>
        <p class="table-note">
          Catatan: Ganti contoh jadwal di file JavaScript sesuai jadwal
          resmi kelasmu.
        </p>
      </div>
    </section>

    <!-- SERAGAM -->
    <section class="page" id="page-seragam">
      <div class="page-heading glass">
        <span class="eyebrow">SCHOOL UNIFORM</span>
        <h1>👕 Jadwal Seragam</h1>
        <p>Perhatikan seragam sebelum berangkat sekolah.</p>
      </div>

      <div class="uniform-grid">
        <article class="uniform-card glass">
          <div class="uniform-emoji">👔</div>
          <span class="uniform-day">SENIN</span>
          <h2>Seragam Putih</h2>
          <p>Gunakan seragam sesuai ketentuan sekolah.</p>
        </article>
        <article class="uniform-card glass">
          <div class="uniform-emoji">🟦</div>
          <span class="uniform-day">SELASA</span>
          <h2>Seragam Sekolah</h2>
          <p>Sesuaikan dengan peraturan seragam sekolah.</p>
        </article>
        <article class="uniform-card glass">
          <div class="uniform-emoji">🧵</div>
          <span class="uniform-day">RABU</span>
          <h2>Seragam Sekolah</h2>
          <p>Pastikan seragam bersih dan rapi.</p>
        </article>
        <article class="uniform-card glass">
          <div class="uniform-emoji">👖</div>
          <span class="uniform-day">KAMIS</span>
          <h2>Seragam Sekolah</h2>
          <p>Ikuti ketentuan seragam yang berlaku.</p>
        </article>
        <article class="uniform-card glass">
          <div class="uniform-emoji">🕌</div>
          <span class="uniform-day">JUMAT</span>
          <h2>Seragam Jumat</h2>
          <p>Sesuaikan dengan aturan sekolah.</p>
        </article>
        <article class="uniform-card glass">
          <div class="uniform-emoji">🏃</div>
          <span class="uniform-day">OLAHRAGA</span>
          <h2>Seragam Olahraga</h2>
          <p>Gunakan pada hari olahraga sesuai jadwal.</p>
        </article>
      </div>
    </section>

    <!-- PIKET -->
    <section class="page" id="page-piket">
      <div class="page-heading glass">
        <span class="eyebrow">KEEP OUR CLASS CLEAN</span>
        <h1>🧹 Jadwal Piket</h1>
        <p>Contoh pembagian piket. Ubah nama sesuai kelompok kelasmu.</p>
      </div>

      <div class="piket-grid">
        <article class="piket-card glass">
          <h3>🌊 Senin</h3>
          <ul><li>Nama siswa 1</li><li>Nama siswa 2</li><li>Nama siswa 3</li></ul>
        </article>
        <article class="piket-card glass">
          <h3>🐠 Selasa</h3>
          <ul><li>Nama siswa 4</li><li>Nama siswa 5</li><li>Nama siswa 6</li></ul>
        </article>
        <article class="piket-card glass">
          <h3>🐬 Rabu</h3>
          <ul><li>Nama siswa 7</li><li>Nama siswa 8</li><li>Nama siswa 9</li></ul>
        </article>
        <article class="piket-card glass">
          <h3>🐚 Kamis</h3>
          <ul><li>Nama siswa 10</li><li>Nama siswa 11</li><li>Nama siswa 12</li></ul>
        </article>
        <article class="piket-card glass">
          <h3>🪸 Jumat</h3>
          <ul><li>Nama siswa 13</li><li>Nama siswa 14</li><li>Nama siswa 15</li></ul>
        </article>
        <article class="piket-card glass">
          <h3>⭐ Sabtu</h3>
          <ul><li>Nama siswa 16</li><li>Nama siswa 17</li><li>Nama siswa 18</li></ul>
        </article>
      </div>
    </section>

    <!-- TUGAS -->
    <section class="page" id="page-tugas">
      <div class="page-heading glass">
        <span class="eyebrow">HOMEWORK TRACKER</span>
        <h1>📝 Daftar Tugas</h1>
        <p>Tambahkan tugas dan tandai jika sudah selesai.</p>
      </div>

      <form class="task-form glass" id="task-form">
        <div class="form-field">
          <label for="task-name">Nama tugas</label>
          <input id="task-name" name="task-name" required maxlength="120"
            placeholder="Contoh: Kerjakan halaman 20">
        </div>
        <div class="form-field">
          <label for="task-subject">Mata pelajaran</label>
          <input id="task-subject" name="task-subject" required maxlength="60"
            placeholder="Contoh: Matematika">
        </div>
        <div class="form-field">
          <label for="task-date">Batas pengumpulan</label>
          <input id="task-date" name="task-date" type="date">
        </div>
        <button class="primary-button" type="submit">＋ Tambah Tugas</button>
      </form>

      <div class="task-list glass">
        <div class="table-heading">
          <h2>Tugas Saya</h2>
          <span class="table-badge" id="task-count">0 tugas</span>
        </div>
        <div class="tasks-container" id="tasks-container"></div>
      </div>
    </section>

    <!-- PENGUMUMAN -->
    <section class="page" id="page-pengumuman">
      <div class="page-heading glass">
        <span class="eyebrow">LATEST INFORMATION</span>
        <h1>📢 Pengumuman Kelas</h1>
        <p>Informasi penting untuk teman-teman kelas 8D.</p>
      </div>

      <div class="announcement-list">
        <article class="announcement glass">
          <div class="announcement-icon">📚</div>
          <div>
            <span class="announcement-label">PENGINGAT</span>
            <h2>Persiapkan Perlengkapan Belajar</h2>
            <p>Periksa jadwal dan siapkan buku sesuai mata pelajaran.</p>
          </div>
        </article>
        <article class="announcement glass">
          <div class="announcement-icon">🧹</div>
          <div>
            <span class="announcement-label">KEBERSIHAN</span>
            <h2>Jaga Kebersihan Kelas</h2>
            <p>Laksanakan piket dan buang sampah pada tempatnya.</p>
          </div>
        </article>
        <article class="announcement glass">
          <div class="announcement-icon">⏰</div>
          <div>
            <span class="announcement-label">KEDISIPLINAN</span>
            <h2>Datang Tepat Waktu</h2>
            <p>Usahakan hadir tepat waktu dan patuhi aturan sekolah.</p>
          </div>
        </article>
        <article class="announcement glass">
          <div class="announcement-icon">🤝</div>
          <div>
            <span class="announcement-label">KEBERSAMAAN</span>
            <h2>Saling Membantu</h2>
            <p>Jaga kekompakan dan saling membantu saat belajar.</p>
          </div>
        </article>
      </div>
    </section>

  </main>

  <footer class="footer">
    <div class="footer-wave">🌊 🐠 🪸 🐬 🌊</div>
    <p><strong>KELAS 8D</strong> — One Class, One Family</p>
    <small>Belajar bersama, tumbuh bersama, sukses bersama.</small>
  </footer>

  <button class="back-to-top" id="back-to-top"
    aria-label="Kembali ke atas">↑</button>

</body>
</html>
```
