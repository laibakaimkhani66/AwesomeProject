import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import google from '../assets/google.png';
import cnicFront from '../assets/google.png';
import cnicBack from '../assets/google.png';
import logo from '../assets/revive-nobg.png';
import { firebase } from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUpSecondScreen = ({ route }) => {


  const { userId, email } = route.params; 

  const navigation = useNavigation();

  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  const [address, setAddress] = useState('');
  const [cnicFront, setCnicFront] = useState(); 
  const [cnicBack, setCnicBack] = useState();  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 


  const validateFields = () => {
    const newErrors = {};

    // Full Name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Date of Birth validation (assuming DD/MM/YYYY format)
    const dobPattern = /^\d{2}\/\d{2}\/\d{2,4}$/;
    if (!dob.match(dobPattern)) {
      newErrors.dob = 'Please enter a valid date in DD/MM/YYYY format';
    }

    // Phone Number validation (example for 10-11 digit numbers)
    const phonePattern = /^[0-9]{10,11}$/;
    if (!phone.match(phonePattern)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // CNIC validation (example for 11 digit Pakistani CNIC)
    const cnicPattern = /^[0-9]{13}$/;
    if (!cnic.match(cnicPattern)) {
      newErrors.cnic = 'Please enter a valid 13-digit CNIC number';
    }


    // Address validation
    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    // Security Question validation
    if (!selectedQuestion) {
      newErrors.selectedQuestion = 'Please select a security question';
    }

    // Security Answer validation
    if (!answer.trim()) {
      newErrors.answer = 'Security answer is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImage = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref().child(`cnic-images/${Date.now()}`);
    await storageRef.put(blob);

    const downloadUrl = await storageRef.getDownloadURL();
    return downloadUrl;
  };


  // Handle user sign up and store data in Firestore
  const handleSignUp = async () => {
    if (validateFields()) {
      setLoading(true); // Show loading animation when login starts
      try {
        // Upload CNIC front and back images if available
        let cnicFrontUrl = null;
        let cnicBackUrl = null;

        if (cnicFront) {
          cnicFrontUrl = await uploadImage(cnicFront);
        }
        if (cnicBack) {
          cnicBackUrl = await uploadImage(cnicBack);
        }

        // Store user data in Firestore
        const userRef = firestore().collection('users').doc(userId);

        await userRef.set({
          email,
          fullName,
          dob,
          phone,
          cnic,
          address,
          securityQuestion: selectedQuestion,
          securityAnswer: answer,
          nationalIdCardFront: cnicFrontUrl,
          nationalIdCardBack: cnicBackUrl,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          verify: false,
          balance: 0,
        });

        setTimeout(() => {
          // Navigate to home screen after the delay
          setLoading(false); // Stop the loading animation
          navigation.navigate('HomeScreen', { UserId: userId });
        }, 5000);

      } catch (error) {
        console.error('Sign up error: ', error);
        setLoading(false); // Stop loading if authentication fails
      }
    }
  };

  // Handle image selection for CNIC front and back
  const handleImagePick = (type) => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.uri) {
        if (type === 'front') {
          setCnicFront(response.uri);
        } else if (type === 'back') {
          setCnicBack(response.uri);
        }
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.title}>Complete Registration</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      {/* Date of Birth */}
      <Text style={styles.label}>Date of Birth (on CNIC)</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        keyboardType="date"
        value={dob}
        onChangeText={setDob}
      />
      {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      {/* National ID / CNIC */}
      <Text style={styles.label}>National ID / CNIC</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your CNIC number"
        keyboardType="numeric"
        value={cnic}
        onChangeText={setCnic}
      />
      {errors.cnic && <Text style={styles.error}>{errors.cnic}</Text>}

      {/* Residential Address */}
      <Text style={styles.label}>Residential Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      {errors.address && <Text style={styles.error}>{errors.address}</Text>}

      {/* CNIC Picture Front */}
      <Text style={styles.label}>CNIC Picture Front</Text>
      <TouchableOpacity style={styles.imageUploadButton} onPress={() => handleImagePick('front')}>
        <Image source={{ uri: cnicFront }} style={styles.cnicImage} />
        <Text style={styles.uploadText}>Upload Front Picture</Text>
      </TouchableOpacity>

      {/* CNIC Picture Back */}
      <Text style={styles.label}>CNIC Picture Back</Text>
      <TouchableOpacity style={styles.imageUploadButton} onPress={() => handleImagePick('back')}>
        <Image source={{ uri: cnicBack }} style={styles.cnicImage} />
        <Text style={styles.uploadText}>Upload Back Picture</Text>
      </TouchableOpacity>

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
      <Text style={styles.label}>Answer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your answer"
        value={answer}
        onChangeText={setAnswer}
        secureTextEntry
      />
      {errors.answer && <Text style={styles.error}>{errors.answer}</Text>}

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Register Now</Text>
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

export default SignUpSecondScreen;


const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  container: {
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
    marginBottom: 0,
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
