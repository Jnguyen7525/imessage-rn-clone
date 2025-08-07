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
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import {
  View,
  useWindowDimensions,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { colors } from 'theme/color';
import { messagesArray, conversationMessages, MessageType } from 'utils/messages';
import { Message } from 'components/Message';
import { ConversationMessage } from 'components/ConversationMessage';
import { router, Slot } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Header } from 'components/Header';
import { AudioLines, Plus } from 'lucide-react-native';
import { useConversationStore } from 'store/useConversationStore';

export default function Layout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  // const { id } = useLocalSearchParams();
  const { id } = useGlobalSearchParams();

  const setSelectedConversation = useConversationStore((state) => state.setSelectedConversation);
  const selectedConversation = useConversationStore((state) => state.selectedConversation);

  const showOptions = useConversationStore((state) => state.showOptions);

  React.useEffect(() => {
    console.log('Selected conversation:', selectedConversation);
  }, [selectedConversation]);

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
    const selected = messagesArray.find((msg) => msg.id === id);
    setSelectedConversation(selected);
    router.push(`/message/${id}`);
  };

  if (!isLargeScreen) {
    // return <Slot />; // Mobile: let routing work normally
    return (
      <>
        <StatusBar style="light" />
        <Stack />
      </>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#09090b',
        position: 'relative',
      }}>
      {/* 🔝 Header */}
      <Header
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearch}
        searchValue={search}
      />
      {showOptions && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              /* View Contact */
            }}>
            <Text style={styles.optionText}>View Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              /* Mute Conversation */
            }}>
            <Text style={styles.optionText}>Mute</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              /* Block User */
            }}>
            <Text style={styles.optionText}>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              /* Delete Conversation */
            }}>
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 🧱 Split layout below */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Sidebar / Inbox */}
        <View
          style={{
            width: 350,
            borderRightWidth: 1,
            borderColor: '#27272a',
            paddingVertical: 36,
            paddingHorizontal: 30,
            gap: 24,
          }}>
          {messagesArray.map((msg) => (
            <Message key={msg.id} data={msg} onPress={() => handleSelectMessage(msg.id)} />
          ))}
        </View>
        {/* Conversation Thread */}
        <View style={{ flex: 1, paddingVertical: 36, paddingHorizontal: 30 }}>
          {selectedConversation ? (
            <>
              {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#fff' }}>
                {selectedConversation.name}
              </Text> */}
              {conversationMessages.map((msg) => (
                <ConversationMessage key={msg.id} data={msg} />
              ))}

              <View style={styles.inputWrapper}>
                <View style={styles.inputRow}>
                  {/* Audio icon (left) */}
                  <TouchableOpacity style={styles.iconButton}>
                    <Plus size={24} color={'#851de0'} />
                  </TouchableOpacity>

                  {/* Input field (center) */}
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor={colors.zinc[400]}
                      placeholder="Message"
                    />
                    {/* Plus icon (right) */}
                    <TouchableOpacity style={styles.audioIcon}>
                      <AudioLines size={24} color={'#851de0'} />
                    </TouchableOpacity>
                  </View>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: '100%',
    backgroundColor: colors.zinc[50],
    marginTop: 24,
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    // paddingBottom: 0,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 32,
    height: 32,
    backgroundColor: '#09090b',
    position: 'relative',
  },

  input: {
    flex: 1,
    // color: 'colors.zinc[900]',
    paddingHorizontal: 12,
    marginVertical: 0,
    height: '100%',
    width: '100%',
    borderRadius: 32,
  },

  iconButton: {
    padding: 4,
  },

  dropdown: {
    position: 'absolute',
    top: 60, // adjust based on header height
    right: 16,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingVertical: 8,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 180,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },

  audioIcon: {
    position: 'absolute',
    right: 8, // fine-tune spacing from the edge
    top: '50%',
    transform: [{ translateY: -12 }], // vertically center based on your icon size
    zIndex: 999,
  },
});
