# Authentication and Navigation Flow

This document explains the authentication and navigation flow in the Bodywise Fitness Tracker app.

## Authentication Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  App Launch     │────►│  Token Check    │────►│  Main App       │
│                 │     │                 │     │  (Dashboard)    │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 │ (if no token)
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │  Auth Stack     │
                        │  (Login/Signup) │
                        │                 │
                        └─────────────────┘
```

### Initialization Process

1. **App Launch**: The app starts, loading the `AuthProvider` in `App.tsx`.
2. **Authentication Check**: The `AuthProvider` checks if a token exists in `AsyncStorage`.
3. **Token Validation**: If a token exists, it's validated with the server via the `/profile` endpoint:
   - If valid: The user is authenticated, and user data is loaded
   - If invalid: The token is removed, and the user is logged out

### Login Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Login Screen   │────►│  Submit Data    │────►│  Store Token    │
│                 │     │  to Server      │     │  in Storage     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │                 │
                                               │  Navigate to    │
                                               │  Dashboard      │
                                               │                 │
                                               └─────────────────┘
```

1. User enters email and password on the Login screen
2. Form validation happens on the client side
3. Credentials are sent to the server
4. On successful login:
   - Token is stored in AsyncStorage
   - `isAuthenticated` state is set to true
   - User profile data is saved in state
   - Navigation is reset to the Dashboard

### Signup Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Signup Screen  │────►│  Submit Data    │────►│  Store Token    │
│                 │     │  to Server      │     │  in Storage     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                         │
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │                 │
                                               │  Navigate to    │
                                               │  Dashboard      │
                                               │                 │
                                               └─────────────────┘
```

1. User enters name, email, and password on the Signup screen
2. Form validation happens on the client side
3. Data is sent to the server
4. On successful signup:
   - Token is stored in AsyncStorage
   - `isAuthenticated` state is set to true
   - User profile data is saved in state
   - Navigation is reset to the Dashboard

### Logout Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Logout Button  │────►│  Remove Token   │────►│  Navigate to    │
│  (in Settings)  │     │  from Storage   │     │  Auth Stack     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

1. User clicks the Logout button in the Settings screen
2. Confirmation modal appears
3. On confirm:
   - Logout request is sent to the server
   - Token is removed from AsyncStorage
   - `isAuthenticated` state is set to false
   - User data is cleared
   - Navigation is reset to the Auth stack

## Navigation Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          RootNavigator                          │
│                                                                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                │
    ┌───────────────────────────┴─────────────────────────────┐
    │                                                         │
    ▼                                                         ▼
┌─────────────────┐                               ┌─────────────────┐
│                 │                               │                 │
│  Auth Stack     │                               │  Main Stack     │
│                 │                               │                 │
└─────────────────┘                               └────────┬────────┘
       │                                                   │
       │                                                   │
       ▼                                                   ▼
┌─────────────────────────┐    ┌──────────────────────────────────────┐
│                         │    │                                      │
│ - Home                  │    │              MainTabs                │
│ - Login                 │    │                                      │
│ - SignUp                │    └─────────┬──────────┬─────────┬───────┘
│ - PreSignUp             │              │          │         │
└─────────────────────────┘              │          │         │
                                         ▼          ▼         ▼
                           ┌─────────────────┐    ┌───┐    ┌───────────┐
                           │                 │    │   │    │           │
                           │  WorkoutStack   │    │...│    │  Other    │
                           │                 │    │   │    │  Stacks   │
                           └─────────────────┘    └───┘    └───────────┘
```

### Navigation Components

1. **RootNavigator** (`src/navigation/index.tsx`):
   - Controls the main navigation flow
   - Switches between Auth Stack and Main Stack based on authentication status

2. **AuthNavigator** (`src/navigation/AuthNavigator.tsx`):
   - Contains all authentication-related screens
   - Home, Login, SignUp, PreSignUp

3. **MainTabNavigator** (`src/navigation/MainTabNavigator.tsx`):
   - Bottom tab navigation for the main app
   - Dashboard, Timer, AddButton, Exercises, Chart

4. **Feature-specific Stacks**:
   - WorkoutNavigator
   - ProfileNavigator
   - WeightNavigator

### Authentication State Management

The authentication state is managed in the `AuthContext` (`src/contexts/AuthContext.tsx`), which provides:

- Authentication state (`isAuthenticated`)
- User data
- Authentication methods (login, signup, logout)
- Form handling utilities

This context is used throughout the app to manage the authentication state and provide user data to components that need it.

## Key Components

1. **AuthProvider** (`src/contexts/AuthContext.tsx`):
   - Manages authentication state
   - Provides authentication methods
   - Validates tokens and fetches user data

2. **RootNavigator** (`src/navigation/index.tsx`):
   - Controls the main navigation flow
   - Renders Auth stack or Main stack based on authentication status

3. **Login/SignUp screens**:
   - Handle user authentication
   - Validate input
   - Submit credentials to the server

4. **Settings screen**:
   - Provides logout functionality
   - Displays user profile information

## Flow Diagrams

### App Startup Flow

```
App starts
  │
  ▼
AuthProvider initializes
  │
  ▼
Check for token in AsyncStorage
  │
  ├── If token exists:
  │     │
  │     ▼
  │   Validate token with server
  │     │
  │     ├── If valid:
  │     │     │
  │     │     ▼
  │     │   Set isAuthenticated = true
  │     │     │
  │     │     ▼
  │     │   Fetch user profile
  │     │     │
  │     │     ▼
  │     │   Show MainTabs navigator
  │     │
  │     └── If invalid:
  │           │
  │           ▼
  │         Remove token
  │           │
  │           ▼
  │         Set isAuthenticated = false
  │           │
  │           ▼
  │         Show Auth navigator
  │
  └── If no token:
        │
        ▼
      Set isAuthenticated = false
        │
        ▼
      Show Auth navigator
```

### Authentication Flow

```
User enters credentials
  │
  ▼
Client-side validation
  │
  ├── If validation fails:
  │     │
  │     ▼
  │   Show validation errors
  │
  └── If validation passes:
        │
        ▼
      Send request to server
        │
        ├── If request succeeds:
        │     │
        │     ▼
        │   Store token in AsyncStorage
        │     │
        │     ▼
        │   Set isAuthenticated = true
        │     │
        │     ▼
        │   Navigate to Dashboard
        │
        └── If request fails:
              │
              ▼
            Show error message
```

### Logout Flow

```
User clicks logout
  │
  ▼
Show confirmation prompt
  │
  ├── If user cancels:
  │     │
  │     ▼
  │   Do nothing
  │
  └── If user confirms:
        │
        ▼
      Send logout request to server
        │
        ▼
      Remove token from AsyncStorage
        │
        ▼
      Set isAuthenticated = false
        │
        ▼
      Navigate to Auth stack
``` 