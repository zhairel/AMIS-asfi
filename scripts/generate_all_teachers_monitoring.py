import openpyxl, json, re, html, base64, os, importlib.util

print("=== Generating Master Unified Multi-Modality Daily Per-Teacher Portal ===")

REPO_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

AMIS_LOGO = os.path.join(REPO_DIR, 'public', 'amis_logo_opt.png')
DEPED_LOGO = os.path.join(REPO_DIR, 'public', 'deped_logo_opt.png')

OUTPUT_FILE = os.path.join(REPO_DIR, 'public', 'all-teachers-monitoring.html')
DAILY_FILE = os.path.join(REPO_DIR, 'public', 'daily-teacher-monitoring.html')
ROOT_OUTPUT_FILE = os.path.join(REPO_DIR, '..', 'all-teachers-monitoring.html')
ROOT_DAILY_FILE = os.path.join(REPO_DIR, '..', 'daily-teacher-monitoring.html')

with open(AMIS_LOGO, 'rb') as f:
    amis_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode('utf-8')

with open(DEPED_LOGO, 'rb') as f:
    deped_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode('utf-8')

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']

def load_mod(name, rel_path):
    p = os.path.join(REPO_DIR, rel_path)
    spec = importlib.util.spec_from_file_location(name, p)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

mod_f2f = load_mod("mod_f2f", "scripts/generate_teacher_monitoring.py")
mod_odl1 = load_mod("mod_odl1", "scripts/generate_odl_teacher_monitoring.py")
mod_odl2 = load_mod("mod_odl2", "scripts/generate_odl_second_shift_teacher.py")

f2f_teachers = []
for t in mod_f2f.teachers_list:
    f2f_teachers.append({
        'modality': 'f2f',
        'modality_lbl': 'Face-to-Face',
        'name': t['name'],
        'cat': t.get('cat', 'elem'),
        'dept': t.get('dept', 'Faculty'),
        'items': t['items']
    })

odl1_teachers = []
for t in mod_odl1.teachers_list:
    odl1_teachers.append({
        'modality': 'odl1',
        'modality_lbl': 'ODL First Shift',
        'name': t['name'],
        'cat': t.get('cat', 'elem'),
        'dept': t.get('dept', 'Faculty'),
        'items': t['items']
    })

odl2_teachers = []
for t in mod_odl2.teachers_list:
    odl2_teachers.append({
        'modality': 'odl2',
        'modality_lbl': 'ODL Second Shift',
        'name': t['name'],
        'cat': t.get('cat', 'elem'),
        'dept': t.get('dept', 'Faculty'),
        'items': t['items']
    })

all_teachers = f2f_teachers + odl1_teachers + odl2_teachers
print(f"Master Faculty Directory: F2F={len(f2f_teachers)}, ODL1={len(odl1_teachers)}, ODL2={len(odl2_teachers)}, Total={len(all_teachers)} teachers.")

