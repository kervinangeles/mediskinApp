import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';

const SignupScreen = ({ navigation }) => {
  const [gender, setGender] = useState('');

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.bannerImage} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please fill in this form to create an account</Text>
        <TextInput placeholder="NAME" placeholderTextColor={colors.secondary} style={styles.input} />
        <View style={styles.row}>
          <TextInput placeholder="AGE" placeholderTextColor={colors.secondary} style={[styles.input, styles.halfInput]} />
          <View style={[styles.input, styles.halfInput, styles.genderContainer]}>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Male' && styles.selectedGender]}
              onPress={() => handleGenderSelect('Male')}
            >
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Female' && styles.selectedGender]}
              onPress={() => handleGenderSelect('Female')}
            >
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>UPLOAD PHOTO</Text>
        </TouchableOpacity>
        <TextInput placeholder="EMAIL" placeholderTextColor={colors.secondary} style={styles.input} />
        <TextInput placeholder="PASSWORD" placeholderTextColor={colors.secondary} secureTextEntry style={styles.input} />
        <TextInput placeholder="CONFIRM PASSWORD" placeholderTextColor={colors.secondary} secureTextEntry style={styles.input} />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Home')} >
          <Text style={styles.signupButtonText}>SIGN UP</Text>
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
  uploadButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.secondaryLight,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  uploadButtonText: {
    color: colors.primary,
    fontSize: 16,
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
});