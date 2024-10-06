import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  CreditCardFormData,
  CreditCardFormField,
  ValidationState,
} from "react-native-credit-card-input";

const s = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    marginHorizontal: "auto",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 60,
  },
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  cardView: {
    alignSelf: "center",
    marginTop: 15,
  },
  cardInput: {
    marginTop: 15,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#dfdfdf",
    borderRadius: 5,
  },
  info: {
    fontFamily: Platform.select({
      ios: "Courier",
      android: "monospace",
      web: "monospace",
    }),
  },
  invalidText: {
    color: "red", // Red color for invalid fields
  },
  validText: {
    color: "black", // Default color for valid fields
  },
});

const toStatusIcon = (status?: ValidationState) =>
  status === "valid" ? "✅" : status === "invalid" ? "❌" : "❓";

export default function PayNowScreen() {
  const [useLiteInput, setUseLiteInput] = useState(false);
  const [focusedField, setFocusedField] = useState<CreditCardFormField>();
  const [formData, setFormData] = useState<CreditCardFormData>();

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Switch
        style={s.switch}
        onValueChange={(v) => {
          setUseLiteInput(v);
          setFormData(undefined);
        }}
        value={useLiteInput}
      />

      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        style={s.cardView}
      />

      {useLiteInput ? (
        <LiteCreditCardInput
          autoFocus
          style={s.cardInput}
          inputStyle={{
            color: formData?.status?.number === "invalid" ? "red" : "black",
          }}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />
      ) : (
        <CreditCardInput
          autoFocus
          style={s.cardInput}
          inputStyle={{
            color: formData?.status?.number === "invalid" ? "red" : "black",
          }}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />
      )}
    </ScrollView>
  );
}
