const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjNGExZDVkMi0wZmJhLTQwM2ItOWM2Ny00Yjk2MGM4NDNkZDAiLCJpYXQiOjE3Njk5MDgyMzUsImlzcyI6ImFjY291bnQtbWFuYWdlciIsImF1ZCI6IjQ2ODcyOCIsImV4cCI6MTc2OTkxMDAzNSwibmJmIjoxNzY5OTA4MjM1LCJpZCI6IjQ2ODcyOCIsInJvbGVJZCI6InVzZXIiLCJzdGF0dXMiOlsiQUNUSVZFIiwiUEhPTkVfTlVNQkVSX0NPTkZJUk1FRCIsIkVNQUlMX0NPTkZJUk1FRCIsIklORk9fVVBEQVRFRCJdLCJhZG1pbkFjY291bnQiOmZhbHNlLCJ1c2VySWQiOiI0NjcxMDMiLCJhY2NvdW50SW5mbyI6eyJ1c2VySWQiOiI0NjcxMDMiLCJpZCI6IjQ2ODcyOCIsInBob25lTnVtYmVyIjoiMDc4OTA4ODkwOSIsImVtYWlsIjoidG9ucGhhbXF1YW5naHV5M0BnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2V9fQ.glyNDoNXYsHByFUM01GKu0xNNuZVBzibeAiDj4miEVo";

fetch("https://api.hsa.edu.vn/exam/views/registration/exam-registrations", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "Origin": "https://id.hsa.edu.vn",
    "Referer": "https://id.hsa.edu.vn/"
  },
  body: JSON.stringify({
    candidateId: "468728",
    examDateId: "HSA-2025-03-23",
    locationId: "HN01"
  })
})
.then(res => res.json())
.then(data => {
  console.log("Đăng ký thành công:", data);
})
.catch(err => {
  console.error("Lỗi:", err);
});
