import { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen1 = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
     
      const UserId = await AsyncStorage.getItem('userId');
      console.log(UserId);

     
      if (UserId) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen', params: { UserId: UserId } }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }
    };

    
    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 3000); // 3000ms = 3 seconds

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/revive-nobg.png')} style={styles.logo} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed By SIBA Private Ltd </Text>
        <Text style={styles.footerText}>All rights reserved © 2024</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', 
  },
  logo: {
    width: 290,
    height: 150,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#100f0d', // Darker color for the footer text
  },
});

export default SplashScreen1;
