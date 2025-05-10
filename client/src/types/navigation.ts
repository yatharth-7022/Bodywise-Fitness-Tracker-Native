import { NavigatorScreenParams } from "@react-navigation/native";

// Auth navigator types
export type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  PreSignUp: undefined;
};

// Main Tab Navigator types
export type MainTabParamList = {
  Dashboard: undefined;
  Timer: undefined;
  AddButton: undefined;
  Exercises: undefined;
  Chart: undefined;
};

// Workout stack types
export type WorkoutStackParamList = {
  Routine: { id?: number };
  RoutineSession: { routineId?: number };
};

// Profile stack types
export type ProfileStackParamList = {
  Settings: undefined;
  UploadProfilePicture: undefined;
};

// Weight stack types
export type WeightStackParamList = {
  LogWeight: undefined;
  Weights: undefined;
};

// Root navigator that contains all others
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  WorkoutStack: NavigatorScreenParams<WorkoutStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  WeightStack: NavigatorScreenParams<WeightStackParamList>;
};

// Helper type for useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
