import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const historyData = [
  { id: '1', disease: 'Name of disease', date: 'date of scan' },
  { id: '2', disease: 'Name of disease', date: 'date of scan' },
  { id: '3', disease: 'Name of disease', date: 'date of scan' },
  { id: '4', disease: 'Name of disease', date: 'date of scan' },
];

export default function HistoryScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Placeholder image */}
        <View style={styles.imageContainer}>
          <Icon name="image-outline" size={36} color="#005EB8" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.diseaseText}>{item.disease}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Icon name="trash-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#005EB8', marginBottom: 16 },
  listContainer: { paddingBottom: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#87CEEB',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#E0F0FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: { flex: 1 },
  diseaseText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  dateText: { fontSize: 14, color: '#FFFFFF', marginTop: 4 },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginLeft: -50, 
    alignSelf: 'center',
  },
});