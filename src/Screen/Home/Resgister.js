import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import config from "../../../config";

const Register = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email phải chứa ký tự @ và đúng định dạng"
      )
      .required("Email là bắt buộc"),
    userName: Yup.string().required("Tên người dùng đặt tùy ý "),
    password: Yup.string()
      .matches(
        /^(?=.*[@$!%*?&]).{8,}$/,
        "Mật khẩu phải ít nhất 8 ký tự và chứa ít nhất 1 ký tự đặc biệt"
      )
      .required("Mật khẩu là bắt buộc"),
    fullName: Yup.string()
      .matches(
        /^([A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯÑÁÀẢÃẠÂẦẤẬẪẨĂẰẮẴẲẶÈÉẺẼẸÊỀẾỂỄỆÌÍĨỈỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỴỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưñáàảãạâầấậẫẩăằắẵẳặèéẻẽẹêềếểễệìíĩỉịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỵỷỹ]*\s)*[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯÑÁÀẢÃẠÂẦẤẬẪẨĂẰẮẴẲẶÈÉẺẼẸÊỀẾỂỄỆÌÍĨỈỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỴỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưñáàảãạâầấậẫẩăằắẵẳặèéẻẽẹêềếểễệìíĩỉịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỵỷỹ]*$/,
        "Họ và tên phải viết hoa chữ cái đầu mỗi từ, ví dụ: 'Võ Minh Toàn'"
      )
      .required("Họ và tên là bắt buộc"),
    phoneNumber: Yup.string()
      .matches(/^0[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
    birthDay: Yup.string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
        "Ngày sinh phải đúng định dạng dd-mm-yyyy"
      )
      .required("Ngày sinh là bắt buộc ví dụ: 01-01-2002"),
    verificationMethod: Yup.string().required(
      "Phương thức xác nhận là bắt buộc"
    ),
  });

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/user/register`,
        values
      );
      const data = response.data;

      if (data.success) {
        Alert.alert("Thành Công", data.msg);
        navigation.navigate("VerificationScreen", {
          email: values.email,
          phoneNumber: values.phoneNumber,
          verificationMethod: values.verificationMethod,
          userName: values.userName,
          password: values.password,
        });
      } else {
        Alert.alert("Lỗi", data.msg);
      }
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      Alert.alert(
        "Đăng ký thất bại",
        error.response?.data?.msg || "Có lỗi xảy ra, vui lòng thử lại."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
          fullName: "",
          phoneNumber: "",
          address: "",
          birthDay: "",
          verificationMethod: "email",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Tạo Tài Khoản</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Tên Người Dùng"
              placeholderTextColor="#aaa"
              onChangeText={handleChange("userName")}
              onBlur={handleBlur("userName")}
              value={values.userName}
            />
            {touched.userName && errors.userName && (
              <Text style={styles.errorText}>{errors.userName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Mật Khẩu"
              placeholderTextColor="#aaa"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Họ và Tên"
              placeholderTextColor="#aaa"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Số Điện Thoại"
              placeholderTextColor="#aaa"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Địa Chỉ"
              placeholderTextColor="#aaa"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
            />
            {touched.address && errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Ngày Sinh (YYYY-MM-DD)"
              placeholderTextColor="#aaa"
              onChangeText={handleChange("birthDay")}
              onBlur={handleBlur("birthDay")}
              value={values.birthDay}
            />
            {touched.birthDay && errors.birthDay && (
              <Text style={styles.errorText}>{errors.birthDay}</Text>
            )}
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Phương Thức Xác Nhận:</Text>
              <Picker
                selectedValue={values.verificationMethod}
                onValueChange={(value) =>
                  setFieldValue("verificationMethod", value)
                }
                style={styles.picker}
              >
                <Picker.Item label="Email" value="email" />
                <Picker.Item label="Số Điện Thoại" value="phone" />
              </Picker>
            </View>
            {touched.verificationMethod && errors.verificationMethod && (
              <Text style={styles.errorText}>{errors.verificationMethod}</Text>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Register;
