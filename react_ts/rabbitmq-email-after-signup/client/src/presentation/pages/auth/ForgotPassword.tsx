import { Button } from "@/presentation/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/presentation/components/ui/field";
import { Input } from "@/presentation/components/ui/input";
import { cn } from "@/presentation/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = () => {
    let hasError: boolean = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        setEmailError("Email is required!");
        hasError = true;
    }else if(!emailRegex.test(email)){
        setEmailError("Enter a valid email!");
        hasError = true;
    }else{
        setEmailError(null);
    }

    return hasError;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleBlur = () => {
    validateEmail();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateEmail()){
        return;
    }

    toast("OTP sen")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your registered email address to get reset link
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
            value={email}
            required
          />
          {emailError && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {emailError}
            </p>
          )}
        </Field>
        <Field>
          <Button type="submit">
            {"Send Verification Link"}
          </Button>
          {/* {status === "failed" && error && (
            <p style={{ color: "red" }}>{error}</p>
          )} */}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default ForgotPassword;
