// src/constants/idTypes.js
const ID_TYPES = {
  GH: [
    { type: "GHANA_CARD", format: "GHA-000000000-0" },
    { type: "GHANA_CARD_NO_PHOTO", format: "GHA-000000000-0" },
    { type: "PASSPORT", format: "*G0000000" },
    { type: "VOTER_ID", format: "0000000000" },
  ],
  KE: [
    { type: "ALIEN_CARD", format: "000000" },
    { type: "KRA_PIN", format: "00000000" },
    { type: "NATIONAL_ID", format: "00000000" },
    { type: "NATIONAL_ID_NO_PHOTO", format: "00000000" },
    { type: "PASSPORT", format: "*A00000000" },
    { type: "TAX_INFORMATION", format: "A000000000A" },
  ],
  NG: [
    { type: "BANK_ACCOUNT", format: "0000000000" },
    { type: "BVN", format: "00000000000" },
    { type: "NIN_V2", format: "00000000000" },
    { type: "NIN_SLIP", format: "00000000000" },
    { type: "V_NIN", format: "0000000000000000" },
    { type: "PHONE_NUMBER", format: "00000000000" },
    { type: "VOTER_ID", format: "0000000000000000000" },
  ],
  ZA: [
    { type: "NATIONAL_ID", format: "0000000000000" },
    { type: "NATIONAL_ID_NO_PHOTO", format: "0000000000000" },
  ],
  UG: [
    { type: "NATIONAL_ID_NO_PHOTO", format: "00000000000000" },
  ],
  ZM: [
    { type: "BANK_ACCOUNT", format: "0000000000000" },
    { type: "TPIN", format: "0000000000" },
  ],
};

export default ID_TYPES;
