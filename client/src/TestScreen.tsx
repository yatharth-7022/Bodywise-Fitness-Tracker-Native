import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
      <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>Test Screen</Text>
      <Button title="Press me" onPress={() => alert('Button pressed!')} />
    </View>
  );
}