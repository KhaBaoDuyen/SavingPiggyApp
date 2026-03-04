import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "./api";
import { SavingHistoryResponse } from "../types/saving.types";

export const getSavingHistory = async (): Promise<SavingHistoryResponse> => {

  const token = await AsyncStorage.getItem("token");

  const res = await API.get<SavingHistoryResponse>("/saving/history", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};

export const addSavingAPI = async (
  goalId: string,
  amount: number
) => {

  const token = await AsyncStorage.getItem("token");

  const res = await API.post(
    `/goal/${goalId}/saving`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

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