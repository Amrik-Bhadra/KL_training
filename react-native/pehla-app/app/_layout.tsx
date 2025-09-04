import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // A Stack navigator is used to switch between the auth flow and the main app.
    <Stack>
      {/*
        This screen represents the entire authentication group of screens.
        We hide its header because the header will be managed by the 
        layout file inside the (auth) folder.
      */}
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      {/*
        This screen represents the main part of your app with the tabs.
        We also hide its header because the Tabs layout will manage its own header.
      */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
