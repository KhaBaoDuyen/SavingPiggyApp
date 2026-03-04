import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoalsResponse } from "../features/auth/types/goal.types";
import { API } from "./api";

export const createGoal = async (
  targetAmount: number,
  dailyAmount: number
) => {
  const token = await AsyncStorage.getItem("token");

  return API.post(
    "/goal",
    { targetAmount, dailyAmount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMyGoals = async () => {
  const token = await AsyncStorage.getItem("token");

  return API.get<GoalsResponse>("/goal", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// CHECKIN
export const checkinSaving = async ({
  amount,
  note
}: {
  amount: number;
  note?: string;
}) => {

  const token = await AsyncStorage.getItem("token");

  const res = await API.post(
    "/saving/checkin",
    { amount, note },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

// CHECK TODAY
export const checkToday = async () => {

  const token = await AsyncStorage.getItem("token");

  return API.get(
    "/goal/check-today",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

};

//HISTORY
export const getGoal = async (): Promise<GoalsResponse> => {

  const token = await AsyncStorage.getItem("token");

  const res = await API.get<GoalsResponse>("/goal", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};