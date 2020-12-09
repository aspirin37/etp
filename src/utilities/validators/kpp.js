export default function kpp(value) {
  return !/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(value);
}
