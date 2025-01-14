import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function WithdrawScreen({ navigation }) {
  const [name, setName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleWithdraw = () => {
    if (!isTermsAccepted) {
      Alert.alert("Terms & Conditions", "Please accept the Terms & Conditions to proceed.");
      return;
    }

    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed with this withdraw request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            console.log("Withdraw Request:", {
              name,
              bankName,
              accountNumber,
              amount,
              phoneNumber,
            });
            Alert.alert("Request Submitted", "Your withdraw request has been submitted.");
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Transparent Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
        </TouchableOpacity>
       
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

      <Text style={styles.headerText}>Withdraw Funds</Text>
        {/* Name Field */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        {/* Bank Name Field */}
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your bank name"
          value={bankName}
          onChangeText={setBankName}
        />

        {/* Account Number Field */}
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your account number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />

        {/* Amount Field */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Phone Number Field */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        {/* Terms & Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isTermsAccepted}
            onValueChange={setIsTermsAccepted}
          />
          <Text style={styles.checkboxLabel}>I accept the Terms & Conditions</Text>
        </View>

        {/* Withdraw Button */}
        <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
          <Text style={styles.withdrawButtonText}>Apply for Withdraw</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  scrollContent: {
    paddingTop: 25, // Space for the header
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color:'black'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  withdrawButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fbc926',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
