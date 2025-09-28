import React from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { ModalProps } from '../../types';
import { colors, spacing, borderRadius } from '../../constants';

const CustomModal: React.FC<ModalProps> = ({ visible, onClose, position = "bottom", children }) => {
  const getPositionStyle = (position: "top" | "center" | "bottom") => {
    switch (position) {
      case "top":
        return { top: 100 };
      case "center":
        return { justifyContent: "center", alignItems: "center" };
      case "bottom":
        return { bottom: 0 };
      default:
        return {};
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, getPositionStyle(position)]}>
              <View style={styles.handleContainer}>
                <View style={styles.handle} />
              </View>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: colors.textLight,
    padding: spacing.xl,
    borderRadius: 44,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    position: "absolute",
    paddingTop: 60,
  },
  handleContainer: {
    position: 'absolute',
    left: 200,
    top: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: spacing.sm,
  },
});

export default CustomModal;