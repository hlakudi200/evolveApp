
  
export interface ITaxi {
  id: string;
  registrationNumber: string;
  driverId: string;
  routeId: string; 
  passengerCapacity: number;
  isFull: boolean;
  driverFullName: string;
  driverLicenseNumber: string;
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
    AssociationName :string;
    association?: IAssociation;
    payments: IPayment[];
  }
  
  export interface ILane{
    id?:string;
    designatedRoute:string;
    capacity:string;
    queuedTaxis?:ITaxi[]
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
    id: string;
    origin: string;
    destination: string;
    fareAmount: number;
    estimatedTravelTime: number;
  }
  
  export interface IPayment {
    id: string;
    deletionTime: string;
    amount: number;
    driverId: string;
    passangerId: string;
    senderId: string;
    passenger: IPassenger;
    sender: ISender;
    timestamp: string;
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
  