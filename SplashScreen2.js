import {useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/revive-nobg.png';


export default function SplashScreen2({ navigation }) {

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <Image
        source={logo}
        style={styles.image}
      />

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Unlock Extra Income </Text>
        <Text style={styles.description}>
        Have something collecting dust? List it on Rentify and let it earn for you while helping others.
        </Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('SplashThirdScreen')}> 
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom:90,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#fbc926',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
