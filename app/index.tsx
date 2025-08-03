// import { Message } from '@/components/Message';
// import { colors } from '@/theme/colors';
// import { messagesArray } from '@/utils/messages';
import { Message } from 'components/Message';
import Constants from 'expo-constants';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'theme/color';
import { messagesArray } from 'utils/messages';
import '../global.css';

export default function Home() {
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState(messagesArray);

  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

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

  const handleSelectMessage = (id: string) => {
    if (isLargeScreen) {
      router.replace(`/message/${id}`);
    } else {
      router.push(`/message/${id}`);
    }
  };

  return (
    // <>
    //   <Stack.Screen
    //     options={{
    //       title: 'Messages',
    //       headerLargeTitle: true,
    //       headerSearchBarOptions: {
    //         hideWhenScrolling: true,
    //         placeholder: 'Pesquisar',
    //         hideNavigationBar: true,
    //         obscureBackground: true,
    //         onSearchButtonPress: ({ nativeEvent }) => {
    //           handleSearchChange(nativeEvent.text);
    //           handleSearch();
    //         },
    //       },
    //     }}
    //   />
    //   <SafeAreaView style={styles.container}>
    //     <StatusBar style="dark" backgroundColor={colors.zinc[100]} />

    //     <FlatList
    //       data={messages}
    //       style={{ flex: 1 }}
    //       contentContainerStyle={styles.messageContainer}
    //       renderItem={({ item }) => {
    //         return <Message key={item.id} data={item} />;
    //       }}
    //     />
    //   </SafeAreaView>
    // </>
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#a1a1aa',
          title: 'Messages',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            placeholder: 'Search...',
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
        <StatusBar style="dark" backgroundColor={'#09090b'} />

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={styles.messageContainer}
          renderItem={({ item }) => (
            <Message data={item} onPress={() => handleSelectMessage(item.id)} />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    paddingTop: 20,
  },

  messageContainer: {
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
    // paddingTop: Constants.statusBarHeight * 2,
    // paddingBottom: 44,
  },
});
