
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
  pronouns = pronouns.toLowerCase();
  if (intro === '') { intro = 'The mystery deepens...'; }

  const imagePath = `img/portrait/${login}.jpg`;
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
  const instructors = ['rsingh47'];
  const htas = ['vkudlay', 'spai9'];
  $.ajax({
    type: "GET",
    url: "./staff_info_F2022.csv",
    dataType: "text",
    success: function (response) {
      const table = $.csv.toArrays(response).splice(1);
      table.forEach(row => {
        const [fullname, name, pronouns, login, intro] = row;
        const staffObject = { name, login, pronouns, intro};
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