html_out = []
html_out.append('''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&display=swap" rel="stylesheet">
  <title>Master Daily Per-Teacher Attendance Portal (All Modalities) - Al Munawwara Islamic School</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #0f172a;
      color: #0f172a;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #ffffff;
      border-bottom: 2px solid #e2e8f0;
      padding: 10px 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .toolbar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .toolbar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .toolbar-logo {
      height: 38px;
      width: auto;
      object-fit: contain;
    }
    .toolbar-title {
      font-size: 14px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge-master {
      background: #1e3a8a;
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.15s ease;
      border: 1px solid transparent;
      user-select: none;
    }
    .btn-outline {
      background: #ffffff;
      color: #334155;
      border-color: #cbd5e1;
    }
    .btn-outline:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #94a3b8;
    }
    .btn-primary {
      background: #059669;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #047857;
    }
    .btn-blue {
      background: #2563eb;
      color: #ffffff;
    }
    .btn-blue:hover {
      background: #1d4ed8;
    }

    /* MODALITY TABS BAR */
    .view-tabs {
      display: flex;
      gap: 6px;
      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: 1.5px solid #e2e8f0;
      overflow-x: auto;
    }
    .view-tab {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
    }
    .view-tab:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .view-tab.active {
      background: #064e3b;
      color: #ffffff;
      border-color: #064e3b;
      box-shadow: 0 2px 4px rgba(6, 78, 59, 0.2);
    }
    .tab-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #94a3b8;
    }
    .view-tab.active .tab-dot {
      background: #34d399;
    }

    /* FILTER BAR */
    .filter-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      background: #f8fafc;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    .filter-label {
      font-size: 11px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .dept-pill {
      background: #ffffff;
      color: #475569;
      border: 1px solid #cbd5e1;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .dept-pill:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .dept-pill.active {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
    }
    .select-box {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .select-box select, .select-box input {
      padding: 5px 8px;
      border-radius: 5px;
      border: 1px solid #cbd5e1;
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
      background: #ffffff;
      outline: none;
    }
    .select-box select:focus, .select-box input:focus {
      border-color: #059669;
      box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.15);
    }

    /* SHEETS CONTAINER */
    .sheet-wrapper {
      flex: 1;
      padding: 20px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      background: #0f172a;
    }

    .page-sheet {
      background: #ffffff;
      width: 210mm;
      min-height: 297mm;
      padding: 7mm 8mm;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      border-radius: 2px;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .page-sheet.hidden-sheet {
      display: none !important;
    }

    .arabic-header {
      font-family: 'Amiri', serif;
      font-size: 13.5pt;
      font-weight: 700;
      color: #064e3b;
      direction: rtl;
      line-height: 1.15;
      margin-bottom: 1px;
      text-align: center;
    }
    .school-name {
      font-size: 11pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      line-height: 1.15;
      text-align: center;
    }
    .form-title {
      font-size: 9.2pt;
      font-weight: 800;
      color: #064e3b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.15;
      text-align: center;
      margin-top: 1px;
    }
    .form-sub {
      font-size: 7.2pt;
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
      letter-spacing: 0.3px;
      text-align: center;
    }
    .sheet-header {
      display: grid;
      grid-template-columns: 60px 1fr 60px;
      align-items: center;
      padding-bottom: 6px;
      border-bottom: 1.5px solid #064e3b;
      margin-bottom: 6px;
    }
    .header-logo {
      height: 48px;
      width: auto;
      object-fit: contain;
    }

    /* META BOX */
    .meta-box {
      border: 1.5px solid #94a3b8;
      background: #f8fafc;
      border-radius: 4px;
      padding: 5px 9px;
      margin-bottom: 6px;
      display: grid;
      grid-template-columns: 1.3fr 1.2fr 1fr;
      gap: 3px 12px;
      font-size: 7.8pt;
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .meta-lbl {
      font-size: 7.5pt;
      font-weight: 700;
      color: #475569;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .meta-val {
      font-size: 8.2pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px dotted #94a3b8;
      flex: 1;
      min-height: 12px;
    }
    .td-bold {
      font-weight: 800;
      color: #064e3b;
    }

    /* TABLE */
    table.sheet-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.5pt;
      line-height: 1.15;
    }
    table.sheet-table th, table.sheet-table td {
      border: 1px solid #94a3b8;
      padding: 3.5px 4.5px;
      vertical-align: middle;
    }
    table.sheet-table thead th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 800;
      text-align: center;
      font-size: 7.5pt;
      padding: 4px 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .th-num { width: 3%; }
    .th-day { width: 6.5%; }
    .th-time { width: 16.5%; }
    .th-mins { width: 4.5%; }
    .th-in { width: 8%; }
    .th-out { width: 8%; }
    .th-grade { width: 13.5%; }
    .th-subject { width: 18.5%; }
    .th-room { width: 5%; }
    .th-status { width: 11.5%; }
    .th-remarks { width: 5%; }
    .td-center { text-align: center; }

    .day-cell {
      font-weight: 800;
      color: #064e3b;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 7.8pt;
      white-space: nowrap;
    }
    .time-slot {
      font-weight: 800;
      color: #0f172a;
      text-align: center;
      white-space: nowrap;
      font-size: 7.8pt;
      letter-spacing: 0.2px;
      font-variant-numeric: tabular-nums;
    }
    .subject-cell {
      font-weight: 900;
      color: #064e3b;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 8pt;
    }
    .grade-cell {
      font-weight: 700;
      color: #1e293b;
      font-size: 7.8pt;
      white-space: nowrap;
    }

    /* 2x2 STATUS GRID CHECKLIST */
    .status-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      font-size: 6.8pt;
      font-weight: 700;
    }
    .status-cell-row {
      display: flex;
      justify-content: space-between;
      gap: 3px;
    }
    .status-chk {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }
    .status-chk input {
      margin: 0;
      width: 10px;
      height: 10px;
      cursor: pointer;
    }

    .row-blank {
      background: #ffffff;
      height: 22px;
    }

    /* SIGNATURE FOOTER */
    .sign-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      font-size: 7.5pt;
      margin-top: auto;
      padding-top: 6px;
      border-top: 1.5px solid #cbd5e1;
    }
    .sign-col {
      text-align: center;
    }
    .sign-line {
      border-bottom: 1.5px solid #0f172a;
      height: 24px;
      margin-bottom: 4px;
    }
    .sign-label {
      font-weight: 800;
      color: #1e293b;
      text-transform: uppercase;
      font-size: 7pt;
      letter-spacing: 0.3px;
    }
    .sign-title {
      font-size: 6.8pt;
      color: #64748b;
      font-weight: 600;
    }

    /* PRINT RULES */
    @media print {
      html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: auto !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .toolbar, .no-print {
        display: none !important;
      }
      .sheet-wrapper {
        padding: 0 !important;
        margin: 0 !important;
        gap: 0 !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        background: #ffffff !important;
      }
      .page-sheet {
        box-shadow: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 4mm 6mm !important;
        width: 100% !important;
        max-width: 100% !important;
        height: 297mm !important;
        display: block !important;
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
        page-break-after: always !important;
        break-after: page !important;
      }
      .page-sheet.hidden-sheet {
        display: none !important;
      }
      .page-sheet:last-of-type {
        page-break-after: auto !important;
        break-after: auto !important;
      }
    }
  </style>
</head>
<body>

  <!-- TOP TOOLBAR -->
  <div class="toolbar no-print">
    <div class="toolbar-header">
      <div class="toolbar-brand">
        <img class="toolbar-logo deped-img" alt="DepEd Logo">
        <img class="toolbar-logo amis-img" alt="AMIS Logo">
        <div>
          <div class="toolbar-title">
            AL MUNAWWARA ISLAMIC SCHOOL
            <span class="badge-master">Master Teacher Attendance Portal</span>
          </div>
          <div style="font-size: 11.5px; color: #475569; font-weight: 600;">
            Unified Daily Instructional Attendance & Load Monitoring System (All Modalities &bull; S.Y. 2026 - 2027)
          </div>
        </div>
      </div>
      <div class="toolbar-actions">
        <a href="/f2f-monitoring.html" class="btn btn-outline">F2F Forms</a>
        <a href="/odl-first-shift.html" class="btn btn-outline">ODL 1st Forms</a>
        <a href="/odl-second-shift.html" class="btn btn-outline">ODL 2nd Forms</a>
        <button class="btn btn-outline" onclick="navigateTeacher(-1)" title="Previous Teacher">Prev</button>
        <button class="btn btn-outline" onclick="navigateTeacher(1)" title="Next Teacher">Next</button>
        <button class="btn btn-blue" onclick="printActiveTeacher()">Print Active Teacher</button>
        <button class="btn btn-primary" onclick="printAllInModality()">Print All in Modality</button>
      </div>
    </div>

    <!-- MODALITY TABS BAR -->
    <div class="view-tabs">
      <button class="view-tab active" id="tab-f2f" onclick="switchModality('f2f', this)">
        <span class="tab-dot"></span> Face-to-Face Daily Per-Teacher (''' + str(len(f2f_teachers)) + ''' Teachers)
      </button>
      <button class="view-tab" id="tab-odl1" onclick="switchModality('odl1', this)">
        <span class="tab-dot"></span> ODL First Shift Daily Per-Teacher (''' + str(len(odl1_teachers)) + ''' Teachers)
      </button>
      <button class="view-tab" id="tab-odl2" onclick="switchModality('odl2', this)">
        <span class="tab-dot"></span> ODL Second Shift Daily Per-Teacher (''' + str(len(odl2_teachers)) + ''' Teachers)
      </button>
      <button class="view-tab" id="tab-all" onclick="switchModality('all', this)">
        <span class="tab-dot"></span> All Modalities Combined Directory (''' + str(len(all_teachers)) + ''' Teachers)
      </button>
    </div>

    <!-- FILTER BAR -->
    <div class="filter-bar">
      <span class="filter-label">Department:</span>
      <button class="dept-pill active" onclick="filterDept('all', this)">All Faculty</button>
      <button class="dept-pill" onclick="filterDept('isal', this)">ISAL Faculty</button>
      <button class="dept-pill" onclick="filterDept('elem', this)">Elementary Faculty</button>
      <button class="dept-pill" onclick="filterDept('jhs', this)">Junior High Faculty</button>
      <button class="dept-pill" onclick="filterDept('shs', this)">Senior High Faculty</button>

      <div class="select-box">
        <input type="text" id="teacherSearch" placeholder="Search teacher name..." onkeyup="searchTeacherByName()">
        <span class="filter-label">Teacher:</span>
        <select id="teacherSelect" onchange="onTeacherSelectChange()">
''')

