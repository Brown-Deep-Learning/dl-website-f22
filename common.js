// keeps navbar visible at all times no matter how much the window is scrolled
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

// handles clicks on mobile menu
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


// Automatically release assignments and labs on website
function hideAssignmentContent(hwNumber) {
    const baseSelector = `.hw${hwNumber}-content`;

    // hide content on assignment page
    $(`main${baseSelector}`).css('text-align', 'center').html(
        '<h1>This assignment is not released yet!</h1>'
    );

    // disable links in assignments page
    $(`${baseSelector} a`).removeAttr("href").css({
        'text-decoration': 'none',
        'color': 'inherit',
        'cursor': 'not-allowed',
        'pointer-events': 'none',
    });
}
function hideLabContent(labNumber) {
    const baseSelector = `.lab${labNumber}-content`;

    // disable links in lab page
    $(`${baseSelector} a`).removeAttr("href").css({
        'text-decoration': 'none',
        'color': 'inherit',
        'cursor': 'not-allowed',
        'pointer-events': 'none',
    });
}
$(document).ready(function() {
    // disable assignment hiding until after the website launch date
    const currentDate = new Date();
    if (currentDate > (new Date('2020-09-09'))) {
        // assignments
        if (currentDate < (new Date('2020-09-14'))) { hideAssignmentContent(1); }
        if (currentDate < (new Date('2020-09-28'))) { hideAssignmentContent(2); }
        if (currentDate < (new Date('2020-10-14'))) { hideAssignmentContent(3); }
        if (currentDate < (new Date('2020-10-26'))) { hideAssignmentContent(4); }
        if (currentDate < (new Date('2020-11-02'))) { hideAssignmentContent(5); }
        if (currentDate < (new Date('2020-11-13'))) { hideAssignmentContent(6); }
        if (currentDate < (new Date('2020-11-20'))) { hideAssignmentContent(7); }
        
        // labs
        if (currentDate < (new Date('2020-09-09'))) { hideLabContent(0); }
        if (currentDate < (new Date('2020-09-16'))) { hideLabContent(1); }
        if (currentDate < (new Date('2020-09-23'))) { hideLabContent(2); }
        if (currentDate < (new Date('2020-09-30'))) { hideLabContent(3); }
        if (currentDate < (new Date('2020-10-07'))) { hideLabContent(4); }
        if (currentDate < (new Date('2020-10-14'))) { hideLabContent(5); }
        if (currentDate < (new Date('2020-10-21'))) { hideLabContent(6); }
        if (currentDate < (new Date('2020-10-28'))) { hideLabContent(7); }
        if (currentDate < (new Date('2020-11-18'))) { hideLabContent(8); }
        if (currentDate < (new Date('2020-12-02'))) { hideLabContent(9); }
    }
});
