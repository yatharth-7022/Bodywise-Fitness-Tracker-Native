// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { useAuth } from './src/hooks/useAuth';

// Create a client
const queryClient = new QueryClient();

// Separate component for navigation to use auth hook
function NavigationWithAuth() {
  const { isAuthenticated } = useAuth();

  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return <RootNavigator />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <NavigationWithAuth />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}