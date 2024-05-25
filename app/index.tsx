import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
export default function App() {
  const [messagesPerSecond, setMessagesPerSecond] = useState(0);
  const [throughputPerSecond, setThroughputPerSecond] = useState(0);



  useEffect(() => {
    const ws = new WebSocket('ws://192.168.85.110:8765');


    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.messages != undefined || data.troughput != undefined) {
        setMessagesPerSecond(data.messages);
        setThroughputPerSecond(data.troughput);
      }
      return;
     
    };

    ws.onerror = (e) => {
      console.error('WebSocket error');
    };

    ws.onclose = (e) => {
      console.log('WebSocket connection closed', e.code, e.reason);
    };

    return () => {
      ws.close();
    };
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <Text style={styles.value}>{throughputPerSecond < 1000 ? throughputPerSecond : Math.round(throughputPerSecond/1000 * 100) / 100} {throughputPerSecond < 1000 ? "B/s" : "kB/s"}</Text>
        <Text style={styles.label}>DATOVÝ PRŮTOK </Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.value}>{messagesPerSecond}</Text>
        <Text style={styles.label}>POČET ZPRÁV ZA VTEŘINU</Text>
      </View>
      <Image source={require('../assets/images/portabo-icon-01.png')} style={styles.icon} />
    </View>
  );

}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    bottom: -60,
    right: -150,
    width: 400,
    height: 400,
    opacity: 0.4
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  statContainer: {
    margin: 20,
    alignItems: 'center',
    
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 64,
    color: '#054FD2',
    paddingTop: 30,
  },
  metric: {
    fontSize: 64,
    color: 'rgb(238,42,92)',
  },
});
