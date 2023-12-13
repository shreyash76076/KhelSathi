import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { Colors } from "./constants/styles";
import AllSports from "./screens/AllSports";
import ForgotOtp from "./screens/ForgotOtp";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UpdatePassword from "./screens/UpdatePassword";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons or any other icon library

import {createDrawerNavigator} from '@react-navigation/drawer'


import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { CustomDrawer } from './drawer/CustomDrawer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerHandler() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} />
     

    </Drawer.Navigator>
  );
}


function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="ForgotOtp"
        component={ForgotOtp}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "none",
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "none",
        }}
      />
    </Stack.Navigator>
  );
}

function BottomNavHandler() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { paddingTop: 10, backgroundColor: "white" ,height:65,borderTopWidth:3,borderColor:'black',paddingBottom:15},
      }}
    >
      <Tab.Screen
        name="Welcome"
        component={DrawerHandler}
        options={{
          tabBarLabel: "Welcome",
          tabBarActiveTintColor: "black",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Gallery",
          tabBarActiveTintColor: "black",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Facilities"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Facilities",
          tabBarActiveTintColor: "black",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notices"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Notices",
          tabBarActiveTintColor: "black",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.error500 },
        headerTintColor: "white",
        presentation: "modal",
        animation: "slide_from_bottom",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="bottomNav"
        component={BottomNavHandler}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="AllSports"
        component={AllSports}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        // Prevent native splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        setIsTryingLogin(false);
      } catch (e) {
        console.error("Error during app initialization:", e);
      } finally {
        // Hide the splash screen
        await SplashScreen.hideAsync();
      }
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
