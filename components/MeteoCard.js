import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const MeteoCard = ({ name, temp, description, icon, date }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.cityText}>Ville: {name}</Text>
        {date && <Text style={styles.tempText}>Date: {date}</Text>}
        <Text style={styles.tempText}>Température: {(temp - 273.15).toFixed(2)}°C</Text>
        <Text style={styles.descText}>Description: {description}</Text>
      </View>
      <Image
        source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#BDF3FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
  tempText: {
    fontSize: 16,
    marginBottom: 5,
  },
  descText: {
    fontSize: 14,
    color: '#555',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default MeteoCard;
