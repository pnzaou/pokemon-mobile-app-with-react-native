import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import Row from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type props = {
  value: string;
  onChange: (s: string) => void;
};

const SearchBar = ({ value, onChange }: props) => {
    const colors = useThemeColors()
  return (
    <Row gap={8} style={[styles.wrapper, {backgroundColor: colors.grayWhite}]}>
      <Image
        source={require("@/assets/images/search.png")}
        width={16}
        height={16}
      />
      <TextInput style={styles.input} onChangeText={onChange} value={value} />
    </Row>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12
    },

    input: {
        flex: 1,
        height: 16,
        fontSize: 10,
        lineHeight: 16
    }
})

export default SearchBar;
