document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    if(menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if(closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    if(overlay) overlay.addEventListener('click', toggleSidebar);

    const ripples = document.querySelectorAll('.ripple, .ripple-card, .nav-item, .sidebar-link');

    ripples.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 500);

            if (this.tagName === 'A' && this.getAttribute('href') !== '#' && !this.getAttribute('href').startsWith('javascript')) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            }
        });
    });
});
