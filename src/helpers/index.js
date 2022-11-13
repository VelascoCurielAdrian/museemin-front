import { toast } from 'react-toastify';
import Regex, { regexMessages } from './regex';

export const parseError = (e) => {
	if (e.message.includes('Network error')) {
		return [
			{
				name: 'NETWORK_ERROR',
				message: 'El servidor no responde, intente más tarde.',
			},
		];
	}
	const parseErrors = e.graphQLErrors
		.map(({ extensions, message }) => {
			if (extensions.code === 'BAD_USER_INPUT') {
				const errors = extensions.fields.reduce(
					(object, el) => ({ ...object, [el.name]: el.message }),
					{},
				);
				return { name: extensions.code, message: errors };
			}
			if (['GENERAL_ERROR', 'PAYMENT_ERROR'].includes(extensions.code)) {
				return { name: extensions.code, message };
			}
			return null;
		})
		.filter((el) => el);
	return parseErrors;
};

export const GetTotalGastos = async (importe, diferencia, subTotal) => {
	await new Promise((response) => setTimeout(response, 20));
	const total = (parseFloat(importe) - parseFloat(subTotal) + parseFloat(diferencia));
	return parseFloat(total || 0).toFixed(2);
}

export const GetSubTotalGastos = async (articulos) => {
	await new Promise((r) => setTimeout(r, 20));
	let subtotal = 0;
	articulos.map(
		(el) => (subtotal += parseFloat(el.cantidad) * parseFloat(el.precio)),
	);
	return parseFloat(subtotal || 0).toFixed(2);
}

export const findPropertysEmpty = (obj, showMsg = false) => {
  const errors = {};
  const regex = {};
  const elements = obj?.querySelectorAll('input, textarea, select') || [];
  let totalErrors = 0;
  let totalRegex = 0;
  Array.prototype.slice.call(elements).forEach((element) => {
    const regexElement = element.getAttribute('regex');
    const regexOnSubmit = element.getAttribute('regexonsubmit');
    const index = element.getAttribute('index');
    if (regex && regexOnSubmit && element.value.trim() !== '') {
      const validation = Regex[regexElement];
      const regexValid = validation(element.value);
      if (!regexValid) {
        if (index) {
          regex[`${element.name}${index}`] = regexMessages[regexElement] || true;
        } else {
          regex[element.name] = regexMessages[regexElement] || true;
        }
        totalRegex++;
      }
    }
    if (!element.required) return;
    const type = typeof (element.value);
    const errorName = element.getAttribute('errorname');
    if (type === 'string') {
      if (element.value.trim() === '' || element.value.trim() === '-1') {
        totalErrors++;
        errors[errorName || element.name] = true;
      }
    } else if (type === 'number') {
      if (element.value === -1) {
        totalErrors++;
        errors[errorName || element.name] = true;
      }
    }
  });

  for (const key in errors) {
    if (key.includes('.')) {
      const arr = key.split('.');
      if (!errors[arr[0]]) errors[arr[0]] = {};
      errors[arr[0]][arr[1]] = errors[key];
      delete errors[key];
    }
  }

  if (showMsg && (totalErrors > 0 || totalRegex > 0)) {
    toast.error(`${totalErrors + totalRegex} campos requeridos no han sido completados.`);

  };

  return {
    errors, totalErrors, regex, totalRegex,
  };
};