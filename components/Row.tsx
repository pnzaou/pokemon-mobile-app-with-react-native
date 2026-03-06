import { View, Text, ViewProps, ViewStyle } from 'react-native'
import React from 'react'

type Props = ViewProps & { //le ViewProps & veut dire que mon type Props ici va aussi supporter le type ViewProps qui contient le type de style utilisé ici
    gap?: number
}

const Row = ({style, gap, ...rest}: Props) => {
  return (
    <View style={[rowStyle, style, gap ? {gap: gap} : undefined]} {...rest}>
    </View>
  )
}

const rowStyle = {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center'
} satisfies ViewStyle;

export default Row