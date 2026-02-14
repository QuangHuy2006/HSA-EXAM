import { useEffect, useState } from "react";
import { Card, Button, Spin, Alert, message, Tag } from "antd";
import axios from "axios";

interface Leave {
  id: number;
  date: string;
  note: string;
  status: string;
  student: {
    id: number;
    fullName: string;
  };
  course: {
    id: number;
    name: string;
  };
}

export default function LeavePage() {
  const [data, setData] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // FETCH DANH SÁCH ĐƠN NGHỈ
  // =========================
  useEffect(() => {
    axios
      .get("http://localhost:3001/rikkei/request-leave/83")
      .then((res) => setData(res.data))
      .catch(() => setError("Không lấy được dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // APPROVE ĐƠN NGHỈ
  // =========================
  const approveLeave = async (leaveId: number) => {
    try {
      const res = await axios.patch(
        `http://localhost:3001/rikkei/request-leave/${leaveId}`,
        { status: "Phê duyệt" }
      );

      message.success("Duyệt đơn thành công");

      setData((prev) =>
        prev.map((item) =>
          item.id === leaveId ? res.data.data : item
        )
      );
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  // =========================
  // UI STATE
  // =========================
  if (loading) return <Spin fullscreen />;
  if (error) return <Alert type="error" message={error} />;

  // =========================
  // RENDER
  // =========================
  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      {data.map((item) => (
        <Card key={item.id} style={{ marginBottom: 16 }}>
          <p>
            <b>Sinh viên:</b> {item.student.fullName}
          </p>
          <p>
            <b>Môn học:</b> {item.course.name}
          </p>
          <p>
            <b>Ngày nghỉ:</b> {item.date}
          </p>
          <p>
            <b>Lý do:</b> {item.note}
          </p>
          <p>
            <b>Trạng thái:</b>{" "}
            {item.status === "Đang chờ" ? (
              <Tag color="orange">Đang chờ</Tag>
            ) : (
              <Tag color="green">Phê duyệt</Tag>
            )}
          </p>

          <Button
            type="primary"
            disabled={item.status !== "Đang chờ"}
            onClick={() => approveLeave(item.id)}
          >
            Duyệt
          </Button>
        </Card>
      ))}
    </div>
  );
}
