export const enum OrderStatus {
  DRAFT,
  NEW,
  CONFIRMED,
  SENT,
  DELIVERED,
  CANCELED,
}

export const statusToString = new Map([
  [OrderStatus.DRAFT, 'Draft'],
  [OrderStatus.NEW, 'New'],
  [OrderStatus.CONFIRMED, 'Confirmed'],
  [OrderStatus.SENT, 'Sent'],
  [OrderStatus.DELIVERED, 'Delivered'],
  [OrderStatus.CANCELED, 'Canceled'],
]);
