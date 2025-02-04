export type TOrder = {
  shippingAddress: TShippingAddress;
  paymentInfo: TPaymentInfo;
  _id: string;
  user: TUser;
  products: TProduct[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentOrderId: string;
  id: string;
};

export type TShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
};

export type TPaymentInfo = {
  paymentMethod: string;
  status: string;
  transactionId: string;
  amount: number;
  currency: string;
  paidAt: string;
};

export type TUser = {
  _id: string;
  name: string;
  email: string;
};

export type TProduct = {
  productId: TProductId;
  name: string;
  price: number;
  quantity: number;
  _id: string;
  id: string;
};

export type TProductId = {
  _id: string;
  name: string;
  brand: string;
  price: number;
  id: string;
};
