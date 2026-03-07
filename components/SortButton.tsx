import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemedText from "./ThemedText";
import Card from "./Card";
import { Label } from "@react-navigation/elements";
import Row from "./Row";
import Radio from "./Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
  value: "id" | "name";
  onChange: (v: "id" | "name") => void;
};

const options = [
  { Label: "Number", value: "id" },
  { Label: "Name", value: "name" },
] as const; // indique à TypeScript que ce tableau et ses valeurs sont immuables et doivent être traités comme des valeurs exactes ("id" | "name") et non comme de simples string

const SortButton = ({ value, onChange }: Props) => {
  const buttonRef = useRef<View>(null);
  const colors = useThemeColors();
  const [isModaleVisible, setIsModaleVisible] = useState(false);
  const [postion, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);

  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
      setIsModaleVisible(true);
    });
  };

  const onClose = () => {
    setIsModaleVisible(false);
  };

  return (
    <>
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === "id"
                ? require("@/assets/images/tag.png")
                : require("@/assets/images/alpha.png")
            }
            height={16}
            width={16}
          />
        </View>
      </Pressable>

    {/* Boîte modale */}
      <Modal
        transparent
        visible={isModaleVisible}
        onRequestClose={onClose}
        animationType="fade"
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <View
            style={[styles.popup, { backgroundColor: colors.tint, ...postion }]}
          >
            <ThemedText
              style={styles.title}
              variant="subtitle2"
              color="grayWhite"
            >
              Sort by
            </ThemedText>
            <Card style={styles.card}>
              {options.map((o) => (
                <Pressable key={o.value} onPress={() => onChange(o.value)}>
                  <Row gap={8}>
                    <Radio checked={o.value === value} />
                    <ThemedText>{o.Label}</ThemedText>
                  </Row>
                </Pressable>
              ))}
            </Card>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  popup: {
    position: "absolute",
    width: 113,
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
    ...Shadows.dp2,
  },

  title: {
    paddingLeft: 20,
  },

  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
});

export default SortButton;
