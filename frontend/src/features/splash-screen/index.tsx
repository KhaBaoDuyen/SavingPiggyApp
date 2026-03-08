import { useEffect, useRef } from "react";
import { View, Animated, Easing, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../shared/theme/colors";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyGoals } from "../../services/goal.api";

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  const slideAnim = useRef(new Animated.Value(-200)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const logo = require("../../../assets/images/logo-dark.png");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // console.log("TOKEN:", token);

        if (!token) {
          navigation.replace("NoLayout", { screen: "Login" });
          return;
        }

        const res = await getMyGoals();
        // console.log("GOALS RESPONSE:", res.data);
        
        const goals = res.data.data;

        if (!res.data || goals.length === 0) { 
          navigation.replace("NoLayout",{
            screen:"SetupJourney"
          });
        } else {
          navigation.replace("Main");
        }

      } catch (error: any) {
        console.log(
          "ERROR CHECK AUTH:",
          error?.response?.data || error.message
        );
        navigation.replace("NoLayout", { screen: "Login" });
      }
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryDark }]}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        }}
      >
        <Image
          source={logo}
          style={{
            width: 220,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </Animated.View>
    </View>
  );
}