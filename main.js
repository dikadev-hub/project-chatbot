document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('text-slate-600');
            btn.classList.remove('text-red-500');
        });

        this.classList.add('active');
        this.classList.remove('text-slate-600');
        this.classList.add('text-red-500');
    });
});

function selectBot(botName) {
    console.log("Terminal " + botName + " dipilih.");
}
