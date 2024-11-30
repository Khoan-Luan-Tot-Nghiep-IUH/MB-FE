import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Screen/Home/Login";
import TabNavigator from "./Tabbotom";
import inrocar from "../Screen/HomePage/MenuTab/Info/IntroCar";
import PopularCar from "../Screen/HomePage/MenuTab/Info/PopularCar";
import TypeCar from "../Screen/HomePage/MenuTab/Info/TypeCar";
import SettingCar from "../Screen/HomePage/MenuTab/Info/SettingCar";
import HelpCar from "../Screen/HomePage/MenuTab/Info/HelpCar";
import Complant from "../Screen/HomePage/MenuTab/Info/Complant";
import ActivityRules from "../Screen/HomePage/MenuTab/Lookup/ActivityRules";
import TripListScreen from "../Screen/HomePage/MenuTab/Home/TripListScreen";
import SearchResultScreen from "../Screen/HomePage/MenuTab/Home/SearchResultsPage";
import DetailsTicket from "../Screen/HomePage/MenuTab/Home/DetailsTicket";
import SeatSelection from "../Screen/HomePage/MenuTab/Home/SeatSelection";
import Booking from "../Screen/HomePage/MenuTab/Home/Booking";
import Resgister from "../Screen/Home/Resgister";
import { loadUserFromStorage } from "../Redux/User/userSlice";
import HomePage from "../Screen/HomePage/Tabbotom/HomePage";
import VerificationScreen from "../Screen/Home/VerificationScreen";
import ForgotPassword from "../Screen/Home/ForgotPassword";
import ResetPassword from "../Screen/Home/ResetPassword";
import VerifyResetCodeScreen from "../Screen/Home/VerifyResetCodeScreen ";
import OpenCty from "../Screen/HomePage/MenuTab/Info/OpenCty";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const token = useSelector((state) => state.user.userInfo?.token); // Access token from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          token, // Add token to all screens
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="VerificationScreen"
          component={VerificationScreen}
        />
        <Stack.Screen name="Resgister" component={Resgister} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="VerifyResetCodeScreen"
          component={VerifyResetCodeScreen}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          initialParams={{ token: "" }} // Token sẽ được truyền từ email
        />
        <Stack.Screen name="IntroCar" component={inrocar} />
        <Stack.Screen
          name="PopularCar"
          component={PopularCar}
          options={{ title: "Lộ trình phổ biến" }}
        />
        <Stack.Screen
          name="TypeCar"
          component={TypeCar}
          options={{
            title: "Văn phòng nhà xe", 
            gestureEnabled: true,
            headerBackTitleVisible: false, 
            headerLeft: null, 
          }}
        />
        <Stack.Screen
          name="SettingCar"
          component={SettingCar}
          options={{
            title: "Ưu đãi của tôi",
            gestureEnabled: true, 
            headerBackTitleVisible: false, 
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="HelpCar"
          component={HelpCar}
          options={{ title: "Hỗ trợ " }}
        />
        <Stack.Screen
          name="Complant"
          component={Complant}
          options={{ title: "Góp ý" }}
        />
        <Stack.Screen
          name="ActivityRules"
          component={ActivityRules}
          options={{ title: "Quy chế hoạt động " }}
        />
        <Stack.Screen
          name="TripListScreen"
          component={TripListScreen}
          options={{
            gestureEnabled: true, // Kích hoạt cử chỉ quay lại
          }}
        />
        <Stack.Screen
          name="SearchResultsPage"
          component={SearchResultScreen}
          options={{
            gestureEnabled: true, // Kích hoạt cử chỉ quay lại
          }}
        />
        <Stack.Screen
          name="DetailsTicket"
          component={DetailsTicket}
          options={{
            gestureEnabled: true, // Kích hoạt cử chỉ quay lại
          }}
        />
        <Stack.Screen
          name="SeatSelection"
          component={SeatSelection}
          options={{
            gestureEnabled: true, // Kích hoạt cử chỉ quay lại
          }}
        />
        <Stack.Screen
          name="Booking"
          component={Booking}
          options={{
            gestureEnabled: true, // Kích hoạt cử chỉ quay lại
          }}
        />
        <Stack.Screen
          name="OpenCty"
          component={OpenCty}
          options={{
            gestureEnabled: true, // Kích hoạt cử chỉ quay lại
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
