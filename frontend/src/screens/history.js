import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {getHistory} from '../api';

const IntakeHistory = ({navigation}) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchIntakeHistory();
  }, []);

  const fetchIntakeHistory = async () => {
    try {
      const response = await getHistory();
      setHistory(response);
    } catch (error) {
      console.error('Error fetching intake history:', error.message);
    }
  };

  const renderItem = ({item}) => {
    const intakeDate = new Date(item.intake_date).toLocaleDateString();
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.dateText}>Date: {intakeDate}</Text>
        <Text style={styles.amountText}>
          Total Intake: {item.total_amount} ml
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intake History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#3b82f6',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginLeft: 10,
        }}>
        <Text style={{color: '#fff'}}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  flatList: {
    paddingTop: 10,
    paddingBottom: 60, // Adjusted to accommodate the "Go Back to Home" button
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amountText: {
    fontSize: 16,
    color: '#555',
  },
});

export default IntakeHistory;
