import { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  CreditCardView,
  CreditCardInput,
  LiteCreditCardInput,
  CreditCardFormData,
  CreditCardFormField,
  ValidationState,
} from "react-native-credit-card-input";
import Icon from "react-native-vector-icons/Ionicons";
import { PaymentMethod, useStripe } from "@stripe/stripe-react-native";
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";

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
    color: "red",
  },
  validText: {
    color: "black",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 60,
    width: 200,
    backgroundColor: "#132233",
    borderColor: "rgb(182, 128, 128)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
    flexDirection: "row",
  },
  buttonText: {
    color: "#eee",
    fontSize: 15,
  },
  icon: {
    marginRight: 10,
  },
});

interface MyProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  added: boolean;
  type: string;
  quantity: number;
}

export default function PayNowScreen() {
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const navigation = useNavigation<NavigationProp<any>>();
  const [meals, setMeals] = useState<MyProduct[] | null>(null);
  const [snacks, setSnacks] = useState<MyProduct[] | null>(null);
  const [drinks, setDrinks] = useState<MyProduct[] | null>(null);
  const [sides, setSides] = useState<MyProduct[] | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | string>(0);
  const [useLiteInput, setUseLiteInput] = useState(false);
  const [focusedField, setFocusedField] = useState<CreditCardFormField>();
  const [formData, setFormData] = useState<CreditCardFormData>();
  const loadProducts = async () => {
    try {
      const mealData = await AsyncStorage.getItem("Meals");
      const sideData = await AsyncStorage.getItem("Sides");
      const drinkData = await AsyncStorage.getItem("Drinks");
      const snackData = await AsyncStorage.getItem("Snacks");
      const amountData = await AsyncStorage.getItem("Total Amount");

      setMeals(mealData && JSON.parse(mealData));
      setSides(sideData && JSON.parse(sideData));
      setDrinks(drinkData && JSON.parse(drinkData));
      setSnacks(snackData && JSON.parse(snackData));
      setTotalAmount(amountData ? JSON.parse(amountData) : 0);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const resetAllItems = async () => {
    const resetItems = (items: MyProduct[]) =>
      items.map((item) => ({
        ...item,
        quantity: 0,
        added: false,
      }));
    const updatedDrinks = resetItems(drinks || []);
    const updatedMeals = resetItems(meals || []);
    const updatedSides = resetItems(sides || []);
    const updatedSnacks = resetItems(snacks || []);
    try {
      await AsyncStorage.multiSet([
        ["Drinks", JSON.stringify(updatedDrinks)],
        ["Meals", JSON.stringify(updatedMeals)],
        ["Sides", JSON.stringify(updatedSides)],
        ["Snacks", JSON.stringify(updatedSnacks)],
      ]);
      navigation.navigate("ConfirmOrder");
    } catch (error) {
      console.error("Failed to reset AsyncStorage values:", error);
    }
  };

  useEffect(() => {
    const initializePaymentSheetAsync = async () => {
      await loadProducts();
      await initializePaymentSheet();
    };
    initializePaymentSheetAsync();
  }, []);

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Example Inc.",
      allowsDelayedPaymentMethods: true,
      returnURL: "strip-example://stripe-redirect",
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
  };
  const fetchPaymentSheetParams = async () => {
    const amountData = await AsyncStorage.getItem("Total Amount");
    const totalAmount = amountData ? JSON.parse(amountData) : 0;
    const response = await fetch("http://10.0.2.2:3000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total: totalAmount,
      }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  async function buy() {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      resetAllItems();
    }
  }

  const publishKey =
    "pk_test_51PJTtkGUY0qZiMwJH9HOgpa6cZXi7FgXa8MYBAtyxD99Xa8iBgqDcTOEVDTY4URxNR3b0eh93NRzdKSOUIDo9myA00bUcvFNgf";

  return (
    <ScrollView contentContainerStyle={s.container}>
      <StripeProvider publishableKey={publishKey}>
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
        <View style={s.buttonContainer}>
          <TouchableOpacity style={s.button} onPress={buy} disabled={loading}>
            <Icon name={"card"} size={20} color="#eee" style={s.icon} />
            <Text style={s.buttonText}>{"Pay Now"}</Text>
          </TouchableOpacity>
        </View>
      </StripeProvider>
    </ScrollView>
  );
}
