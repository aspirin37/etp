const priceRequestTypes = {
  standard: 'Стандартный ЦЗ',
};

const priceRequestStatuses = {
  draft: 'Черновик',
  pending: 'На рассмотрении у поставщиков',
  review: 'На рассмотрении у заказчика',
  auction: 'Уторговывание',
  completed: 'Завершен',
  cancelled: 'Отменен',
};

export {
  priceRequestTypes,
  priceRequestStatuses,
};
