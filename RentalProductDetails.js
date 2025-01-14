import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

export default function ProductDetailsPage({ navigation }) {
  const product = {
    id: 1,
    name: 'Sample Rental Product',
    price: 'Rs:30000 ',
    mode: '3 days',
    category: 'Luxury Collection',
    location: 'Mirpurkhas',
    imageGallery: [
      require('../assets/shhhhhhh.jpeg'),
      require('../assets/ssssssss_2.jpeg'),
      require('../assets/sssss_3.jpeg'),
    ],
    description:
      'Elevate your special occasions with this stunning suit from our Exclusive Luxury Collection. Available for rent, perfect for those who desire luxury without the hefty price tag.',
    features: [
      'Exquisite Fabric ',
      'Tailored to Perfection ',
      'Attention to Detail ',
      'Unique Embroidery',
    ],
    UsageInstruction: [
      'Cleaning Instructions: Dry clean only. Follow fabric care instructions before ironing.',
      'Return Policy: Return the suit in proper condition, packed and ready for shipping. Follow our return policy guidelines.',
    ],
    pickupLocation: 'Mirpurkhas',
    pickupInstructions: 'Available for pickup from 9 AM to 6 PM on weekdays only.',
    weight: '1.5 kg',
    dimensions: '15 x 10 x 5 cm',
    brandModel: 'Model X200 - Brand Y',
  };

  const relatedProducts = [
    { id: 2, name: 'Product 2', price: 'Rs 2000', category: 'Festive Wear', image: require('../assets/sharrrrr.jpeg') },
    { id: 3, name: 'Product 3', price: 'Rs 1,20000', category: 'Bridal Wear', image: require('../assets/kkkkkkkkkkk.jpeg') },
    { id: 4, name: 'Product 4', price: 'Rs 12000', category: 'HandCraft Wedding Outfit', image: require('../assets/uuuuuuuuuuu.jpeg') },
  ];

  return (
    <View style={styles.container}>
      {/* Transparent Header with Back Button and Heart Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartButton}>
          <Image source={require('../assets/cart_2.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Image Slider */}
        <Swiper
          style={styles.imageSlider}
          autoplay
          loop
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
        >
          {product.imageGallery.map((image, index) => (
            <Image key={index} source={image} style={styles.productImage} />
          ))}
        </Swiper>

        {/* Product Name, Price, and Rental Mode */}
        <View style={styles.priceModeContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceModeRight}>
            <Text style={styles.productPrice}>{product.price}/{product.mode} </Text>
          </View>
        </View>

        {/* Product Category */}
        <Text style={styles.productCategory}>Category: {product.category}</Text>

        {/* Rent Now Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.buttonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Product Description */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Product Description</Text>
          <Text style={styles.sectionText}>{product.description}</Text>
        </View>

        {/* Product Features */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Product Features</Text>
          {product.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Image source={require('../assets/checkmark.png')} style={styles.featureIcon} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Usage Instructions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Usage Instructions</Text>
          {product.UsageInstruction.map((instruction, index) => (
            <Text key={index} style={styles.sectionText}>{instruction}</Text>
          ))}
        </View>

        {/* Pickup Location and Instructions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Pickup Location</Text>
          <Text style={styles.sectionText}>{product.pickupLocation}</Text>
          <Text style={styles.sectionTitle}>Pickup Instructions</Text>
          <Text style={styles.sectionText}>{product.pickupInstructions}</Text>
        </View>

        {/* Additional Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Item Specifications</Text>
          <Text style={styles.sectionText}>Weight: {product.weight}</Text>
          <Text style={styles.sectionText}>Dimensions: {product.dimensions}</Text>
          <Text style={styles.sectionText}>Brand/Model: {product.brandModel}</Text>
        </View>

        {/* Social Media Share Icons */}
        <Text style={styles.shareTitle}>Share Now</Text>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity>
            <Image source={require('../assets/copy-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/whatsapp-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/insta-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* Related Products Section */}
        <Text style={styles.relatedTitle}>Related Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedProductContainer}>
          {relatedProducts.map((relatedProduct) => (
            <View key={relatedProduct.id} style={styles.relatedProductCard}>
              <Image source={relatedProduct.image} style={styles.relatedProductImage} />
              <Text style={styles.relatedProductName}>{relatedProduct.name}</Text>
              <Text style={styles.relatedProductPrice}>{relatedProduct.price}</Text>
              <Text style={styles.relatedProductCategory}>{relatedProduct.category}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Order Summary Section */}
        <View style={styles.orderSummary}>
          <Text style={styles.orderSummaryTitle}>Order Summary</Text>
          <View style={styles.orderItem}>
            <Text style={styles.orderItemText}>Product: {product.name}</Text>
            <Text style={styles.orderItemPrice}>{product.price}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>{product.price}</Text>
          </View>
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
    padding: 5,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  heartButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  imageSlider: {
    height: 250,
  },
  productImage: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  priceModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  priceModeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#cc8899',
  },
  productCategory: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
    textAlign:'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  rentButton: {
    backgroundColor: '#cc8899',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  addButton: {
    backgroundColor: '#cc8899',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  featuresContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#cc8899',
  },
  sectionText: {
    color: 'gray',
    fontSize: 14,
    marginVertical: 5,
  },
  sectionContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  featureIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: 'gray',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
    color: '#cc8899',
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  relatedTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    color: '#cc8899',
  },
  relatedProductContainer: {
    paddingLeft: 10,
  },
  relatedProductCard: {
    marginRight: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  relatedProductImage: {
    width: 120,
    height: 150,
    borderRadius: 10,
  },
  relatedProductName: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#cc8899',
    marginTop: 5,
  },
  relatedProductCategory: {
    fontSize: 12,
    color: '#777',
  },
  orderSummary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderSummaryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderItemText: {
    fontSize: 16,
    color: '#333',
  },
  orderItemPrice: {
    fontSize: 16,
    color: '#cc8899',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc8899',
  },
});
