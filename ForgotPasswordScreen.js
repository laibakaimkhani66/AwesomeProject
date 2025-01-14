import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <Image source={require('../assets/no-bg.png')} style={styles.logo} />

      <Text style={styles.title}>Forgot Password</Text>
      
      <Text style={styles.instructions}>
        Enter the email associated with your account and we'll send an email with code to reset your password
      </Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f8',
  },
  logo: {
    width: 300,
    height: 220,
    alignSelf: 'center',
    marginBottom: 20,
    marginRight:20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#100f0d',
    textAlign: 'center',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#100f0d',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  confirmButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#cc8899',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#888',
    fontSize: 16,
  },
});

