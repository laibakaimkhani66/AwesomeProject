import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function ProfileScreen({ route }) {

  const { userId } = route.params;
  const [userData,setuserData]=useState([]);
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [balance,setbalance]=useState(0);
  const [location,setlocation]=useState("");

  const [currentBalance, setCurrentBalance] = useState(0);


  const navigation = useNavigation();

  const fetchUserData = async (userId)  => {
    try {

      const userDoc = await firestore().collection('users').doc(userId).get();
  
      if (userDoc.exists) {

        setuserData(userDoc.data());
        setname(userData.fullName);
        setemail(userData.email);
        setbalance(userData.balance);

      } else {
        console.log('No user found with the given userId');
        return
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
      return
    }
  };

  useEffect(() => {
      fetchUserData(userId);
  }, ); 
  
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId'); // Remove token
    navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
  };

  return (
    <View style={styles.container}>
      {/* Transparent Header with Back Button and Heart Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartButton}>
          <Image source={require('../assets/heart.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <Text style={styles.profileHeaderText}>Profile</Text>

        {/* Profile Picture, Name, and Email */}
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Image source={require('../assets/profile-placeholder.png')} style={styles.profilePictureicon} />
          </View>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
        </View>

        {/* Current Balance Box */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceTitle}>Current Balance</Text>
          <Text style={styles.balanceAmount}>Rs.{balance}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('UploadProductScreen', { userId: userId }) }>
            <Image source={require('../assets/add-product.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyListedProductsScreen', { userId: userId })}  >
            <Image source={require('../assets/see-product.png')} style={styles.icon} />
            <Text style={styles.buttonText}>See Product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Image source={require('../assets/Update-Product.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity> 

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Image source={require('../assets/copy-icon.png')} style={styles.icon} />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

          {/* Full-Width Button */}
          <TouchableOpacity style={styles.fullWidthButton}>
            <Text style={styles.fullWidthButtonText}>Update Your Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Subscription Banner */}
        <View style={styles.subscriptionBanner}>
          <Text style={styles.subscriptionText}>Withdraw Amount!</Text>
        </View>
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
    justifyContent: 'space-between',
    padding: 15,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  heartButton: {
    padding: 10,
  },
  profilePictureicon: {
    width: 120,
    height: 100,
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
  logouticon: {
    width: 25,
    height: 30,
    marginBottom: 5,
  },
  scrollContent: {
    paddingTop: 20, // Space for the header
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 15,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fbc926',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
  balanceContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc8899',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cc8899',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '45%',
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  fullWidthButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#cccccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  fullWidthButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subscriptionBanner: {
    width: '100%',
    backgroundColor: '#cc8899',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutBanner: {
    width: '50%',
    backgroundColor: '#fbc926',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
