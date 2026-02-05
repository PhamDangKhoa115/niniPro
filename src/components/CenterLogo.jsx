import Logo from "../assets/Logo.svg";
export default function CenterLogo() {
  return (
    <div className="pointer-events-none select-none">
      <img
        src={Logo}
        alt="Shoot for the Moon"
        className="h-[80px] md:h-[110px] w-auto drop-shadow-[0_18px_60px_rgba(0,0,0,0.7)]"
      />
    </div>
  );
}
