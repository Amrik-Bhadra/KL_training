export interface UserDataTypes {
  fullName: string;
  email: string;
  countryCode: string | number;
  phoneNo: string | number;
  dateOfTravel: string;
  transportationMode: "bus" | "train" | "flight"
}

export interface ErrorTypes {
  nameError: string;
  emailError: string;
  countryCodeError: string;
  phoneNoError: string;
  dateOfTravelError: string;
  transportationModeError: string;
}