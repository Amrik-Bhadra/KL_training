import RegisterForm from "@/app/ui/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Create Your Account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
