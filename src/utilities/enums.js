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

const orderStatuses = {
  pending: 'На утверждении у поставщика',
  rejected: 'Отклонён',
  deleted: 'Удалён',
  fulfillment: 'Исполняется',
  fulfilled: 'Исполнен',
  failed: 'Не исполнен',
  refund: 'Возврат денежных средств',
};

export { priceRequestTypes, priceRequestStatuses, orderStatuses };
