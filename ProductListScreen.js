import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

export default function ProductListScreen({ navigation }) {
    // Sample product data for Revive Fashion
    const allProducts = [
        { id: 1, name: 'Kaftaan', sellingprice: '5300 Rs', category: 'Party wear', originalprice: '5599 Rs', size: 'S-M', brand: 'Smh Accessories', description: 'Look stunning in this must-have outfit.', image: require('../assets/kaftaaann.jpeg') },
        { id: 2, name: 'Soft Cotton 2 pc', sellingprice: '2600 Rs', category: 'Casual wear', brand: 'Bonanza Satrangi', size: 'Xs-S', originalprice: '3200 Rs', description: 'Light and breezy summer dress.', image: require('../assets/casuall.jpeg') },
        { id: 3, name: 'Khaddar 2 pc', sellingprice: '2000 Rs', category: 'Casual wear', brand: 'MK Prets', size: 'Xs-S', originalprice: '2200 Rs', description: 'A perfect khaddar fit for outgoing.', image: require('../assets/khadar.jpeg') },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const products = allProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Cart state
    const [cart, setCart] = useState([]);

    // Handle adding product to cart
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        Alert.alert('Success', `${product.name} has been added to the cart!`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Revive Fashion</Text>
                {/* Add to Cart Icon */}
                <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart })} style={styles.cartButton}>
                    <Image source={require('../assets/cart_2.png')} style={styles.icon} />
                    <Text style={styles.cartCount}>{cart.length}</Text>
                </TouchableOpacity>
            </View>

            {/* Product List with Filters */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Outerwear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Dresses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Accessories</Text>
                    </TouchableOpacity>
                </View>

                {products.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                        <Image source={product.image} style={styles.productImage} />
                        <View style={styles.productTextContainer}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productCategory}>Category: {product.category}</Text>
                            <Text style={styles.productCategory}>Size: {product.size}</Text>
                            <Text style={styles.productCategory}>Brand: {product.brand}</Text>
                            <Text style={styles.productCategory}>Original Price: {product.originalprice}</Text>
                            <Text style={styles.productPrice}>Selling Price: {product.sellingprice}</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
                            <TouchableOpacity
                                style={styles.addToCartButton}
                                onPress={() => addToCart(product)}
                            >
                                <Text style={styles.addToCartText}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Pagination */}
                <View style={styles.paginationContainer}>
                    {[...Array(totalPages)].map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.pageButton,
                                currentPage === index + 1 && styles.activePageButton,
                            ]}
                            onPress={() => setCurrentPage(index + 1)}
                        >
                            <Text
                                style={[
                                    styles.pageButtonText,
                                    currentPage === index + 1 && styles.activePageButtonText,
                                ]}
                            >
                                {index + 1}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf0',
    },
    header: {
        backgroundColor: '#cc8899',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,
    },
    backButton: {
        padding: 10,
    },
    icon: {
        width: 35,
        height: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    cartButton: {
        padding: 10,
        position: 'relative',
    },
    cartCount: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 10,
        width: 20,
        height: 20,
        textAlign: 'center',
        fontSize: 12,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#f4f4f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
    },
    filterButtonText: {
        fontSize: 14,
        color: '#cc8899',
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    productImage: {
        width: 90,
        height: 200,
        borderRadius: 10,
        marginRight: 15,
    },
    productTextContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productCategory: {
        fontSize: 12,
        color: '#666',
        marginVertical: 2,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#cc8899',
    },
    productDescription: {
        fontSize: 12,
        color: '#999',
    },
    addToCartButton: {
        marginTop: 10,
        backgroundColor: '#cc8899',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    pageButton: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#f4f4f8',
        borderRadius: 5,
    },
    activePageButton: {
        backgroundColor: '#cc8899',
    },
    pageButtonText: {
        color: '#666',
    },
    activePageButtonText: {
        color: '#fff',
    },
});
