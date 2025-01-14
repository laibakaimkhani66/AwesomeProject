import React, { useState } from 'react';
import { ScrollView,StyleSheet ,Text, TextInput, TouchableOpacity, View, Image, Alert ,ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import google from '../assets/google.png';
import cnicFront from '../assets/google.png';
import cnicBack from '../assets/google.png';
import logo from '../assets/revive-nobg.png';


export default function SignUpScreen({ navigation }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  // Email and password validation
  const validateFields = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmpassword) {
      newErrors.confirmpassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle user sign-up with Firebase Authentication
  const handleSignUp = async () => {
    if (validateFields()) {
      setLoading(true); // Show loading animation when login starts
      try {
        // Create the user in Firebase Authentication
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        console.log('User created successfully', user.uid);

        setTimeout(() => {
          // Navigate to home screen after the delay
          setLoading(false); // Stop the loading animation
          navigation.navigate('SignUpSecondScreen', { userId: user.uid, email });
        }, 5000);
         
      } catch (error) {
        console.error('Sign up error:', error);
        Alert.alert('Error', error.message);
        setLoading(false); // Stop loading if authentication fails
      }
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Register</Text>

      {/* Email Address */}
      <Text style={styles.label}>Email Address</Text>
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

      {/* Confirm Password Field */}
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry={true}
        value={confirmpassword}
        onChangeText={setconfirmpassword}
      />
      {errors.confirmpassword && <Text style={styles.error}>{errors.confirmpassword}</Text>}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Next</Text>
      </TouchableOpacity>

            {/* Loading Spinner */}
            {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}

      {/* Social Media Sign-Up */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={google} style={styles.socialIcon} />
          <Text style={styles.socialText}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  container: {
    marginTop:90,
    padding: 20,
    backgroundColor: '#f4f4f8',
    paddingBottom: 20,
  },
  image: {
    width: 180,
    height: 100,
    alignSelf: 'center',
    marginBottom: 0,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#100f0d',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#100f0d',
    marginBottom: 5,
    marginTop: 20,
  },
  input: {
    color: 'black',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    //marginBottom: 15,
  },
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cnicImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  uploadText: {
    fontSize: 14,
    color: '#1e1d28',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#100f0d',
  },
  signUpButton: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#cc8899',
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
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
    paddingHorizontal: 60,
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
});
