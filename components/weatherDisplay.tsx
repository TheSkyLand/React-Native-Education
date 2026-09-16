import { View } from "react-native"

interface weatherProps {
temp: string,
tempmin: string,
tempmax: string,
day: string
}

export default function WeatherDisplay(props: weatherProps) {


    return (
        <View>
            <View
                style={{
                    borderColor: "black",
                    borderWidth: 1,
                    width: 150,
                    height: 150,
                    margin: 25

                }}
            >
                <View>{props.day}</View>
                <View>температура {props.temp}</View>
                <View>мин. температура {props.tempmin}</View>
                <View>макс. температура {props.tempmax}</View>
            </View>
        </View>
    )
}
