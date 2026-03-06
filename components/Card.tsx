import { Shadows } from '@/constants/Shadows';
import { useThemeColors } from '@/hooks/useThemeColors';
import { View, Text, ViewProps, ViewStyle } from 'react-native'

type Props = ViewProps;

const Card = ({style, ...rest} : Props) => {
  const colors = useThemeColors()
  return (
    <View style={[style, styles, {backgroundColor: colors.grayWhite}]} {...rest}/>
  )
}

const styles = {
    borderRadius: 8,
    overflow: 'hidden',
    ...Shadows.dp2
} satisfies ViewStyle; //Pour avoir l'auto complétion des styles que l'on peut donner à une view vu qu'on n'utilise pas StyleSheet

export default Card