import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

import Advertisements from "../screens/Advertisements/Advertisements";
import MyAccount from "../screens/MyAccount/MyAccount";

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Advertisements"
      screenOptions={{
        tabBarInactiveBackgroundColor: "#aabfcb",
        tabBarActiveBackgroundColor: "#aabfcb",
        tabBarActiveTintColor: "#2a6484",
        tabBarLabelStyle: { fontSize: 13 },
      }}
    >
      <Tab.Screen
        name="Advertisements"
        component={Advertisements}
        options={{
          title: "Anúncios",
          headerShown: false,
          tabBarIcon: () => {
            return <Icon name="directions-car" color="#2a6484" />;
          },
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: "Minha Conta",
          headerShown: false,
          tabBarIcon: () => {
            return (
              <Icon name="account-circle" type="material" color="#2a6484" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
