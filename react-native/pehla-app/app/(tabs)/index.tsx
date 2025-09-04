import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect runs a function when the component loads.
  // The empty array [] means it will only run once.
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://dev.to/api/articles?per_page=20'
        );
        const data = await response.json();
        setArticles(data);
      } catch (e) {
        setError('Failed to fetch articles.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Show a loading spinner while fetching data
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Show an error message if fetching failed
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // --- RENDER A SINGLE ARTICLE CARD ---
  const renderArticle = ({ item }) => (
    // We'll eventually create an article detail page.
    // For now, this Pressable doesn't navigate anywhere.
    <Pressable style={styles.card}>
      {item.cover_image && (
        <Image source={{ uri: item.cover_image }} style={styles.cardImage} />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardUser}>{item.user.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardUser: {
    fontSize: 14,
    color: '#666',
  },
});

