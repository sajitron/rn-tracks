import React, { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
	const [ err, setErr ] = useState(null);

	useEffect(
		() => {
			let subscriber;
			//* helper functions called within useEffect should be defined within the useEffect
			const startWatching = async () => {
				try {
					await requestPermissionsAsync();
					subscriber = await watchPositionAsync(
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
			if (shouldTrack) {
				startWatching();
			} else {
				if (subscriber) {
					subscriber.remove();
				}
				subscriber = null;
			}

			//* stop litening to updates from user's location
			return () => {
				if (subscriber) {
					subscriber.remove();
				}
			};
		},
		[ shouldTrack, callback ]
	);

	return [ err ];
};
