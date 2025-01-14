import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

export default function CartScreen({ route, navigation }) {
    const { cart } = route.params; // Get cart data from route

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {cart.length === 0 ? (
                <Text style={styles.emptyMessage}>Your cart is empty!</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image source={item.image} style={styles.cartItemImage} />
                            <View style={styles.cartItemText}>
                                <Text style={styles.cartItemName}>{item.name}</Text>
                                <Text style={styles.cartItemPrice}>{item.sellingprice}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Text style={styles.goBackButtonText}>Back to Products</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffaf0',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#cc8899',
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginTop: 20,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    cartItemText: {
        flex: 1,
        justifyContent: 'center',
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItemPrice: {
        fontSize: 14,
        color: '#cc8899',
    },
    goBackButton: {
        marginTop: 20,
        backgroundColor: '#cc8899',
        padding: 10,
        borderRadius: 5,
    },
    goBackButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
