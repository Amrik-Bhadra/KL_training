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
import type { LoginDataProps } from "@/presentation/types/auth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/presentation/state/hooks";
import { loginUser } from "@/presentation/state/slices/authSlice";
import type { LoginErrorProps } from "@/presentation/types/error";
import { PasswordField } from "@/presentation/components/auth/PasswordField";
import { toast } from "sonner";

function LoginPage({ className, ...props }: React.ComponentProps<"form">) {
  const [loginData, setLoginData] = useState<LoginDataProps>({
    email: "",
    password: "",
  });
  const [dataError, setDataError] = useState<LoginErrorProps>({
    emailError: null,
    passwordError: null,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, error, token } = useAppSelector((state) => state.auth);

  // function to validate
  const validateEmail = () => {
    const { email } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError: boolean = false;

    if (!email) {
      setDataError({ ...dataError, emailError: "Email is required" });
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setDataError({
        ...dataError,
        emailError: "Please enter a valid email address",
      });
      hasError = true;
    } else {
      setDataError({ ...dataError, emailError: null });
    }

    return !hasError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleBlur = () => {
    validateEmail();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateEmail();
    if (isValid) {
      dispatch(loginUser(loginData));
      toast("Login successfull");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("");
    }
  }, [navigate, token]);

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
            onChange={handleChange}
            onBlur={handleBlur}
            value={loginData.email}
            required
          />
          {dataError.emailError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {dataError.emailError}
            </p>
          )}
        </Field>
        <PasswordField
          label="Password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required={true}
          error={dataError.passwordError}
        />

        <Link to="/auth/forgot-password" className="underline text-sm text-slate-400">Forgot Password?</Link>

        <Field>
          <Button type="submit">
            {status === "loading" ? "Loading..." : "Login"}
          </Button>
          {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )}
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Don't have an account? <Link to="/auth/signup">Sign up</Link>
          </FieldDescription>
        </Field>
        
      </FieldGroup>
    </form>
  );
}

export default LoginPage;
