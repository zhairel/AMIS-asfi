<?php
declare(strict_types=1);

function get_db(): PDO {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dataDir = dirname(__DIR__) . '/data';
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    $dbFile = $dataDir . '/asfi.db';
    $isNew = !file_exists($dbFile);

    $pdo = new PDO('sqlite:' . $dbFile, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // WAL mode for high concurrency
    $pdo->exec('PRAGMA journal_mode = WAL;');
    $pdo->exec('PRAGMA synchronous = NORMAL;');

    $pdo->exec("CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        reference_number TEXT UNIQUE,
        status TEXT NOT NULL DEFAULT 'Pending',
        first_name TEXT NOT NULL,
        middle_name TEXT DEFAULT '',
        last_name TEXT NOT NULL,
        suffix TEXT DEFAULT '',
        birth_date TEXT,
        age INTEGER,
        place_of_birth TEXT DEFAULT '',
        gender TEXT DEFAULT '',
        civil_status TEXT DEFAULT '',
        citizenship TEXT DEFAULT 'FILIPINO',
        religion TEXT DEFAULT 'ISLAM',
        spouse_name TEXT DEFAULT '',
        contact_number TEXT DEFAULT '',
        email TEXT DEFAULT '',
        present_address TEXT DEFAULT '',
        occupation TEXT DEFAULT '',
        affiliation_name TEXT DEFAULT '',
        affiliation_address TEXT DEFAULT '',
        is_underage INTEGER NOT NULL DEFAULT 0,
        guardian_name TEXT DEFAULT '',
        guardian_relationship TEXT DEFAULT '',
        guardian_contact TEXT DEFAULT '',
        beneficiary_first_name TEXT NOT NULL,
        beneficiary_middle_name TEXT DEFAULT '',
        beneficiary_last_name TEXT NOT NULL,
        beneficiary_suffix TEXT DEFAULT '',
        beneficiary_relationship TEXT DEFAULT '',
        beneficiary_birth_date TEXT,
        beneficiary_place_of_birth TEXT DEFAULT '',
        beneficiary_address TEXT DEFAULT '',
        beneficiary_contact TEXT DEFAULT '',
        photo_2x2_url TEXT,
        photo_2x2_name TEXT,
        applicant_id_url TEXT,
        applicant_id_name TEXT,
        applicant_id_type TEXT DEFAULT '',
        beneficiary_id_url TEXT,
        beneficiary_id_name TEXT,
        guardian_id_url TEXT,
        guardian_id_name TEXT,
        consent_data_privacy INTEGER NOT NULL DEFAULT 1,
        agree_terms INTEGER NOT NULL DEFAULT 1,
        certify_beneficiary INTEGER NOT NULL DEFAULT 1,
        confirm_attestation INTEGER NOT NULL DEFAULT 1,
        printed_name TEXT DEFAULT '',
        date_applied TEXT,
        admin_notes TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT
    )");

    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_apps_ref ON applications(reference_number);");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_apps_status ON applications(status);");
    $pdo->exec("CREATE INDEX IF NOT EXISTS idx_apps_created ON applications(created_at);");

    // Seed initial records if table is completely empty
    $count = (int)$pdo->query("SELECT COUNT(*) FROM applications")->fetchColumn();
    if ($count === 0) {
        $now = date('c');
        $seedStmt = $pdo->prepare("INSERT INTO applications (
            id, reference_number, status, first_name, middle_name, last_name, suffix,
            birth_date, age, place_of_birth, gender, civil_status, citizenship, religion,
            spouse_name, contact_number, email, present_address, occupation, affiliation_name, affiliation_address,
            is_underage, guardian_name, guardian_relationship, guardian_contact,
            beneficiary_first_name, beneficiary_middle_name, beneficiary_last_name, beneficiary_suffix,
            beneficiary_relationship, beneficiary_birth_date, beneficiary_place_of_birth, beneficiary_address, beneficiary_contact,
            photo_2x2_url, photo_2x2_name, applicant_id_url, applicant_id_name, applicant_id_type,
            consent_data_privacy, agree_terms, certify_beneficiary, confirm_attestation,
            printed_name, date_applied, admin_notes, created_at
        ) VALUES (
            :id, :ref, :status, :first_name, :middle_name, :last_name, :suffix,
            :birth_date, :age, :place_of_birth, :gender, :civil_status, :citizenship, :religion,
            :spouse_name, :contact_number, :email, :present_address, :occupation, :affiliation_name, :affiliation_address,
            :is_underage, :guardian_name, :guardian_relationship, :guardian_contact,
            :beneficiary_first_name, :beneficiary_middle_name, :beneficiary_last_name, :beneficiary_suffix,
            :beneficiary_relationship, :beneficiary_birth_date, :beneficiary_place_of_birth, :beneficiary_address, :beneficiary_contact,
            :photo_2x2_url, :photo_2x2_name, :applicant_id_url, :applicant_id_name, :applicant_id_type,
            :consent_data_privacy, :agree_terms, :certify_beneficiary, :confirm_attestation,
            :printed_name, :date_applied, :admin_notes, :created_at
        )");

        $seeds = [
            [
                'id' => 'demo-app-1',
                'ref' => 'ASFI-2026-08149',
                'status' => 'Pending',
                'first_name' => 'ABDUL',
                'middle_name' => 'MALIK',
                'last_name' => 'MOHAMMAD',
                'suffix' => '',
                'birth_date' => '1995-04-12',
                'age' => 31,
                'place_of_birth' => 'Davao City',
                'gender' => 'Male',
                'civil_status' => 'Married',
                'citizenship' => 'FILIPINO',
                'religion' => 'ISLAM',
                'spouse_name' => 'FATIMA MOHAMMAD',
                'contact_number' => '09171234567',
                'email' => 'abdul.mohammad@example.com',
                'present_address' => 'Brgy. 23-C, Isla Verde, Davao City, Davao del Sur',
                'occupation' => 'Merchant / Self-Employed',
                'affiliation_name' => 'Davao Muslim Traders Guild',
                'affiliation_address' => 'Davao City',
                'is_underage' => 0,
                'guardian_name' => '',
                'guardian_relationship' => '',
                'guardian_contact' => '',
                'beneficiary_first_name' => 'FATIMA',
                'beneficiary_middle_name' => 'SANTOS',
                'beneficiary_last_name' => 'MOHAMMAD',
                'beneficiary_suffix' => '',
                'beneficiary_relationship' => 'Spouse',
                'beneficiary_birth_date' => '1997-08-20',
                'beneficiary_place_of_birth' => 'Davao City',
                'beneficiary_address' => 'Brgy. 23-C, Isla Verde, Davao City, Davao del Sur',
                'beneficiary_contact' => '09189876543',
                'photo_2x2_url' => null,
                'photo_2x2_name' => 'abdul_photo_2x2.jpg',
                'applicant_id_url' => null,
                'applicant_id_name' => 'philsys_national_id.jpg',
                'applicant_id_type' => 'Philippine National ID (PhilSys)',
                'consent_data_privacy' => 1,
                'agree_terms' => 1,
                'certify_beneficiary' => 1,
                'confirm_attestation' => 1,
                'printed_name' => 'ABDUL MALIK MOHAMMAD',
                'date_applied' => '2026-09-20',
                'admin_notes' => null,
                'created_at' => date('c', strtotime('-1 hour')),
            ],
            [
                'id' => 'demo-app-2',
                'ref' => 'ASFI-2026-04281',
                'status' => 'Approved',
                'first_name' => 'MARIAM',
                'middle_name' => 'ALI',
                'last_name' => 'HASSAN',
                'suffix' => '',
                'birth_date' => '1988-11-05',
                'age' => 37,
                'place_of_birth' => 'Cotabato City',
                'gender' => 'Female',
                'civil_status' => 'Married',
                'citizenship' => 'FILIPINO',
                'religion' => 'ISLAM',
                'spouse_name' => 'TARIQ HASSAN',
                'contact_number' => '09205551234',
                'email' => 'mariam.hassan@example.com',
                'present_address' => 'Block 4 Lot 8, Buhangin, Davao City',
                'occupation' => 'Secondary School Teacher',
                'affiliation_name' => 'Davao City National High School',
                'affiliation_address' => 'Davao City',
                'is_underage' => 0,
                'guardian_name' => '',
                'guardian_relationship' => '',
                'guardian_contact' => '',
                'beneficiary_first_name' => 'TARIQ',
                'beneficiary_middle_name' => 'OMAR',
                'beneficiary_last_name' => 'HASSAN',
                'beneficiary_suffix' => '',
                'beneficiary_relationship' => 'Spouse',
                'beneficiary_birth_date' => '1985-02-14',
                'beneficiary_place_of_birth' => 'Cotabato City',
                'beneficiary_address' => 'Block 4 Lot 8, Buhangin, Davao City',
                'beneficiary_contact' => '09228889900',
                'photo_2x2_url' => null,
                'photo_2x2_name' => 'mariam_photo.png',
                'applicant_id_url' => null,
                'applicant_id_name' => 'prc_teacher_license.png',
                'applicant_id_type' => 'PRC ID',
                'consent_data_privacy' => 1,
                'agree_terms' => 1,
                'certify_beneficiary' => 1,
                'confirm_attestation' => 1,
                'printed_name' => 'MARIAM ALI HASSAN',
                'date_applied' => '2026-09-19',
                'admin_notes' => 'Requirements complete. Verified against PhilSys registry.',
                'created_at' => date('c', strtotime('-1 day')),
            ],
            [
                'id' => 'demo-app-3',
                'ref' => 'ASFI-2026-01932',
                'status' => 'Pending',
                'first_name' => 'IBRAHIM',
                'middle_name' => 'KHALID',
                'last_name' => 'SOLAIMAN',
                'suffix' => 'JR.',
                'birth_date' => '2009-06-15',
                'age' => 17,
                'place_of_birth' => 'Marawi City',
                'gender' => 'Male',
                'civil_status' => 'Single',
                'citizenship' => 'FILIPINO',
                'religion' => 'ISLAM',
                'spouse_name' => '',
                'contact_number' => '09301112233',
                'email' => 'ibrahim.jr@student.ph',
                'present_address' => 'Sitio Muslim, Matina, Davao City',
                'occupation' => 'Senior High Student',
                'affiliation_name' => 'Mindanao State University',
                'affiliation_address' => 'Davao Branch',
                'is_underage' => 1,
                'guardian_name' => 'KHALID SOLAIMAN SR.',
                'guardian_relationship' => 'Father',
                'guardian_contact' => '09193334455',
                'beneficiary_first_name' => 'KHALID',
                'beneficiary_middle_name' => 'BEN',
                'beneficiary_last_name' => 'SOLAIMAN',
                'beneficiary_suffix' => 'SR.',
                'beneficiary_relationship' => 'Parent (Mother / Father)',
                'beneficiary_birth_date' => '1975-01-10',
                'beneficiary_place_of_birth' => 'Marawi City',
                'beneficiary_address' => 'Sitio Muslim, Matina, Davao City',
                'beneficiary_contact' => '09193334455',
                'photo_2x2_url' => null,
                'photo_2x2_name' => 'ibrahim_2x2.jpg',
                'applicant_id_url' => null,
                'applicant_id_name' => 'msu_student_id.jpg',
                'applicant_id_type' => 'Student ID (School ID for Minors)',
                'consent_data_privacy' => 1,
                'agree_terms' => 1,
                'certify_beneficiary' => 1,
                'confirm_attestation' => 1,
                'printed_name' => 'KHALID SOLAIMAN SR. (Guardian of IBRAHIM JR.)',
                'date_applied' => '2026-09-20',
                'admin_notes' => null,
                'created_at' => date('c', strtotime('-2 hours')),
            ],
        ];

        foreach ($seeds as $seed) {
            $seedStmt->execute($seed);
        }
    }

    return $pdo;
}

function normalize_application_row(array $row): array {
    $row['is_underage'] = (bool)$row['is_underage'];
    $row['consent_data_privacy'] = (bool)$row['consent_data_privacy'];
    $row['agree_terms'] = (bool)$row['agree_terms'];
    $row['certify_beneficiary'] = (bool)$row['certify_beneficiary'];
    $row['confirm_attestation'] = (bool)$row['confirm_attestation'];
    if ($row['age'] !== null) {
        $row['age'] = (int)$row['age'];
    }
    return $row;
}
