import React from "react"
import { View, Text, StyleSheet } from "react-native"

interface weatherProps {
    temp: string,
    tempmin: string,
    tempmax: string,
    dayMonth: string,
    weekDay: string,
}

export default function WeatherDisplay(props: weatherProps) {
    
    // Безопасное округление градусов, полученных от API
    const formatTemp = (value: string) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? '--' : Math.round(parsed);
    };


    return (
        <View style={styles.card}>
            {/* Слева: День недели и Число */}
            <View style={styles.dateContainer}>
                <Text style={styles.weekdayText}>{props.weekDay}</Text>

                <Text style={styles.dayMonthText}>{props.dayMonth}</Text>
            </View>
            
            {/* По центру: Текущая температура */}
            <Text style={styles.currentTemp}>{formatTemp(props.temp)}°C</Text>
            
            {/* Справа: Мин / Макс */}
            <View style={styles.rangeContainer}>
                <Text style={styles.maxTemp}>▲ {formatTemp(props.tempmax)}°</Text>
                <Text style={styles.minTemp}>▼ {formatTemp(props.tempmin)}°</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        width: '75%', // Карточка занимает всю ширину контейнера
        paddingVertical: 12,
        paddingHorizontal: 16,
        margin: 8,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between', 
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dateContainer: {
        width: '25%',
    },
    weekdayText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
        textTransform: 'uppercase',
    },
    dayMonthText: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    currentTemp: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0F172A',
        textAlign: 'center',
        width: '100%',
        margin: 5
    },
    rangeContainer: {
        alignItems: 'flex-end',
        width: '30%',
    },
    maxTemp: {
        fontSize: 12,
        color: '#EF4444', // Красный оттенок для максимальной температуры
        fontWeight: '600',
    },
    minTemp: {
        fontSize: 12,
        color: '#3B82F6', // Синий оттенок для минимальной температуры
        fontWeight: '600',
        marginTop: 2,
    }
})
