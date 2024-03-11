import { HeaderContainer, MenuContainer, MenuOptions } from "./styles";
import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import IconLogo from "../../../assets/icon-logo.png";
import IconMenu from "../../../assets/icon-menu.svg";

export default function Header() {
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      {isLoggedIn ? (
        <HeaderContainer>
          <a href="#">
            <Image
              src={IconLogo}
              alt="ErgoViewer"
              width={40}
              height={40}
              onClick={handleLogin}
            />
          </a>
          <h2>Nome do Usuário</h2>
          <MenuContainer ref={menuRef}>
            <Image
              src={IconMenu}
              alt="Menu"
              width={40}
              height={40}
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <MenuOptions>
                <a href="#">Perfil</a>
                <a href="#">Projetos</a>
              </MenuOptions>
            )}
          </MenuContainer>
        </HeaderContainer>
      ) : (
        <HeaderContainer>
          <a href="#">
            <Image
              src={IconLogo}
              alt="ErgoViewer"
              width={40}
              height={40}
              onClick={handleLogin}
            />
          </a>
          <MenuContainer ref={menuRef}>
            <Image
              src={IconMenu}
              alt="Menu"
              width={40}
              height={40}
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <MenuOptions>
                <a href="#">Cadastre-se</a>
                <a href="#">Autentique-se</a>
              </MenuOptions>
            )}
          </MenuContainer>
        </HeaderContainer>
      )}
    </>
  );
}
