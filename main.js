const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

menuBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

/* Fungsi Navigasi dengan Delay Animasi */
function navTo(url) {
    // Memberikan sedikit jeda agar animasi klik (scale) terlihat dulu
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}
