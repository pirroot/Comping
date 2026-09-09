import NavSearch from './NavSearch';
import NavActionBtn from './NavActionBtn';
import Logo from './Logo';
import NavItems from './NavItems';

export default function Header() {
  return (
    <header className="container mx-auto bg-neutral_light my-5 p-3 rounded-full flex justify-between items-center shadow-lg fixed top-0 left-0 right-0 z-50 transition-shadow duration-300">
      <Logo />
      <NavItems />
      <div className="flex justify-end items-center gap-2">
        <NavSearch />
        <NavActionBtn />
      </div>
    </header>
  );
}
