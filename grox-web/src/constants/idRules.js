export const ID_RULES = {
  CI: {
    NATIONAL_ID_NO_PHOTO: [/^[0-9]{11}$/, /^[A-Za-z]\d{10}$/],
    RESIDENT_ID_NO_PHOTO: [/^[0-9]{11}$/, /^[A-Za-z]\d{10}$/],
  },
  GH: {
    GHANA_CARD: [/^[A-Z]{3}-?\d{9}-?\d$/i],
    GHANA_CARD_NO_PHOTO: [/^[A-Z]{3}-?\d{9}-?\d$/i],
    PASSPORT: [/^[A-Z]{1,2}[0-9]{6,7}$/i],
    SSNIT: [/^[a-zA-Z]{1}[a-zA-Z0-9]{12,14}$/i],
    VOTER_ID: [/^[0-9]{10,12}$/],
    NEW_VOTER___ID: [/^[0-9]{10,12}$/],
  },
  KE: {
    ALIEN_CARD: [/^[0-9]{6,9}$/],
    KRA_PIN: [/^[0-9]{1,9}$/],
    NATIONAL_ID: [/^[0-9]{1,9}$/],
    NATIONAL_ID_NO_PHOTO: [/^[0-9]{1,9}$/],
    PASSPORT: [/^[A-Z0-9]{7,9}$/],
    TAX_INFORMATION: [/^[Aa]\d{9}[a-zA-Z]$/],
  },
  NG: {
    BVN: [/^[0-9]{11}$/],
    NIN_V2: [/^[0-9]{11}$/],
    NIN_SLIP: [/^[0-9]{11}$/],
    PHONE_NUMBER: [/^[0-9]{11}$/],
    VOTER_ID: [/^[a-zA-Z0-9 ]{9,29}$/i],
  },
  ZA: {
    NATIONAL_ID: [/^[0-9]{13}$/],
    NATIONAL_ID_NO_PHOTO: [/^[0-9]{13}$/],
    PHONE_NUMBER: [/^[0-9]{10}$/],
  },
  UG: {
    NATIONAL_ID_NO_PHOTO: [/^[A-Z0-9]{14}$/i],
  },
  ZM: {
    TPIN: [/^[0-9]{10}$/],
    // BANK_ACCOUNT = special case
  },
};
