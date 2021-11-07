import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/AuthContext";
import StackCustom from "./src/routes/stack";
import { ServerProvider } from "./src/contexts/ServerContext";

export default function App() {
  return (
    <NavigationContainer>
      <ServerProvider>
        <AuthProvider>
          <StackCustom />
        </AuthProvider>
      </ServerProvider>
    </NavigationContainer>
  );
}
