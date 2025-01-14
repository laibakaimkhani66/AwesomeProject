import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvi4ak9cq/upload'; 
const UPLOAD_PRESET = 'laibakk';

export default function UploadScreen({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  // Rental specific fields
  const [rentalMode, setRentalMode] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [rentalDuration, setRentalDuration] = useState('');
  const [price, setPrice] = useState('');
  const [usageInstructions, setUsageInstructions] = useState('');

  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = async () => {
    if (!itemName || !category || !image || (category === 'rent' && (!rentalMode || !pickupLocation || !rentalDuration || !price || !usageInstructions)) || (category !== 'rent' && !sellingPrice) || (category === 'preloved' && (!originalPrice || !sellingPrice))) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const currentUser = auth().currentUser;
    if (currentUser) {
      try {
        await firestore()
          .collection('products')
          .doc(currentUser.uid)
          .collection('userProducts')
          .add({
            title: itemName,
            phone: phoneNumber,
            description,
            category,
            condition,
            originalPrice,
            sellingPrice,
            rentalMode,
            pickupLocation,
            rentalDuration,
            price,
            usageInstructions,
            size,
            brand,
            image,
          });

        Alert.alert('Success', 'Product uploaded successfully');
        navigation.goBack();
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'There was an error uploading the product.');
      }
    }
  };

  const handleImagePick = async () => {
    try {
      const image = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const uploadedUrl = await uploadToCloudinary(image);
      if (uploadedUrl) {
        setImage(uploadedUrl);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
   
<ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Upload Item</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          placeholderTextColor="gray"
          value={itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="gray"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Category</Text>
        <View style={styles.pickerContainer}>
          
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.input}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Rental Product" value="rent" />
            <Picker.Item label="Selling PreLoved" value="preloved" />
            <Picker.Item label="Selling New" value="sellingnew" />
          </Picker>
        </View>
      </View>

      {/* Size and Brand for Preloved and Selling New */}
      {(category === 'preloved' || category === 'sellingnew') && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Size</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter size (e.g., S, M, L, XL)"
              placeholderTextColor="gray"
              value={size}
              onChangeText={setSize}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Condition</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter condition "
              placeholderTextColor="gray"
              value={condition}
              onChangeText={setCondition}
            />
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Brand</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter brand"
              placeholderTextColor="gray"
              value={brand}
              onChangeText={setBrand}
            />
          </View>
        </>
      )}

      {/* Original Price for Preloved and Selling New */}
      {(category === 'preloved' || category === 'sellingnew') && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Original Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter original price"
            placeholderTextColor="gray"
            value={originalPrice}
            onChangeText={setOriginalPrice}
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Selling Price for Preloved and Selling New */}
      {(category === 'preloved' || category === 'sellingnew') && (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Selling Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter selling price"
            placeholderTextColor="gray"
            value={sellingPrice}
            onChangeText={setSellingPrice}
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Rental Fields (if category is Rent) */}
      {category === 'rent' && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Rental Mode</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={rentalMode}
                onValueChange={setRentalMode}
                style={styles.input}
              >
                
                <Picker.Item label="Select Mode" value="" />
                <Picker.Item label="Delivery" value="delivery" />
                <Picker.Item label="Pick-up" value="pickup" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Rental Duration</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={rentalDuration}
                onValueChange={setRentalDuration}
                placeholderTextColor="gray"
                style={styles.input}
              >
                <Picker.Item label="Select Duration" value="" />
                
                <Picker.Item label="Hourly" value="hourly" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="3 Days" value="3days" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Pickup Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pickup location"
              placeholderTextColor="gray"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter rental price"
              placeholderTextColor="gray"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Usage Instructions</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter usage instructions"
              placeholderTextColor="gray"
              value={usageInstructions}
              onChangeText={setUsageInstructions}
            />
          </View>
        </>
      )}

      {/* Image Upload */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
        <Text style={styles.uploadButtonText}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#cc8899',
  },
  inputContainer: {
    marginBottom: 15,
    
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#cc8899',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#cc8899',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },

 backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#cc8899',
    padding: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