for idx, t in enumerate(all_teachers):
    mod_tag = f"[{t['modality_lbl']}]"
    opt_text = f"{t['name']} - {mod_tag} ({t['dept']})"
    html_out.append(f'          <option value="{idx}" data-mod="{t["modality"]}" data-cat="{t["cat"]}">{html.escape(opt_text)}</option>\n')

html_out.append('''        </select>
      </div>
    </div>
  </div>

  <!-- SHEETS CONTAINER -->
  <div class="sheet-wrapper" id="sheet-wrapper">
''')

for idx, t in enumerate(all_teachers):
    t_name_esc = html.escape(t['name'])
    dept_esc = html.escape(t['dept'])
    cat_esc = html.escape(t['cat'])
    mod_code = t['modality']
    mod_lbl = t['modality_lbl']
    items = t['items']

    hidden_cls = "" if idx == 0 else "hidden-sheet"

    html_out.append(f'''
    <!-- SHEET {idx}: {t_name_esc} ({mod_lbl}) -->
    <div class="page-sheet {hidden_cls}" 
         id="sheet-{idx}"
         data-idx="{idx}"
         data-teacher="{t_name_esc}"
         data-mod="{mod_code}"
         data-cat="{cat_esc}">
      
      <!-- HEADER -->
      <div class="sheet-header">
        <div style="text-align:left;">
          <img class="header-logo deped-img" alt="DepEd Logo">
        </div>
        <div>
          <div class="arabic-header" dir="rtl" lang="ar">المدرسة المنورة الإسلامية</div>
          <div class="school-name">AL MUNAWWARA ISLAMIC SCHOOL</div>
          <div class="form-title">TEACHER INSTRUCTIONAL ATTENDANCE & LOAD MONITORING RECORD</div>
          <div class="form-sub">{mod_lbl} Modality &bull; Faculty Monitoring Form &bull; School Year 2026 - 2027</div>
        </div>
        <div style="text-align:right;">
          <img class="header-logo amis-img" alt="AMIS Logo">
        </div>
      </div>

      <!-- TEACHER META BOX -->
      <div class="meta-box">
        <div class="meta-row"><span class="meta-lbl">Teacher's Name:</span><span class="meta-val td-bold">{t_name_esc}</span></div>
        <div class="meta-row"><span class="meta-lbl">Total Weekly Loads:</span><span class="meta-val td-bold">{len(items)} {mod_lbl} Classes</span></div>
        <div class="meta-row"><span class="meta-lbl">Room Assignment:</span><span class="meta-val">{"Virtual / Online" if "ODL" in mod_lbl else "Classroom"}</span></div>
        <div class="meta-row" style="grid-column: span 2;"><span class="meta-lbl">Week Monitored:</span><span class="meta-val"></span></div>
        <div class="meta-row"><span class="meta-lbl">School Year:</span><span class="meta-val">2026 - 2027</span></div>
      </div>

      <!-- TABLE -->
      <table class="sheet-table">
        <thead>
          <tr>
            <th class="th-num">#</th>
            <th class="th-day">Day</th>
            <th class="th-time">Scheduled Time</th>
            <th class="th-mins">Mins</th>
            <th class="th-in">Actual In</th>
            <th class="th-out">Actual Out</th>
            <th class="th-grade">Grade / Sec</th>
            <th class="th-subject">Subject / Learning Area</th>
            <th class="th-room">Room</th>
            <th class="th-status">Instruction Status</th>
            <th class="th-remarks">Signature</th>
          </tr>
        </thead>
        <tbody>''')

    row_num = 1
    for it in items:
        subj_upper = html.escape(it['subject'].upper())
        sec_short = html.escape(it['section'])
        m_val = it.get('mins', '40')
        d_abbr = it.get('day_abbr', it['day'][:3].upper())
        html_out.append(f'''
          <tr>
            <td class="td-center" style="font-weight:700;color:#64748b;">{row_num}</td>
            <td class="day-cell">{d_abbr}</td>
            <td class="time-slot">{it['time']}</td>
            <td class="td-center" style="font-weight:700;color:#475569;">{m_val}</td>
            <td class="td-center"></td>
            <td class="td-center"></td>
            <td class="grade-cell">{sec_short}</td>
            <td class="subject-cell">{subj_upper}</td>
            <td class="td-center"></td>
            <td>
              <div class="status-grid">
                <div class="status-cell-row">
                  <label class="status-chk"><input type="checkbox"> In</label>
                  <label class="status-chk"><input type="checkbox"> Late</label>
                </div>
                <div class="status-cell-row">
                  <label class="status-chk"><input type="checkbox"> Abs</label>
                  <label class="status-chk"><input type="checkbox"> Sub</label>
                </div>
              </div>
            </td>
            <td></td>
          </tr>''')
        row_num += 1

    blank_to_add = max(2, 14 - len(items))
    for b in range(blank_to_add):
        html_out.append(f'''
          <tr class="row-blank">
            <td class="td-center" style="color:#cbd5e1;font-weight:600;">{row_num}</td>
            <td></td>
            <td></td>
            <td></td>
            <td class="td-center"></td>
            <td class="td-center"></td>
            <td></td>
            <td style="color:#cbd5e1;font-size:7pt;font-weight:700;text-transform:uppercase;">(SUBSTITUTE / REMEDIAL LOAD)</td>
            <td></td>
            <td>
              <div class="status-grid">
                <div class="status-cell-row">
                  <label class="status-chk"><input type="checkbox"> In</label>
                  <label class="status-chk"><input type="checkbox"> Late</label>
                </div>
                <div class="status-cell-row">
                  <label class="status-chk"><input type="checkbox"> Abs</label>
                  <label class="status-chk"><input type="checkbox"> Sub</label>
                </div>
              </div>
            </td>
            <td></td>
          </tr>''')
        row_num += 1

    html_out.append(f'''
        </tbody>
      </table>

      <!-- SIGNATURE BLOCK -->
      <div class="sign-row">
        <div class="sign-col">
          <div class="sign-line"></div>
          <div class="sign-label">{t_name_esc}</div>
          <div class="sign-title">Teacher's Signature over Printed Name</div>
        </div>
        <div class="sign-col">
          <div class="sign-line"></div>
          <div class="sign-label">Academic Coordinator / Department Head</div>
          <div class="sign-title">Verified & Monitored By</div>
        </div>
        <div class="sign-col">
          <div class="sign-line"></div>
          <div class="sign-label">School Principal / Directress</div>
          <div class="sign-title">Approved By</div>
        </div>
      </div>
    </div>
''')

