import React, { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (callback) => {
	const [ err, setErr ] = useState(null);

	useEffect(() => {
		startWatching();
	}, []);

	const startWatching = async () => {
		try {
			await requestPermissionsAsync();
			await watchPositionAsync(
				{
					accuracy: Accuracy.BestForNavigation,
					timeInterval: 1000,
					distanceInterval: 10
				},
				// (location) => {
				// 	addLocation(location);
				// }
				callback
			);
		} catch (error) {
			setErr(error);
		}
	};

	return [ err ];
};
