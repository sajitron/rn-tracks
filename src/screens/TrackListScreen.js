import React, { useContext } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

// * navigation events helps us to note when we have navigated to a screen
const TrackListScreen = ({ navigation }) => {
	const { state, fetchTracks } = useContext(TrackContext);
	return (
		<View>
			<NavigationEvents onWillFocus={fetchTracks} />
			<Text>Track List Screen</Text>
			<FlatList
				data={state}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
							<ListItem chevron title={item.name} />
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default TrackListScreen;
