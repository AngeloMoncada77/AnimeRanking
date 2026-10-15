import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppInput } from '@/components/ui/app-input';

export default function LoginScreen() {
  // Estado del formulario: lo que escribe el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Al pulsar "Iniciar Sesión" mandamos a la app (pantalla principal)
  const handleLogin = () => {
    router.replace('/home');
  };

  return (
    // Fondo degradado de toda la pantalla
    <LinearGradient colors={['#000000', '#024763fb']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* KeyboardAvoidingView sube el contenido cuando aparece el teclado */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled">
            {/* --- Logo y bienvenida --- */}
            <View style={styles.header}>
              <Text style={styles.logo}>
                Anime<Text style={styles.logoAccent}>Ranking</Text>
              </Text>
              <Text style={styles.welcome}>¡Bienvenidos!</Text>
              <Text style={styles.welcomeSub}>Welcome back!</Text>
            </View>

            {/* --- Tarjeta glass con el formulario --- */}
            <BlurView intensity={40} tint="dark" style={styles.card}>
              <AppInput
                placeholder="Correo electrónico"
                icon="mail-outline"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <AppInput
                placeholder="Contraseña"
                icon="lock-closed-outline"
                value={password}
                onChangeText={setPassword}
                isPassword
              />

              <Pressable style={styles.forgot}>
                <Text style={styles.forgotText}>No recuerdo mi contraseña</Text>
              </Pressable>

              {/* Botón principal con degradado */}
              <Pressable style={styles.buttonWrapper} onPress={handleLogin}>
                <LinearGradient
                  colors={['#22D3EE', '#0EA5E9']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </LinearGradient>
              </Pressable>

              {/* Separador "o" */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>o</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Botón outline para crear cuenta */}
              <Pressable
                style={styles.outlineButton}
                onPress={() => router.push('/registro')}>
                <Text style={styles.outlineText}>Crear una cuenta</Text>
              </Pressable>
            </BlurView>

            {/* --- Botones sociales --- */}
            <View style={styles.socialRow}>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-google" size={22} color="#EA4335" />
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
  },
  header: { alignItems: 'center', gap: 6 },
  logo: { fontSize: 34, fontWeight: '800', color: '#fff' },
  logoAccent: { color: '#22D3EE' },
  welcome: { fontSize: 18, fontWeight: '700', color: '#fff', marginTop: 8 },
  welcomeSub: { fontSize: 14, color: '#9CA3AF' },
  card: {
    borderRadius: 24,
    padding: 20,
    gap: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  forgot: { alignSelf: 'flex-end' },
  forgotText: { color: '#22D3EE', fontSize: 13, fontWeight: '600' },
  buttonWrapper: { borderRadius: 999, overflow: 'hidden', marginTop: 4 },
  button: { paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#0A1628', fontSize: 16, fontWeight: '800' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  dividerText: { color: '#9CA3AF', fontSize: 14 },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: '#22D3EE',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  outlineText: { color: '#22D3EE', fontSize: 15, fontWeight: '700' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
