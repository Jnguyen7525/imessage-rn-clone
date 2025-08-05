// components/Header.tsx
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { colors } from 'theme/color';
import { messagesArray } from 'utils/messages';
import { Ellipsis, Phone, Search, Video } from 'lucide-react-native';
import React from 'react';
import { useConversationStore } from 'store/useConversationStore';

type HeaderProps = {
  onSearchChange?: (text: string) => void;
  onSearchSubmit?: () => void;
  searchValue?: string;
};

export const Header = ({ onSearchChange, onSearchSubmit, searchValue }: HeaderProps) => {
  const toggleShowOptions = useConversationStore((state) => state.toggleShowOptions);

  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');

  const { id } = useGlobalSearchParams();

  const selectedConversation = useConversationStore((state) => state.selectedConversation);

  // Optional debug
  React.useEffect(() => {
    console.log('Selected (via useMemo):', selectedConversation);
  }, [selectedConversation]);

  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;

  return (
    <View style={[styles.header, { paddingHorizontal: isLargeScreen ? 24 : 16 }]}>
      {selectedConversation ? (
        <View style={styles.userInfo}>
          <Image style={styles.avatar} source={selectedConversation.avatar} />
          <Text style={styles.userName}>{selectedConversation.name}</Text>
        </View>
      ) : (
        <Text style={styles.title}>Messages</Text>
      )}
      {onSearchChange && (
        <TextInput
          value={searchValue}
          onChangeText={onSearchChange}
          onSubmitEditing={onSearchSubmit}
          placeholder="Search..."
          placeholderTextColor={colors.zinc[500]}
          style={styles.search}
        />
      )}
      {selectedConversation ? (
        <>
          <TouchableOpacity>
            <Phone size={24} color={colors.zinc['600']} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Video size={24} color={colors.zinc['600']} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleShowOptions}>
            <Ellipsis size={24} color={colors.zinc['600']} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={toggleShowOptions}>
            <Ellipsis size={24} color={colors.zinc['600']} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    backgroundColor: '#09090b',
    borderBottomWidth: 1,
    borderColor: '#a1a1aa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.zinc[900],
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.zinc[900],
  },
  search: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#18181b',
    fontSize: 16,
    color: colors.zinc[900],
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
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});
