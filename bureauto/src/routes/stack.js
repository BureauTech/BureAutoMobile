import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyTabs from "./tab";

const Stack = createStackNavigator();
import Advertisement from "../screens/Advertisement/Advertisement";
import Login from "../screens/Login/Login";
import Profile from "../screens/Profile/Profile";
import MyFavorites from "../screens/MyFavorites/MyFavorites";
import MyAdvertisements from "../screens/MyAdvertisements/MyAdvertisements";
import SetUrlServer from "../screens/SetUrlServer/SetUrlServer";

export default function StackCustom() {
  return (
    <Stack.Navigator initialRouteName="SetUrlServer">
      <Stack.Screen
        name="SetUrlServer"
        component={SetUrlServer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tab"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Advertisement"
          component={Advertisement}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="MyFavorites"
          component={MyFavorites}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="MyAdvertisements"
          component={MyAdvertisements}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
