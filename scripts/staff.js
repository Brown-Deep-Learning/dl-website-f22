// function changeImage(login) {
//   const imagePath = `img/hover/${login.id}.jpg`;
//   $(login).css(
//     'background-image',
//     `url(${imagePath}), url(assets/blueno_staff.png)`
//   );
// }

// function restoreImage(login) {
//   const imagePath = `img/portrait/${login.id}.jpg`;
//   $(login).css(
//     'background-image',
//     `url(${imagePath}), url(assets/blueno_staff.png)`
//   );
// }

function createStaffCard(staffObject) {
  let {
    name, login, pronouns, intro
  } = staffObject;

  // Formatting and seeting defaults
  if (pronouns)
    pronouns = pronouns.toLowerCase();
  if (intro === '') { intro = 'The mystery deepens...'; }

  const imagePath = `img/portrait/${name.replaceAll(' ', '_').replaceAll('(', '\\(').replaceAll(')', '\\)')}.png`;
  return (`
    <div class="staff">
      <div class="staff-img-container">
        <div
          id=${login}
          class="staff-pic"
          style="background-image:url(${imagePath}), url(assets/blueno_staff.png)"
          alt="${name} is doing something fun!"
           >
        </div>
      </div>
      <div class="staff-text">
        <p><strong>${name}</strong> (${login}) </p>
        <p><strong>Pronouns:</strong> ${pronouns} </p>
        <p><strong>About:</strong> ${intro} </p>
      </div>
    </div>
  `);
}

$(document).ready(function () {
  const instructors = ['chen_sun4'];
  const htas = ['vkudlay', 'mramesh5', 'yguo62'];
  const stas = ['khanda1', 'achinta2'];
  $.ajax({
    type: "GET",
    url: "./sheets/DL_TA_List.csv",
    dataType: "text",
    success: function (response) {
      const table = response.split(/\n/).slice(1);
      table.forEach(row => {
        row = $.csv.toArray(row)
        const [timestamp, name, login, conc, pronouns, intro, profpic, home] = row;
        const staffObject = { name, login, pronouns, intro};
        if (instructors.includes(login)) {
          $('#instructors').append(createStaffCard(staffObject));
        } else if (htas.includes(login)) {
          $('#htas').append(createStaffCard(staffObject));
        } else if (stas.includes(login)) {
          $('#stas').append(createStaffCard(staffObject));
        }
        else {
          $('#tas').append(createStaffCard(staffObject));
        }
      });
    }
  });
});