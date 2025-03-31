import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email and code, Step 2: Reset password
  const [timer, setTimer] = useState(0); // Countdown timer state

  const startCountdown = () => {
    setTimer(59); // Set the timer to 59 seconds
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.bannerImage} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>FORGOT PASSWORD</Text>
        {step === 1 ? (
          <>
            <Text style={styles.subtitle}>
              Enter your Email and we'll send you a code to reset your Password
            </Text>
            <TextInput
              placeholder="EMAIL"
              placeholderTextColor={colors.secondary}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="ENTER CODE"
              placeholderTextColor={colors.secondary}
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />
            {timer === 0 ? (
              <TouchableOpacity style={styles.getCodeButton} onPress={startCountdown}>
                <Text style={styles.getCodeButtonText}>Get Code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>{timer} secs</Text>
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => setStep(2)} // Move to Step 2
              >
                <Text style={styles.submitButtonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Change Your Password</Text>
            <TextInput
              placeholder="PASSWORD"
              placeholderTextColor={colors.secondary}
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="CONFIRM PASSWORD"
              placeholderTextColor={colors.secondary}
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(1)} // Go back to Step 1
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate('Home')} // Redirect to HomeScreen
              >
                <Text style={styles.submitButtonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  timerText: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  getCodeButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  getCodeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    width: '48%',
    height: 50,
    backgroundColor: colors.secondaryLight,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  submitButton: {
    width: '48%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});