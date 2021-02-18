/* eslint-disable */
export default function hasClass (el, cls, mod) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    let clsmod;
    switch (mod) {
      case '^':
        clsmod = ` ${cls}`;
        break;
      case '$':
        clsmod = `${cls} `;
        break;
      case '*':
        clsmod = cls;
        break;
      default:
        return el.classList.contains(cls);
    }
    return el.className.match(clsmod)
      ? (el.className.match(clsmod).length > 1 ? el.className.split(' ').filter(c => c.includes(cls)) : el.className.split(' ').find(c => c.includes(cls)))
      : false;
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}
