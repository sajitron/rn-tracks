import React, { useContext } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';

const TrackForm = () => {
	const { state: { name, recording, locations }, startRecording, stopRecording, changeName } = useContext(
		LocationContext
	);
	return (
		<View>
			<Spacer>
				<Input value={name} onChangeText={changeName} placeholder="Enter name" />
			</Spacer>
			{recording ? (
				<Button title="Stop" onPress={stopRecording} />
			) : (
				<Button title="Start Recording" onPress={startRecording} />
			)}
		</View>
	);
};

export default TrackForm;
