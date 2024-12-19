export default function DetailLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-600">
          포켓몬 정보를 불러오는 중...
        </p>
      </div>
    </div>
  );
}
