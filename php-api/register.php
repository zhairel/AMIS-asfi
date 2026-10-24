<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON payload.']);
    exit;
}

// 1. Required field validations
$firstName = trim((string)($body['firstName'] ?? ''));
$lastName = trim((string)($body['lastName'] ?? ''));
if ($firstName === '' || $lastName === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Applicant first name and last name are required.']);
    exit;
}

$beneFirst = trim((string)($body['beneficiaryFirstName'] ?? ''));
$beneLast = trim((string)($body['beneficiaryLastName'] ?? ''));
if ($beneFirst === '' || $beneLast === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Beneficiary first name and last name are required.']);
    exit;
}

$consentPrivacy = !empty($body['consentDataPrivacy']);
$agreeTerms = !empty($body['agreeTermsAndConditions']);
$certifyBene = !empty($body['certifyLegalBeneficiary']);
if (!$consentPrivacy || !$agreeTerms || !$certifyBene) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All 3 declaration agreements must be accepted.']);
    exit;
}

// 2. Generate unique ASFI Reference Number: ASFI-YYYY-XXXXX
$year = date('Y');
$randomChars = strtoupper(substr(bin2hex(random_bytes(4)), 0, 5));
$referenceNumber = "ASFI-{$year}-{$randomChars}";
$now = date('c');
$id = 'app_' . time() . '_' . strtolower(substr(bin2hex(random_bytes(3)), 0, 6));

// 3. Helper to save Base64 upload to disk
function saveBase64File(?string $dataUrl, string $ref, string $type): ?string {
    if (!$dataUrl || !str_starts_with($dataUrl, 'data:')) {
        return $dataUrl ?: null;
    }

    if (!preg_match('/^data:([^;]+);base64,(.+)$/', $dataUrl, $matches)) {
        return $dataUrl;
    }

    $mime = $matches[1];
    $base64 = $matches[2];
    $binary = base64_decode($base64);
    if ($binary === false) {
        return null;
    }

    $ext = 'jpg';
    if (str_contains($mime, 'png')) $ext = 'png';
    elseif (str_contains($mime, 'webp')) $ext = 'webp';
    elseif (str_contains($mime, 'pdf')) $ext = 'pdf';

    $uploadDir = dirname(__DIR__) . '/uploads/applications/' . $ref;
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $filename = "{$type}.{$ext}";
    $targetPath = $uploadDir . '/' . $filename;
    file_put_contents($targetPath, $binary);

    return "/uploads/applications/{$ref}/{$filename}";
}

$photo2x2Url = saveBase64File($body['photo2x2'] ?? null, $referenceNumber, 'photo_2x2');
$applicantIdUrl = saveBase64File($body['applicantId'] ?? null, $referenceNumber, 'applicant_id');
$beneficiaryIdUrl = saveBase64File($body['beneficiaryId'] ?? null, $referenceNumber, 'beneficiary_id');
$guardianIdUrl = saveBase64File($body['guardianId'] ?? null, $referenceNumber, 'guardian_id');

