import openpyxl, json, re, html, base64, os

print("=== Generating v3 Per-Teacher Monitoring Portal ===")

REPO_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_FILE = os.path.join(REPO_DIR, 'data', 'schedule_f2f_latest.xlsx')
AMIS_LOGO = os.path.join(REPO_DIR, 'public', 'amis_logo_opt.png')
DEPED_LOGO = os.path.join(REPO_DIR, 'public', 'deped_logo_opt.png')
OUTPUT_FILE = os.path.join(REPO_DIR, 'public', 'teacher-monitoring-landscape.html')

wb = openpyxl.load_workbook(DATA_FILE, data_only=True)

with open(AMIS_LOGO, 'rb') as f:
    amis_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode('utf-8')

with open(DEPED_LOGO, 'rb') as f:
    deped_b64 = "data:image/png;base64," + base64.b64encode(f.read()).decode('utf-8')

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
day_abbr_map = {
    'Sunday': 'SUN',
    'Monday': 'MON',
    'Tuesday': 'TUE',
    'Wednesday': 'WED',
    'Thursday': 'THU',
    'Friday': 'FRI',
    'Saturday': 'SAT'
}

def format_grade_short(sec_str):
    s = str(sec_str).strip()
    s = re.sub(r'Kindergarten\s*1\b', 'K1', s, flags=re.IGNORECASE)
    s = re.sub(r'Kindergarten\s*2\b', 'K2', s, flags=re.IGNORECASE)
    s = re.sub(r'Kinder\s*1\b', 'K1', s, flags=re.IGNORECASE)
    s = re.sub(r'Kinder\s*2\b', 'K2', s, flags=re.IGNORECASE)
    s = re.sub(r'Grade\s*(\d+)', r'G\1', s, flags=re.IGNORECASE)
    return s

def get_grid(sheet):
    grid = {}
    for r in range(1, sheet.max_row + 1):
        for c in range(1, sheet.max_column + 1):
            val = sheet.cell(r, c).value
            grid[(r, c)] = str(val).strip() if val is not None else ''
            
    for rng in sheet.merged_cells.ranges:
        top_val = grid.get((rng.min_row, rng.min_col), '')
        for r in range(rng.min_row, rng.max_row + 1):
            for c in range(rng.min_col, rng.max_col + 1):
                grid[(r, c)] = top_val
    return grid

elem_grid = get_grid(wb['ELEM'])
hs_new_grid = get_grid(wb['HS SCHED (NEW)'])
hs_grid = get_grid(wb['HS SCHED'])

