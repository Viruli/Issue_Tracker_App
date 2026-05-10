import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../../shared/hooks/useTheme";
import { useAuthStore } from "../store/authStore";
import { Input } from "../../../shared/components/Input";
import { Button } from "../../../shared/components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const { palette } = useTheme();

  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.background,
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* APP TITLE */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../../assets/images/icon.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
            marginRight: 10,
          }}
        />

        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: palette.text,
          }}
        >
          Trackora
        </Text>
      </View>

      <Text
        style={{
          color: palette.textMuted,
          margin: 10,
          fontSize: 16,
          justifyContent: "center",
        }}
      >
        Sign in to continue
      </Text>

      <View
        style={{
          backgroundColor: palette.surface,
          padding: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: palette.border,
        }}
      >
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="admin@test.com"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        {error && (
          <Text
            style={{
              color: palette.danger,
              marginBottom: 14,
              fontSize: 14,
            }}
          >
            {error}
          </Text>
        )}

        <Button title="Login" onPress={handleLogin} />
      </View>

      <View
        style={{
          marginTop: 24,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: palette.text,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Issue Tracker App
        </Text>

        <Text
          style={{
            color: palette.textMuted,
            marginTop: 6,
          }}
        >
          All rights received
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
