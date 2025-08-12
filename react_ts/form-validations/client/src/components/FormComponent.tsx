import React from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";
import { countryCodes, transportationMode } from "../utils/dataProvider";
import DropdownComponent from "./DropdownComponent";

import type { ErrorTypes, UserDataTypes } from "../utils/typesProvider";

interface FormPropsTypes {
  userData: UserDataTypes;
  errorData: ErrorTypes;
  setUserData: React.Dispatch<React.SetStateAction<UserDataTypes>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormComponent = ({
  userData,
  errorData,
  setUserData,
  handleSubmit,
}: FormPropsTypes) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (selectedCountryCode: string | number) => {
    setUserData({ ...userData, countryCode: selectedCountryCode });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full">
      <InputComponent
        label="Full Name"
        name="fullName"
        id="fullName"
        placeholder="eg. John Doe"
        value={userData.fullName}
        onChange={handleChange}
        required={true}
        error={errorData.nameError}
      />

      <InputComponent
        label="Email"
        type="email"
        name="email"
        id="email"
        placeholder="eg. john.doe@example.com"
        width=""
        value={userData.email}
        onChange={handleChange}
        required={true}
        error={errorData.emailError}
      />

      <div className="w-full flex items-center gap-x-2">
        <DropdownComponent
          label="Country Code"
          options={countryCodes}
          value={userData.countryCode}
          placeholder="eg: +91"
          width="50%"
          required={true}
          onChange={handleSelect}
          error={errorData.countryCodeError}
        />
        <InputComponent
          label="Phone Number"
          name="phoneNo"
          id="phoneNo"
          width="50%"
          placeholder="eg. 987xx xxxxx"
          value={userData.phoneNo}
          onChange={handleChange}
          required={true}
          error={errorData.phoneNoError}
        />
      </div>

      <div className="w-full flex items-center gap-x-2">
        <InputComponent
          label="Travel Date"
          type="date"
          name="dateOfTravel"
          id="dateOfTravel"
          width="50%"
          placeholder=""
          value={userData.dateOfTravel}
          onChange={handleChange}
          required={true}
          error={errorData.dateOfTravelError}
        />

        <DropdownComponent
          label="Transporation Mode"
          options={transportationMode}
          value={userData.transportationMode}
          placeholder="eg: Train"
          width="50%"
          required={true}
          onChange={handleSelect}
          error={errorData.transportationModeError}
        />
      </div>

      <Button
        text="Submit"
        btnType="submit"
        color="#1e96fc"
        customStyle="rounded-md text-white mt-2"
      />
    </form>
  );
};

export default FormComponent;
