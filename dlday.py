import csv


# def read_csv(file_path):
#     with open(file_path, 'r+') as f:
#         data = csv.DictReader(f)
#     return data


def generate_html(rows):
    html_template = f"""
    <!DOCTYPE html>
<html>

<head>
    <title>Deep Learning Day! | CS1470 - Deep Learning | Brown University</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,700,700i&display=swap" rel="stylesheet">
    <link rel="preload" as="font" type="font/woff2" href="assets/inter-latin.woff2" crossorigin>
    <link rel="preload" as="font" type="font/woff2" href="assets/krona-one-latin.woff2" crossorigin>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="normalize.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script type="text/javascript" src="random-bowties.js"></script>
    <script type="text/javascript" src="common.js"></script>
</head>

<body>
    <header>
        <div class="page__header">
            <div class="page__title">
                <img src="assets/sparkles/sparkle4.png" />
                Deep Learning Day!
            </div>
            <div class="page__header__quote">
                "When I first saw Blueno, I was deeply starstruck."
            </div>
            <nav id="navbar">
                <button id="hamburger" onclick="toggleMobileMenu(this)">
                    <div id="hamburger-bar-1"></div>
                    <div id="hamburger-bar-2"></div>
                    <div id="hamburger-bar-3"></div>
                </button>
                <a class="nav-link" href="index.html">Home</a>
                <a class="nav-link" href="resources.html">Resources</a>
                <a class="nav-link" href="lectures.html">Lectures</a>
                <a class="nav-link" href="assignments.html">Assignments</a>
                <a class="nav-link" href="labs.html">Labs</a>
                <a class="nav-link" href="calendar.html">Calendar &amp; Hours</a>
                <a class="nav-link" href="staff.html">Staff</a>
                <a class="nav-link" href="dlday.html">DL Day</a>
            </nav>
        </div>
    </header>
    <main class="dark">
        <section style="padding-bottom: 60px;">
            <h1>Deep Learning Day!</h1>
            <font size="2">
            <table>
                <thead>
                    <tr>
                        <th style="width:20%">Time</th>
                        <th style="width:40%">Title</th>
                        <th style="width:20%">Recording or Live</th>
                        <th style="width:20%">Team Name</th>
                        <th style="width:30%">Team Type</th>
                        <th style="width:80%">Members</th>
                    </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
            </font>
              
        </section>
    </main>

    <footer class="dark-footer">
        <img id="footer-earmuffs" class="random-earmuffs" src="img/sparkle.png">
        <ul class="menu">
            <li>&copy; 2022 CS1470 TA Staff | Computer Science Department | Brown University</li>
        </ul>
        <br>
    </footer>
</body>

</html>
"""
    with open("dlday.html", "w+") as out:
        out.write(html_template)
    out.close()


def generate_rows(file_path):
    rows = []
    with open(file_path, 'r+') as f:
        data = csv.DictReader(f)
        for row in data:
            r = dict(row)
            if r.get("title") is None or r.get("title") == "":
                continue
            if "Session" in r.get("title") or "Poster Session" in r.get("title") or "Opening" in r.get(
                    "title") or "Closing" in r.get("title"):
                rows.append(f"""
                <tr class="week-header">
                            <td>{r.get("time")}</td>
                            <td>{r.get("title")}</td>
                            <td>{r.get("recording_live")}</td>
                            <td>{r.get("team_name")}</td>
                            <td>{r.get("team_type")}</td>
                            <td>{r.get("members")}</td>
                </tr>
                \n""")
            else:
                rows.append(
                    f"""
                                <tr>
                                            <td>{r.get("time")}</td>
                                            <td>{r.get("title")}</td>
                                            <td>{r.get("recording_live")}</td>
                                            <td>{r.get("team_name")}</td>
                                            <td>{r.get("team_type")}</td>
                                            <td>{r.get("members")}</td>
                                </tr>
                                \n"""
                )
    f.close()
    return "".join(rows)


def main():
    rows = generate_rows(file_path="dlday_schedule.csv")
    generate_html(rows)


main()
