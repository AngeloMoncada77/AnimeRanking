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

export default function RegistroScreen() {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  // Al pulsar "Crear cuenta" mandamos al home
  const handleCrearCuenta = () => {
    router.replace('/home');
  };

  return (
    // Fondo degradado de toda la pantalla (igual que el login)
    <LinearGradient colors={['#0A1628', '#123A4A']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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
              <Text style={styles.welcome}>Crea tu cuenta</Text>
              <Text style={styles.welcomeSub}>Join the otaku community!</Text>
            </View>

            {/* --- Tarjeta glass con el formulario --- */}
            <BlurView intensity={40} tint="dark" style={styles.card}>
              <AppInput
                placeholder="Nombre de usuario"
                icon="person-outline"
                value={usuario}
                onChangeText={setUsuario}
              />
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
              <AppInput
                placeholder="Confirmar contraseña"
                icon="lock-closed-outline"
                value={confirm}
                onChangeText={setConfirm}
                isPassword
              />

              {/* Botón principal con degradado */}
              <Pressable style={styles.buttonWrapper} onPress={handleCrearCuenta}>
                <LinearGradient
                  colors={['#22D3EE', '#0EA5E9']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Crear cuenta</Text>
                </LinearGradient>
              </Pressable>
            </BlurView>

            {/* --- Volver al login --- */}
            <Pressable style={styles.backRow} onPress={() => router.back()}>
              <Text style={styles.backText}>
                ¿Ya tienes cuenta? <Text style={styles.backLink}>Inicia sesión</Text>
              </Text>
            </Pressable>
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
  buttonWrapper: { borderRadius: 999, overflow: 'hidden', marginTop: 4 },
  button: { paddingVertical: 15, alignItems: 'center' },
  buttonText: { color: '#0A1628', fontSize: 16, fontWeight: '800' },
  backRow: { alignItems: 'center' },
  backText: { color: '#9CA3AF', fontSize: 14 },
  backLink: { color: '#22D3EE', fontWeight: '700' },
});
