import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function CategoryScreen({ navigation }) {
  const categories = [
    
  ];

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

      

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.pageTitle}>Explore Categories</Text>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryCard}>
            <Image source={category.icon} style={styles.categoryIcon} />
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Back to Home Button */}
        <TouchableOpacity style={styles.backHomeButton} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.backHomeButtonText}>Back to Home</Text>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#100f0d',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingTop: 20, 
    paddingBottom: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: '#fbc926',
    paddingVertical: 5,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backHomeButton: {
    backgroundColor: '#100f0d',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  backHomeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

