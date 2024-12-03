import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import config from "../../../../../config";

const Complant = ({ route }) => {
  // Nhận tham số từ route.params
  const { tripId, trip, companyId, companyId: passedCompanyId } = route.params;
  // console.log("Received companyId 1:", trip?.companyId._id);
  // console.log("Received companyId 2:", passedCompanyId._id);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.user?.userInfo?.token);
  const submitFeedback = async () => {
    if (!companyId || !rating || !comment) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin trước khi gửi!");
      return;
    }
    // Tạo FormData để gửi dữ liệu dưới dạng form-data
    const formData = new FormData();
    // formData.append("companyId", trip?.companyId?._id);
    formData.append("companyId", passedCompanyId._id);
    formData.append("rating", rating);
    formData.append("comment", comment);

    console.log("Dữ liệu gửi đi:", formData);

    try {
      const response = await axios.post(
        `${config.BASE_URL}/feedbacks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đảm bảo Content-Type là multipart/form-data
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Thành công", "Đánh giá của bạn đã được gửi!");
      } else {
        Alert.alert("Lỗi", response.data.error || "Gửi đánh giá thất bại!");
      }
    } catch (error) {}
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Góp Ý
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        Đánh Giá
      </Text>
      <View style={{ borderWidth: 1, borderColor: "#ddd", marginBottom: 15 }}>
        <Picker
          selectedValue={rating}
          onValueChange={(itemValue) => setRating(itemValue)}
        >
          <Picker.Item label="-- Chọn mức đánh giá --" value={0} />
          <Picker.Item label="1 - Rất tệ" value={1} />
          <Picker.Item label="2 - Tệ" value={2} />
          <Picker.Item label="3 - Bình thường" value={3} />
          <Picker.Item label="4 - Tốt" value={4} />
          <Picker.Item label="5 - Rất tốt" value={5} />
        </Picker>
      </View>

      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        Nhận Xét
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 15,
          height: 100,
          textAlignVertical: "top",
        }}
        placeholder="Nhập góp ý của bạn"
        value={comment}
        onChangeText={setComment}
        multiline
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={submitFeedback}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Gửi Góp Ý
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Complant;
