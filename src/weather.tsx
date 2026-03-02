import React, { useState } from "react"
import { View, Text, Image } from "react-native"
import { useEffect } from "react"
import Geolocation from '@react-native-community/geolocation'
import { WeatherDto } from "./types/weather.types"

const Weather = () => {
    const [data, setData] = useState<WeatherDto[]>();
    const [longitude, setLongitude] = useState<string>('37')
    const [latitude, setLatitude] = useState<string>('54')

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const getDayOfWeek = (date = new Date()) => {
        const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        return days[date.getDay()];
    };

    Geolocation.getCurrentPosition(
        info => {
            setLatitude(info.coords.latitude.toFixed(2))
            setLongitude(info.coords.longitude.toFixed(2))

            console.log(info.coords.latitude.toFixed(2))
            console.log(info.coords.longitude.toFixed(2))
        })

    useEffect(() => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${longitude},${latitude}?key=DHXP8CNS8H8472KJ5UTXHGVEL`,
            {
                method: 'GET'
            }
        )
            .then(response => response.json())
            .then(response => {
                console.log(response.days)
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
    }), [longitude, latitude];



    return (
        <View>
            <View>Погода на {getDayOfWeek()}:</View>
            {data?.map((item, key) => (
                <View
                style={{
                    borderColor: "black",
                    borderWidth: 1
                }}
                >
                    <View>температура {item.temp}</View>
                    <View>мин. температура {item.tempmin}</View>
                    <View>макс. температура {item.tempmax}</View>
                </View>
            ))}

            


        </View>

    )
}


export default Weather