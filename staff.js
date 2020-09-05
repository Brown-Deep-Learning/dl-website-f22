
function changeImage(login) {
  // login.src='img/hover/' + login.id + '.jpg';
}

function restoreImage(login) {
  // login.src='img/portrait/' + login.id + '.jpg'
}

function createStaffCard(staffObject) {
  const {
    name, login, pronouns, homeTown, year, blurb, quote
  } = staffObject;
  // const imagePath = `img/portrait/${login}.jpg`;
  const imagePath = `assets/blueno_staff.png`;

  //<img id=${login} class='staff-pic' src='${imagePath}' alt="${name} is doing something fun!" onmouseover='changeImage(this)' onmouseout='restoreImage(this)'/>
  return (`
    <div class="staff">
      <div class="staff-img-container">
        <div id=${login} class='staff-pic' style='background-image:url(${imagePath})' alt="${name} is doing something fun!" onmouseover='changeImage(this)' onmouseout='restoreImage(this)'/>
      </div>
      <div class="staff-text-container">
        <p>
          <strong>${name}</strong> (${login})<br/>
          <strong>Pronouns:</strong> ${pronouns} <br/>
          <strong>Year:</strong> ${year} <br/>
          <strong>Hometown:</strong> ${homeTown} <br/>
          <strong>About:</strong>${blurb} <br/>
          <strong>What will Blueno do in space?</strong> ${quote}
        </p>
      </div>
    </div>
  `);
}

$(document).ready(function () {
  const instructors = ['dritchi1'];
  const htas = ['kdu3', 'bblinn', 'glee43', 'kpal1'];
  $.ajax({
    type: "GET",
    url: "./staff_info.csv",
    dataType: "text",
    success: function (response) {
      const table = $.csv.toArrays(response).splice(1);
      table.forEach(row => {
        const [name, login, email, number, pronouns, homeTown, year, blurb, quote] = row;
        const staffObject = { name, login, email, number, pronouns, homeTown, year, blurb, quote };
        if (instructors.includes(login)) {
          $('#instructors').append(createStaffCard(staffObject));
        } else if (htas.includes(login)) {
          $('#htas').append(createStaffCard(staffObject));
        } else {
          $('#tas').append(createStaffCard(staffObject));
        }
      });
    }
  });
});