def format_time_am_pm(t_str):
    if not t_str: return ''
    t = str(t_str).strip()
    t = re.sub(r'(\d{1,2}:\d{2}):+(\d{1,2}:\d{2})', r'\1 - \2', t)
    t = re.sub(r'^0?(\d{1,2}):(\d{2}):\d{2}$', r'\1:\2', t)
    t = re.sub(r'\b0(\d:\d{2})', r'\1', t)
    t = re.sub(r'\s*a\.?m\.?', ' AM', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*p\.?m\.?', ' PM', t, flags=re.IGNORECASE)
    t = re.sub(r'\s*[-–]\s*', ' - ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    t = t.rstrip('.')
    if not re.search(r'\b(AM|PM)\b', t):
        m = re.search(r'(\d{1,2}):(\d{2})', t)
        if m:
            h = int(m.group(1))
            if h in [12, 1, 2, 3, 4, 5, 6]:
                t += ' PM'
            else:
                t += ' AM'
    return t

def format_time_break(t_str):
    if not t_str: return ''
    parts = re.split(r'\s*[-–]\s*', t_str.strip())
    if len(parts) == 2:
        start_raw, end_raw = parts[0], parts[1]
        
        m1 = re.search(r'(\d{1,2}):(\d{2})', start_raw)
        h1 = int(m1.group(1)) if m1 else 0
        min1 = m1.group(2) if m1 else '00'
        meridiem1 = 'PM' if (h1 in [12, 1, 2, 3, 4, 5, 6] or 'PM' in start_raw.upper()) else 'AM'
        
        m2 = re.search(r'(\d{1,2}):(\d{2})', end_raw)
        h2 = int(m2.group(1)) if m2 else 0
        min2 = m2.group(2) if m2 else '00'
        meridiem2 = 'PM' if (h2 in [12, 1, 2, 3, 4, 5, 6] or 'PM' in end_raw.upper()) else 'AM'
        
        return f'{h1}:{min1} {meridiem1} -<br>{h2}:{min2} {meridiem2}'
    return t_str

def parse_mins(m_str):
    if not m_str: return '40'
    m_str = str(m_str).strip()
    m = re.search(r'(\d+)', m_str)
    return str(m.group(1)) if m else '40'

def normalize_teacher(name):
    name = re.sub(r"\s+", " ", name.strip()).strip("-– ")
    if re.match(r"^Teacher\b", name, re.IGNORECASE):
        name = "Tchr. " + name[7:].strip()
    elif re.match(r"^Tr\.?\b", name, re.IGNORECASE):
        name = "Tchr. " + name[3:].strip()
    elif re.match(r"^Tchr\.?\b", name, re.IGNORECASE):
        name = "Tchr. " + re.sub(r"^Tchr\.?\s*", "", name, flags=re.IGNORECASE)
    elif re.match(r"^Ustadha\b", name, re.IGNORECASE):
        name = "Ustadha " + name[7:].strip()
    elif re.match(r"^Ustadh\b", name, re.IGNORECASE):
        name = "Ustadh " + name[6:].strip()
    elif re.match(r"^Ust\.?\b", name, re.IGNORECASE):
        name = "Ust. " + re.sub(r"^Ust\.?\s*", "", name, flags=re.IGNORECASE)
        
    name = name.strip()
    if name in ["Tchr.", "Tchr", "Ust.", "Ust", "Teacher", "Tr.", "Tr", ""]: return "TBA"
    if name.upper() in ["TCHR. AHMAD", "SIR AHMAD"]: return "Tchr. Ahmad"
    if name in ["Ustadh Jaisam", "Ust. Jaisam"]: return "Ustadh Jaisam"
    if name == "Tchr. Kat": return "Tchr. Katrina"
    if name in ["Ust. Ubaydah", "Ust. Obaydah"]: return "Ust. Obaydah"
    if name in ["Ust. Silfah", "Ustadha Silfa", "Ust. Silfa"]: return "Ustadha Silfa"
    if name in ["Ustadha Saliha", "Ust. Saliha"]: return "Ustadha Saliha"
    if name in ["Tchr. Junaisa", "Tchr. Junaisah"]: return "Tchr. Junaisah"
    if name == "Tchr. Jairah": return "Tchr. Jayra"
    if name in ["Tchr. Moh", "Sir Mohaymen", "Sir Moh"]: return "Sir Moh"
    if name in ["Tchr. Shi", "Tchr. Shirehan"]: return "Tchr. Shirehan"
    if name in ["Tchr. Zara", "Tchr. Franchette"]: return "Tchr. Franchette"
    if name in ["Ust. Abdi", "Ust. Abdiraheem", "Ustadh Abdi", "Ustadh Abdiraheem", "Ustd. Abdi", "Ustd. Abdiraheem"]: return "Ust. Abdiraheem"
    if name in ["Ust. Ali", "Ustadh Ali", "Ustadh Muh Ali", "Ustdh ali", "Ustdh. Ali", "Ust. Muh Ali", "Ustadh Muh. Ali"]: return "Ustadh Muh Ali"
    return name

def clean_parse(text):
    text = text.strip()
    if not text: return '', '', 'EMPTY'
    upper = text.upper()
    for r in ['GENERAL ASSEMBLY', 'LUNCH AND SALAH', 'SALAH & DEPARTURE', 'DEPARTURE', 'RECESS', 'SHORT BREAK', 'TRANSITION', 'BREAK', 'HOMEROOM', 'ENTRANCE EXAM REVIEW', 'RESEARCH CONSULTATION']:
        if upper == r or (upper.startswith(r) and not any(k in upper for k in ['TCHR', 'UST', 'SIR', 'ALIM', 'TEACHER', 'TR'])):
            return text.upper(), '', 'ROUTINE'
            
    if 'WRAP-UP TIME' in upper:
        m = re.search(r'Wrap-Up Time\s*[-–]?\s*(.*)', text, re.IGNORECASE)
        t = normalize_teacher(m.group(1).strip()) if m else 'Tchr. Keychell'
        return 'WRAP-UP TIME', t, 'CLASS'
        
    t_match = re.search(r'[-–]?\s*(Tchr\.?|Ust\.?|Sir|Alim|Teacher|Ustadha|Ustadh|Tr\.?)\s+(.*)$', text, re.IGNORECASE)
    if t_match:
        tchr_full = normalize_teacher((t_match.group(1) + ' ' + t_match.group(2)).strip())
        subj_part = text[:t_match.start()].strip().rstrip('-–').strip()
        return (subj_part or text).upper(), tchr_full, 'CLASS'
        
    for p in ['Tchr.', 'Teacher', 'Sir', 'Ustadh', 'Ustadha', 'Ust.', 'Alim', 'Tr.']:
        if p.lower() in text.lower():
            idx = text.lower().find(p.lower())
            tchr_full = normalize_teacher(text[idx:].strip())
            subj_part = text[:idx].strip().rstrip('-–').strip()
            return (subj_part or text).upper(), tchr_full, 'CLASS'
            
    return text.upper(), 'TBA', 'CLASS'

def time_to_sort_key(t_str):
    m = re.search(r'(\d+):(\d+)', t_str)
    if not m: return 9999
    h, mins = int(m.group(1)), int(m.group(2))
    if 'PM' in t_str.upper():
        if h < 12: h += 12
    elif 'AM' in t_str.upper():
        if h == 12: h = 0
    else:
        if h in [1, 2, 3, 4, 5, 6]: h += 12
    return h * 60 + mins

sections = [
    {'id': 'k1', 'code': 'K1', 'name': 'Kindergarten 1', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 16, 'r_end': 21},
    {'id': 'k2', 'code': 'K2', 'name': 'Kindergarten 2', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 5, 'r_end': 12},
    {'id': 'g1', 'code': 'G1', 'name': 'Grade 1', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 26, 'r_end': 37},
    {'id': 'g2', 'code': 'G2', 'name': 'Grade 2', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 41, 'r_end': 52},
    {'id': 'g3', 'code': 'G3', 'name': 'Grade 3', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 56, 'r_end': 71},
    {'id': 'g4', 'code': 'G4', 'name': 'Grade 4', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 76, 'r_end': 86},
    {'id': 'g5', 'code': 'G5', 'name': 'Grade 5', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 91, 'r_end': 101},
    {'id': 'g6', 'code': 'G6', 'name': 'Grade 6', 'dept': 'Elementary', 'dept_code': 'elem', 'sheet': 'ELEM', 'r_start': 106, 'r_end': 116},
    {'id': 'g78g', 'code': 'G78-G', 'name': 'Grade 7 & 8 Girls', 'dept': 'Junior High School', 'dept_code': 'jhs', 'sheet': 'HS SCHED (NEW)', 'r_start': 7, 'r_end': 18},
    {'id': 'g78b', 'code': 'G78-B', 'name': 'Grade 7 & 8 Boys', 'dept': 'Junior High School', 'dept_code': 'jhs', 'sheet': 'HS SCHED (NEW)', 'r_start': 23, 'r_end': 34},
    {'id': 'g910g', 'code': 'G910-G', 'name': 'Grade 9 & 10 Girls', 'dept': 'Junior High School', 'dept_code': 'jhs', 'sheet': 'HS SCHED (NEW)', 'r_start': 39, 'r_end': 50},
    {'id': 'g910b', 'code': 'G910-B', 'name': 'Grade 9 & 10 Boys', 'dept': 'Junior High School', 'dept_code': 'jhs', 'sheet': 'HS SCHED (NEW)', 'r_start': 55, 'r_end': 66},
    {'id': 'g11', 'code': 'G11', 'name': 'Grade 11', 'dept': 'Senior High School', 'dept_code': 'shs', 'sheet': 'HS SCHED (NEW)', 'r_start': 71, 'r_end': 82},
    {'id': 'g12', 'code': 'G12', 'name': 'Grade 12', 'dept': 'Senior High School', 'dept_code': 'shs', 'sheet': 'HS SCHED (NEW)', 'r_start': 89, 'r_end': 100}
]

teacher_monitor_map = {}

for sec in sections:
    s_grid = elem_grid if sec['sheet'] == 'ELEM' else (hs_new_grid if sec['sheet'] == 'HS SCHED (NEW)' else hs_grid)
    for r in range(sec['r_start'], sec['r_end'] + 1):
        raw_t = s_grid.get((r, 2), '').strip()
        t_slot = format_time_am_pm(raw_t)
        m_slot = parse_mins(s_grid.get((r, 3), ''))
        if not t_slot: continue
        
        for d_idx, day in enumerate(days):
            c_val = s_grid.get((r, 4 + d_idx), '').strip()
            if not c_val: continue
            
            subj, tchr, kind = clean_parse(c_val)
            if kind == 'CLASS' and tchr and tchr != 'TBA':
                if tchr not in teacher_monitor_map:
                    teacher_monitor_map[tchr] = {
                        'name': tchr,
                        'dept': sec['dept'],
                        'dept_code': sec['dept_code'],
                        'items': []
                    }
                teacher_monitor_map[tchr]['items'].append({
                    'day': day,
                    'day_abbr': day_abbr_map.get(day, day.upper()),
                    'time': t_slot,
                    'time_display': format_time_break(t_slot),
                    'mins': m_slot,
                    'section': format_grade_short(sec['name']),
                    'subject': subj.upper()
                })

for t_name, t_data in teacher_monitor_map.items():
    if any(t_name.startswith(p) for p in ['Ust.', 'Ustadh', 'Ustadha', 'Alim']):
        t_data['cat'] = 'isal'
        t_data['dept'] = 'ISAL & Islamic Studies Department'
    elif any(it['section'].startswith('G11') or it['section'].startswith('G12') for it in t_data['items']):
        t_data['cat'] = 'shs'
        t_data['dept'] = 'Senior High School Faculty'
    elif any('G7' in it['section'] or 'G8' in it['section'] or 'G9' in it['section'] or 'G10' in it['section'] for it in t_data['items']):
        t_data['cat'] = 'jhs'
        t_data['dept'] = 'Junior High School Faculty'
    else:
        t_data['cat'] = 'elem'
        t_data['dept'] = 'Elementary Faculty'

teachers_list = sorted(teacher_monitor_map.values(), key=lambda x: x['name'])
print(f"Extracted {len(teachers_list)} teachers.")

html_out = []
html_out.append('''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <title>Per-Teacher Instructional Attendance & Load Monitoring Record - Al Munawwara Islamic School</title>
  <style id="page-orientation-style">
    @page {
      size: A4 landscape;
      margin: 4mm 6mm 4mm 6mm;
    }
    .page-sheet {
      width: 297mm !important;
      min-height: 195mm !important;
      padding: 4mm 6mm !important;
    }
  </style>
  <style>
    * {
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      -webkit-font-smoothing: antialiased;
    }

    /* CLEAN TOOLBAR */
    .toolbar {
      background: #ffffff;
      color: #0f172a;
      padding: 12px 24px;
      position: sticky;
      top: 0;
      z-index: 999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.06);
      border-bottom: 2px solid #059669;
    }
    .toolbar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      flex-wrap: wrap;
      gap: 12px;
    }
    .toolbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .toolbar-logo {
      width: 44px;
      height: 44px;
      object-fit: contain;
    }
    .toolbar-title {
      font-size: 16px;
      font-weight: 800;
      color: #064e3b;
      letter-spacing: 0.3px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .badge-f2f {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #10b981;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 9999px;
      font-weight: 800;
      text-transform: uppercase;
    }
    .modality-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      flex-wrap: wrap;
    }
    .modality-label {
      font-size: 11px;
      font-weight: 800;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-right: 4px;
    }
    .modality-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.15s ease;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #334155;
    }
    .modality-pill:hover {
      background: #f1f5f9;
      color: #0f172a;
      border-color: #94a3b8;
    }
    .modality-pill.active {
      background: #064e3b;
      color: #ffffff;
      border-color: #064e3b;
    }
    .modality-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      display: inline-block;
    }
    .dot-active {
      background: #10b981;
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
    }
    .dot-dev {
      background: #f59e0b;
    }
    .badge-dev {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      font-size: 9.5px;
      padding: 1px 6px;
      border-radius: 9999px;
      font-weight: 800;
      letter-spacing: 0.2px;
      text-transform: uppercase;
    }
    .toolbar-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    /* ORIENTATION TOGGLE SWITCH */
    .orientation-switch {
      display: inline-flex;
      align-items: center;
      background: #f1f5f9;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      padding: 3px;
      gap: 3px;
    }
    .orientation-label {
      font-size: 11px;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      padding: 0 6px;
    }
    .orientation-btn {
      padding: 5px 12px;
      font-size: 11.5px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      border: none;
      background: transparent;
      color: #475569;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s ease;
    }
    .orientation-btn:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .orientation-btn.active {
      background: #064e3b;
      color: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    }

    .btn {
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      text-decoration: none;
    }
    .btn-primary { background: #059669; color: #ffffff; }
    .btn-primary:hover { background: #047857; }
    .btn-blue { background: #0284c7; color: #ffffff; }
    .btn-blue:hover { background: #0369a1; }
    .btn-outline { background: #ffffff; color: #334155; border-color: #cbd5e1; }
    .btn-outline:hover { background: #f8fafc; color: #0f172a; border-color: #94a3b8; }

    .filter-bar {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
    }
    .filter-label {
      font-size: 11.5px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .dept-pill {
      background: #f8fafc;
      color: #475569;
      border: 1px solid #cbd5e1;
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
    }
    .dept-pill:hover { background: #f1f5f9; color: #0f172a; }
    .dept-pill.active {
      background: #064e3b;
      color: #ffffff;
      border-color: #064e3b;
      font-weight: 700;
    }
    .teacher-select-box {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
    }
    .teacher-select-box select {
      padding: 6px 12px;
      font-size: 12.5px;
      font-weight: 700;
      border: 1px solid #059669;
      border-radius: 6px;
      color: #064e3b;
      background: #ffffff;
      outline: none;
      min-width: 230px;
    }

    /* SHEET CONTAINER */
    .sheet-wrapper {
      padding: 20px 10px 50px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    /* A4 SHEET (SCREEN MODE) */
    .page-sheet {
      width: 210mm;
      min-height: 275mm;
      box-sizing: border-box;
      padding: 5mm 6mm;
      background: #ffffff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      border: 1px solid #cbd5e1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      transition: width 0.15s ease, min-height 0.15s ease;
    }

    body.portrait-mode .page-sheet {
      width: 210mm !important;
      min-height: 275mm !important;
      padding: 5mm 6mm !important;
    }

    body.landscape-mode .page-sheet {
      width: 297mm !important;
      min-height: 195mm !important;
      padding: 4mm 6mm !important;
    }

    .sheet-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* HEADER */
    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 5px;
      gap: 12px;
    }
    .header-logo-side {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    .header-logo {
      width: 50px;
      height: 50px;
      object-fit: contain;
    }
    .header-center-text {
      flex: 1;
      text-align: center;
    }
    .arabic-header {
      font-family: 'Amiri', 'Traditional Arabic', serif;
      font-size: clamp(14pt, 2vw, 17.5pt);
      font-weight: 700;
      color: #064e3b;
      direction: rtl;
      line-height: 1.15;
      margin-bottom: 2px;
      text-align: center;
      letter-spacing: 0.5px;
    }
    .school-name {
      font-size: clamp(10.5pt, 1.6vw, 13pt);
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.8px;
      margin: 1px 0 2px 0;
      text-transform: uppercase;
      line-height: 1.15;
    }
    .form-title {
      font-size: clamp(8.8pt, 1.3vw, 11.2pt);
      font-weight: 800;
      color: #064e3b;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      line-height: 1.15;
    }
    .form-sub {
      font-size: clamp(7.2pt, 1vw, 9pt);
      color: #475569;
      font-weight: 600;
      margin-top: 2px;
      letter-spacing: 0.3px;
    }

    /* META BOX */
    .meta-box {
      border: 1.5px solid #94a3b8;
      background: #f8fafc;
      border-radius: 4px;
      padding: 4px 8px;
      margin-bottom: 5px;
      display: grid;
      grid-template-columns: 1.3fr 1.2fr 1fr;
      gap: 3px 12px;
      font-size: 9.8pt;
    }
    .meta-row {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .meta-lbl {
      font-size: 9.5pt;
      font-weight: 700;
      color: #475569;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .meta-val {
      font-size: 10.2pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 1px dotted #94a3b8;
      flex: 1;
      min-height: 14px;
    }
    .td-bold {
      font-weight: 800;
      color: #064e3b;
    }

    /* TABLE */
    table.sheet-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
      line-height: 1.15;
    }
    table.sheet-table th, table.sheet-table td {
      border: 1px solid #94a3b8;
      padding: 2.5px 4.5px;
      vertical-align: middle;
    }
    table.sheet-table thead th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 800;
      text-align: center;
      padding: 3.5px 2px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      line-height: 1.15;
      vertical-align: middle;
      font-size: clamp(6.8pt, 0.85vw, 7.8pt);
    }
    .th-num { width: 3%; font-size: 8pt; }
    .th-day { width: 6.5%; font-size: 8pt; }
    .th-time { width: 14%; font-size: 7.8pt; }
    .th-mins { width: 4.5%; font-size: 7.5pt; }
    .th-in { width: 8.5%; font-size: 7.2pt; }
    .th-out { width: 8.5%; font-size: 7.2pt; }
    .th-grade { width: 13%; font-size: 7.8pt; }
    .th-subject { width: 20.5%; font-size: 7.5pt; }
    .th-room { width: 5%; font-size: 7.5pt; }
    .th-status { width: 11.5%; font-size: 7.0pt; }
    .th-remarks { width: 5%; font-size: 7.2pt; }
    .td-center { text-align: center; }

    .day-cell {
      font-weight: 800;
      color: #064e3b;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 9.8pt;
      white-space: nowrap;
    }
    .time-slot {
      font-weight: 800;
      color: #0f172a;
      text-align: center;
      white-space: nowrap;
      font-size: 9.8pt;
      letter-spacing: 0.2px;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }
    .subject-cell {
      font-weight: 900;
      color: #064e3b;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 10pt;
    }
    .grade-cell {
      font-weight: 700;
      color: #1e293b;
      font-size: 9.8pt;
      white-space: nowrap;
    }
    
    /* 2x2 STATUS GRID CHECKLIST */
    .status-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5px;
      font-size: 8.8pt;
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
      width: 11px;
      height: 11px;
      cursor: pointer;
    }

    .row-blank {
      background: #ffffff;
      height: 20px;
    }

    /* LANDSCAPE ADAPTATIONS */
    body.landscape-mode table.sheet-table th,
    body.landscape-mode table.sheet-table td {
      padding: 1.8px 4px;
    }
    body.landscape-mode table.sheet-table thead th {
      font-size: 8.5pt;
      padding: 3px 4px;
    }
    body.landscape-mode .th-in, body.landscape-mode .th-out { font-size: 8.0pt; }
    body.landscape-mode .th-subject { font-size: 8.5pt; }
    body.landscape-mode .th-status { font-size: 7.8pt; }
    body.landscape-mode .status-grid {
      gap: 1px;
    }
    body.landscape-mode .meta-box {
      padding: 3.5px 8px;
      margin-bottom: 4px;
    }
    body.landscape-mode .sheet-header {
      padding-bottom: 3px;
      margin-bottom: 4px;
    }
    body.landscape-mode .row-blank {
      height: 17px;
    }

    .hidden-sheet {
      display: none !important;
    }

    /* PERFECT A4 PRINT RULES */
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
      .toolbar {
        display: none !important;
      }
      .sheet-wrapper {
        padding: 0 !important;
        margin: 0 !important;
        gap: 0 !important;
        display: block !important;
        width: 100% !important;
        height: auto !important;
        overflow: visible !important;
      }
      .page-sheet {
        box-shadow: none !important;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 0 !important;
        max-height: none !important;
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
<body class="landscape-mode">

  <!-- TOOLBAR -->
  <div class="toolbar">
    <!-- MODALITY NAVIGATION -->
    <div class="modality-bar">
      <span class="modality-label">Learning Modality:</span>
      <a href="/teacher-monitoring.html" class="modality-pill active" title="Active S.Y. 2026 - 2027">
        <span class="modality-dot dot-active"></span>
        Face-to-Face (45 Teachers)
      </a>
      <a href="/odl-teacher-monitoring.html" class="modality-pill" title="Online Distance Learning First Shift">
        <span class="modality-dot"></span>
        ODL First Shift (53 Teachers)
      </a>
      <a href="/odl-second-shift-teacher.html" class="modality-pill" title="Online Distance Learning Second Shift">
        <span class="modality-dot"></span>
        ODL Second Shift (54 Teachers)
      </a>
      <a href="/all-teachers-monitoring.html" class="modality-pill" title="Unified Multi-Modality Portal" style="border-color:#3b82f6;color:#2563eb;background:#eff6ff;">
        <span class="modality-dot" style="background:#2563eb;"></span>
        All Modalities (152 Teachers)
      </a>
    </div>

    <div class="toolbar-header">
      <div class="toolbar-brand">
        <img class="toolbar-logo amis-img" alt="AMIS Logo">
        <div>
          <div class="toolbar-title">
            AL MUNAWWARA ISLAMIC SCHOOL
            <span class="badge-f2f">Teacher Monitoring Portal</span>
          </div>
          <div style="font-size:11.5px;color:#475569;font-weight:500;">
            Daily Instructional Attendance & Load Monitoring Record (Face-to-Face &bull; S.Y. 2026 - 2027)
          </div>
        </div>
      </div>
      <div class="toolbar-actions">
        <!-- ORIENTATION TOGGLE -->
        <div class="orientation-switch">
          <span class="orientation-label">Orientation:</span>
          <button id="btn-portrait" class="orientation-btn" onclick="setOrientation('portrait')" title="Portrait Mode (A4)">
            📄 Portrait
          </button>
          <button id="btn-landscape" class="orientation-btn active" onclick="setOrientation('landscape')" title="Landscape Mode (Wide A4)">
            🖼️ Landscape
          </button>
        </div>
        <a href="/f2f-monitoring.html" class="btn btn-outline">
           Classroom Monitoring Forms
        </a>
        <button class="btn btn-outline" onclick="navigateTeacher(-1)" title="Previous Teacher">
          Prev
        </button>
        <button class="btn btn-outline" onclick="navigateTeacher(1)" title="Next Teacher">
          Next
        </button>
        <button class="btn btn-blue" onclick="printActiveTeacher()">
           Print Active Teacher
        </button>
        <button class="btn btn-primary" onclick="printAllTeachers()">
           Print All Teachers (A4)
        </button>
      </div>
    </div>

    <!-- FILTER BAR -->
    <div class="filter-bar">
      <span class="filter-label">Filter Faculty:</span>
      <button class="dept-pill active" onclick="filterDept('all')">All Faculty (''' + str(len(teachers_list)) + ''')</button>
      <button class="dept-pill" onclick="filterDept('jhs')">Junior High School</button>
      <button class="dept-pill" onclick="filterDept('shs')">Senior High School</button>
      <button class="dept-pill" onclick="filterDept('elem')">Elementary Faculty</button>
      <button class="dept-pill" onclick="filterDept('isal')">ISAL Department</button>

      <div class="teacher-select-box">
        <label for="teacher-select" class="filter-label">Select Teacher:</label>
        <select id="teacher-select" onchange="onTeacherSelectChange()">
          <option value="all"> All Faculty (Show All ''' + str(len(teachers_list)) + ''' Teachers)</option>
''')

for idx, t in enumerate(teachers_list):
    html_out.append(f'          <option value="{idx}">{html.escape(t["name"])} ({len(t["items"])} F2F)</option>\n')

html_out.append('''        </select>
      </div>
    </div>
  </div>

  <!-- SHEETS CONTAINER -->
  <div class="sheet-wrapper" id="sheet-wrapper">
''')

for idx, t in enumerate(teachers_list):
    t_name_esc = html.escape(t['name'])
    dept_esc = html.escape(t['dept'])
    cat_esc = html.escape(t['cat'])
    items = t['items']
    items.sort(key=lambda x: (days.index(x['day']), time_to_sort_key(x['time'])))

    hidden_cls = "" if idx == 0 else "hidden-sheet"

    html_out.append(f'''
    <!-- SHEET {idx}: {t_name_esc} -->
    <div class="page-sheet {hidden_cls}" 
         id="sheet-{idx}"
         data-idx="{idx}"
         data-teacher="{t_name_esc}"
         data-cat="{cat_esc}">
      
      <div class="sheet-content">
        <!-- HEADER -->
        <div class="sheet-header">
          <div class="header-logo-side">
            <img class="header-logo deped-img" alt="DepEd Logo">
          </div>
          <div class="header-center-text">
            <div class="arabic-header" dir="rtl" lang="ar">المدرسة المنورة الإسلامية</div>
            <div class="school-name">AL MUNAWWARA ISLAMIC SCHOOL</div>
            <div class="form-title">TEACHER INSTRUCTIONAL ATTENDANCE & LOAD MONITORING RECORD</div>
            <div class="form-sub">Face-to-Face Modality &bull; Faculty Monitoring Form &bull; School Year 2026 - 2027</div>
          </div>
          <div class="header-logo-side">
            <img class="header-logo amis-img" alt="AMIS Logo">
          </div>
        </div>

        <!-- TEACHER META BOX -->
        <div class="meta-box">
          <div class="meta-row"><span class="meta-lbl">Teacher's Name:</span><span class="meta-val td-bold">{t_name_esc}</span></div>
          <div class="meta-row"><span class="meta-lbl">Total Weekly Loads:</span><span class="meta-val td-bold">{len(items)} F2F</span></div>
          <div class="meta-row"><span class="meta-lbl">Room Assignment:</span><span class="meta-val"></span></div>
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
        html_out.append(f'''
            <tr>
              <td class="td-center" style="font-weight:700;color:#64748b;">{row_num}</td>
              <td class="day-cell">{it['day_abbr']}</td>
              <td class="time-slot">{it['time_display']}</td>
              <td class="td-center" style="font-weight:700;color:#475569;">{it['mins']}</td>
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
              <td style="color:#cbd5e1;font-size:9pt;font-weight:700;text-transform:uppercase;">(SUBSTITUTE / REMEDIAL LOAD)</td>
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

    html_out.append('''
          </tbody>
        </table>
      </div>
    </div>
''')

html_out.append('''
  </div>

  <script>
    const AMIS_LOGO_SRC = "''' + amis_b64 + '''";
    const DEPED_LOGO_SRC = "''' + deped_b64 + '''";

    let activeIndex = 0;
    let currentDept = 'all';

    function populateLogos() {
      document.querySelectorAll('.amis-img').forEach(img => {
        if (!img.src || img.src === window.location.href) {
          img.src = AMIS_LOGO_SRC;
        }
      });
      document.querySelectorAll('.deped-img').forEach(img => {
        if (!img.src || img.src === window.location.href) {
          img.src = DEPED_LOGO_SRC;
        }
      });
    }

    function showTeacher(val) {
      const select = document.getElementById('teacher-select');
      if (val === 'all') {
        if (select) select.value = 'all';
        document.querySelectorAll('.page-sheet').forEach(sh => {
          const cat = sh.getAttribute('data-cat');
          let match = false;
          if (currentDept === 'all') match = true;
          else if (currentDept === 'jhs' && cat === 'jhs') match = true;
          else if (currentDept === 'shs' && cat === 'shs') match = true;
          else if (currentDept === 'elem' && cat === 'elem') match = true;
          else if (currentDept === 'isal' && cat === 'isal') match = true;

          if (match) sh.classList.remove('hidden-sheet');
          else sh.classList.add('hidden-sheet');
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const idx = parseInt(val, 10);
      activeIndex = idx;
      if (select) select.value = idx;

      document.querySelectorAll('.page-sheet').forEach(sh => {
        const sIdx = parseInt(sh.getAttribute('data-idx'), 10);
        if (sIdx === idx) {
          sh.classList.remove('hidden-sheet');
        } else {
          sh.classList.add('hidden-sheet');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function onTeacherSelectChange() {
      const select = document.getElementById('teacher-select');
      showTeacher(select.value);
    }

    function navigateTeacher(delta) {
      const select = document.getElementById('teacher-select');
      const visibleOptions = Array.from(select.options).filter(opt => opt.style.display !== 'none' && opt.value !== 'all');
      if (visibleOptions.length === 0) return;

      const currentVal = parseInt(select.value, 10);
      let curIndexInVisible = visibleOptions.findIndex(opt => parseInt(opt.value, 10) === currentVal);
      if (curIndexInVisible === -1) curIndexInVisible = 0;

      let nextIndexInVisible = curIndexInVisible + delta;
      if (nextIndexInVisible < 0) nextIndexInVisible = visibleOptions.length - 1;
      if (nextIndexInVisible >= visibleOptions.length) nextIndexInVisible = 0;

      showTeacher(parseInt(visibleOptions[nextIndexInVisible].value, 10));
    }

    function filterDept(dept) {
      currentDept = dept;
      document.querySelectorAll('.dept-pill').forEach(btn => {
        btn.classList.remove('active');
      });
      const activeBtn = Array.from(document.querySelectorAll('.dept-pill')).find(b => {
        if (dept === 'all' && b.innerText.includes('All')) return true;
        if (dept === 'jhs' && b.innerText.includes('Junior')) return true;
        if (dept === 'shs' && b.innerText.includes('Senior')) return true;
        if (dept === 'elem' && b.innerText.includes('Elementary')) return true;
        if (dept === 'isal' && b.innerText.includes('ISAL')) return true;
        return false;
      });
      if (activeBtn) activeBtn.classList.add('active');

      const select = document.getElementById('teacher-select');

      document.querySelectorAll('.page-sheet').forEach(sh => {
        const cat = sh.getAttribute('data-cat');
        const idx = parseInt(sh.getAttribute('data-idx'), 10);
        const opt = select.querySelector('option[value="' + idx + '"]');

        let match = false;
        if (dept === 'all') match = true;
        else if (dept === 'jhs' && cat === 'jhs') match = true;
        else if (dept === 'shs' && cat === 'shs') match = true;
        else if (dept === 'elem' && cat === 'elem') match = true;
        else if (dept === 'isal' && cat === 'isal') match = true;

        if (opt) {
          opt.style.display = match ? '' : 'none';
        }
      });

      // Show all teachers in this department!
      showTeacher('all');
    }

    let currentOrientation = 'landscape';

    function setOrientation(orientation) {
      currentOrientation = orientation;
      const styleEl = document.getElementById('page-orientation-style');
      const btnPortrait = document.getElementById('btn-portrait');
      const btnLandscape = document.getElementById('btn-landscape');

      if (orientation === 'landscape') {
        document.body.classList.remove('portrait-mode');
        document.body.classList.add('landscape-mode');
        if (btnPortrait) btnPortrait.classList.remove('active');
        if (btnLandscape) btnLandscape.classList.add('active');
        if (styleEl) {
          styleEl.innerHTML = `
            @page {
              size: A4 landscape;
              margin: 4mm 6mm 4mm 6mm;
            }
            .page-sheet {
              width: 297mm !important;
              min-height: 195mm !important;
              padding: 4mm 6mm !important;
            }
          `;
        }
      } else {
        document.body.classList.remove('landscape-mode');
        document.body.classList.add('portrait-mode');
        if (btnLandscape) btnLandscape.classList.remove('active');
        if (btnPortrait) btnPortrait.classList.add('active');
        if (styleEl) {
          styleEl.innerHTML = `
            @page {
              size: A4 portrait;
              margin: 4mm 5mm 4mm 5mm;
            }
            .page-sheet {
              width: 210mm !important;
              min-height: 275mm !important;
              padding: 5mm 6mm !important;
            }
          `;
        }
      }
      try {
        localStorage.setItem('amis_teacher_orientation', orientation);
      } catch (e) {}

      autoFitHeaders();
    }

    function autoFitHeaders() {
      // Auto-fit table headers dynamically so they never wrap into 3 lines or overflow
      document.querySelectorAll('table.sheet-table thead th').forEach(th => {
        let maxPt = currentOrientation === 'landscape' ? 8.8 : 7.8;
        let minPt = 6.2;
        let pt = maxPt;
        th.style.fontSize = pt + 'pt';

        while (th.clientHeight > 33 && pt > minPt) {
          pt -= 0.2;
          th.style.fontSize = pt.toFixed(1) + 'pt';
        }
      });
    }

    function printActiveTeacher() {
      const select = document.getElementById('teacher-select');
      if (select && select.value === 'all') {
        showTeacher(activeIndex >= 0 ? activeIndex : 0);
      } else {
        showTeacher(activeIndex);
      }
      setTimeout(() => {
        window.print();
      }, 200);
    }

    function printAllTeachers() {
      // 1. Force ALL Faculty filter
      filterDept('all');

      // 2. Ensure ALL sheets are visible
      document.querySelectorAll('.page-sheet').forEach(sh => {
        sh.classList.remove('hidden-sheet');
      });

      const select = document.getElementById('teacher-select');
      if (select) select.value = 'all';

      // 3. Trigger print with ample delay for DOM to layout
      setTimeout(() => {
        window.print();
      }, 300);
    }

    window.addEventListener('afterprint', () => {
      const select = document.getElementById('teacher-select');
      if (select && select.value === 'all') {
        showTeacher('all');
      } else {
        showTeacher(activeIndex);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        navigateTeacher(-1);
      } else if (e.key === 'ArrowRight') {
        navigateTeacher(1);
      }
    });

    window.addEventListener('resize', autoFitHeaders);

    window.addEventListener('DOMContentLoaded', () => {
      populateLogos();
      filterDept('all');

      // Check URL query param first (?orientation=landscape or ?orientation=portrait)
      const params = new URLSearchParams(window.location.search);
      const orientParam = params.get('orientation');
      if (orientParam === 'landscape' || orientParam === 'portrait') {
        setOrientation(orientParam);
      } else {
        // Default to portrait ("portrait muna")
        setOrientation('landscape');
      }
      autoFitHeaders();
    });
  </script>
</body>
</html>
''')

output_path = OUTPUT_FILE
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(''.join(html_out))

print(f"Successfully generated {output_path} ({os.path.getsize(output_path)} bytes)")

ROOT_OUTPUT_FILE = os.path.join(REPO_DIR, '..', 'teacher-monitoring-landscape.html')
with open(ROOT_OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(''.join(html_out))
print(f"Successfully mirrored to {ROOT_OUTPUT_FILE}")

