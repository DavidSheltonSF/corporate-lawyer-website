export default function loading() {
  return (
    <div className="bg-color-primary-light h-[100vh] flex justify-center items-center">
      <div className="size-[90px] overflow-hidden rounded-full bg-white">
        <video autoPlay muted loop playsInline className="size-full object-cover" src="logo-loading.mp4"></video>
      </div>
    </div>
  );
}
