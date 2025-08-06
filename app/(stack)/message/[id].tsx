// // import { ConversationMessage } from '@/components/ConversationMessage';
// // import { colors } from '@/theme/colors';
// // import { conversationMessages, messagesArray } from '@/utils/messages';
// import { ConversationMessage } from 'components/ConversationMessage';
// import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
// import { AudioLines } from 'lucide-react-native';
// import {
//   FlatList,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { colors } from 'theme/color';
// import { conversationMessages, messagesArray } from 'utils/messages';

// export default function Home() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();
//   const userData = messagesArray.find((item) => item.id === id);

//   const handleBack = () => {
//     router.back();
//   };

//   if (!userData) {
//     handleBack();
//   }

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           headerBackTitle: userData?.name,
//           headerTitle() {
//             return (
//               <View style={styles.headerUserInfo}>
//                 <Image style={styles.headerUserAvatar} source={userData?.avatar} />
//                 <Text style={styles.headerUserName}>{userData?.name}</Text>
//               </View>
//             );
//           },
//         }}
//       />
//       <KeyboardAvoidingView
//         behavior="padding"
//         style={{ flex: 1 }}
//         enabled={Platform.OS === 'ios'}
//         keyboardVerticalOffset={80}>
//         <View style={styles.container}>
//           <FlatList
//             data={conversationMessages}
//             keyExtractor={(item) => String(item.id)}
//             renderItem={({ item }) => {
//               return <ConversationMessage data={item} />;
//             }}
//             contentContainerStyle={{
//               padding: 16,
//               gap: 10,
//             }}
//           />

//           <View style={styles.inputWrapper}>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholderTextColor={colors.zinc[400]}
//                 placeholder="To: company name"
//               />
//               <TouchableOpacity style={styles.iconContainer}>
//                 <AudioLines size={24} color={colors.zinc['600']} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.zinc[100],
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: colors.zinc['200'],
//     padding: 16,
//     paddingTop: 46,
//   },
//   headerBackButton: {
//     width: 40,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 40,
//   },
//   headerUserInfo: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   headerUserAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 40,
//     resizeMode: 'cover',
//   },
//   headerUserName: {
//     fontSize: 11,
//     lineHeight: 13,
//     color: colors.zinc['800'],
//   },

//   inputWrapper: {
//     width: '100%',
//     backgroundColor: colors.zinc[50],
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },

//   inputContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     height: 32,
//     borderWidth: 1,
//     borderColor: colors.zinc[300],
//     borderRadius: 32,
//     padding: 8,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   input: {
//     flex: 1,
//     color: colors.zinc[900], // or something visible
//     // fontSize: 14,
//     paddingVertical: 0,
//   },
//   iconContainer: {},
// });

// app/(main)/message/[id].tsx
import { ConversationMessage } from 'components/ConversationMessage';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AudioLines, Ellipsis, Phone, Plus, Search, Video, X } from 'lucide-react-native';
import { colors } from 'theme/color';
import { conversationMessages, messagesArray } from 'utils/messages';
import { Stack } from 'expo-router';
import { useConversationStore } from 'store/useConversationStore';
import React from 'react';

export default function MessageThreadScreen() {
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const userData = messagesArray.find((item) => item.id === id);

  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const toggleShowOptions = useConversationStore((state) => state.toggleShowOptions);
  const showOptions = useConversationStore((state) => state.showOptions);

  // ✨ Fallback for large screens with no selection
  if (isLargeScreen && !id) {
    return (
      <View style={styles.blankState}>
        <Text style={styles.blankStateText}>Please select a conversation</Text>
      </View>
    );
  }

  // 🚫 Fallback for mobile (redirect back if invalid)
  if (!userData && !isLargeScreen) {
    return (
      <View style={styles.blankState}>
        <Text style={styles.blankStateText}>Conversation not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            // backgroundColor: '#09090b',
            backgroundColor: 'rgba(60, 60, 65, 0.3)',
          },
          headerTintColor: '#007AFF',
          headerShown: showSearchBar ? false : true,
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'systemUltraThinMaterialDark',
          title: '',
          headerBackTitle: userData?.name,
          headerTitleAlign: 'center',
          headerTitle() {
            return (
              <View style={styles.headerUserInfo}>
                <Image style={styles.headerUserAvatar} source={userData?.avatar} />
                <Text style={styles.headerUserName}>{userData?.name}</Text>
              </View>
            );
          },
          headerRight() {
            return (
              <View style={styles.headerIconsRight}>
                <TouchableOpacity>
                  <Phone size={24} color={colors.zinc['600']} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Video size={24} color={colors.zinc['600']} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Search
                    size={24}
                    color={colors.zinc['600']}
                    onPress={() => setShowSearchBar(true)}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleShowOptions}>
                  <Ellipsis size={24} color={colors.zinc['600']} />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />

      {showSearchBar && (
        <View style={styles.searchBarContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search..."
              placeholderTextColor={colors.zinc[500]}
              style={styles.searchInput}
            />
            <TouchableOpacity
              onPress={() => {
                setShowSearchBar(false);
                setSearchText('');
              }}>
              <X size={20} color={colors.zinc['600']} />
            </TouchableOpacity>
          </View>
        </View>
      )}

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

      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={80}>
        <FlatList
          data={conversationMessages}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ConversationMessage data={item} />}
          contentContainerStyle={styles.messageList}
        />

        <View style={styles.inputWrapper}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Plus size={24} color={colors.zinc['600']} />
            </TouchableOpacity>

            {/* Input field (center) */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.zinc[400]}
                placeholder="Message"
              />
              <TouchableOpacity style={styles.iconButton}>
                <AudioLines size={24} color={colors.zinc['600']} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    // backgroundColor: '#ffff',
    paddingTop: 100,
  },

  headerUserInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerUserAvatar: {
    width: 36,
    height: 36,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  headerUserName: {
    fontSize: 11,
    lineHeight: 13,
    color: '#ffff',
  },
  headerIconsRight: {
    flexDirection: 'row', // lays items side by side
    alignItems: 'center', // vertical alignment
    justifyContent: 'flex-end', // pushes icons to the right edge
    gap: 12, // spacing between icons (RN 0.71+)
  },
  messageList: {
    padding: 16,
    gap: 10,
  },
  inputWrapper: {
    width: '100%',
    backgroundColor: '#09090b',
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
    backgroundColor: '#09090b',
  },

  input: {
    flex: 1,
    color: '#ffff',
    paddingVertical: 0,
    marginVertical: 0,
  },

  iconButton: {
    padding: 4,
  },
  blankState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.zinc[100],
  },
  blankStateText: {
    fontSize: 16,
    color: colors.zinc[600],
  },

  dropdown: {
    position: 'absolute',
    top: 100, // adjust based on header height
    right: 0,
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

  searchBarContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(60, 60, 65, 0.3)',
    borderRadius: 0,
    paddingHorizontal: 12,
    width: '100%',
    height: '11%',
    flex: 1,
    zIndex: 999,
  },

  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 40,
    borderColor: '#ccc', // ✅ Add a visible border color
    borderWidth: 1, // ✅ Define border width
    borderRadius: 999, // ✅ Add rounded corners
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
});
