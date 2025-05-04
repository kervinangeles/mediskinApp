import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { requestAllCameraPermissions, checkCameraPermission } from '../utils/permissions';

export default function CameraScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionsStatus, setPermissionsStatus] = useState({
    cameraGranted: false,
    microphoneGranted: false,
    storageGranted: false,
    allGranted: false,
    checking: true
  });
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');
  const [photo, setPhoto] = useState(null);
  
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  // Check camera permissions when component mounts
  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermissionGranted = await checkCameraPermission();
      setPermissionsStatus(prev => ({
        ...prev,
        cameraGranted: cameraPermissionGranted,
        checking: false
      }));
    };
    
    checkPermissions();
  }, []);
  
  // Request necessary permissions when activating camera
  const requestPermissions = async () => {
    setPermissionsStatus(prev => ({ ...prev, checking: true }));
    const permissions = await requestAllCameraPermissions();
    setPermissionsStatus({
      ...permissions,
      checking: false
    });
    
    return permissions.allGranted;
  };
  
  useFocusEffect(
    useCallback(() => {
      if (!cameraActive) {
        setModalVisible(true);
      }
      return () => {
        setModalVisible(false);
      };
    }, [cameraActive])
  );

  const handleCameraPress = async () => {
    setModalVisible(false);
    
    // Request permissions if not already granted
    if (!permissionsStatus.allGranted) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          "Permission Required", 
          "Camera and storage permissions are needed to use this feature.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Settings", onPress: () => openSettings() }
          ]
        );
        return;
      }
    }
    
    setCameraActive(true);
  };

  const handleUploadPress = async () => {
    setModalVisible(false);
    
    // Only request storage permission for upload
    if (!permissionsStatus.storageGranted) {
      const { storageGranted } = await requestAllCameraPermissions();
      if (!storageGranted) {
        Alert.alert(
          "Permission Required", 
          "Storage permission is needed to upload photos.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Settings", onPress: () => openSettings() }
          ]
        );
        return;
      }
    }
    
    Alert.alert('Upload Selected', 'Opening Photo Library...');
    // Here you would implement actual photo library access
  };

  const handleFlipCamera = () => {
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back');
  };

  const takePicture = async () => {
    if (!camera.current) {
      Alert.alert('Error', 'Camera reference not available');
      return;
    }
    
    try {
      const photo = await camera.current.takePhoto({
        flash: flash,
        quality: 90,
        enableShutterSound: false,
      });
      
      console.log('Photo captured:', photo);
      setPhoto(photo);
      setCameraActive(false);
      
      // Here you could navigate to a review screen with the captured photo
      Alert.alert('Success', 'Photo captured successfully!');
    } catch (error) {
      console.error('Take picture error:', error);
      Alert.alert('Camera Error', `Failed to take picture: ${error.message}`);
    }
  };

  // Render camera view when active
  if (cameraActive) {
    // Show loading when checking permissions
    if (permissionsStatus.checking) {
      return (
        <View style={[styles.cameraContainer, styles.cameraLoading]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Checking camera permissions...</Text>
        </View>
      );
    }
    
    // Show error when permission is denied
    if (!permissionsStatus.cameraGranted) {
      return (
        <View style={[styles.cameraContainer, styles.cameraLoading]}>
          <Text style={styles.loadingText}>
            Camera permission denied. Please enable camera access in your device settings.
          </Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setCameraActive(false)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    // Show loading when device is not yet available
    if (!device) {
      return (
        <View style={[styles.cameraContainer, styles.cameraLoading]}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading camera...</Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setCameraActive(false)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.cameraContainer}>
        <StatusBar hidden />
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          onInitialized={() => setIsCameraReady(true)}
          enableZoomGesture
        />
        <View style={styles.cameraControls}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setCameraActive(false)}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={takePicture} 
            style={styles.captureButton}
            disabled={!isCameraReady}
          >
            <View style={[
              styles.captureButtonInner, 
              !isCameraReady && styles.captureButtonDisabled
            ]} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={handleFlipCamera}
          >
            <Text style={styles.flipButtonText}>Flip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.flashButton}
            onPress={() => setFlash(prev => prev === 'off' ? 'on' : 'off')}
          >
            <Text style={styles.flashButtonText}>
              {flash === 'off' ? '⚡ Off' : '⚡ On'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Rest of your component stays the same...
  // Photo preview screen (after taking a photo)
  if (photo) {
    return (
      <View style={styles.previewContainer}>
        {photo.path && (
          <Image
            source={{ uri: `file://${photo.path}` }}
            style={styles.previewImage}
          />
        )}
        <View style={styles.previewControls}>
          <TouchableOpacity 
            style={styles.previewButton}
            onPress={() => {
              setPhoto(null);
              setCameraActive(true);
            }}
          >
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.previewButton, styles.previewSaveButton]}
            onPress={() => {
              Alert.alert('Photo Saved', 'Photo has been saved successfully!');
              setPhoto(null);
            }}
          >
            <Text style={styles.previewButtonText}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Default view with modal
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCameraPress}
            >
              <Text style={styles.modalButtonText}>Camera</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleUploadPress}
            >
              <Text style={styles.modalButtonText}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Your existing styles remain the same...
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005EB8',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    borderBottomWidth: 0,
    marginTop: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  // Camera styles
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: 'transparent',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
  },
  captureButtonDisabled: {
    backgroundColor: '#999',
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  flipButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  flashButton: {
    position: 'absolute',
    top: 40,
    right: 30,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Preview screen styles
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  previewControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  previewButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#666',
    width: '45%',
    alignItems: 'center',
  },
  previewSaveButton: {
    backgroundColor: '#005EB8',
  },
  previewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});