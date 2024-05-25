import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [messagesPerSecond, setMessagesPerSecond] = useState(0);
  const [throughputPerSecond, setThroughputPerSecond] = useState(0);

  useEffect(() => {
    // Replace 'ws://your-websocket-url' with your actual WebSocket server URL
    const ws = new WebSocket('ws://192.168.85.110');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (e) => {
      // Assuming the message is a JSON string in the format:
      // { "messagesPerSecond": 10, "throughputPerSecond": 500 }
      const data = JSON.parse(e.data);
      setMessagesPerSecond(data.messagesPerSecond);
      setThroughputPerSecond(data.throughputPerSecond);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error', e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket connection closed', e.code, e.reason);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <Text style={styles.label}>Messages per Second:</Text>
        <Text style={styles.value}>{messagesPerSecond}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.label}>Throughput per Second (bytes):</Text>
        <Text style={styles.value}>{throughputPerSecond}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  statContainer: {
    margin: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 24,
  },
});
