import { get } from 'lodash-es';
import voca from 'voca';

/**
 * Returns error string for field using Vuelidate instance
 * @param $v
 * @param field
 * @param store
 * @returns {string|any|string}
 */
export const getFormErrorMessage = ($v, field, store) => {
  const camelField = voca.camelCase(field);
  const fieldParams = get($v, field, $v?.field);
  const isInvalid = fieldParams.$invalid;
  if (isInvalid) {
    const errorsStack = {
      alpha: 'Допускаются только буквенные значения',
      required: 'Обязательное поле',
      numeric: 'Не является числовым значением',
      email: 'Неправильный адрес почты',
      minLength: '',
      maxLength: '',
      inn: 'Неправильный внутренний номер',
      kpp: 'Неправильный внутренний номер',
    };
    return Object.keys(errorsStack).reduce((errors, key) => {
      if (Object.prototype.hasOwnProperty.call(errorsStack, key) && fieldParams[key] === false) {
        switch (key) {
          case 'minLength': {
            const min = fieldParams?.$params?.minLength?.min || 0;
            errors.push(`Поле должно быть длинной не менее ${min} символов`);
            break;
          }
          case 'maxLength': {
            const max = fieldParams?.$params?.maxLength?.max || 0;
            errors.push(`Поле должно быть длинной не менее ${max} символов`);
            break;
          }
          default:
            errors.push(errorsStack[key] || '');
        }
      }
      return errors;
    }, [])[0] || null;
  }
  if (store) {
    return get(store, `getters['error/validationErrors'].${camelField}`, null) || '';
  }
  return '';
};

/**
 * Return error string from API
 * @param error
 * @returns {string}
 */
export const getApiLocaleErrors = (error) => {
  let text = null;
  const { message, request } = error || {};

  if (request) {
    text = request.statusText;
  } else {
    text = message;
  }

  return text;
};
