// import { Message } from '@/components/Message';
// import { colors } from '@/theme/colors';
// import { messagesArray } from '@/utils/messages';
import { Message } from 'components/Message';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'theme/color';
import { messagesArray } from 'utils/messages';
import '../global.css';

export default function Home() {
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState(messagesArray);

  const statusBarHeight = Constants.statusBarHeight;

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const handleSearch = () => {
    setMessages(
      messagesArray.filter(
        (message) => message.name.includes(search) || message.message.includes(search)
      )
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Messages',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            placeholder: 'Pesquisar',
            hideNavigationBar: true,
            obscureBackground: true,
            onSearchButtonPress: ({ nativeEvent }) => {
              handleSearchChange(nativeEvent.text);
              handleSearch();
            },
          },
        }}
      />
      <SafeAreaView style={styles.container}>
        {/* {Platform.OS === 'android' && (
          <View style={{ height: Constants.statusBarHeight, backgroundColor: colors.zinc[100] }} />
        )} */}

        <StatusBar style="dark" backgroundColor={colors.zinc[100]} />
        {/* <StatusBar style="dark" translucent /> */}

        <FlatList
          data={messages}
          style={{ flex: 1 }}
          contentContainerStyle={styles.messageContainer}
          renderItem={({ item }) => {
            return <Message key={item.id} data={item} />;
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.zinc[100],
  },

  messageContainer: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
    // paddingTop: Constants.statusBarHeight * 2,
    // paddingBottom: 44,
  },
});
