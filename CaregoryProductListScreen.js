import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function CategoryProductListScreen({ navigation }) {
    // Sample product data
    const allProducts = [
      
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);

    const products = allProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <View style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Category Product List</Text>
            </View>


            {/* Product List */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>


                {/* Filter Buttons */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Filter 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Filter 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Filter 4</Text>
                    </TouchableOpacity>
                </View>

                {products.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                        <Image source={product.image} style={styles.productImage} />
                        {/* Price  */}
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{product.price}/{product.mode}</Text>
            </View>
                        <View style={styles.productTextContainer}>
                            <Text style={styles.productName}>{product.name}</Text>
                            
                            <Text style={styles.productCategory}>Category : {product.category}</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
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
        zIndex: 1,
    },
    backButton: {
        padding: 10,
    },
    icon: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#100f0d',
        marginLeft: 20,
    },
    filterContainer: {
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#fbc926',
        borderRadius: 5,
    },
    filterButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        position: 'relative',
        marginBottom:10,
      },
      price: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fbc926', 
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
      },
       priceText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
    productImage: {
        width: 60,
        height: 60,
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
    productPrice: {
        fontSize: 14,
        color: '#fbc926',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    productCategory: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 12,
        color: '#888',
    },
    paginationContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:10,
        backgroundColor: '#f4f4f8',
    },
    pageButton: {
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#e0e0e0',
    },
    activePageButton: {
        backgroundColor: '#fbc926',
    },
    pageButtonText: {
        fontSize: 14,
        color: '#333',
    },
    activePageButtonText: {
        color: '#fff',
    },
});

