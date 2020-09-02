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

function changeImage(login) {
    login.src='img/hover/' + login.id + '.jpg';
}

function restoreImage(login) {
    login.src='img/portrait/' + login.id + '.jpg'
}
