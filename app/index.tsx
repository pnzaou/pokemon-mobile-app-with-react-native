import ThemedText from '@/components/ThemedText'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView>
      <ThemedText variant='headline'>Pokédex</ThemedText>
    </SafeAreaView>
  )
}

export default index