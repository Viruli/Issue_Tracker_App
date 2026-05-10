import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useConfirm } from "../hooks/useComponent";

const LogoutButton = () => {
  const { confirm } = useConfirm();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    confirm({
      message: "Are you sure you want to logout?",
      confirmText: "Logout",
      onConfirm: logout,
    });
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 12 }}>
      <Text style={{ color: "red", fontWeight: "600" }}>Logout</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
