/* eslint no-useless-escape: 0 */
/* eslint no-use-before-define: 0 */

export const rfcRegex = /^(([ÑA-Z|ña-z|&]{3}|[A-Z|a-z]{4})\d{2}((0[1-9]|1[012])(0[1-9]|1\d|2[0-8])|(0[13456789]|1[012])(29|30)|(0[13578]|1[02])31)(\w{2})([A|a|0-9]{1}))$|^(([ÑA-Z|ña-z|&]{3}|[A-Z|a-z]{4})([02468][048]|[13579][26])0229)(\w{2})([A|a|0-9]{1})$/;
export const RFC_REGEX = 'RFC';

export const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
export const CURP_REGEX = 'CURP';

export const numberRegex = /^[0-9]*$/;
export const NUMBER_REGEX = 'NUMBERS';

export const phoneRegex = /[0-9\(\-]+$/;
export const PHONE_REGEX = 'PHONE';

export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const EMAIL_REGEX = 'EMAIL';

export const decimalNumberRegex = /^\d{1,}(\.\d{0,4})?$/;
export const DECIMAL_REGEX = 'DECIMAL';

export const rangoValorConfigRegex =  /(^[0-9]{1,3}\.{1}[0-9]{0,3}$)|(^[0-9]{1,3}$)/
export const RANGO_CONFIG_REGEX = 'RANGO_CONFIG_REGEX';

export const lettersNumbers = /^[a-zA-zÀ-ÿ-Z0-9_.-\s]*$/;
export const LETTERSNUMBERS = 'LETTERSNUMBERS';

export const letters = /^[a-zA-Z-zÀ-ÿ\s]*$/;
export const LETTERS = 'LETTERS';

export const url = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
export const URL = 'URL';

export const timeRange = /^((?:[01]\d:[0-5][0-9]|2[0-3]:[0-5][0-9])(?:\s?)-(?:\s?)(?:[01]\d:[0-5][0-9]|2[0-3]:[0-5][0-9])(?:\s?,\s?)?)+$/g;
export const TIME_RANGE = 'TIME_RANGE';

export const noSpaces = /^\S*$/;
export const NO_SPACES = 'NO_SPACES';

export const regexValid = (e) => {
  if (!e.target.getAttribute) return true;
  const regex = e.target.getAttribute('regex');
  const regexOnChange = e.target.getAttribute('regexonchange');
  const { value } = e.target;
  let valid = true;
  if (regex && value && value !== '' && regexOnChange) {
    const validation = validations[regex];
    valid = validation(value);
  }
  return valid;
};

const validations = {
  RFC: (value = '') => rfcRegex.test(value),
  CURP: (value = '') => curpRegex.test(value),
  NUMBERS: (value = '') => numberRegex.test(value),
  PHONE: (value = '') => phoneRegex.test(value),
  EMAIL: (value = '') => emailRegex.test(value),
  DECIMAL: (value = '') => value.match(/^\d{1,}(\.\d{0,4})?$/),
  RANGO_CONFIG_REGEX: (value = '') => value.match(rangoValorConfigRegex),
  LETTERSNUMBERS: (value = '') => lettersNumbers.test(value),
  LETTERS: (value = '') => letters.test(value),
  URL: (value = '') => url.test(value),
  TIME_RANGE: (value = '') => value.match(timeRange),
  NO_SPACES: (value = '') => noSpaces.test(value),
};

export const regexMessages = {
  RFC: 'Formato no válido.',
  EMAIL: 'Dirección de correo no válida.',
  URL: 'URL no válida',
  TIME_RANGE: 'Formato no válido',
};

export default validations;
