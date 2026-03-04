import { View, Text, TextProps, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    body3: {
        fontSize: 10,
        lineHeight: 16,
    },
    headline: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold"
    },
    caption: {
        fontSize: 8,
        lineHeight: 12
    },
    subtitle1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold"
    },
    subtitle2: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "bold"
    },
    subtitle3: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "bold"
    }
});

type Props = TextProps &{
    variant?: keyof typeof styles;
    color?: string;
}

const ThemedText = ({variant, color, ...rest} : Props) => {
  return <Text style={styles[variant ?? 'body3']} {...rest}/>
}

export default ThemedText