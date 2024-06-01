import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signup} from '../api';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const result = await signup(username, email);
      console.log('Sign up successful', 'Welcome to the app!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Sign up failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="bg-gray-5 flex-1 items-center justify-center px-6">
        <View className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <View className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Text className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </Text>
            <View className="space-y-4 md:space-y-6">
              <View>
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your Username
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View>
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </Text>
                <TextInput
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
              <TouchableOpacity
                onPress={handleSignUp}
                className="bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                <Text className="text-white text-center">Sign up</Text>
              </TouchableOpacity>
              <Text className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign in
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
