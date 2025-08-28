export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 text-center p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        Welcome to Our Authentication Platform
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        This is a complete authentication system built with the latest features of Next.js, including Server Actions, Middleware, and the App Router. Please use the navigation bar to sign in or create an account.
      </p>
    </div>
  );
}
