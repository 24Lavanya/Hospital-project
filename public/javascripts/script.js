var header=document.getElementsByTagName("header");
window.onscroll=function() {scrollFunction()};

function scrollFunction(){
    if(document.body.scrollTop>200 || document.documentElement.scrollTop>200){
        header[0].setAttribute("class",".header-active");       
    }
    else{
       header[0].removeAttribute("class");
    }
}

const navUl=document.querySelector('.nav-menu ul')


document.getElementById('menu').addEventListener('click', function () {
    navUl.style.top = '100%';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('close').style.display='block'

});

document.getElementById('close').addEventListener('click', function () {
    navUl.style.top = '-500%';
    document.getElementById('menu').style.display = 'block'
    document.getElementById('close').style.display='none'
});