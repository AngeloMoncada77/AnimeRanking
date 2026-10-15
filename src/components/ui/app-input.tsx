import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';

type AppInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  /** Nombre del icono de Ionicons a la izquierda (ej. "mail", "lock-closed") */
  icon: keyof typeof Ionicons.glyphMap;
  /** Si es true, agrega el ojito para mostrar/ocultar la contraseña */
  isPassword?: boolean;
  keyboardType?: 'default' | 'email-address';
};

// Campo de texto con icono a la izquierda y, opcionalmente, ojito para contraseñas.
export function AppInput({
  placeholder,
  value,
  onChangeText,
  icon,
  isPassword = false,
  keyboardType = 'default',
}: AppInputProps) {
  // Estado local: ¿está visible la contraseña?
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.field}>
      <Ionicons name={icon} size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        // Si es de contraseña y está oculta, se oculta el texto y el teclado predice
        secureTextEntry={isPassword && hidden}
        autoCapitalize="none"
        keyboardType={keyboardType}
      />
      {/* El ojito solo aparece si es campo de contraseña */}
      {isPassword && (
        <Pressable onPress={() => setHidden(!hidden)} hitSlop={10}>
          <Ionicons
            name={hidden ? 'eye-off' : 'eye'}
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      )}
    </View>
  );
}

const colors = Colors.dark; // el login siempre es oscuro

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 3, 3, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    height: 52,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
});
