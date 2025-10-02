// app/page.tsx (Next.js 13+ App Router)
export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-10 max-w-lg text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Mohamed Elgharib
        </h1>
        <p className="text-gray-600 mb-6">
          Experience a modern and seamless way to manage your tasks and
          projects.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
