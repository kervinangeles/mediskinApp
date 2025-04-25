import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import avatar from '../assets/avatar.png';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={avatar} style={styles.profileImage} />
        <Text style={styles.headerText}>USER'S PROFILE</Text>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Text style={styles.infoText}>Fullname</Text>
        <Text style={styles.infoText}>Age</Text>
        <Text style={styles.infoText}>Gender</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statText}>Photos Uploaded</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statText}>Without Problems</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statText}>Diagnosed Problems</Text>
          <Text style={styles.statValue}>0</Text>
        </View>
      </View>

      {/* Last Scanning Section */}
      <View style={styles.lastScanning}>
        <Text style={styles.sectionTitle}>Your Last Scanning</Text>
        <TouchableOpacity>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scanningImages}>
        <View style={styles.imageBox}>
          <Icon name="image-outline" size={50} color="#005EB8" />
          <Text style={styles.imageDate}>Date</Text>
        </View>
        <View style={styles.imageBox}>
          <Icon name="image-outline" size={50} color="#005EB8" />
          <Text style={styles.imageDate}>Date</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FC' },
  header: {
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    paddingVertical: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 10,
  },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: { fontSize: 16, color: '#005EB8', marginBottom: 5 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statBox: { alignItems: 'center', flex: 1 },
  statText: { fontSize: 14, color: '#005EB8', marginBottom: 5 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#005EB8' },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  lastScanning: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#005EB8' },
  arrow: { fontSize: 20, color: '#005EB8' },
  scanningImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  imageBox: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    width: '45%',
  },
  imageDate: { fontSize: 14, color: '#005EB8', marginTop: 5 },
});