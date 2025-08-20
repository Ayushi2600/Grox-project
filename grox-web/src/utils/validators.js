export const validateEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export const validatePassword = password =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/.test(
    password
  );

// export const validatePhoneNumber = phone =>
//   /^[0-9]{6,15}$/.test(phone);

export const validateName = name => /^[A-Z][a-zA-Z]*$/.test(name);
