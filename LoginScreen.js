import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView ,ActivityIndicator} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import facebook from '../assets/facebook.png'
import google from '../assets/google.png'
import logo from '../assets/revive-nobg.png';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [errors, setErrors] = useState({});
  // const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading spinner


  const validateFields = () => {
    const newErrors = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.match(emailPattern)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Security Question validation
    if (!selectedQuestion) {
      newErrors.selectedQuestion = 'Please select a security question';
    }

    // Security Answer validation
    if (!securityAnswer) {
      newErrors.securityAnswer = 'Security answer is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
    if (validateFields()) {
      try {
        // Authenticate the user with Firebase Authentication
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const userId = userCredential.user.uid;

        // Fetch user data from Firestore
        const userDoc = await firestore().collection('users').doc(userId).get();

        if (userDoc.exists) {
          setLoading(true); // Show loading animation when login starts

          const userData = userDoc.data();

          // Verify if the security question and answer match
          if (
            userData.securityQuestion === selectedQuestion &&
            userData.securityAnswer.toLowerCase() === securityAnswer.toLowerCase()
          ) {

            await AsyncStorage.setItem('userId', userId);

            setTimeout(() => {
              // Navigate to home screen after the delay
              setLoading(false); // Stop the loading animation
              navigation.navigate('HomeScreen', { UserId: userId });
            }, 5000);

          } else {
            setErrors({ ...errors, securityAnswer: 'Incorrect answer to the security question' });
            setLoading(false); // Stop loading if authentication fails
          }
        } else {
          setErrors({ ...errors, email: 'No user found with this email' });
          setLoading(false); // Stop loading if authentication fails
        }
      } catch (error) {
        console.error('Login error: ', error);
        setErrors({ ...errors, password: 'Invalid email or password' });
        setLoading(false); // Stop loading if authentication fails
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Welcome back !!</Text>

      {/* Email Field */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Password Field */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Security Question */}
      <Text style={styles.label}>Security Question</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedQuestion}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedQuestion(itemValue)}
        >
          <Picker.Item label="Select a question" value="" />
          <Picker.Item label="What was the name of your first pet?" value="pet" />
          <Picker.Item label="What is the name of your hometown?" value="hometown" />
          <Picker.Item label="What was your first car?" value="car" />
          <Picker.Item label="What was the name of your elementary school?" value="school" />
          <Picker.Item label="What is your favorite food?" value="food" />
        </Picker>
      </View>
      {errors.selectedQuestion && <Text style={styles.error}>{errors.selectedQuestion}</Text>}

      {/* Security Answer */}
      <Text style={styles.label}>Security Answer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your answer"
        secureTextEntry
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      />
      {errors.securityAnswer && <Text style={styles.error}>{errors.securityAnswer}</Text>}

      {/* Remember Me and Forgot Password */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          {/* <Text style={styles.rememberMeText}>
            {rememberMe ? '☑' : '☐'} Remember me
          </Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Log In Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Loading Spinner */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login Buttons */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={google} style={styles.socialIcon} />
          <Text style={styles.socialText}>SignUp</Text>
        </TouchableOpacity>
      </View>

      {/* Registration Prompt */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerPrompt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.registerText}> Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 170,
    height: 90,
    alignSelf: 'center',
    marginBottom: 0,
    marginRight: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#100f0d',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 8,
    backgroundColor: 'black',
  },
  checkboxChecked: {
    backgroundColor: 'black', // Checked color
  },
  rememberMeText: {
    fontSize: 14,
    color: '#100f0d',
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#100f0d',
    textAlign: 'center',
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    color: '#100f0d',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    color: 'black',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#100f0d',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#888',
  },
  loginButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#cc8899',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    width: 50,
    height: 1,
    backgroundColor: '#cccccc',
    marginHorizontal: 10,
  },
  orText: {
    color: '#888',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70',
    alignSelf: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontSize: 14,
    color: '#000',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerPrompt: {
    fontSize: 14,
    color: '#888',
  },
  registerText: {
    fontSize: 14,
    color: '#cc8899',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#000',
  },
});
