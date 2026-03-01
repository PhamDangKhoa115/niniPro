import Logo from "../assets/Logon.png";

export default function CenterLogo() {
  return (
    <img
      src={Logo}
      alt="Shoot for the Moon"
      className="h-[150px] sm:h-[200px] w-auto object-contain select-none"
      draggable={false}
    />
  );
}
