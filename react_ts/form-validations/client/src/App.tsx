import { useState } from "react";
import FormComponent from "./components/FormComponent";
import travel_bg from "./assets/images/travel_bg.jpg";
import "./assets/style/global.css";

import type { ErrorTypes, UserDataTypes } from "./utils/typesProvider";

export default function App() {
  const [isBooked, setIsBooked] = useState(false);
  const [userData, setUserData] = useState<UserDataTypes>({
    fullName: "",
    email: "",
    countryCode: "",
    phoneNo: "",
    dateOfTravel: "",
    transportationMode: "bus",
  });
  const [errorData, setError] = useState<ErrorTypes>({
    nameError: "",
    emailError: "",
    countryCodeError: "",
    phoneNoError: "",
    dateOfTravelError: "",
    transportationModeError: "",
  });

  // const handleError = (targetName: string, targetValue: string) => {
  //   setError({ ... errorData, [targetName]: targetValue });
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: ErrorTypes = {...errorData};

    // validate fullname
    if (!userData.fullName.trim()) {
      errors.nameError = "Name cannot be empty";
    } else {
      errors.nameError = "";
    }

    // validate email
    if (!userData.email.trim()) {
      errors.emailError = "Email cannot be empty";
    } else {
      if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
        errors.emailError = "Invalid email address";
      } else {
        errors.emailError = "";
      }
    }

    // validate country code
    if (!userData.countryCode) {
      errors.countryCodeError = "Country code cannot be empty";
    } else {
      errors.countryCodeError = "";
    }

    // Validate phoneNo (simple check for digits)
    if (!userData.phoneNo.toString().trim()) {
      errors.phoneNoError = "Phone number cannot be empty";
    } else if (!/^\d+$/.test(userData.phoneNo.toString())) {
      errors.phoneNoError = "Phone number must contain only digits";
    } else {
      errors.phoneNoError = "";
    }

    // Validate dateOfTravel (empty check)
    if (!userData.dateOfTravel.trim()) {
      errors.dateOfTravelError = "Date of travel cannot be empty";
    } else {
      errors.dateOfTravelError = "";
    }

    // Transportation mode validation (if needed)
    if (!userData.transportationMode.trim()) {
      errors.transportationModeError = "Please select transportation mode";
    } else {
      errors.transportationModeError = "";
    }

    setError(errors);

    const hasErrors = Object.values(errors).some(
      (errorMessage) => errorMessage !== ""
    );

    if (!hasErrors) {
      console.log(userData);
      setIsBooked(true);
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${travel_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!isBooked ? (
        <div
          id="form-container"
          className="glass md:w-[40%] lg:w-[30%] flex flex-col gap-y-5"
        >
          <h1 className="text-3xl font-semibold">Book Your Travel ✈️</h1>
          <FormComponent
            userData={userData}
            errorData={errorData}
            setUserData={setUserData}
            handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <h1>User not logged in</h1>
      )}
    </div>
  );
}
