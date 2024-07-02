import banner from "../assets/banner.png";
export default function Banner() {
  return (
    <div className="relative h-full w-full">
      <img
        className="h-full w-full relative"
        src={banner}
        alt="banner"
      />
      <div className="absolute h-full w-full bg-black bg-opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-bold text-5xl">
            Create and provide services
          </h1>
          <p className="text-white text-3xl mt-3">
            Request for service, cancel anytime
          </p>
          <div className="mt-8">
            <a
              href="/login"
              className="bg-red-400 mt-8 text-white p-4 px-16 text-lg rounded font-semibold hover:bg-red-700"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
