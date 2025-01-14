import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const HomePage = ({ route }) => {

  const { UserId } = route.params;
  const [userData, setuserData] = useState([]);
  const [name, setname] = useState("");
  const [location, setlocation] = useState("");

  // Function to fetch the user's fullName
  const fetchUserFullName = async (userId) => {
    
    try {

      const userDoc = await firestore().collection('users').doc(userId).get();

      if (userDoc.exists) {

        setuserData(userDoc.data());
        setname(userData.fullName);
        setlocation(userData.address);

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
    fetchUserFullName(UserId);  // Fetch user data when the page is loaded
  },);  // Re-fetch if UserId changes


  const navigation = useNavigation();

  const sliderImages = [
    require('../assets/pre-loo.png'),
    require('../assets/new-coo.png'),
    require('../assets/rental-coo.png')
  ];

  // Sample products data (replace with actual data as needed)
  const products = [
    { id: 1, name: 'Product 1', price: 'Rs 120', category: 'Electronics', image: require('../assets/product.png') },
    { id: 2, name: 'Product 2', price: 'Rs 250', category: 'Fashion', image: require('../assets/product.png') },
    { id: 3, name: 'Product 3', price: 'Rs 320', category: 'Real Estate', image: require('../assets/product.png') },
    { id: 4, name: 'Product 4', price: 'Rs 150', category: 'Books', image: require('../assets/product.png') },
    { id: 5, name: 'Product 5', price: 'Rs 200', category: 'Household', image: require('../assets/product.png') },
    { id: 6, name: 'Product 6', price: 'Rs 300', category: 'Cars', image: require('../assets/product.png') },
  ];

  return (
    <View style={styles.container}>

      {/* Small Header with Location and Account Status */}
      <View style={styles.smallHeader}>
        <View style={styles.locationContainer}>
          <Image source={require('../assets/profile-placeholder.png')} style={styles.locationIcon} />
          <Text style={styles.nameText}>{name}</Text>
          {userData ? (
            <Text style={styles.accountStatus}>

              {userData.verify ? (
                <>
                  (Verified)
                </>
              ) : (
                '(Not Verified)'
              )}
            </Text>
          ) : (
            <Text style={styles.accountStatus}>Loading...</Text>
          )}
        </View>

        <View style={styles.locationContainer}>
          <Image source={require('../assets/location-icon.png')} style={styles.locationIcon} />
          <Text style={styles.locationText}> {location} </Text>
          {/* <Text style={styles.accountStatus}> 'Verified' </Text> This is already correctly wrapped in <Text> */}
        </View>
      </View>

      {/* Header with Logo, Search Bar, and Drawer Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('../assets/revive-nobg.png')} style={styles.logo} />
        </TouchableOpacity >
        <View style={styles.searchContainer}>
          <Image source={require('../assets/search.png')} style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search Now" />
        </View>

      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Offer Banner Slider */}
        <View style={styles.sliderContainer}>
          <Swiper
            style={styles.slider}
            autoplay
            loop
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            dotColor="#90A4AE"
            activeDotColor="#fbc926"
            showsButtons={false}
          >
            {sliderImages.map((image, index) => (
              <Image key={index} source={image} style={styles.bannerImage} />
            ))}
          </Swiper>
        </View>

        {/* Categories */}
        <View style={styles.sectionTopHeader}>
          <Text style={styles.sectionTitle}>EXPLORE CATEGORIES</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('ProductDetailsScreen')}>
            <Image source={require('../assets/PRE-LOVED-COLLECTION.png')} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>PRE-LOVED COLLECTION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('ProductListScreen')}>
            <Image source={require('../assets/new.png')} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>NEW COLLECTION</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate('RentalProductDetails')}>
  <Image source={require('../assets/NEW-COLLECTION.png')} style={styles.categoryIcon} />
  <Text style={styles.categoryText}>RENTAL COLLECTION</Text>
</TouchableOpacity>

        </View>

      </ScrollView>

      {/* Bottom Fixed Navigation Boxes */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { userId: UserId })} style={styles.navBox}>
          <Image source={require('../assets/see-product.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBox}>
          <Image source={require('../assets/search.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UploadProductScreen', { userId: UserId })} style={styles.add_navBox}>
          <Image source={require('../assets/plus.png')} style={styles.navIcon} />
          <Text style={styles.add_navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { userId: UserId })} style={styles.navBox}>
          <Image source={require('../assets/heart.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userId: UserId })} style={styles.navBox}>
          <Image source={require('../assets/profile-placeholder.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  accountStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',

  },
  smallHeader: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#cc8899',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  location_Icon: {
    width: 20,
    height: 20,
    pa: 50,
    marginRight: 5,
  },
  verify_Icon: {
    width: 20,
    height: 20,
    pa: 50,
    marginRight: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#100f0d',
  },
  nameText: {
    fontSize: 14,
    color: '#100f0d',

  },
  accountStatus: {
    paddingLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',// Adjust color based on the status
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  logo: {
    width: 80,
    height: 40,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'black'
  },
  drawerButton: {
    padding: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  scrollContent: {
    // paddingBottom: 20,
  },
  sliderContainer: {
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    height: 200,
  },
  slider: {
    height: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dotStyle: {
    bottom: -20,
  },
  activeDotStyle: {
    bottom: -20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  categoryBox: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 40,
    backgroundColor: '#cc8899',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    marginBottom: 0,
  },
  newcollectionIcon: {
    width: 50,
    height: 42,
    marginBottom: 0,
  },
  categoryText: {
    marginBottom:0,
    fontSize: 17,
    color: '#100f0d',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionTopHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#100f0d',
  },
  exploreButton: {
    backgroundColor: '#cc8899',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  exploreButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 180,
    height: 250,
    padding: 15,
    marginRight: 10,
    marginBottom: 25,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#100f0d',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#fbc926',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  checkButton: {
    backgroundColor: '#fbc926',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subscriptionBanner: {
    paddingTop: 20,
    paddingEnd: 20,
    backgroundColor: '#ffebcc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d48806',
    marginBottom: 5,
  },
  subscriptionFeature: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: '#fbc926',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#cc8899', // Dark background color to add contrast
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#444',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    marginBottom: 10,
    borderRadius: 40,
  },

  navBox: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  add_navBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
    backgroundColor: '#2a2a2a', // Dark background color for each box
    elevation: 5, // Light shadow for each box
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    transition: 'background-color 0.3s ease',
  },
  navBoxActive: {
    backgroundColor: '#fbc926', // Active color when pressed
  },
  navIcon: {
    width: 20,
    height: 20,
  },
  navText: {
    fontSize: 8,
    color: '#2a2a2a',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  add_navText: {
    fontSize: 8,
    color: 'white',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

});

