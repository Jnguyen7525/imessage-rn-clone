// components/Header.tsx
import { View, Text, Image, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from 'theme/color';
import { messagesArray } from 'utils/messages';

type HeaderProps = {
  onSearchChange?: (text: string) => void;
  onSearchSubmit?: () => void;
  searchValue?: string;
};

export const Header = ({ onSearchChange, onSearchSubmit, searchValue }: HeaderProps) => {
  const { id } = useLocalSearchParams();
  const selectedConversation = messagesArray.find((msg) => msg.id === id);
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    backgroundColor: colors.zinc[100],
    borderBottomWidth: 1,
    borderColor: colors.zinc[300],
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
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.zinc[200],
    fontSize: 16,
    color: colors.zinc[900],
  },
});
