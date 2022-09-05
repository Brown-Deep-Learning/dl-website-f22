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

function randomBowtie(img) {
    var num_bowties = 7;
    var i = Math.floor(Math.random() * num_bowties) + 1;
    img.src = 'assets/sparkles/sparkle' + i + '.png';
}

function load_randoms() {
    var img_elements = $('.random-earmuffs');
    for (var i = 0; i < img_elements.length; i++) {
        randomBowtie(img_elements[i]);
        img_elements[i].style.visibility = 'visible';
    }
};


$(window).on('load', () => {
    $('footer').load('footer.html', null, () => {
        load_randoms();
    });
});

$(window).on('ready', () => {

    // disable assignment hiding until after the website launch date or if
    // debug search param in url is set
    const currentDate = new Date();
    const searchParams = new URLSearchParams(window.location.search);
    if (currentDate > (new Date('2022-09-08')) && !searchParams.has('debug')) {
        // assignments
        if (currentDate < (new Date('Jan 14 2022 00:00:00 EDT'))) { hideAssignmentContent(1); }
        if (currentDate < (new Date('Jan 22 2022 00:00:00 EDT'))) { hideAssignmentContent(2); }
        if (currentDate < (new Date('Jan 14 2022 00:00:00 EDT'))) { hideAssignmentContent(3); }
        if (currentDate < (new Date('Jan 24 2022 00:00:00 EDT'))) { hideAssignmentContent(4); }
        if (currentDate < (new Date('Jan 04 2022 00:00:00 EST'))) { hideAssignmentContent(5); }
        if (currentDate < (new Date('Jan 13 2022 00:00:00 EST'))) { hideAssignmentContent(6); }
        if (currentDate < (new Date('Jan 24 2022 00:00:00 EST'))) { hideAssignmentContent(7); }
        
        // labs
        if (currentDate < (new Date('Jan 09 2022 00:00:00 EDT'))) { hideLabContent(0); }
        if (currentDate < (new Date('Jan 21 2022 00:00:00 EDT'))) { hideLabContent(1); }
        if (currentDate < (new Date('Jan 24 2022 00:00:00 EDT'))) { hideLabContent(2); }
        if (currentDate < (new Date('Jan 05 2022 00:00:00 EDT'))) { hideLabContent(3); }
        if (currentDate < (new Date('Jan 12 2022 00:00:00 EDT'))) { hideLabContent(4); }
        if (currentDate < (new Date('Jan 19 2022 00:00:00 EDT'))) { hideLabContent(5); }
        if (currentDate < (new Date('Jan 24 2022 00:00:00 EDT'))) { hideLabContent(6); }
        if (currentDate < (new Date('Jan 02 2022 00:00:00 EST'))) { hideLabContent(7); }
        if (currentDate < (new Date('Jan 16 2022 00:00:00 EST'))) { hideLabContent(8); }
        if (currentDate < (new Date('Jan 23 2022 00:00:00 EST'))) { hideLabContent(9); }
    }
});
