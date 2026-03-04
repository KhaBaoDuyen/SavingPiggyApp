import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./api";
import { ProfileResponse } from "../types/profile.types";

export const getProfile = async () => {
    const token = await AsyncStorage.getItem("token");

    return API.get<ProfileResponse>("/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateProfile = async (
    name: string,
    birthDate: string | null,
    targetAmount: number,
    avatar: string
) => {

    const token = await AsyncStorage.getItem("token");

    return API.put(
        "/profile",
        {
            name,
            birthDate,
            targetAmount,
            avatar
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};