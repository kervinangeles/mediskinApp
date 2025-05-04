import { Platform } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Request camera permission using Vision Camera's built-in method
export const requestCameraPermission = async () => {
  try {
    const permission = await Camera.requestCameraPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Failed to request camera permission:', error);
    return false;
  }
};

// Request microphone permission
export const requestMicrophonePermission = async () => {
  try {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.MICROPHONE 
      : PERMISSIONS.ANDROID.RECORD_AUDIO;
    
    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (error) {
    console.error('Failed to request microphone permission:', error);
    return false;
  }
};

// Request storage permissions for saving photos
export const requestStoragePermission = async () => {
  try {
    if (Platform.OS === 'android') {
      // For Android, request the appropriate permissions based on SDK version
      const permissions = Platform.Version >= 33
        ? [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, PERMISSIONS.ANDROID.READ_MEDIA_VIDEO]
        : [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];
      
      const results = await Promise.all(permissions.map(perm => request(perm)));
      return results.every(result => result === RESULTS.GRANTED);
    } else {
      // For iOS, photo library permissions
      const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return result === RESULTS.GRANTED;
    }
  } catch (error) {
    console.error('Failed to request storage permission:', error);
    return false;
  }
};

// Request all required camera-related permissions at once
export const requestAllCameraPermissions = async () => {
  const cameraGranted = await requestCameraPermission();
  const microphoneGranted = await requestMicrophonePermission();
  const storageGranted = await requestStoragePermission();
  
  return {
    cameraGranted,
    microphoneGranted,
    storageGranted,
    allGranted: cameraGranted && microphoneGranted && storageGranted
  };
};

// Check if camera permission is already granted
export const checkCameraPermission = async () => {
  try {
    const status = await Camera.getCameraPermissionStatus();
    return status === 'granted';
  } catch (error) {
    console.error('Failed to check camera permission:', error);
    return false;
  }
};