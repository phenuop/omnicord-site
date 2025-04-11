document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector("nav ul");

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});

        // Custom Cursor Movement
        const smallCursor = document.querySelector('.cursor-small');
        const bigCursor = document.querySelector('.cursor-big');

        document.addEventListener('mousemove', (e) => {
            smallCursor.style.left = e.clientX + 'px';
            smallCursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                bigCursor.style.left = e.clientX + 'px';
                bigCursor.style.top = e.clientY + 'px';
            }, 50);
        });