import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function VerifyOTPScreen({ navigation }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(57);
  const inputRefs = useRef([]);

  // Handle OTP input change and move focus
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <Image source={require('../assets/logo1.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Verify OTP</Text>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Enter your OTP which has been sent to your email and completely verify your account.
      </Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>

        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => handleOtpChange(value, index)}
            value={digit}
          />
        ))}
      </View>

      {/* Resend Timer */}
      <Text style={styles.resendText}>
        A code has been sent to your phone{'\n'}
        <Text style={styles.resendLink}>Resend in {`00:${timer < 10 ? `0${timer}` : timer}`}</Text>
      </Text>

      {/* Confirm Button */}
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
    marginRight:30,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
  },
  resendText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30,
  },
  resendLink: {
    fontWeight: 'bold',
    color: '#fbc926',
  },
  confirmButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#fbc926',
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