html_out.append('''
  </div>

  <script>
    const AMIS_LOGO_SRC = "''' + amis_b64 + '''";
    const DEPED_LOGO_SRC = "''' + deped_b64 + '''";

    let currentModality = 'f2f';
    let currentDept = 'all';
    let activeIndex = 0;

    function populateLogos() {
      document.querySelectorAll('.amis-img').forEach(img => { img.src = AMIS_LOGO_SRC; });
      document.querySelectorAll('.deped-img').forEach(img => { img.src = DEPED_LOGO_SRC; });
    }

    function switchModality(mod, btn) {
      currentModality = mod;
      document.querySelectorAll('.view-tab').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      filterDept(currentDept, null);
    }

    function filterDept(dept, btn) {
      currentDept = dept;
      if (btn) {
        document.querySelectorAll('.dept-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }

      const select = document.getElementById('teacherSelect');
      let firstVisibleIdx = null;

      for (let i = 0; i < select.options.length; i++) {
        const opt = select.options[i];
        const optMod = opt.getAttribute('data-mod');
        const optCat = opt.getAttribute('data-cat');

        let matchMod = (currentModality === 'all' || optMod === currentModality);
        let matchDept = (currentDept === 'all' || optCat === currentDept);

        if (matchMod && matchDept) {
          opt.style.display = '';
          if (firstVisibleIdx === null) firstVisibleIdx = parseInt(opt.value, 10);
        } else {
          opt.style.display = 'none';
        }
      }

      if (firstVisibleIdx !== null) {
        select.value = firstVisibleIdx;
        showTeacher(firstVisibleIdx);
      } else {
        document.querySelectorAll('.page-sheet').forEach(sh => sh.classList.add('hidden-sheet'));
      }
    }

    function onTeacherSelectChange() {
      const select = document.getElementById('teacherSelect');
      const idx = parseInt(select.value, 10);
      showTeacher(idx);
    }

    function showTeacher(idx) {
      activeIndex = idx;
      document.querySelectorAll('.page-sheet').forEach(sh => {
        const shIdx = parseInt(sh.getAttribute('data-idx'), 10);
        if (shIdx === idx) {
          sh.classList.remove('hidden-sheet');
        } else {
          sh.classList.add('hidden-sheet');
        }
      });
    }

    function navigateTeacher(dir) {
      const select = document.getElementById('teacherSelect');
      const visibleOpts = Array.from(select.options).filter(opt => opt.style.display !== 'none');
      if (!visibleOpts.length) return;

      const currentOptIdx = visibleOpts.findIndex(opt => parseInt(opt.value, 10) === activeIndex);
      let newOptIdx = currentOptIdx + dir;
      if (newOptIdx < 0) newOptIdx = visibleOpts.length - 1;
      if (newOptIdx >= visibleOpts.length) newOptIdx = 0;

      const newIdx = parseInt(visibleOpts[newOptIdx].value, 10);
      select.value = newIdx;
      showTeacher(newIdx);
    }

    function searchTeacherByName() {
      const q = document.getElementById('teacherSearch').value.toLowerCase().trim();
      const select = document.getElementById('teacherSelect');
      let firstVisibleIdx = null;

      for (let i = 0; i < select.options.length; i++) {
        const opt = select.options[i];
        const optMod = opt.getAttribute('data-mod');
        const optCat = opt.getAttribute('data-cat');
        const text = opt.text.toLowerCase();

        let matchMod = (currentModality === 'all' || optMod === currentModality);
        let matchDept = (currentDept === 'all' || optCat === currentDept);
        let matchSearch = (!q || text.includes(q));

        if (matchMod && matchDept && matchSearch) {
          opt.style.display = '';
          if (firstVisibleIdx === null) firstVisibleIdx = parseInt(opt.value, 10);
        } else {
          opt.style.display = 'none';
        }
      }

      if (firstVisibleIdx !== null) {
        select.value = firstVisibleIdx;
        showTeacher(firstVisibleIdx);
      }
    }

    function printActiveTeacher() {
      showTeacher(activeIndex);
      setTimeout(() => { window.print(); }, 200);
    }

    function printAllInModality() {
      document.querySelectorAll('.page-sheet').forEach(sh => {
        const shMod = sh.getAttribute('data-mod');
        const shCat = sh.getAttribute('data-cat');
        let matchMod = (currentModality === 'all' || shMod === currentModality);
        let matchDept = (currentDept === 'all' || shCat === currentDept);

        if (matchMod && matchDept) {
          sh.classList.remove('hidden-sheet');
        } else {
          sh.classList.add('hidden-sheet');
        }
      });
      setTimeout(() => { window.print(); }, 300);
    }

    window.addEventListener('afterprint', () => {
      showTeacher(activeIndex);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') navigateTeacher(-1);
      else if (e.key === 'ArrowRight') navigateTeacher(1);
    });

    window.addEventListener('DOMContentLoaded', () => {
      populateLogos();
      switchModality('f2f', document.getElementById('tab-f2f'));
    });
  </script>
</body>
</html>
''')

output_content = "".join(html_out)
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(output_content)
with open(DAILY_FILE, 'w', encoding='utf-8') as f:
    f.write(output_content)
with open(ROOT_OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(output_content)
with open(ROOT_DAILY_FILE, 'w', encoding='utf-8') as f:
    f.write(output_content)

print(f"Successfully generated {OUTPUT_FILE} ({len(output_content):,} bytes).")
print(f"Successfully mirrored to {DAILY_FILE}, {ROOT_OUTPUT_FILE}, {ROOT_DAILY_FILE}")
