import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
const { width: screenWidth } = Dimensions.get("window");

const IntroCar = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const intervalRef = useRef(null);

  const promoData = [
    {
      id: 1,
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=150",
      title: "Thứ 3 hàng tuần - Flash Sale",
      desc: "Giảm đến 50%",
    },
    {
      id: 2,
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/164/img_card.png?v=150",
      title: "Say Hi Bạn Mới",
      desc: "Giảm đến 25%",
    },
    {
      id: 3,
      image:
        "https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/165/img_card.png?v=150",
      title: "Giảm 20% khi đặt vé lần đầu",
      desc: "Áp dụng cho một số tuyến đường",
    },
  ];

  useEffect(() => {
    // Thiết lập auto-scroll
    let currentIndex = 0;

    intervalRef.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % promoData.length; // Lặp lại khi đến cuối
      scrollViewRef.current?.scrollTo({
        x: currentIndex * screenWidth,
        animated: true,
      });
    }, 2000); // Thời gian tự động cuộn (3 giây)

    return () => {
      // Dọn dẹp khi component unmount
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 27 }}></View>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}> Quay về</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giới thiệu</Text>
      </View>

      {/* Banner Section */}
      <View style={styles.bannerSection}>
        <Text style={styles.bannerTitle}>
          Nền tảng kết nối người dùng và nhà xe
        </Text>
        <View style={styles.features}>
          <View style={[styles.featureCard, { backgroundColor: "#66FFCC" }]}>
            <Image
              source={{ uri: "https://img.icons8.com/color/48/000000/bus.png" }}
              style={styles.icon}
            />
            <Text style={styles.featureTitle}>2000+ nhà xe chất lượng cao</Text>
            <Text style={styles.featureDesc}>
              5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.
            </Text>
          </View>
          <View style={[styles.featureCard, { backgroundColor: "#CCFFCC" }]}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/000000/ticket.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.featureTitle}>Đặt vé dễ dàng</Text>
            <Text style={styles.featureDesc}>
              Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.
            </Text>
          </View>
          <View style={[styles.featureCard, { backgroundColor: "#33FFFF" }]}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/000000/checked-checkbox.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.featureTitle}>Chắc chắn có chỗ</Text>
            <Text style={styles.featureDesc}>
              Hoàn ngay 150% nếu nhà xe không cung cấp dịch vụ vận chuyển.
            </Text>
          </View>
          <View style={[styles.featureCard, { backgroundColor: "#FFFFCC" }]}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/000000/price-tag.png",
              }}
              style={styles.icon}
            />
            <Text style={styles.featureTitle}>Nhiều ưu đãi</Text>
            <Text style={styles.featureDesc}>
              Hàng ngàn ưu đãi cực chất độc quyền tại Vé Xe Online.
            </Text>
          </View>
        </View>
      </View>

      {/* Promotions Section */}
      <View style={styles.partnerSection}>
        <Text style={styles.sectionTitle}>
          Vé Xe Online hi vọng sẽ được phát triển với
        </Text>
        <View style={styles.partnerLogosContainer}>
          <Image
            source={{
              uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg",
            }}
            style={styles.partnerLogo}
          />
          <Image
            source={{
              uri: "https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg",
            }}
            style={styles.partnerLogo}
          />
          <Image
            source={{
              uri: "https://file1.dangcongsan.vn/DATA/0/2018/10/68___gi%E1%BA%BFng_l%C3%A0ng_qu%E1%BA%A3ng_ph%C3%BA_c%E1%BA%A7u__%E1%BB%A9ng_h%C3%B2a___%E1%BA%A3nh_vi%E1%BA%BFt_m%E1%BA%A1nh-16_51_07_908.jpg",
            }}
            style={styles.partnerLogo}
          />
          <Image
            source={{
              uri: "https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg",
            }}
            style={styles.partnerLogo}
          />
        </View>
        <View style={styles.partnerDetailsContainer}>
          <Text style={styles.partnerName}>
            Công ty TNHH Vận tải Thành và Toàn
          </Text>

          <View style={styles.infoRow}>
            <Icon name="user" size={16} color="#333" style={styles.icon1} />
            <Text style={styles.label}>Người đại diện: </Text>
            <Text>Võ Minh Toàn</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="id-card" size={16} color="#333" style={styles.icon1} />
            <Text style={styles.label}>Số DKDK: </Text>
            <Text style={{ marginTop: 17 }}>
              2901884414 do Sở KHĐT Tiền Giang {"\n"}cấp ngày 25/11/2024
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon
              name="clipboard"
              size={16}
              color="#333"
              style={styles.icon1}
            />
            <Text style={styles.label}>Số GPĐK: </Text>
            <Text style={{ marginTop: 17 }}>
              488/NA do Sở GTVT Tiền Giang cấp {"\n"}ngày 26/11/2024
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="taxi" size={16} color="#333" style={styles.icon1} />
            <Text style={styles.label}>Mã số thuế: </Text>
            <Text>2901884414</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="map-pin" size={16} color="#333" style={styles.icon1} />
            <Text style={styles.label}>Trụ sở: </Text>
            <Text style={{ marginTop: 17 }}>
              Số 380, Đường 30/4, Phường 1, Thành phố {"\n"}Mỹ Tho, Tỉnh Tiền
              Giang
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Thông tin liên hệ</Text>

            <View style={styles.infoRow1}>
              <Icon name="phone" size={16} color="#333" style={styles.icon1} />
              <Text style={styles.label}>Tổng đài: </Text>
              <Text>0387097651 - 0326026288</Text>
            </View>

            <View style={styles.infoRow1}>
              <Icon
                name="envelope"
                size={16}
                color="#333"
                style={styles.icon1}
              />
              <Text style={styles.label}>Email: </Text>
              <Text>xekhachThanhVaToan@gmail.com</Text>
            </View>

            <View style={styles.infoRow1}>
              <Icon name="link" size={16} color="#333" style={styles.icon1} />
              <Text style={styles.label}>Website: </Text>
              <Text>https://xekhachThanhVaToan.vn</Text>
            </View>

            <View style={styles.infoRow1}>
              <Icon
                name="comments"
                size={20}
                color="#333"
                style={styles.icon1}
              />
              <Text style={styles.label}>Zalo: </Text>
              <Text>https://zalo.me/0326026288</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroCar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4, // Tạo bóng mờ cho header (dành cho Android)
  },
  backButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: "#f1f1f1", // Màu nền của nút quay lại
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
    color: "#007bff", // Màu chữ nút quay lại
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#333", // Màu chữ tiêu đề
  },
  bannerSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginRight: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  featureDesc: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    color: "#666",
  },
  partnerSection: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  partnerLogosContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  partnerLogo: {
    width: 80,
    height: 40,
    resizeMode: "contain",
    marginHorizontal: 10,
  },
  partnerDetailsContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  partnerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row", // Đặt icon và text trên cùng một hàng
    alignItems: "center", // Căn chỉnh theo chiều dọc
  },
  infoRow1: {
    flexDirection: "row", // Đặt icon và text trên cùng một hàng
    alignItems: "center", // Căn chỉnh theo chiều dọc
    marginBottom: 7,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  contactSection: {
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  contactInfo: {
    fontSize: 14,
    marginBottom: 6,
  },
  icon1: {
    marginRight: 5, // Khoảng cách giữa icon và text
  },
});
