
export const getPasswordStrength = (password: string) => {
    const lengthCriteria = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    let strength = 0;
    if (lengthCriteria) strength += 1;
    if (hasUpperCase) strength += 1;
    if (hasLowerCase) strength += 1;
    if (hasNumbers) strength += 1;
    if (hasSpecialChars) strength += 1;
  
    if (strength <= 2) return { className: "bg-red-500", width: "30%" };
    if (strength === 3) return { className: "bg-yellow-500", width: "60%" };
  
    return { className: "bg-green-500", width: "100%" };
  };
  