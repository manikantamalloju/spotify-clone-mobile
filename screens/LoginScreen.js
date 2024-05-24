import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
// import * as AppAuth from "expo-app-auth";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  // async function authenticate() {
  //   alert("relax");
  //   const config = {
  //     issuer: "https://accounts.spotify.com",
  //     clientId: "e995cdb791fe49e9889d97a6809008cf",
  //     scopes: [
  //       "user-read-email",
  //       "user-library-read",
  //       "user-read-recently-played",
  //       "user-top-read",
  //       "playlist-read-private",
  //       "playlist-read-collaborative",
  //       "playlist-modify-public", // or "playlist-modify-private"
  //     ],
  //     redirectUrl: "exp://localhost:8081/--/spotify-auth-callback",
  //   };
  //   const result = await AppAuth.authAsync(config);

  //   console.log("relax", result);
  // }
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("token", token, "expirationDate", expirationDate);
      if (token && expirationDate) {
        const currentTime = Date().now();
        if (currentTime < parseInt(expirationDate)) {
          navigation.replace("Main");
        } else {
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };
    checkTokenValidity();
  }, []);
  async function authenticate() {
    alert("relax");

    const config = {
      clientId: "e995cdb791fe49e9889d97a6809008cf",
      // issuer: "https://accounts.spotify.com",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ],
      redirectUri: AuthSession.makeRedirectUri({
        // native: "exp://localhost:8081/--/spotify-auth-callback",
        useProxy: true,
      }),
    };

    const discovery = {
      authorizationEndpoint: "https://accounts.spotify.com/authorize",
      tokenEndpoint: "https://accounts.spotify.com/api/token",
    };

    const authRequest = new AuthSession.AuthRequest(config);
    const result = await authRequest.promptAsync(discovery);
    if (result.type === "success") {
      const { accessToken, accessTokenExpirationDate } = result.params;
      const expirationDate = new Date(accessTokenExpirationDate).getTime();
      AsyncStorage.setItem("token", accessToken);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      navigation.navigate("Main");
    } else if (result.type === "dismiss") {
      console.log("Authentication flow dismissed");
      navigation.navigate("Main");
    } else {
      console.log("Authentication failed");
    }
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            margin: 40,
          }}
        >
          Millions of songs, free on Spotify!
        </Text>
        <View style={{ height: 80 }} />
        <Pressable
          onPress={authenticate}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
        >
          <Text>Sign In with Spotify</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#c0c0c0",
            borderWidth: 0.8,
          }}
        >
          <Feather name="smartphone" size={24} color="white" />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
            }}
          >
            continue with phone number
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#c0c0c0",
            borderWidth: 0.8,
          }}
        >
          <FontAwesome name="google" size={24} color="red" />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
            }}
          >
            continue with Google
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
          }}
        >
          <Entypo name="facebook" size={24} color="blue" />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              flex: 1,
            }}
          >
            Sign with Facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
