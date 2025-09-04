import { Stack } from 'expo-router';

function AuthLayout() {
  return (
    // The Stack navigator is used for the authentication flow.
    <Stack>
      {/* This screen corresponds to the 'login.tsx' file. 
        We are hiding the header here because the login screen component
        already has its own "Login" title, and showing another one
        in a header would look redundant.
      */}
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      {/* This screen corresponds to the 'register.tsx' file.
        We're also hiding the header for consistency.
      */}
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default AuthLayout;

