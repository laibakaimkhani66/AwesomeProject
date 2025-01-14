import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import ProductListScreen from './screens/ProductListScreen';  // Path may vary
//import ProductDetailsPage from './screens/ProductDetailsPage'; // Path may vary

// Screens------
import SplashScreen1 from './screens/SplashScreen1';
import SplashScreen2 from './screens/SplashScreen2';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomePage from './screens/HomePage';
import CategoryScreen from './screens/CategoryScreen';
import VerifyOTPScreen from './screens/VerifyOTPScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProductDetailsPage from './screens/ProductDetailsScreen';
import UploadScreen from './screens/UploadProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import CategoryProductListScreen from './screens/CaregoryProductListScreen';
import SplashScreen3 from './screens/SplashScreen3';
import WithdrawScreen from './screens/WithdrawScreen';
import EditProductScreen from './screens/EditProduct';
import MyListedProductsScreen from './screens/MyListedProductsScreen';
import SignUpSecondScreen from './screens/SignUpSecondScreen';
import RentalProductDetails from './screens/RentalProductDetails';
import CartScreen from './screens/CartScreen';



Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashOneScreen">
        <Stack.Screen name="SplashOneScreen" component={SplashScreen1} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="SplashTwoScreen" component={SplashScreen2} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="SplashThirdScreen" component={SplashScreen3} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="SignupScreen" component={SignUpScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
                <Stack.Screen name="SignUpSecondScreen" component={SignUpSecondScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="HomeScreen" component={HomePage} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="OTPScreen" component={VerifyOTPScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsPage} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="UploadProductScreen" component={UploadScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="CategoryProductListScreen" component={CategoryProductListScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="EditProductScreen" component={EditProductScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
      
        <Stack.Screen name="CartScreen" component={CartScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
         <Stack.Screen name="MyListedProductsScreen" component={MyListedProductsScreen} options={{
          headerShown: false, // This hides the header for all screens
        }} />
        <Stack.Screen name="RentalProductDetails" component={RentalProductDetails} options={{
          headerShown: false, // This hides the header for all screens
        }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
