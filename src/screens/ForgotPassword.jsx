import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const resetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert('Success', 'Check your email for password reset instructions.');
      navigation.goBack(); // Navigate back to LoginScreen
    } catch (error) {
      Alert.alert('Reset Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.bannerImage} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>FORGOT PASSWORD</Text>
        <Text style={styles.subtitle}>Enter your email, and we'll send you a reset link.</Text>
        <TextInput
          placeholder="EMAIL"
          placeholderTextColor={colors.secondary}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.submitButton} onPress={resetPassword} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.submitButtonText}>RESET PASSWORD</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: 238,
    height: 282,
    marginBottom: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondaryLight,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    color: colors.primary,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
