// components/Dashboard/MonthlyVolumeChart.tsx
import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export const MonthlyVolumeChart = () => {
  const screenWidth = Dimensions.get('window').width - 50;

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [450, 680, 820, 750],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#202020',
    backgroundGradientTo: '#202020',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: () => '#9ca3af',
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#3b82f6',
    },
  };

  return (
    <View className="mt-2">
      <LineChart
        data={data}
        width={screenWidth}
        height={180}
        chartConfig={chartConfig}
        bezier
        withHorizontalLines={false}
        withVerticalLines={false}
        style={{ borderRadius: 8 }}
      />
    </View>
  );
};