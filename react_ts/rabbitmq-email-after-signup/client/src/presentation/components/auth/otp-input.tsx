import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/presentation/components/ui/input-otp";

const OtpInput = () => {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} style={{ padding:'1.5rem', fontSize: '1.5rem' }} />
        <InputOTPSlot index={1} style={{ padding:'1.5rem', fontSize: '1.5rem' }} />
        <InputOTPSlot index={2} style={{ padding:'1.5rem', fontSize: '1.5rem' }} />
        <InputOTPSlot index={3} style={{ padding:'1.5rem', fontSize: '1.5rem' }} />
        <InputOTPSlot index={4} style={{ padding:'1.5rem', fontSize: '1.5rem' }} />
        <InputOTPSlot index={5} style={{ padding:'1.5rem', fontSize: '1.5rem' }} />
      </InputOTPGroup>
    </InputOTP>
  );
};

export default OtpInput;
