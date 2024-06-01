import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getTodaysLogs, deleteLog, updateLog} from '../api';
import {AuthContext} from '../authContext';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedLog, setEditedLog] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const navigation = useNavigation();
  const {userId} = useContext(AuthContext);

  useEffect(() => {
    fetchTodaysLogs();
  }, []);

  const fetchTodaysLogs = async () => {
    try {
      const result = await getTodaysLogs(userId);
      console.log(result);
      setLogs(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteLog = async logId => {
    Alert.alert('Delete Log', 'Are you sure you want to delete this log?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await deleteLog(logId);
            fetchTodaysLogs(); // Refresh the logs after deletion
          } catch (error) {
            console.log(error.message);
          }
        },
      },
    ]);
  };

  const handleEditLog = log => {
    setEditedLog(log);
    setNewAmount(log.amount.toString());
    setModalVisible(true);
  };

  const handleSubmitEdit = async () => {
    try {
      await updateLog(editedLog.id, newAmount);
      fetchTodaysLogs(); // Refresh the logs after update
      setModalVisible(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4 text-black">
        Today's Water Logs
      </Text>
      <FlatList
        data={logs}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View className="flex flex-row justify-between items-center p-4 border-b border-gray-300">
            <Text className="text-black">{item.amount} ml</Text>
            <View className="flex flex-row">
              <TouchableOpacity
                onPress={() => handleEditLog(item)}
                className="mr-4">
                <Text className="text-black">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteLog(item.id)}>
                <Text className="text-black">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#3b82f6',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <Text style={{color: '#fff'}}>Go Back to Home</Text>
      </TouchableOpacity>

      {/* Modal for editing log */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
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
              placeholder="Enter new amount in ml"
              placeholderTextColor="black"
              onChangeText={text => setNewAmount(text)}
              value={newAmount}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={handleSubmitEdit}
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
  );
};

export default Logs;
