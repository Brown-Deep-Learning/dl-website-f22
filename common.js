window.onscroll = function() {
    var header = document.getElementsByTagName("header")[0];
    var nav = document.getElementById('navbar');
    var top = header.clientHeight - nav.clientHeight;
    if (window.pageYOffset >= top) {
        nav.classList.add('fixed');
        nav.style["background-position-y"] = (-top + "px");
    } else {
        nav.classList.remove('fixed');
    }
};

function toggleMobileMenu(element) {
    element.classList.toggle('menu-open');
    document.querySelectorAll('.nav-link').forEach(link => {
        if (element.classList.contains('menu-open')) {
            link.style.display = 'block';
        } else {
            link.style.display = 'none';
        }
    })
}
