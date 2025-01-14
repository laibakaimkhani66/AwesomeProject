import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DocumentPicker from 'react-native-document-picker';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvi4ak9cq/upload'; // Your Cloudinary URL
const UPLOAD_PRESET = 'laibakk'; // Your unsigned preset

export default function MyListedProductsScreen({ route }) {
  const { userId } = route.params;
  const navigation = useNavigation();

  const [productData, setProductData] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch user products
  const fetchUserProducts = async (userId) => {
    if (userId) {
      try {
        const productsSnapshot = await firestore()
          .collection('products')
          .doc(userId)
          .collection('userProducts')
          .get();

        const fetchedProducts = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductData(fetchedProducts);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    }
  };

  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
      setUploading(true);

      const data = new FormData();
      data.append('file', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
      data.append('upload_preset', UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const result = await response.json();
      setUploading(false);

      if (response.ok) {
        return result.secure_url;
      } else {
        Alert.alert('Upload failed', result.error.message || 'Unknown error');
        return null;
      }
    } catch (error) {
      setUploading(false);
      Alert.alert('Upload failed', error.message);
      return null;
    }
  };

  // Handle file upload for a new product or update
  const handleFileUpload = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const price = 1000;

      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        // Logic to update product with the uploaded image URL
        const currentUser = auth().currentUser;

        if (currentUser) {
          await firestore()
            .collection('products')
            .doc(currentUser.uid)
            .collection('userProducts')
            .add({
              title: "Sample Product",
              price: 1000,      
              mode: "Sell",             
              category: "Fashion",      
              image: uploadedUrl,      
            });

          fetchUserProducts(currentUser.uid); // Re-fetch the products after adding
        }
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleDelete = (productId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const currentUser = auth().currentUser;

              if (currentUser) {
                await firestore()
                  .collection('products')
                  .doc(currentUser.uid)
                  .collection('userProducts')
                  .doc(productId)
                  .delete();

                setProductData(prevProducts => prevProducts.filter(product => product.id !== productId));
              }
            } catch (error) {
              console.log("Error deleting product: ", error);
              Alert.alert("Error", "There was an error deleting the product.");
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    fetchUserProducts(userId);
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>My Listed Products</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.buttonText}>Upload New Product</Text>
        </TouchableOpacity>

        {productData.length > 0 ? (
          productData.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.title}</Text>
                <Text style={styles.productPrice}>5000 Rs.{product.Price}{product.mode}</Text>

                <Text style={styles.productCategory}>{product.category}</Text>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.updateButton} onPress={() => {/* Handle update */}} >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(product.id)} >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noProductsText}>No products found. Start adding your products!</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
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
  icon: {
    width: 35,
    height: 35,
    marginBottom: 5,
  },
  backButton: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContent: {
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#cc8899',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#cc8899',
    marginVertical: 5,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: '#cc8899',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ededed',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  noProductsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});
