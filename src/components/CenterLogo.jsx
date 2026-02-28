import Logo from "../assets/Logo.png";

export default function CenterLogo() {
  return (
    <img
      src={Logo}
      alt="Shoot for the Moon"
      className="h-[110px] sm:h-[150px] w-auto object-contain select-none"
      draggable={false}
    />
  );
}
