import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Screen/Home/Login";
import TabNavigator from "./Tabbotom";
import inrocar from "../Screen/HomePage/MenuTab/Info/IntroCar";
import OperatingCar from "../Screen/HomePage/MenuTab/Info/OperatingCar";
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
        <Stack.Screen name="Resgister" component={Resgister} />
        <Stack.Screen name="IntroCar" component={inrocar} />
        <Stack.Screen
          name="OperatingCar"
          component={OperatingCar}
          options={{ title: "Giới thiệu nhà xe" }}
        />
        <Stack.Screen
          name="PopularCar"
          component={PopularCar}
          options={{ title: "Lộ trình phổ biến" }}
        />
        <Stack.Screen
          name="TypeCar"
          component={TypeCar}
          options={{ title: "Văn phòng nhà xe" }}
        />
        <Stack.Screen
          name="SettingCar"
          component={SettingCar}
          options={{ title: "Quy chế hoạt động" }}
        />
        <Stack.Screen
          name="HelpCar"
          component={HelpCar}
          options={{ title: "Hỗ trợ" }}
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
        <Stack.Screen name="TripListScreen" component={TripListScreen} />
        <Stack.Screen name="SearchResultsPage" component={SearchResultScreen} />
        <Stack.Screen name="DetailsTicket" component={DetailsTicket} />
        <Stack.Screen name="SeatSelection" component={SeatSelection} />
        <Stack.Screen name="Booking" component={Booking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
