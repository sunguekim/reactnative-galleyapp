import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, processColor } from 'react-native';

import { PieChart } from 'react-native-charts-wrapper'

import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';



const ChartScreen = () => {
    const state = useSelector((state: RootState) => state.gallery)
    const [catergoryData, setCdata] = useState({});
    const [timeData, setTdata] = useState({});
    const categoryConfig = {
        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
        valueTextSize: 20,
        valueTextColor: processColor('green'),
        sliceSpace: 5,
        selectionShift: 13,
        // xValuePosition: "OUTSIDE_SLICE",
        // yValuePosition: "OUTSIDE_SLICE",
        valueFormatter: "#.#'%'",
        valueLineColor: processColor('green'),
        valueLinePart1Length: 0.5
    }

    const timeConfig = {
        colors: [processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
        valueTextSize: 20,
        valueTextColor: processColor('green'),
        sliceSpace: 3,
        selectionShift: 13,
        // xValuePosition: "OUTSIDE_SLICE",
        // yValuePosition: "OUTSIDE_SLICE",
        valueFormatter: "#.#'%'",
        valueLineColor: processColor('green'),
        valueLinePart1Length: 0.5
    }

    function groupBy(objectArray: any[], property: string) {
        return objectArray.reduce(function (acc: { [x: string]: any[]; }, obj: { [x: string]: any; }) {
            let key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }



    useEffect(() => {
        const category = groupBy(state.images, 'category')
        const time = groupBy(state.images, 'time')
        const categoryArray = []
        const timeArray = []


        for (const key in category) {
            categoryArray.push({ value: category[key].length, label: key })
        }

        for (const key in time) {
            timeArray.push({ value: time[key].length, label: key })
        }
        console.log(categoryArray)
        setCdata({ dataSets: [{ values: categoryArray, label: '카테고리 통계', config: categoryConfig }] });
        setTdata({ dataSets: [{ values: timeArray, label: '시간 통계', config: timeConfig }] });
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <PieChart
                    style={styles.chart}
                    legend={{
                        enabled: true,
                        textSize: 12,
                        form: 'CIRCLE',
                        horizontalAlignment: "RIGHT",
                        verticalAlignment: "CENTER",
                        orientation: "VERTICAL",
                        wordWrapEnabled: true
                    }}
                    data={catergoryData}
                    usePercentValues={true}
                />

                <PieChart
                    style={styles.chart}
                    legend={{
                        enabled: true,
                        textSize: 12,
                        form: 'CIRCLE',
                        horizontalAlignment: "RIGHT",
                        verticalAlignment: "CENTER",
                        orientation: "VERTICAL",
                        wordWrapEnabled: true
                    }}
                    usePercentValues={true}
                    data={timeData}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});

export default ChartScreen;
