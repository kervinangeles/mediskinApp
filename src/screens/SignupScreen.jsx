import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created! Please check your email.");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Sign Up Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.bannerImage} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="NAME" placeholderTextColor={colors.secondary} style={styles.input} value={name} onChangeText={setName} />
        <View style={styles.row}>
          <TextInput placeholder="AGE" placeholderTextColor={colors.secondary} style={[styles.input, styles.halfInput]} value={age} onChangeText={setAge} />
          <View style={[styles.input, styles.halfInput, styles.genderContainer]}>
            <TouchableOpacity style={[styles.genderOption, gender === 'Male' && styles.selectedGender]} onPress={() => setGender('Male')}>
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.genderOption, gender === 'Female' && styles.selectedGender]} onPress={() => setGender('Female')}>
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TextInput placeholder="EMAIL" placeholderTextColor={colors.secondary} style={styles.input} value={email} onChangeText={setEmail} />
        <TextInput placeholder="PASSWORD" placeholderTextColor={colors.secondary} secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
        <TextInput placeholder="CONFIRM PASSWORD" placeholderTextColor={colors.secondary} secureTextEntry style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} />
        
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
          {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.signupButtonText}>SIGN UP</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log in</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginHorizontal: 5,
  },
  selectedGender: {
    backgroundColor: colors.primary,
  },
  genderText: {
    color: colors.secondary,
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 20,
    color: colors.primary,
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: colors.primaryDark,
  },
});
