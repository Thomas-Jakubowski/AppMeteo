import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MeteoCard from './components/MeteoCard';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {

  const [location, setLocation] = useState(null);
  const [actualWeather, setActualWeather] = useState(null);
  const [weatherOfTheWeek, setWeatherOfTheWeek] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocation(await Location.getCurrentPositionAsync({}));
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (location !== null) {
        getWeather(location.coords.latitude, location.coords.longitude);
        getWeatherOfTheWeek(location.coords.latitude, location.coords.longitude);
      }
    })();
  }, [location]);

  const getWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: '14287f522b285ef2bc470ce7f2c02f90',
        },
      });
      setActualWeather(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const getWeatherOfTheWeek = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: '14287f522b285ef2bc470ce7f2c02f90',
        },
      });
      setWeatherOfTheWeek(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Temps Actuel</Text>
      </View>

      <View style={styles.currentWeatherContainer}>
        {actualWeather != null ? (
          <MeteoCard
            name={actualWeather.name}
            temp={actualWeather.main.temp}
            description={actualWeather.weather[0].description}
            icon={actualWeather.weather[0].icon}
          />
        ) : (
          <Text style={styles.noDataText}>No Data Found</Text>
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Prévisions toutes les 3h</Text>
      </View>

      <View style={styles.weekForecastContainer}>
        {weatherOfTheWeek !== null ? (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {weatherOfTheWeek.list.map((weather, index) => (
              <View style={styles.cardWrapper} key={index}>
                <MeteoCard
                  name={actualWeather.name}
                  temp={weather.main.temp}
                  description={weather.weather[0].description}
                  icon={weather.weather[0].icon}
                  date={weather.dt_txt}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.noDataText}>Aucune donnée météo disponible</Text>
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  currentWeatherContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },

  weekForecastContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  
  scrollContainer: {
    flexDirection: 'row',
    paddingVertical: 10, 
  },
  
  cardWrapper: {
    marginRight: 15,
  },

  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});
