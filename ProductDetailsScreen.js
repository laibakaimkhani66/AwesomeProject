import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper';

export default function ProductDetailsPage({ navigation }) {
  const [cartItems, setCartItems] = useState([]); 

  const product = {
    id: 1,
    name: 'Sample Pre-Loved Clothes',
    sellingPrice: 1500,  
    originalPrice: 2000,
    category: 'Casual Wear',
    size: 'Small',
    condition: '10/10',
    Brand: 'bella couture',
    imageGallery: [
      require('../assets/hhhhhh.jpeg'),
      require('../assets/piiiiiiiiiii.jpeg'),
      require('../assets/pccccc.jpeg'),
    ],
    description:
      'This pre-loved shirt is made with high-quality fabric and offers a stylish look for every occasion. Embroidered Kurti Once wore (for only 2 hours)',
    features: [
      'Soft cotton material',
      'Comfortable fit',
      'Perfect for casual wear',
    ],
  };

  const relatedProducts = [
    { id: 2, name: 'Product 2', price: 1500, category: 'Embroidered Kurti', image: require('../assets/picccccccccc.jpeg') },
    { id: 3, name: 'Product 3', price: 2500, category: '2 piece dress', image: require('../assets/piceeee.jpeg') },
    { id: 4, name: 'Product 4', price: 8000, category: 'Sharara with Short Choli', image: require('../assets/picfffff.jpeg') },
  ];

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    setCartItems([...cartItems, product]); 
    Alert.alert('Success', 'Product added to cart!');
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.sellingPrice, 0);
  };

  // Handle Cart Icon press to navigate to the cart screen
  const handleCartPress = () => {
    navigation.navigate('Cart', { cartItems }); 
  };

  return (
    <View style={styles.container}>
      {/* Transparent Header with Back Button and Cart Icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCartPress} style={styles.cartButton}>
          <Image source={require('../assets/cart_2.png')} style={styles.icon} />
          {/* Cart Item Count */}
          {cartItems.length > 0 && (
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
            </View>
          )}
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

        {/* Product Name, Price */}
        <View style={styles.priceModeContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceModeRight}>
            <Text style={styles.productPrice}>Rs {product.sellingPrice}</Text>
          </View>
        </View>

        {/* Product Category */}
        <Text style={styles.productCategory}>Category: {product.category}</Text>

        {/* Add to Cart Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

       {/*    Product Description */}
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


        {/* Item Specifications */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Item Specifications</Text>
          <Text style={styles.sectionText}>Size: {product.size}</Text>
          <Text style={styles.sectionText}>Brand: {product.Brand}</Text>
          <Text style={styles.sectionText}>Condition: {product.condition}</Text>
          <Text style={styles.sectionText}>Selling Price: {product.sellingPrice}</Text>
          <Text style={styles.sectionText}>Original Price: {product.originalPrice}</Text>
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
              <Text style={styles.relatedProductPrice}>Rs {relatedProduct.price}</Text>
              <Text style={styles.relatedProductCategory}>{relatedProduct.category}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Order Summary Section */}
        {cartItems.length > 0 && (
          <View style={styles.orderSummary}>
            <Text style={styles.orderSummaryTitle}>Order Summary</Text>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.orderItem}>
                <Text style={styles.orderItemText}>{item.name}</Text>
                <Text style={styles.orderItemPrice}>Rs {item.sellingPrice}</Text>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>Rs {calculateTotalPrice()}</Text>
            </View>
          </View>
        )}
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
    padding: 10,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
  },
  cartButton: {
    padding: 15,
    position: 'relative',
    borderRadius: 80,
  },
  icon: {
    width: 30,
    height: 30,
  },
  cartItemCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#cc8899',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageSlider: {
    height: 500,
  },
  productImage: {
    width: '100%',
    height: 400,
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
  },
  priceModeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productPrice: {
    fontSize: 18,
    color: '#cc8899',
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
    paddingHorizontal: 10,
    textAlign:'center',

  },
  buttonContainer: {
    padding: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 15,

  },
  addButton: {
    backgroundColor: '#cc8899',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    padding: 10,

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

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc8899',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 22,

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
    marginBottom: 5,
  },
  featureIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#888',
  },
  shareTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc8899',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  socialIcon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc8899',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  relatedProductContainer: {
    paddingHorizontal: 10,
    paddingLeft: 10,
    paddingBottom: 20,

  },
  relatedProductCard: {
    marginRight: 20,
    width: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  relatedProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  relatedProductPrice: {
    fontSize: 12,
    color: '#cc8899',
    marginVertical: 5,
  },
  relatedProductCategory: {
    fontSize: 12,
    color: '#888',
  },
  orderSummary: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  orderSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderItemText: {
    fontSize: 14,
    color: '#888',
  },
  orderItemPrice: {
    fontSize: 14,
    color: '#cc8899',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cc8899',
  },
});
