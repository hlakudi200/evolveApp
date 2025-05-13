

export interface ITaxi {
  id: string;
  registrationNumber: string;
  driverId: string;
  routeId: string;
  passengerCapacity: number;
  isFull: boolean;
  driverFullName: string;
  driverLicenseNumber: string;
  latitude:string;
  longtiute:string;
  assignedRoute: IRoute;
}

export interface IDriver {
  id: string;
  identificationNumber: string;
  firstName: string;
  secondName: string;
  surname: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  cellPhoneNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  licenseType: string;
  isActive: boolean;
  taxiAssociationId: string;
  AssociationName?: string;
  association?: IAssociation;
  payments?: IPayment[];
}

export interface ILane {
  id?: string;
  routeId?: string;
  designatedRoute?: IRoute;
  capacity: number;
  queus?: IQue[]
}

export interface ITaxiQues {
  id?: string;
  routeId?: string;
  designatedRoute?: IRoute;
  capacity: number;
  queus?: IQue[]
}
export interface IFacility {
  id?: string;
  name: string;
  description: string;
  unit: number;
  isOperational: boolean
}

export interface IQue {
  id?: string;
  creationDate: string;
  isOpen: boolean;
  quedTaxis?: ITaxi[]
}
export interface IAssociation {
  id: string;
  name: string;
  controlledRoutes: IRoute[];
  members: IMember[];
}

export interface IMember {
  firstName: string;
  surname: string;
  fullName: string;
  licenseNumber: string;
  isActive: boolean;
}

export interface IRoute {
  id?: string;
  origin: string;
  destination: string;
  latitude :number
  longitude:number
  fareAmount: number;
  estimatedTravelTime: number;
}

export interface IPayment {
  id: string;
  driverId: string;
  amount: number;
  paymentDate: string;
  transactionReference: string;
  gatewayResponseCode: string;
  gatewayTransactionId?: string;
  status: string;
  payoutId?: string;
}

export interface IPassenger {
  id: string;
  firstName: string;
  secondName: string;
  surname: string;
  cellPhoneNo: string;
  nextOfKinCellPhoneNo: string;
  destination: string;
  fareAmount: number;
}

export interface ISender {
  id: string;
  identificationNumber: string;
  firstName: string;
  secondName: string;
  surname: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  cellPhoneNo: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface ICreateYocoCheckout {
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  failureUrl: string;
}

export interface IYocoCheckoutResponse{
  checkoutId:string,
  checkoutUrl:string
}

export interface IDriverAccountDetail{
  id?:string,
  driverId:string,
  bankName:string,
  branchCode:string,
  accountNumber:string,
  accountHolderName:string,
  accountType:string
}