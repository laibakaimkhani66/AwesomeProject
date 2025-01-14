import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';

export default function EditProductScreen({ navigation }) {

  const [itemName, setItemName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [rentalMode, setRentalMode] = useState('');
  const [usageInstructions, setUsageInstructions] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [itemWeight, setItemWeight] = useState('');
  const [itemDimensions, setItemDimensions] = useState('');
  const [brandModel, setBrandModel] = useState('');
  const [images, setImages] = useState([]);

  // Image Picker Handler
  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then((selectedImages) => {
      const imageUris = selectedImages.map((img) => img.path);
      setImages([...images, ...imageUris]);
    }).catch((error) => {
      console.log("Image picking error:", error);
    });
  };

  const handleSubmit = () => {
    const productData = {
      itemName,
      phoneNumber,
      category,
      description,
      condition,
      rentalPrice,
      rentalMode,
      usageInstructions,
      pickupLocation,
      pickupInstructions,
      itemWeight,
      itemDimensions,
      brandModel,
      images,
    };
    console.log(productData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back-arrow.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Update Your Rental Item</Text>

        {/* Item Name */}
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={itemName}
          onChangeText={setItemName}
        />

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View style={styles.row} >
          <View style={styles.halfInput}>
            {/* Category */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Electronics" value="electronics" />
                <Picker.Item label="Tools" value="tools" />
                <Picker.Item label="Furniture" value="furniture" />
                <Picker.Item label="Vehicles" value="vehicles" />
              </Picker>
            </View>
          </View>

          <View style={styles.halfInput}>

            <Text style={styles.label}>Condition</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={condition}
                style={styles.picker}
                onValueChange={(itemValue) => setCondition(itemValue)}
              >
                <Picker.Item label="Select Condition" value="" />
                <Picker.Item label="New" value="new" />
                <Picker.Item label="Like New" value="like_new" />
                <Picker.Item label="Good" value="good" />
                <Picker.Item label="Fair" value="fair" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Condition */}


        {/* Rental Price and Rental Mode in Same Line */}
        <View style={styles.row}>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Rental Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter rental price"
              keyboardType="numeric"
              value={rentalPrice}
              onChangeText={setRentalPrice}
            />
          </View>

          <View style={styles.halfInput}>
            <Text style={styles.label}>Rental Mode</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={rentalMode}
                style={styles.picker}
                onValueChange={(itemValue) => setRentalMode(itemValue)}
              >
                <Picker.Item label="Select Mode" value="" />
                <Picker.Item label="Hourly" value="hourly" />
                <Picker.Item label="Daily" value="daily" />
                <Picker.Item label="Weekly" value="weekly" />
                <Picker.Item label="Monthly" value="monthly" />
              </Picker>
            </View>
          </View>

        </View>

        {/* Pickup Location */}
        <Text style={styles.label}>Pickup Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />

        {/* Pickup Instructions */}
        <Text style={styles.label}>Pickup Instructions</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup instructions"
          value={pickupInstructions}
          onChangeText={setPickupInstructions}
        />

        {/* Item Weight and Dimensions */}
        <Text style={styles.label}>Item Weight (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item weight (kg)"
          keyboardType="numeric"
          value={itemWeight}
          onChangeText={setItemWeight}
        />
        <Text style={styles.label}>Item Dimensions (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter item dimensions (LxWxH)"
          value={itemDimensions}
          onChangeText={setItemDimensions}
        />

        {/* Brand/Model Information */}
        <Text style={styles.label}>Brand/Model Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter brand/model information"
          value={brandModel}
          onChangeText={setBrandModel}
        />

        {/* Usage Instructions */}
        <Text style={styles.label}>Usage Instructions/Limitations</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter usage instructions"
          value={usageInstructions}
          onChangeText={setUsageInstructions}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter detailed description"
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Images */}
        <Text style={styles.label}>Photos</Text>
        <View style={styles.imageContainer}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>+ Add Image</Text>
          </TouchableOpacity>
        </View>

        {/* Update Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Update Now</Text>
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
  icon: {
    width: 24,
    height: 24,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  picker: {
    color: '#888',
    fontSize: 16,
    width: '100%',
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: '#fbc926',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
