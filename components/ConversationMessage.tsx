// import { colors } from '@/theme/colors';
// import { conversationMessages } from '@/utils/messages';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'theme/color';
import { conversationMessages } from 'utils/messages';

type ConversationMessageProps = {
  data: (typeof conversationMessages)[0];
};

export const ConversationMessage = (props: ConversationMessageProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: props.data.amISender ? 'flex-end' : 'flex-start',
          backgroundColor: props.data.amISender ? colors.blue['normal'] : '#18181b',
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: props.data.amISender ? colors.zinc['100'] : '#ffff',
          },
        ]}>
        {props.data.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '80%',
    backgroundColor: 'red',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 15,
    zIndex: 0,
  },

  text: {
    fontSize: 16,
    lineHeight: 22,
    zIndex: 0,
  },
});
