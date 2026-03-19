import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, ViewProps, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps;

const RootView = ({ style, ...rest }: Props) => {
  const colors = useThemeColors();
  return <SafeAreaView style={[rootStyle, { backgroundColor: colors.tint }, style]} />;
};

const rootStyle = {
  flex: 1,
  padding: 4,
} satisfies ViewStyle;

export default RootView;
