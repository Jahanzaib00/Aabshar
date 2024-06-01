import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {getWaterIntake, logWaterIntake, getGoal, setGoalApi} from '../api';
import ProgressBar from '../components/progressBar';
import {AuthContext} from '../authContext';

const Home = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const navigation = useNavigation();
  const {userId} = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      fetchWaterIntake();
      fetchGoal();
    }, [waterIntake, goal]),
  );

  const fetchWaterIntake = async () => {
    try {
      const result = await getWaterIntake(userId);
      setWaterIntake(result.totalAmount);
      console.log('fetchWaterIntake', result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogWater = async amount => {
    try {
      const result = await logWaterIntake(userId, amount);
      setModalVisible(false);
      setAmount('');
      fetchWaterIntake(); // Refresh the water intake data
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchGoal = async () => {
    try {
      const result = await getGoal(userId);
      setGoal(result.goal);
      console.log('fetchGoal', result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSetGoal = async newGoal => {
    try {
      await setGoalApi(userId, newGoal);
      setGoalModalVisible(false);
      setNewGoal('');
      fetchGoal(); // Refresh the goal data
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{flex: 1, marginVertical: 10}}>
      <Text
        style={{
          textAlign: 'center',
          marginTop: 10,
          fontSize: 32,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Daily Progress
      </Text>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className="flex items-center justify-center w-11/12 m-auto">
          <Text className="text-black mt-10 text-lg">
            Today's Water Intake:
          </Text>
          <Text className="text-black">{waterIntake} ml</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="m-auto bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4 self-start">
            <Text className="text-white">Log Water Intake</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 10,
                  width: '80%',
                }}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                    color: 'black',
                  }}
                  placeholder="Enter amount in ml"
                  placeholderTextColor="black"
                  onChangeText={text => setAmount(text)}
                  value={amount}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => handleLogWater(amount)}
                  style={{
                    backgroundColor: '#3b82f6',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Text className="text-black mt-20 text-lg">Your Goal Progress</Text>
          {goal ? (
            <ProgressBar goal={goal} progress={waterIntake} />
          ) : (
            <Text className="text-black">You've no goals set for today</Text>
          )}
          <TouchableOpacity
            onPress={() => setGoalModalVisible(true)}
            className="m-auto bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4 self-start">
            <Text className="text-white">Set New Goal</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={goalModalVisible}
            onRequestClose={() => {
              setGoalModalVisible(false);
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 10,
                  width: '80%',
                }}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                    color: 'black',
                  }}
                  placeholder="Enter new goal in ml"
                  placeholderTextColor="black"
                  onChangeText={text => setNewGoal(text)}
                  value={newGoal}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={() => handleSetGoal(newGoal)}
                  style={{
                    backgroundColor: '#3b82f6',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: '5%', paddingBottom: 20}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Logs')}
          style={{
            width: '100%',
            backgroundColor: '#1f2937',
            alignItems: 'center',
            paddingVertical: 15,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>View Intake Logs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
