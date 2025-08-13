import React, { useState, type ChangeEvent, type FormEvent } from "react";
import InputComponent from "./InputComponent";
import Button from "./Button";

import type { FormDataType } from "../interfaces/FormDataType";
import type { FormErrorType } from "../interfaces/FormErrorType";
import PasswordComponent from "./PasswordComponent";
import UploadComponent from "./UploadComponent";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utils/helpers";

const MultipartForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: 0,
    age: 0,
    city: "",
    state: "",
    country: "",
    profilePic: null,
    cv: null,
  });

  const [errorData, setErrorData] = useState<FormErrorType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    age: "",
    city: "",
    state: "",
    country: "",
    profilePic: "",
    cv: "",
  });

  const [previewProfilePic, setPreviewProfilePic] = useState<string | null>(
    null
  );
  const [previewCV, setPreviewCV] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "numner" ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });

      const objectUrl = URL.createObjectURL(files[0]);

      if (name === "profilePic") {
        setPreviewProfilePic(objectUrl);
      }
      if (name === "cv") {
        setPreviewCV(objectUrl);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: FormErrorType = { ...errorData };

    // validate firstName and lastName
    if (!formData.firstName.trim()) {
      errors.firstName = "First is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last is required";
    }

    // validate email
    if (!formData.email.trim()) {
      errorData.email = "Email is required";
    } else {
    if (!validateEmail(formData.email)) {
        errors.email = "Invalid email address";
      }
    }

    // validate password
    if (!formData.password.trim()) {
      errorData.password = "Password is required";
    } else if (formData.password.trim().length < 8) {
      errorData.password = "Password should be of atleast 8 characters";
    } else if (!validatePassword(formData.password)) {
      errors.password =
        "Password must include uppercase, lowercase, digit and special character";
    }

    // validate age
    if (!formData.age || formData.age <= 0) {
      errors.age = "Age is required";
    } else if (formData.age < 18) {
      errors.age = "You must be at least 18 years old";
    }

    // validate phone number
    if (!formData.phoneNo || formData.phoneNo <= 0) {
      errors.phoneNo = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phoneNo)) {
      errors.phoneNo = "Phone number must be 10 digits";
    }

    // validate city, state, country
    if (!formData.city.trim()) {
      errors.city = "City cannot be empty";
    }
    if (!formData.state.trim()) {
      errors.state = "State cannot be empty";
    }
    if (!formData.country.trim()) {
      errors.country = "Country cannot be empty";
    }

    // validate profile pic
    if (!formData.profilePic) {
      errors.profilePic = "Profile pic is required";
    } else if (
      formData.profilePic instanceof File &&
      !formData.profilePic.type.startsWith("image/")
    ) {
      errors.profilePic = "Invalid file type for profile picture";
    }

    // validate cv
    if (!formData.cv) {
      errors.cv = "CV is required";
    } else if (
      formData.cv instanceof File &&
      formData.cv.type !== "application/pdf"
    ) {
      errors.cv = "Only PDF files are allowed for CV";
    }

    setErrorData(errors);

    const hasError = Object.values(errors).some((val) => val !== "");

    if (!hasError) {
      console.log("Form is valid, submitting...", formData);
      const formPayload = new FormData();
      formPayload.append("firstName", formData.firstName);
      formPayload.append("lastName", formData.lastName);
      formPayload.append("email", formData.email);
      formPayload.append("password", formData.password);
      formPayload.append("phoneNo", formData.phoneNo.toString());
      formPayload.append("age", formData.age.toString());
      formPayload.append("city", formData.city);
      formPayload.append("state", formData.state);
      formPayload.append("country", formData.country);
      if (formData.profilePic)
        formPayload.append("profilePic", formData.profilePic);
      if (formData.cv) formPayload.append("cv", formData.cv);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: 0,
        age: 0,
        city: "",
        state: "",
        country: "",
        profilePic: null,
        cv: null,
      });

      setErrorData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        age: "",
        city: "",
        state: "",
        country: "",
        profilePic: "",
        cv: "",
      });

      setPreviewCV(null);
      setPreviewProfilePic(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full">
      <div className="w-full flex items-center gap-x-2">
        {/* part 1 */}
        <InputComponent
          label="First Name"
          name="firstName"
          id="firstName"
          placeholder="eg. John"
          width="50%"
          value={formData.firstName}
          onChange={handleChange}
          required={true}
          error={errorData.firstName}
        />

        <InputComponent
          label="Last Name"
          name="lastName"
          id="lastName"
          placeholder="eg. Doe"
          width="50%"
          value={formData.lastName}
          onChange={handleChange}
          required={true}
          error={errorData.lastName}
        />
      </div>

      <InputComponent
        label="Email"
        type="email"
        name="email"
        id="email"
        placeholder="eg. john.doe@example.com"
        width=""
        value={formData.email}
        onChange={handleChange}
        required={true}
        error={errorData.email}
      />

      <PasswordComponent
        label="Password"
        name="password"
        id="password"
        placeholder="must be min 8 characters"
        width="100%"
        value={formData.password}
        onChange={handleChange}
        required={true}
        error={errorData.password}
      />

      {/* part 2 */}

      <div className="w-full flex items-center gap-x-2">
        <InputComponent
          label="Age"
          name="age"
          id="age"
          type="number"
          width="30%"
          placeholder="Min 18"
          value={formData.age}
          onChange={handleChange}
          required={true}
          error={errorData.age}
        />
        <InputComponent
          label="Phone Number"
          name="phoneNo"
          id="phoneNo"
          type="number"
          width="70%"
          placeholder="eg. 987xx xxxxx"
          value={formData.phoneNo}
          onChange={handleChange}
          required={true}
          error={errorData.phoneNo}
        />
      </div>

      <div className="w-full flex items-center gap-x-2">
        <InputComponent
          label="City"
          type="text"
          name="city"
          id="city"
          width="33%"
          placeholder="eg: Pune"
          value={formData.city}
          onChange={handleChange}
          required={true}
          error={errorData.city}
        />

        <InputComponent
          label="State"
          type="text"
          name="state"
          id="state"
          width="33%"
          placeholder="eg: Maharashtra"
          value={formData.state}
          onChange={handleChange}
          required={true}
          error={errorData.state}
        />

        <InputComponent
          label="Country"
          type="text"
          name="country"
          id="country"
          width="33%"
          placeholder="eg: India"
          value={formData.country}
          onChange={handleChange}
          required={true}
          error={errorData.country}
        />
      </div>

      {/* part 3 */}
      <UploadComponent
        label="Profile Picture"
        name="profilePic"
        id="profilePic"
        required={true}
        accept="image/*"
        onChange={handleFileChange}
        error={errorData.profilePic}
        preview={previewProfilePic}
        fileType="image/"
      />

      <UploadComponent
        label="CV (pdf only)"
        name="cv"
        id="cv"
        required={true}
        accept=".pdf"
        onChange={handleFileChange}
        error={errorData.cv}
        preview={previewCV}
        fileType="application/pdf"
      />

      <Button
        text="Submit"
        btnType="submit"
        color="#1e96fc"
        customStyle="rounded-md text-white mt-2"
      />
    </form>
  );
};

export default MultipartForm;
