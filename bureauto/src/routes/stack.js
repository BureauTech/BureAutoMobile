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
import Chat from "../screens/Chat/Chat";
import Chats from "../screens/Chats/Chats";
import ChangePassword from "../screens/ChangePassword/ChangePassword";

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

        <Stack.Screen
          options={{ headerShown: false }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Chats"
          component={Chats}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
