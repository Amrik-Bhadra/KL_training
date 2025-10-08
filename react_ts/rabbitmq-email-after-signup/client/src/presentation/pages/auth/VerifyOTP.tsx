import { cn } from "@/presentation/lib/utils";
import { Button } from "@/presentation/components/ui/button";
import {
  Field,
  FieldGroup,
} from "@/presentation/components/ui/field";
import OtpInput from "@/presentation/components/auth/otp-input";

function VerifyOTP({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-1 text-center border">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Please enter the one-time password sent to your email.
          </p>
        </div>
        <OtpInput />

        <Field>
          <Button type="submit">Verify</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default VerifyOTP;
