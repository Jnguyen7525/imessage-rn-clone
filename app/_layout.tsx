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
import { View, useWindowDimensions, Text } from 'react-native';
import { colors } from 'theme/color';
import { messagesArray, conversationMessages } from 'utils/messages';
import { Message } from 'components/Message';
import { ConversationMessage } from 'components/ConversationMessage';
import { router, Slot } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Header } from 'components/Header';

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
        <StatusBar backgroundColor={colors.zinc['100']} style="dark" />
        <Stack />
      </>
    );
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: colors.zinc[100] }}>
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
            borderColor: colors.zinc[300],
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
