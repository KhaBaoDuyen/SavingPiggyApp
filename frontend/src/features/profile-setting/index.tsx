import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import { styles } from "./style";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import AvatarFrame from "./components/AvatarFrame";

import { getRank } from "../../shared/utils/rank";
import { calculateStreak } from "../../shared/utils/streak";

import { getProfile, updateProfile } from "../../services/profile.api";
import { getSavingHistory } from "../../services/saving.api";
import { uploadAvatar } from "../../services/upload.api";

import LoadingSpinner from "../../shared/components/Loading";

export default function ProfileSetting() {

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const [email, setEmail] = useState("");

    const [goal, setGoal] = useState("0");
    const [daysRemaining, setDaysRemaining] = useState("0");

    const [totalMoney, setTotalMoney] = useState(0);
    const [avatar, setAvatar] = useState<string | null>(null);

    const [streak, setStreak] = useState(0);

    const [loading, setLoading] = useState(false);

    const rank = getRank(streak);

    const goalNumber = Number(goal || 0);
    const daysNumber = Number(daysRemaining || 0);

    const remaining = goalNumber - totalMoney;

    const averagePerDay =
        daysNumber > 0 ? Math.ceil(remaining / daysNumber) : 0;

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        setLoading(true);

        try {

            const profileRes: any = await getProfile();
            const data = profileRes.data;

            setName(data.name);
            setEmail(data.email);
            setGoal(String(data.targetAmount));
            setTotalMoney(data.currentAmount);
            setDaysRemaining(String(data.remainingDays));

            if (data.birthDate) {
                setBirthDate(new Date(data.birthDate));
            }

            if (data.avatar) {
                setAvatar(data.avatar);
            }

            const historyRes: any = await getSavingHistory();

            const formatted = historyRes.data.map((item: any) => ({
                createdAt: item.createdAt
            }));
            const streakData = calculateStreak(formatted);
            setStreak(streakData.streak);
        } catch (err: any) {
            console.log("PROFILE ERROR:", err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const calculateAge = () => {
        if (!birthDate) return "";
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            setLoading(true);
            try {
                const upload = await uploadAvatar(localUri);
                setAvatar(upload.secure_url);
            } catch (err: any) {
                console.log("UPLOAD ERROR:", err.response?.data);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = async () => {

        setLoading(true);

        try {
            await updateProfile(
                name,
                birthDate ? birthDate.toISOString() : null,
                Number(goal),
                avatar || ""
            );
        } catch (err: any) {
            console.log("PROFILE UPDATE ERROR=>", err.response?.data);
        } finally {
            setLoading(false);
        }

    };

    return (

        <SafeAreaView style={styles.container}>

            <LoadingSpinner visible={loading} />

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.profileCard}>

                    <View style={styles.profileHeader}>

                        <AvatarFrame
                            avatar={avatar}
                            frameColor={rank.frameColor}
                            onPress={pickImage}
                        />

                        <View style={styles.profileInfo}>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                style={styles.inputName}
                                placeholder="Nhập tên"
                            />

                            <Text style={styles.inputBio}>
                                Tiết kiệm đều đặn, chạm tới mục tiêu.
                            </Text>

                        </View>

                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.infoRow}
                        onPress={() => setShowPicker(true)}
                    >

                        <Text style={styles.label}>NGÀY SINH</Text>

                        <Text style={styles.value}>
                            {birthDate
                                ? birthDate.toLocaleDateString("vi-VN")
                                : "Chưa cập nhật"}
                        </Text>

                    </TouchableOpacity>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>TUỔI</Text>
                        <Text style={styles.value}>{calculateAge()} tuổi</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>EMAIL</Text>
                        <Text style={styles.value}>{email}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>TỔNG TIỀN</Text>
                        <Text style={styles.value}>
                            {formatCurrency(totalMoney)}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>

                        <Text style={styles.label}>MỤC TIÊU</Text>

                        <TextInput
                            value={formatCurrency(goalNumber)}
                            onChangeText={(text) => {

                                const raw = text.replace(/[^0-9]/g, "");

                                setGoal(raw);

                            }}
                            keyboardType="numeric"
                            style={styles.inputValue}
                        />

                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>SỐ NGÀY CÒN LẠI</Text>
                        <Text style={styles.value}>{daysRemaining}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>CÒN THIẾU</Text>
                        <Text style={styles.value}>
                            {formatCurrency(Math.max(remaining, 0))}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>TRUNG BÌNH / NGÀY</Text>
                        <Text style={styles.value}>
                            {formatCurrency(Math.max(averagePerDay, 0))}
                        </Text>
                    </View>

                    <View style={styles.rankBox}>

                        <Image
                            source={rank.icon}
                            style={styles.rankIcon}
                        />

                        <View style={styles.rankTextBox}>

                            <Text style={styles.rankLabel}>
                                DANH HIỆU
                            </Text>

                            <Text
                                style={[
                                    styles.rankTitle,
                                    { color: rank.color }
                                ]}
                            >
                                {rank.title}
                            </Text>

                        </View>

                    </View>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                    >

                        <Text style={styles.saveButtonText}>
                            Lưu thay đổi
                        </Text>

                    </TouchableOpacity>

                </View>

                {/* STREAK */}

                <View style={styles.streakCard}>

                    <Image
                        source={require("../../../assets/images/rank/streak.png")}
                        style={styles.streakIcon}
                    />

                    <View>

                        <Text style={styles.streakTitle}>
                            {streak} ngày liên tục
                        </Text>

                        <Text style={styles.streakSub}>
                            {rank.title}
                        </Text>

                    </View>

                </View>

            </ScrollView>

            {showPicker && (

                <DateTimePicker
                    value={birthDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {

                        setShowPicker(false);

                        if (date) setBirthDate(date);

                    }}
                />

            )}

        </SafeAreaView>

    );

}