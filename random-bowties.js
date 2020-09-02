var root = "http://cs.brown.edu/courses/cs1470/"
// var root = ""

// function randomBowtie(img) {
//     var num_bowties = 5;
//     var i = Math.floor(Math.random() * num_bowties) + 1;
//     img.src = root + "img/bowties/bowties_" + i + ".png";
// }

function randomBowtie(img) {
    var num_bowties = 3;
    var i = Math.floor(Math.random() * num_bowties) + 1;
    img.src = root + "img/earmuffs_" + i + ".png";
}

window.onload = function() {
    var bowtie_imgs = document.getElementsByClassName("random-earmuffs");
    for (var i = 0; i < bowtie_imgs.length; i++) {
        randomBowtie(bowtie_imgs[i]);
        bowtie_imgs[i].style.visibility = "visible";
    }
};