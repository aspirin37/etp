import { get, isNil } from 'lodash-es';

export function getField(form, field, defaultValue = '—') {
  const value = get(form, field);
  if (isNil(value)) {
    return defaultValue;
  }
  return value;
}
