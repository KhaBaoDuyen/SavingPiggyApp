import React, { useRef, useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import { S } from "./style";
import { ROW_HEIGHT } from "./hooks/useYearStreak";
import StreakNode from "./components/StreakNode";
import StreakModal from "./components/StreakModal";
import { LinearGradient } from "expo-linear-gradient";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { getSavingHistory, checkinSaving } from "../../services/saving.api";
import { Audio } from "expo-av";
export default function YearStreak() {

  const flatListRef = useRef<FlatList>(null);

  const [currentDay, setCurrentDay] = useState(1);
  const [savings, setSavings] = useState<Record<number, number>>({});
  const [dateMap, setDateMap] = useState<Record<number, string>>({});
  const [noteMap, setNoteMap] = useState<Record<number, string>>({});

  const [totalSaved, setTotalSaved] = useState(0);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const playSaveSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/save.mp3")
    );
    await sound.playAsync();
  };
  const MAX_RENDER_DAYS = Math.max(currentDay + 30, 365);

  const getISODate = (iso: string) => iso.slice(0, 10);

  const loadData = async () => {

    try {

      const historyRes: any = await getSavingHistory();
      const history = historyRes.data;

      const grouped: Record<string, { amount: number; note: string }> = {};

      history.forEach((item: any) => {

        const key = getISODate(item.createdAt);

        if (!grouped[key]) {
          grouped[key] = {
            amount: 0,
            note: item.note || ""
          };
        }

        grouped[key].amount += item.amount;

      });

      const savingMap: Record<number, number> = {};
      const dateMapTemp: Record<number, string> = {};
      const noteMapTemp: Record<number, string> = {};

      const dates = Object.keys(grouped).sort();

      if (dates.length === 0) return;

      const startDate = new Date(dates[0] + "T00:00:00");

      const todayStr = new Date().toISOString().slice(0, 10);
      const today = new Date(todayStr + "T00:00:00");

      const diffDays =
        (today.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24);

      const todayIndex = Math.floor(diffDays) + 1;

      setCurrentDay(todayIndex);

      let total = 0;

      dates.forEach((dateStr) => {

        const date = new Date(dateStr + "T00:00:00");

        const diff =
          (date.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24);

        const dayIndex = Math.floor(diff) + 1;

        savingMap[dayIndex] = grouped[dateStr].amount;
        dateMapTemp[dayIndex] = dateStr;
        noteMapTemp[dayIndex] = grouped[dateStr].note;

        total += grouped[dateStr].amount;

      });

      // console.log("savingMap:", savingMap);
      // console.log("dateMapTemp:", dateMapTemp);

      setSavings(savingMap);
      setDateMap(dateMapTemp);
      setNoteMap(noteMapTemp);
      setTotalSaved(total);

    } catch (err) {
      console.log(err);
    }

  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {

    if (currentDay > 0) {

      flatListRef.current?.scrollToIndex({
        index: currentDay - 1,
        animated: false
      });

    }

  }, [currentDay]);

  const openSheet = (day: number) => {

    if (day > currentDay) return;

    setSelectedDay(day);

    setInputValue(
      savings[day] ? savings[day].toString() : ""
    );

  };

  const closeSheet = () => {
    setSelectedDay(null);
  };

  const saveDayAmount = async () => {

    if (!selectedDay) return;
    if (selectedDay > currentDay) return;

    const amount = parseFloat(
      inputValue.replace(/[^0-9]/g, "")
    );

    if (!isNaN(amount) && amount > 0) {

      await checkinSaving({
        amount,
        note: noteMap[selectedDay] ?? ""
      });

      await loadData();
      await playSaveSound();
    }

    setInputValue("");
    closeSheet();

  };

  const amplitude = 0.9;
  const basePattern = [0, -40, -70, -40, 0, 40, 70, 40];
  const pattern = basePattern.map(v => v * amplitude);

  const renderItem = ({ index }: { index: number }) => {

    const day = index + 1;

    const isCurrent = day === currentDay;
    const isPast = day < currentDay;

    const isMilestone = day % 10 === 0;

    const hasSaving = !!savings[day];

    const offset = pattern[index % pattern.length];

    return (

      <View
        style={{
          height: ROW_HEIGHT,
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <View style={{ transform: [{ translateX: offset }] }}>

          <StreakNode
            day={day}
            isCurrent={isCurrent}
            isPast={isPast}
            isMilestone={isMilestone}
            hasSaving={hasSaving}
            onPress={() => openSheet(day)}
          />

        </View>

      </View>

    );

  };

  const getDateLabel = (day: number) => {

    const start = new Date(dateMap[1] + "T00:00:00");

    const date = new Date(start);

    date.setDate(start.getDate() + (day - 1));

    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

  };

  return (

    <LinearGradient
      colors={["#B8DBE6", "#CBE7EF", "#DFF3F9"]}
      style={{ flex: 1, paddingBottom: 50 }}
    >

      <SafeAreaView style={{ flex: 1 }}>

        <View style={S.header}>

          <Text style={S.headerTitle}>
            Hành Trình Kỷ Luật
          </Text>

          <View style={S.badge}>
            <Text style={S.badgeText}>
              Day {currentDay}
            </Text>
          </View>

          {totalSaved > 0 && (
            <View style={S.totalBadge}>
              <Text style={S.totalBadgeText}>
                Tổng bỏ ống: {formatCurrency(totalSaved)}
              </Text>
            </View>
          )}

        </View>

        <FlatList
          ref={flatListRef}
          data={Array.from({ length: MAX_RENDER_DAYS })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index
          })}
          showsVerticalScrollIndicator={false}
          inverted
        />

        <StreakModal
          visible={selectedDay !== null}
          day={selectedDay}
          inputValue={inputValue}
          setInputValue={setInputValue}
          existingAmount={
            selectedDay ? savings[selectedDay] : undefined
          }
          note={selectedDay ? noteMap[selectedDay] : undefined}
          isViewingPast={
            selectedDay !== null && selectedDay < currentDay
          }
          onClose={closeSheet}
          onSave={saveDayAmount}
          getDateLabel={getDateLabel}
        />

      </SafeAreaView>

    </LinearGradient>

  );

}