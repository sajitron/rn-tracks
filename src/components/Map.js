import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const Map = () => {
	let points = [];
	for (let index = 0; index < 20; index++) {
		if (index % 2 === 0) {
			points.push({
				latitude: 14.712088 + index * 0.001,
				longitude: -17.4686276 + index * 0.001
			});
		} else {
			points.push({
				latitude: 14.712088 - index * 0.002,
				longitude: -17.4686276 + index * 0.001
			});
		}
	}
	return (
		<MapView
			style={styles.map}
			initialRegion={{
				latitude: 14.712088,
				longitude: -17.4686276,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01
			}}
		>
			<Polyline coordinates={points} />
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		height: 300
	}
});

export default Map;
