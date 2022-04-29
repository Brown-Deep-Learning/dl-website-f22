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
                <!--a class="nav-link" href="dlday.html">DL Day</a-->
            </nav>
        </div>
    </header>
    <main class="dark">
        <section style="padding-bottom: 60px;">
            <h1>Deep Learning Day!</h1>
            <font size="2" style='line-height: 1.5'>
            <table style='background-color: #4e70c6;'>
                <thead>
                    <tr style="font-size: 1.4em">
                        <th style="width:10%; padding: 10px; text-align:center;">Time</th>
                        <th style="width:50%; padding: 10px;">Title</th>
                        <th style="width:40%; padding: 10px;">Members</th>
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


def generate_rows(file_path):
    rows = []
    group_colors = [None, 'none', 'deepskyblue', 'orchid', 'none', 'yellowgreen', 'orange', 'tomato', 'none']
    group_idx = 0
    with open(file_path, 'r+') as f:
        data = csv.DictReader(f)
        for row in data:
            r = dict(row)
            if r.get("Title") is None:
                continue
            c1_txt = r.get("Time")
            c2_txt = r.get("Title")
            c3_txt = r.get("Members")
            if all(value == '' for value in [c1_txt, c2_txt, c3_txt]):
                tr_tags = f'<tr style="background-color: #1B2367 !important;">', '</tr>'
            elif 'parallel' in c2_txt:
                tr_tags = f'<tr class="week-header" style="font-size: 1.2em; background-color: {group_colors[group_idx]} !important;">', '</tr>'
            elif any(head in c2_txt for head in ['Opening', 'Closing', 'Session', 'Lunch Break']):
                group_idx += 1
                tr_tags = f'<tr class="week-header" style="font-size: 1.4em; background-color: {group_colors[group_idx]} !important;">', '</tr>'
            else: 
                tr_tags = '<tr>', '</tr>'
                cut_char = '!' if '!' in c2_txt[:-1] else ''
                cut_char = ':' if ':' in c2_txt[:-1] else cut_char
                if cut_char != '':
                    cut_idx = c2_txt.index(cut_char)+1
                    c2_txt = f'<b>{c2_txt[:cut_idx]}</b><br>{c2_txt[cut_idx:]}'
                else: 
                    c2_txt = f'<b>{c2_txt}</b>'
                        
            rows.append(f"""
                {tr_tags[0]}
                    <td style='text-align:center;'>{c1_txt}</td>
                    <td style='padding-left:3px;'>{c2_txt}</td>
                    <td>{c3_txt}</td>
                {tr_tags[1]}
            \n""")
    return "".join(rows)


def main():
    rows = generate_rows(file_path="dlday_schedule.csv")
    generate_html(rows)


main()
