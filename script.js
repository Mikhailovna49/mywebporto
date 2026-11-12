// =========================================
// 1. MENAMPILKAN TAHUN SECARA OTOMATIS
// =========================================

// Mengambil elemen tahun pada bagian footer.
const yearElement = document.getElementById("year");

// Mengisi tahun berdasarkan waktu perangkat pengunjung.
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// =========================================
// 2. NAVIGASI ANTARBAGIAN WEBSITE
// =========================================

// Mengambil tautan navigasi yang mengarah ke bagian halaman.
const navigationLinks = document.querySelectorAll('.navbar a[href^="#"]');

// Menambahkan perilaku scroll halus pada navigasi.
navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        // Membaca ID tujuan dari atribut href.
        const targetId = link.getAttribute("href");

        // Mengambil bagian halaman yang dituju.
        const targetSection = document.querySelector(targetId);

        // Memastikan bagian tujuan tersedia.
        if (targetSection) {
            event.preventDefault();

            // Menggulir halaman menuju bagian tujuan.
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            targetSection.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });

            // Memperbarui alamat halaman tanpa memuat ulang.
            history.replaceState(null, "", targetId);
        }
    });
});

// =========================================
// 3. ANIMASI SAAT BAGIAN MASUK KE LAYAR
// =========================================

// Memeriksa dukungan Intersection Observer pada browser.
if ("IntersectionObserver" in window) {
    const sections = document.querySelectorAll("main > section");

    // Mengamati bagian halaman yang masuk ke area layar.
    const sectionObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Memberi penanda bahwa bagian sudah terlihat.
                    entry.target.classList.add("is-visible");

                    // Berhenti mengamati setelah bagian terlihat.
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08
        }
    );

    // Mendaftarkan setiap bagian untuk diamati.
    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
} else {
    // Fallback untuk browser yang tidak mendukung observer.
    document.querySelectorAll("main > section").forEach((section) => {
        section.classList.add("is-visible");
    });
}
