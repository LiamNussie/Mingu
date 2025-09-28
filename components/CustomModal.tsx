import React from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  position?: "top" | "center" | "bottom";
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, position = "bottom", children }) => {

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, getPositionStyle(position)]}>
              <View style={{position: 'absolute', left: 200, top: 15}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 30}}>
                <View style={{ width: 36, height: 4, backgroundColor: '#F0F0F0', borderRadius: 10}} />
              </View>
              </View>
              {children}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark transparent background
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 44,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    position: "absolute",
    paddingTop: 60
  },
});

export default CustomModal;