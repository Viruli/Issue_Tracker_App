import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '../../../shared/hooks/useTheme';
import { useAuthStore } from '../store/authStore';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ( { navigation }: Props) => {
  const {palette} = useTheme();
  
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const[email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  if (email === 'admin@test.com' && password === '1234') {
    login(email, password);
  }
};
  return (
  <View
    style={{
      flex: 1,
      backgroundColor: palette.background,
      justifyContent: 'center',
      padding: 24,
    }}
  >
    {/* APP TITLE */}
    <Text
      style={{
        fontSize: 32,
        fontWeight: '700',
        color: palette.text,
        marginBottom: 8,
      }}
    >
      Issue Tracker
    </Text>

    <Text
      style={{
        color: palette.textMuted,
        marginBottom: 40,
        fontSize: 16,
      }}
    >
      Sign in to continue
    </Text>

    {/* LOGIN CARD */}
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

      <Button
        title="Login"
        onPress={handleLogin}
      />
    </View>

    {/* MOCK LOGIN INFO */}
    <View
      style={{
        marginTop: 24,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: palette.textMuted,
          fontSize: 13,
        }}
      >
        Demo Credentials
      </Text>

      <Text
        style={{
          color: palette.text,
          marginTop: 6,
          fontWeight: '600',
        }}
      >
        admin@test.com / 1234
      </Text>
    </View>
  </View>
);
}

export default LoginScreen