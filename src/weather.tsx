import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native"
import Geolocation from '@react-native-community/geolocation'
import { WeatherDto } from "./types/weather.types"
import WeatherDisplay from "@/components/weatherDisplay"

const Weather = () => {
    const [data, setData] = useState<WeatherDto[]>();
    const [longitude, setLongitude] = useState<string>('')
    const [latitude, setLatitude] = useState<string>('')

    const date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    const getWeekDay = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('ru-RU', { weekday: 'short' });
    };

    const getDayMonth = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    };

    const getTodayName = () => {
        return new Date().toLocaleDateString('ru-RU', { weekday: 'long' });
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(
            info => {
                setLatitude(info.coords.latitude.toFixed(2))
                setLongitude(info.coords.longitude.toFixed(2))
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }, [longitude, latitude]);

    useEffect(() => {
        if (!latitude || !longitude) return;
        
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=DHXP8CNS8H8472KJ5UTXHGVEL`,
            { method: 'GET' }
        )
            .then(response => response.json())
            .then(response => {
                setData(response.days)
            })
            .catch(async errorResponse => {
                if (errorResponse.text) {
                    const errorMessage = await errorResponse.text();
                    console.error('Error message:', errorMessage);
                } else {
                    console.error('Error occurred:', errorResponse);
                }
            })
    }, [longitude, latitude]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* БЛОК: СЕГОДНЯ */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Погода на сегодня ({getTodayName()})</Text>
                    <View style={styles.todayContainer}>
                        {data?.filter(item => item.datetime === currentDate)
                            .map((item, index) => (
                                <WeatherDisplay
                                    key={index}
                                    dayMonth={getDayMonth(item.datetime)}
                                    weekDay={getWeekDay(item.datetime)}  
                                    temp={item.temp}
                                    tempmin={item.tempmin}
                                    tempmax={item.tempmax}
                                />
                            ))
                        }
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Погода на неделю</Text>
                    <View style={styles.weekContainer}>
                        {data?.slice(0, 7).map((item, key) => (
                            <WeatherDisplay
                                key={key}
                                dayMonth={getDayMonth(item.datetime)}
                                weekDay={getWeekDay(item.datetime)}  
                                temp={item.temp}
                                tempmin={item.tempmin}
                                tempmax={item.tempmax}
                            />
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    scrollContent: { padding: 16 },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1C1E', marginBottom: 12 },
    todayContainer: { width: '100%' },
    weekContainer: { flexDirection: 'column' }
})

export default Weather
