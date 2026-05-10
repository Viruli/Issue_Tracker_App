import { View, Text, Image } from "react-native";
import React from "react";
import { useTheme } from "../hooks/useTheme";

export const AppLogo = () => {
  const { palette } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Image
        source={require("../../../assets/images/icon.png")}
        style={{ width: 30, height: 30, borderRadius: 100 }}
      />
      <Text style={{ fontSize: 23, fontWeight: "700", color: palette.primary }}>
        Trackora
      </Text>
    </View>
  );
};
