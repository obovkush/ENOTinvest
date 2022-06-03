// has number
const hasNumber = (password) => new RegExp(/[0-9]/).test(password);

// has mix of small and capitals
const hasMixed = (password) =>
  new RegExp(/[a-z]/).test(password) && new RegExp(/[A-Z]/).test(password);

// has special chars
const hasSpecial = (password) => new RegExp(/[!#@$%^&*)(+=._-]/).test(password);

// set color based on password strength
export const strengthColor = (count) => {
  if (count === 0) return { label: 'Пустой пароль', color: 'error.main' };
  else if (count < 5)
    return { label: 'Очень слабый пароль', color: 'error.main' };
  else if (count < 6) return { label: 'Слабый пароль', color: 'warning.main' };
  else if (count < 7)
    return { label: 'Нормальный пароль', color: 'warning.dark' };
  else if (count < 8) return { label: 'Хороший пароль', color: 'success.main' };
  else return { label: 'Сильный пароль', color: 'success.dark' };
};

// password strength indicator
export const strengthIndicator = (password) => {
  let strengths = 0;
  if (password.length > 5) strengths += 1;
  if (password.length > 7) strengths += 1;
  if (hasNumber(password)) strengths += 2;
  if (hasSpecial(password)) strengths += 2;
  if (hasMixed(password)) strengths += 2;
  return strengths;
};
