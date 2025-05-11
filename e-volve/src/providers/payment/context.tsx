"use client";
import { createContext } from "react";
import { ICreateYocoCheckout, IPayment, IYocoCheckoutResponse } from "../interfaces";

export interface IPaymentStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Payment?: IPayment;
  Payments?: IPayment[];
  YocoResponse?:IYocoCheckoutResponse;
}

export interface IPaymentActionContext {
  getPayments: () => void;
  getPayment: (id: number | undefined) => void;
  createPayment: (Payment: IPayment) => void;
  createYocoCheckout:(driverId:string,request:ICreateYocoCheckout)=>void
  updatePayment: (Payment: IPayment) => void;
  deletePayment: (id: string) => void;
}

export const INITIAL_STATE: IPaymentStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const PaymentStateContext =
  createContext<IPaymentStateContext>(INITIAL_STATE);

export const PaymentActionContext = createContext<
  IPaymentActionContext | undefined
>(undefined);
