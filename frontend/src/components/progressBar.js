// src/components/ProgressBar.js

import React from 'react';
import {View, Text} from 'react-native';

const ProgressBar = ({goal, progress}) => {
  const progressPercentage = Math.min((progress / goal) * 100, 100); // Assuming 1000ml is the goal

  return (
    <View className="w-full">
      <View className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <View
          className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{width: `${progressPercentage}%`}}>
          <Text className="text-center">{progressPercentage.toFixed(1)}%</Text>
        </View>
      </View>
      <Text className="text-center text-black">
        {progress}/{goal} ml
      </Text>
    </View>
  );
};

export default ProgressBar;
