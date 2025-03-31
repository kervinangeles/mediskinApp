import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';

const LoginScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.bannerImage} />
      <View style={styles.formContainer}>
        <Image source={require("../assets/avatar.png")} style={styles.avatarImage} />
        <Text style={styles.title}>LOGIN</Text>
        <TextInput placeholder="USERNAME" placeholderTextColor={colors.secondary} style={styles.input} />
        <TextInput placeholder="PASSWORD" placeholderTextColor={colors.secondary} secureTextEntry style={styles.input} />
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { backgroundColor: rememberMe ? colors.primary : colors.secondaryLight },
            ]}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.rememberMeText}>Remember me</Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  avatarImage: {
    width: 100,
    height: 100,
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
    marginBottom: 20,
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginRight: 8,
  },
  rememberMeText: {
    color: colors.primary,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: colors.primary,
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  signUpText: {
    marginTop: 20,
    color: colors.primary,
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: colors.primaryDark,
  },
});