// 4. Save to SQLite database
try {
    $pdo = get_db();

    $stmt = $pdo->prepare("INSERT INTO applications (
        id, reference_number, status, first_name, middle_name, last_name, suffix,
        birth_date, age, place_of_birth, gender, civil_status, citizenship, religion,
        spouse_name, contact_number, email, present_address, occupation, affiliation_name, affiliation_address,
        is_underage, guardian_name, guardian_relationship, guardian_contact,
        beneficiary_first_name, beneficiary_middle_name, beneficiary_last_name, beneficiary_suffix,
        beneficiary_relationship, beneficiary_birth_date, beneficiary_place_of_birth, beneficiary_address, beneficiary_contact,
        photo_2x2_url, photo_2x2_name, applicant_id_url, applicant_id_name, applicant_id_type,
        beneficiary_id_url, beneficiary_id_name, guardian_id_url, guardian_id_name,
        consent_data_privacy, agree_terms, certify_beneficiary, confirm_attestation,
        printed_name, date_applied, admin_notes, created_at
    ) VALUES (
        :id, :ref, 'Pending', :first_name, :middle_name, :last_name, :suffix,
        :birth_date, :age, :place_of_birth, :gender, :civil_status, :citizenship, :religion,
        :spouse_name, :contact_number, :email, :present_address, :occupation, :affiliation_name, :affiliation_address,
        :is_underage, :guardian_name, :guardian_relationship, :guardian_contact,
        :bene_first, :bene_mid, :bene_last, :bene_suf,
        :bene_rel, :bene_bdate, :bene_pob, :bene_addr, :bene_contact,
        :p2x2_url, :p2x2_name, :app_id_url, :app_id_name, :app_id_type,
        :bene_id_url, :bene_id_name, :guard_id_url, :guard_id_name,
        :consent, :agree, :certify, :confirm,
        :printed_name, :date_applied, NULL, :created_at
    )");

    $stmt->execute([
        ':id' => $id,
        ':ref' => $referenceNumber,
        ':first_name' => mb_strtoupper($firstName, 'UTF-8'),
        ':middle_name' => mb_strtoupper(trim((string)($body['middleName'] ?? '')), 'UTF-8'),
        ':last_name' => mb_strtoupper($lastName, 'UTF-8'),
        ':suffix' => mb_strtoupper(trim((string)($body['suffix'] ?? '')), 'UTF-8'),
        ':birth_date' => (string)($body['birthDate'] ?? ''),
        ':age' => isset($body['age']) && is_numeric($body['age']) ? (int)$body['age'] : null,
        ':place_of_birth' => mb_strtoupper(trim((string)($body['placeOfBirth'] ?? '')), 'UTF-8'),
        ':gender' => (string)($body['gender'] ?? ''),
        ':civil_status' => (string)($body['civilStatus'] ?? ''),
        ':citizenship' => mb_strtoupper(trim((string)($body['citizenship'] ?? 'FILIPINO')), 'UTF-8'),
        ':religion' => mb_strtoupper(trim((string)($body['religion'] ?? 'ISLAM')), 'UTF-8'),
        ':spouse_name' => mb_strtoupper(trim((string)($body['spouseName'] ?? '')), 'UTF-8'),
        ':contact_number' => trim((string)($body['contactNumber'] ?? '')),
        ':email' => mb_strtolower(trim((string)($body['email'] ?? '')), 'UTF-8'),
        ':present_address' => mb_strtoupper(trim((string)($body['presentAddress'] ?? '')), 'UTF-8'),
        ':occupation' => mb_strtoupper(trim((string)($body['occupation'] ?? '')), 'UTF-8'),
        ':affiliation_name' => mb_strtoupper(trim((string)($body['companySchoolAffiliation'] ?? '')), 'UTF-8'),
        ':affiliation_address' => mb_strtoupper(trim((string)($body['affiliationAddress'] ?? '')), 'UTF-8'),
        ':is_underage' => !empty($body['isUnderage']) ? 1 : 0,
        ':guardian_name' => mb_strtoupper(trim((string)($body['guardianName'] ?? '')), 'UTF-8'),
        ':guardian_relationship' => (string)($body['guardianRelationship'] ?? ''),
        ':guardian_contact' => trim((string)($body['guardianContact'] ?? '')),
        ':bene_first' => mb_strtoupper($beneFirst, 'UTF-8'),
        ':bene_mid' => mb_strtoupper(trim((string)($body['beneficiaryMiddleName'] ?? '')), 'UTF-8'),
        ':bene_last' => mb_strtoupper($beneLast, 'UTF-8'),
        ':bene_suf' => mb_strtoupper(trim((string)($body['beneficiarySuffix'] ?? '')), 'UTF-8'),
        ':bene_rel' => (string)($body['beneficiaryRelationship'] ?? ''),
        ':bene_bdate' => (string)($body['beneficiaryBirthDate'] ?? '') ?: null,
        ':bene_pob' => mb_strtoupper(trim((string)($body['beneficiaryPlaceOfBirth'] ?? '')), 'UTF-8'),
        ':bene_addr' => mb_strtoupper(trim((string)($body['beneficiaryAddress'] ?? '')), 'UTF-8'),
        ':bene_contact' => trim((string)($body['beneficiaryContact'] ?? '')),
        ':p2x2_url' => $photo2x2Url,
        ':p2x2_name' => (string)($body['photo2x2Name'] ?? ($photo2x2Url ? 'photo_2x2.jpg' : null)),
        ':app_id_url' => $applicantIdUrl,
        ':app_id_name' => (string)($body['applicantIdName'] ?? ($applicantIdUrl ? 'valid_id.jpg' : null)),
        ':app_id_type' => (string)($body['applicantIdType'] ?? ''),
        ':bene_id_url' => $beneficiaryIdUrl,
        ':bene_id_name' => (string)($body['beneficiaryIdName'] ?? null),
        ':guard_id_url' => $guardianIdUrl,
        ':guard_id_name' => (string)($body['guardianIdName'] ?? null),
        ':consent' => $consentPrivacy ? 1 : 0,
        ':agree' => $agreeTerms ? 1 : 0,
        ':certify' => $certifyBene ? 1 : 0,
        ':confirm' => !empty($body['confirmAttestation']) ? 1 : 0,
        ':printed_name' => mb_strtoupper(trim((string)($body['printedName'] ?? '')), 'UTF-8'),
        ':date_applied' => (string)($body['dateApplied'] ?? date('Y-m-d')),
        ':created_at' => $now,
    ]);

    echo json_encode([
        'success' => true,
        'referenceNumber' => $referenceNumber,
        'id' => $id,
        'message' => 'Application submitted successfully.',
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error while saving application: ' . $e->getMessage(),
    ]);
}
