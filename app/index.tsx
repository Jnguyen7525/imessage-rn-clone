// import { Message } from '@/components/Message';
// import { colors } from '@/theme/colors';
// import { messagesArray } from '@/utils/messages';
import { Message } from 'components/Message';
import Constants from 'expo-constants';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from 'theme/color';
import { messagesArray } from 'utils/messages';
import '../global.css';
import { Ellipsis, Phone, Search, Video, X } from 'lucide-react-native';
import { useConversationStore } from 'store/useConversationStore';

export default function Home() {
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState(messagesArray);

  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const toggleShowOptions = useConversationStore((state) => state.toggleShowOptions);
  const showOptions = useConversationStore((state) => state.showOptions);

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
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            // backgroundColor: '#09090b',
            backgroundColor: 'rgba(60, 60, 65, 0.3)',
          },
          headerShown: showSearchBar ? false : true,
          headerTintColor: '#fff',
          title: 'Messages',
          headerTitleAlign: 'left',
          // headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'systemChromeMaterialDark',
          headerTitleStyle: {
            // color: 'blue',
            // fontSize: 22,
            fontFamily: 'Georgia',
            fontWeight: 'ultralight',
          },
          // headerSearchBarOptions: {
          //   hideWhenScrolling: true,
          //   placeholder: 'Search...',
          //   hideNavigationBar: true,
          //   obscureBackground: true,
          //   tintColor: '#52525b', // 👈 makes native search icon white for ios
          //   headerIconColor: '#52525b', // 👈 makes native search icon white for ios
          //   onSearchButtonPress: ({ nativeEvent }) => {
          //     handleSearchChange(nativeEvent.text);
          //     handleSearch();
          //   },
          // },
          headerRight() {
            return (
              <View style={styles.headerIconsRight}>
                <TouchableOpacity onPress={() => setShowSearchBar(true)}>
                  <Search size={24} color={colors.zinc['600']} />
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

      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

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
    paddingTop: 80,
    position: 'relative',
    width: '100%',
  },

  messageContainer: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 16,
    // paddingTop: Constants.statusBarHeight * 2,
    // paddingBottom: 44,
  },

  headerIconsRight: {
    flexDirection: 'row', // lays items side by side
    alignItems: 'center', // vertical alignment
    justifyContent: 'flex-end', // pushes icons to the right edge
    gap: 12, // spacing between icons (RN 0.71+)
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
