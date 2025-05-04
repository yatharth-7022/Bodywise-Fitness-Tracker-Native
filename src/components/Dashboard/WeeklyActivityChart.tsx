// components/Dashboard/WeeklyActivityChart.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export const WeeklyActivityChart = () => {
  const screenWidth = Dimensions.get('window').width - 50;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [2.5, 1.8, 0, 1.2, 1.9, 1.0, 2.3],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#202020',
    backgroundGradientTo: '#202020',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: () => '#9ca3af',
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.7,
  };

  return (
    <View className="mt-2">
      <BarChart
        data={data}
        width={screenWidth}
        height={180}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        withHorizontalLabels={true}
        showValuesOnTopOfBars={false}
        withInnerLines={false}
        fromZero={true}
        yAxisSuffix="h"
        yAxisLabel=""
        style={{ borderRadius: 8 }}
      />
    </View>
  );
};