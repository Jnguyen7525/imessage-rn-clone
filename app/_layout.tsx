// // import { colors } from '@/theme/colors';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { colors } from 'theme/color';
// import '../global.css';
// import { Text } from 'react-native';
// // import { verifyInstallation } from 'nativewind';

// export default function Layout() {
//   // verifyInstallation(); // Call this inside a component
//   return (
//     <>
//       <StatusBar backgroundColor={colors.zinc['100']} style="dark" />
//       <Stack />
//     </>
//   );
// }

// import { useLocalSearchParams, Slot } from 'expo-router';
// import { View, Text, useWindowDimensions } from 'react-native';
// import { colors } from 'theme/color';

// export default function Layout() {
//   const { width } = useWindowDimensions();
//   const isLargeScreen = width >= 768;

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: isLargeScreen ? 'row' : 'column',
//         backgroundColor: colors.zinc[100],
//       }}>
//       <Slot /> {/* This will render index.tsx OR [id].tsx depending on screen */}
//     </View>
//   );
// }

// app/(main)/_layout.tsx
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  useWindowDimensions,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from 'theme/color';
import { messagesArray, conversationMessages } from 'utils/messages';
import { Message } from 'components/Message';
import { ConversationMessage } from 'components/ConversationMessage';
import { router, Slot } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Header } from 'components/Header';
import { AudioLines, Plus } from 'lucide-react-native';

export default function Layout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { id } = useLocalSearchParams();
  const selectedConversation = messagesArray.find((msg) => msg.id === id);

  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState(messagesArray);

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const handleSearch = () => {
    setMessages(
      messagesArray.filter(
        (message) =>
          message.name.toLowerCase().includes(search.toLowerCase()) ||
          message.message.toLowerCase().includes(search.toLowerCase())
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

  if (!isLargeScreen) {
    // return <Slot />; // Mobile: let routing work normally
    return (
      <>
        <StatusBar backgroundColor={'#09090b'} style="dark" />
        <Stack />
      </>
    );
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#09090b' }}>
      {/* 🔝 Header */}
      <Header
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearch}
        searchValue={search}
      />

      {/* 🧱 Split layout below */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Sidebar / Inbox */}
        <View
          style={{
            width: 320,
            borderRightWidth: 1,
            borderColor: '#a1a1aa',
            padding: 16,
            gap: 12,
          }}>
          {messagesArray.map((msg) => (
            <Message key={msg.id} data={msg} onPress={() => router.replace(`/message/${msg.id}`)} />
          ))}
        </View>
        {/* Conversation Thread */}
        <View style={{ flex: 1, padding: 16 }}>
          {selectedConversation ? (
            <>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                {selectedConversation.name}
              </Text>
              {conversationMessages.map((msg) => (
                <ConversationMessage key={msg.id} data={msg} />
              ))}

              {/* <View style={styles.inputWrapper}>
                <Plus size={24} color={colors.zinc['600']}/>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor={colors.zinc[400]}
                    placeholder="To: company name"
                  />
                  <TouchableOpacity style={styles.iconContainer}>
                    <AudioLines size={24} color={colors.zinc['600']} />
                  </TouchableOpacity>
                </View>
              </View> */}
              <View style={styles.inputWrapper}>
                <View style={styles.inputRow}>
                  {/* Audio icon (left) */}
                  <TouchableOpacity style={styles.iconButton}>
                    {' '}
                    <Plus size={24} color={colors.zinc['600']} />
                  </TouchableOpacity>

                  {/* Input field (center) */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={colors.zinc[400]}
                      placeholder="To: company name"
                    />
                  </View>

                  {/* Plus icon (right) */}
                  <TouchableOpacity style={styles.iconButton}>
                    <AudioLines size={24} color={colors.zinc['600']} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: colors.zinc[600], fontSize: 16 }}>
                Please select a conversation
              </Text>
            </View>
          )}
        </View>{' '}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    backgroundColor: colors.zinc[50],
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.zinc[300],
    borderRadius: 32,
    paddingHorizontal: 16,
    height: 32,
    backgroundColor: colors.zinc[100],
  },

  input: {
    flex: 1,
    color: colors.zinc[900],
    paddingVertical: 0,
    marginVertical: 0,
  },

  iconButton: {
    padding: 4,
  },
});
