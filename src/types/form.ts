export type CivilStatus = 'Single' | 'Married' | 'Separated' | 'Widowed' | 'Others';
export type Gender = 'Male' | 'Female';

export interface FormData {
  // Step 1: Personal Information
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  birthDate: string; // YYYY-MM-DD
  age: number | null;
  placeOfBirth: string;
  gender: Gender | '';
  civilStatus: CivilStatus | '';
  citizenship: string;
  occupation: string;
  religion: string;
  spouseName: string;
  email: string;
  contactNumber: string;
  presentAddress: string;
  companySchoolAffiliation: string;
  affiliationAddress: string;

  // Underage / Guardian Information (if age < 18)
  isUnderage: boolean;
  guardianName: string;
  guardianRelationship: string;
  guardianContact: string;

  // Step 2: Beneficiary Information
  beneficiaryFirstName: string;
  beneficiaryMiddleName: string;
  beneficiaryLastName: string;
  beneficiarySuffix: string;
  beneficiaryRelationship: string;
  beneficiaryBirthDate: string;
  beneficiaryPlaceOfBirth: string;
  beneficiaryAddress: string;
  beneficiaryContact: string;
  sameAddressAsApplicant: boolean;

  // Step 3: Document Attachments
  photo2x2: string | null; // Data URL
  photo2x2Name?: string;
  applicantId: string | null; // Data URL
  applicantIdName?: string;
  applicantIdType?: string;
  beneficiaryId: string | null; // Data URL (Optional)
  beneficiaryIdName?: string;
  guardianId: string | null; // Data URL (Required if underage)
  guardianIdName?: string;

  // Step 4: Declarations & Attestation
  consentDataPrivacy: boolean;
  agreeTermsAndConditions: boolean;
  certifyLegalBeneficiary: boolean;
  confirmAttestation: boolean;
  printedName: string;
  dateApplied: string;
  signatureType?: 'draw' | 'type';
  signatureDataUrl?: string | null;
  signatureTypedName?: string;
}

export interface ApplicationSubmissionResponse {
  success: boolean;
  referenceNumber: string;
  message: string;
  submittedAt: string;
  data: Partial<FormData>;
}
