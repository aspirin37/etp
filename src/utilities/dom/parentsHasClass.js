import hasClass from './hasClass';

/* eslint-disable */
export default function parentsHasClass (el, cls, mod) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  let classExist = hasClass(el, cls, mod);
  while (el && el.tagName !== 'BODY' && !classExist) {
    classExist = hasClass(el, cls, mod);
    el = el.parentNode;
  }
  return classExist;
}
