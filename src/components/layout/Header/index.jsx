import Image from "next/image";
import { useRouter } from "next/router";

import { useRef, useState, useEffect, useContext } from "react";
import { HeaderContainer, MenuContainer, MenuOptions } from "./styles";

import IconLogo from "../../../assets/icon-logo.png";
import IconMenu from "../../../assets/icon-menu.svg";

import { UserContext } from "@/context/UserContext";

export default function Header() {
  const router = useRouter();

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

  const { data, userLogout } = useContext(UserContext);

  return (
    <>
      {data ? (
        <HeaderContainer>
          <a href="#">
            <Image
              src={IconLogo}
              alt="ErgoViewer"
              width={40}
              height={40}
              onClick={() => router.push("/")}
            />
          </a>
          <h2>{data.email && data.email}</h2>
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
                <a onClick={() => router.push("/projects")}>Projetos</a>
                <a onClick={() => router.push("/profile")}>Perfil</a>
                <a onClick={userLogout}>Sair</a>
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
              onClick={() => router.push("/")}
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
                <a onClick={() => router.push("/register-acess-data")}>
                  Cadastre-se
                </a>
                <a onClick={() => router.push("/auth")}>Autentique-se</a>
              </MenuOptions>
            )}
          </MenuContainer>
        </HeaderContainer>
      )}
    </>
  );
}
