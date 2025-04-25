import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { colors } from '../utils/colors';

const sampleImages = [
  { image: require('../assets/logo.png'), title: 'Track Your Skin Health' },
  { image: require('../assets/logo.png'), title: 'Analyze Skin Conditions' },
  { image: require('../assets/logo.png'), title: 'Get Instant Results' },
];

export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sampleImages.length); 
      flatListRef.current?.scrollToIndex({ index: (activeIndex + 1) % sampleImages.length, animated: true });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Personal MediSkin App</Text>
      <FlatList
        ref={flatListRef}
        data={sampleImages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.title}</Text>
          </View>
        )}
      />
      <View style={styles.dotsContainer}>
        {sampleImages.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
        ))}
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About App</Text>
        <View style={styles.aboutBox}>
          <Text style={styles.aboutText}>
            Our App Helps You Detect and Analyze Skin Conditions Instantly!
          </Text>
        </View>
        <Text style={styles.aboutDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.secondaryLight, paddingHorizontal: 20, paddingTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginVertical: 20, textAlign: 'center' },
  carouselItem: {
    width: 200,
    height: 150,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  carouselImage: { width: 50, height: 50, tintColor: colors.primary },
  carouselText: { marginTop: 10, textAlign: 'center', fontSize: 14, color: colors.primaryDark, paddingHorizontal: 10 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 20 },
  dot: { width: 10, height: 10, backgroundColor: colors.secondary, borderRadius: 5, marginHorizontal: 5 },
  activeDot: { backgroundColor: colors.primary },
  aboutContainer: { backgroundColor: colors.secondary, padding: 20, borderRadius: 10 },
  aboutTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginBottom: 10, textAlign: 'center' },
  aboutBox: { backgroundColor: colors.white, padding: 15, borderRadius: 10, alignItems: 'center', elevation: 2 },
  aboutText: { fontSize: 14, color: colors.primaryDark, textAlign: 'center', paddingHorizontal: 10 },
  aboutDescription: { fontSize: 14, color: colors.primaryDark, marginTop: 10, textAlign: 'center', paddingHorizontal: 10 },
  readMoreButton: { backgroundColor: colors.white, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, alignSelf: 'center', marginTop: 10, elevation: 2 },
  readMoreText: { color: colors.primary, fontWeight: 'bold' },
});