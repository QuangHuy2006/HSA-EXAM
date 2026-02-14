export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          Exam System
        </h1>

        <nav className="flex gap-6 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-600 transition">
            Trang chủ
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Bài thi
          </a>
        </nav>
      </div>
    </header>
  );
}
