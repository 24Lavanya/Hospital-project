const nav = document.querySelector('.nav-wrapper')
const menu=document.getElementById('menu')
const close=document.getElementById('close')

menu.addEventListener('click', function () {
    console.log('clicked')
    nav.style.transform = 'translateY(500px)';
    menu.style.display="none"
    close.style.display = "flex"
});

close.addEventListener('click', function () {
    nav.style.transform = 'translateY(-500px)';
    menu.style.display="flex"
    close.style.display = "none"
});