import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  // Show the modal every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(true); 
      return () => setModalVisible(false); 
    }, [])
  );

  const handleFAQPress = () => {
    setModalVisible(false);
    alert('FAQ Selected');
  };

  const handleAboutUsPress = () => {
    setModalVisible(false);
    alert('About Us Selected');
  };

  const handleLogOutPress = () => {
    setModalVisible(false);
    alert('Log Out Selected');
  };

  return (
    <View style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleFAQPress}
            >
              <Text style={styles.modalButtonText}>FAQ</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAboutUsPress}
            >
              <Text style={styles.modalButtonText}>About Us</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={[styles.modalButton, styles.logOutButton]}
              onPress={handleLogOutPress}
            >
              <Text style={[styles.modalButtonText, styles.logOutButtonText]}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FC',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  logOutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    marginTop: 10,
  },
  logOutButtonText: {
    color: '#FFFFFF',
  },
});