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
  Platform,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export default function CameraScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const [flash, setFlash] = useState('off');
  const [isEmulator, setIsEmulator] = useState(false);
  
  const camera = useRef(null);
  
  // Safely handle camera devices - prevent undefined errors
  let devices = null;
  let device = null;
  
  // Move the try-catch inside a useEffect to prevent infinite re-renders
  useEffect(() => {
    try {
      devices = useCameraDevices();
      device = cameraPosition === 'back' ? devices?.back : devices?.front;
    } catch (err) {
      console.log('Camera devices error:', err);
      setIsEmulator(true);
    }
  }, [cameraPosition]);
  
  // Request camera permissions
  useEffect(() => {
    async function checkPermissions() {
      try {
        const cameraPermissionStatus = await Camera.requestCameraPermission();
        setCameraPermission(cameraPermissionStatus === 'granted');
      } catch (err) {
        console.log('Camera permission error:', err);
        setIsEmulator(true);
      }
    }
    
    checkPermissions();
    
    // Also check if running in emulator
    const checkEmulator = async () => {
      if (Platform.OS === 'android') {
        const isEmu = await isEmulatorCheck();
        setIsEmulator(isEmu);
      }
    };
    
    checkEmulator();
  }, []);
  
  // Helper function to detect emulator
  const isEmulatorCheck = async () => {
    if (Platform.OS === 'ios') {
      return false; // iOS simulator detection would go here
    }
    
    try {
      // On Android, we can check various properties
      // This is a simple check that should work for most cases
      return (
        Platform.OS === 'android' && 
        (Build?.FINGERPRINT?.startsWith('generic') ||
         Build?.FINGERPRINT?.startsWith('unknown') ||
         Build?.MODEL?.includes('google_sdk') ||
         Build?.MODEL?.includes('Emulator') ||
         Build?.MODEL?.includes('Android SDK built for x86') ||
         Build?.MANUFACTURER?.includes('Genymotion') ||
         Build?.BRAND?.startsWith('generic') ||
         Build?.DEVICE?.startsWith('generic'))
      );
    } catch (e) {
      return false;
    }
  };

  // Get camera device with proper lifecycle handling
  useEffect(() => {
    let isMounted = true;
    
    const setCameraDevice = async () => {
      try {
        // Wait for devices to be available
        if (!devices) return;
        
        const newDevice = cameraPosition === 'back' ? devices?.back : devices?.front;
        
        if (isMounted && !newDevice) {
          console.log('Camera device not available');
          setIsEmulator(true);
        }
      } catch (err) {
        if (isMounted) {
          console.log('Camera device error:', err);
          setIsEmulator(true);
        }
      }
    };
    
    setCameraDevice();
    
    return () => {
      isMounted = false;
    };
  }, [devices, cameraPosition]);
  
  useFocusEffect(
    useCallback(() => {
      setModalVisible(true);
      return () => setModalVisible(false);
    }, [])
  );

  const handleCameraPress = () => {
    setModalVisible(false);
    setCameraActive(true);
  };

  const handleUploadPress = () => {
    setModalVisible(false);
    Alert.alert('Upload Selected', 'Opening Photo Library...');
  };

  const handleFlipCamera = () => {
    setCameraPosition(prev => prev === 'back' ? 'front' : 'back');
  };

  const takePicture = async () => {
    if (isEmulator) {
      Alert.alert('Emulator Detected', 'Camera is not available in the emulator. This is a mock photo capture.');
      setCameraActive(false);
      return;
    }
    
    if (camera.current && isCameraReady) {
      try {
        const photo = await camera.current.takePhoto({
          flash: flash,
          quality: 85,
          enableShutterSound: false,
        });
        
        setCameraActive(false);
        Alert.alert('Success', 'Photo captured successfully!');
        console.log(`Photo taken: ${photo.path}`);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Camera is not ready');
    }
  };

  // Rest of your component remains the same...
  
  // Render mock camera for emulator
  const renderMockCamera = () => {
    return (
      <View style={[styles.cameraContainer, styles.cameraLoading]}>
        <Text style={styles.loadingText}>
          Camera Preview (Not available in emulator)
        </Text>
        <View style={styles.mockCameraOverlay}>
          <Text style={styles.mockCameraText}>📷</Text>
        </View>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setCameraActive(false)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={takePicture} 
          style={styles.captureButton}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.flipButton} 
          onPress={handleFlipCamera}
        >
          <Text style={styles.flipButtonText}>Flip</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render camera view when active
  if (cameraActive) {
    // If emulator is detected or device is undefined, show mock camera
    if (isEmulator || !device || !cameraPermission) {
      return renderMockCamera();
    }

    return (
      <SafeAreaView style={styles.cameraContainer}>
        <StatusBar hidden />
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={cameraActive}
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
          >
            <View style={styles.captureButtonInner} />
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

  // Default view with modal remains unchanged
  return (
    <View style={styles.container}>
      {/* Modal */}
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
  },
  camera: {
    flex: 1,
  },
  mockCameraOverlay: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  mockCameraText: {
    fontSize: 80,
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
  }
});