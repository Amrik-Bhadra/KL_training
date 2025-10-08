import { cn } from "@/presentation/lib/utils";
import { Button } from "@/presentation/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { SignupDataProps } from "@/presentation/types/auth";
import { useAppDispatch, useAppSelector } from "@/presentation/state/hooks";
import { registerUser } from "@/presentation/state/slices/authSlice";
import type { RegisterData } from "@/domain/models/Auth";
import { PasswordField } from "@/presentation/components/auth/PasswordField";
import type { SignupErrorProps } from "@/presentation/types/error";
import { toast } from "sonner";
import TermsCondition from "@/presentation/components/auth/TermsCondition";

function SignupPage({ className, ...props }: React.ComponentProps<"form">) {
  const [signupData, setSignupData] = useState<SignupDataProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupError, setSignupError] = useState<SignupErrorProps>({
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, error } = useAppSelector((state) => state.auth);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const { email, password, confirmPassword } = signupData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError: boolean = false;
    const errors: SignupErrorProps = {
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
    };

    // email validation
    if (!email) {
      errors.emailError = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(email)) {
      errors.emailError = "Please enter a valid email address";
      hasError = true;
    } else {
      errors.emailError = null;
    }

    // password validation
    if (!password) {
      errors.passwordError = "Password is required";
      hasError = true;
    } else {
      errors.passwordError = null;
    }

    // confirm password validation
    if (!confirmPassword) {
      errors.confirmPasswordError = "Confirm password is required";
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPasswordError =
        "Confirm password and password does not match";
      hasError = true;
    } else {
      errors.confirmPasswordError = null;
    }

    setSignupError(errors);
    return !hasError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = () => {
    validate();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      return;
    }

    const credentials: RegisterData = {
      email: signupData.email,
      password: signupData.password,
    };

    dispatch(registerUser(credentials));
    setIsSubmitted(true);
    toast("Registration Successful!");
  };

  useEffect(() => {
    if (status === "succeeded" && isSubmitted) {
      alert("Registration Successful! Please login in");
      navigate("/auth/login");
    }
  }, [status, isSubmitted, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            value={signupData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {signupError.emailError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {signupError.emailError}
            </p>
          )}
        </Field>
        <PasswordField
          label="Password"
          id="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={signupError.passwordError}
        />
        <PasswordField
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={signupError.confirmPasswordError}
        />

        <TermsCondition/>

        <Field>
          <Button type="submit">
            {status === "loading" ? "Loading..." : "Create Account"}
          </Button>
          {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )}
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link to="/auth">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default SignupPage;
