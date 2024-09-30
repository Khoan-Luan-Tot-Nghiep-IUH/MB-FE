// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";

// const Select = ({ onSelect }) => {
//   const [selectedProvince, setSelectedProvince] = useState(null);

//   const locations = {
//     "Hà Nội": [
//       "Quận Ba Đình",
//       "Quận Hoàn Kiếm",
//       "Quận Đống Đa",
//       "Quận Cầu Giấy",
//     ],
//     "TP Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 5", "Quận 7"],
//     // Thêm các tỉnh thành và quận huyện khác
//   };

//   return (
//     <View>
//       {!selectedProvince ? (
//         // Chọn Tỉnh Thành
//         <FlatList
//           data={Object.keys(locations)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.item}
//               onPress={() => setSelectedProvince(item)}
//             >
//               <Text>{item}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         // Chọn Quận Huyện sau khi chọn Tỉnh Thành
//         <FlatList
//           data={locations[selectedProvince]}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.item}
//               onPress={() => onSelect(selectedProvince, item)} // Truyền cả Tỉnh Thành và Quận Huyện
//             >
//               <Text>{item}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       {selectedProvince && (
//         <TouchableOpacity onPress={() => setSelectedProvince(null)}>
//           <Text>Quay lại chọn tỉnh thành</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
// });

// export default Select;
