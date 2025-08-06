// import { colors } from '@/theme/colors';
// import { messagesArray } from '@/utils/messages';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'theme/color';
import { messagesArray } from 'utils/messages';

// type MessageProps = {
//   data: (typeof messagesArray)[0];
// };

// export const Message = (props: MessageProps) => {
//   const router = useRouter();

//   const handlePress = () => {
//     router.push(`/(stack)/message/${props.data.id}`);
//   };

//   return (
//     <TouchableOpacity onPress={handlePress} style={styles.container}>
//       <Image source={props.data.avatar} style={styles.avatar} />
//       <View style={styles.textsContainer}>
//         <View style={styles.textsFirstRow}>
//             <Text style={styles.textSenderName}>{props.data.name}</Text>
//           <Text style={styles.textSentTime}>{props.data.time}</Text>
//         </View>
//         <Text style={styles.textsMessagePreview} numberOfLines={2}>
//           {props.data.message}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };
type MessageProps = {
  data: (typeof messagesArray)[0];
  onPress?: () => void; // 👈 Add this prop
};

export const Message = ({ data, onPress }: MessageProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={data.avatar} style={styles.avatar} />
      <View style={styles.textsContainer}>
        <View style={styles.textsFirstRow}>
          <Text style={styles.textSenderName}>{data.name}</Text>
          <Text style={styles.textSentTime}>{data.time}</Text>
        </View>
        <Text style={styles.textsMessagePreview} numberOfLines={2}>
          {data.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: colors.zinc['200'],
    // paddingBottom: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
    resizeMode: 'cover',
  },
  textsContainer: {
    flex: 1,
  },
  textsFirstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSenderName: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: '#ffff',
    lineHeight: 22,
  },
  textSentTime: {
    fontSize: 15,
    color: '#ffff',
    lineHeight: 20,
  },
  textsMessagePreview: {
    fontSize: 15,
    color: colors.zinc['600'],
    lineHeight: 20,
  },
});
