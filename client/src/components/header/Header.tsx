import React, { useEffect, useState } from "react";
import {
  MiddleButtonContainer,
  HeaderContainer,
  NotificationsContainer,
  MainButtonStyle,
  MapButtonStyle,
  CreateFeedButtonStyle,
  RedPointStyle,
  NotificationsStyle,
  HeaderBox,
  MoveLogin,
  UserProfile,
  LogoDark,
  LogoUnDark,
} from "./Header.Style";

import { Link, useLocation } from "react-router-dom";
import Modal from "../modal/Modal";
import Alarm from "../alarm/Alarm";
import SetAlarm from "../alarm/SetAlarm";
import { useRecoilValue } from "recoil";
import { darkAtom, isLoginAtom, memberIdAtom, tokenAtom } from "../../atoms";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/userInfoService";

const Header: React.FC = () => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  const loginState = useRecoilValue(isLoginAtom);
  const darkState = useRecoilValue(darkAtom);
  const [isRead, setRead] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isAlarmSetting, setAlarmSetting] = useState<boolean>(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/SignUp";

  const handleScroll = () => {
    const isScrolled = window.scrollY > 0;
    setScrolled(isScrolled);
  };

  const openModal = () => {
    if (isModalOpen !== false) {
      setModalOpen(false);
    } else {
      setRead(false);
      setModalOpen(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const convertToRead = () => {
    if (isRead !== true) {
      setModalOpen(false);
      setRead(true);
    } else {
      setRead(false);
    }
  };
  const { data } = useQuery({
    queryKey: ["userInfo", memberId, token],
    queryFn: () => getUserInfo(Number(memberId), token),
  });
  if (isLoginPage || isSignUpPage) {
    return null;
  }
  return (
    <HeaderContainer scrolled={scrolled} isDark={darkState}>
      <HeaderBox>
        <Link to={loginState ? "/feeds" : "/"}>
          {darkState ? <LogoDark /> : <LogoUnDark />}
        </Link>
        <MiddleButtonContainer>
          <Link to="/feeds">
            <MainButtonStyle />
          </Link>
          <Link to="/petmap">
            <MapButtonStyle />
          </Link>
          <Link to={loginState ? "/create" : ""}>
            <CreateFeedButtonStyle
              onClick={() =>
                loginState ? undefined : alert("로그인이 필요합니다.")
              }
            />
          </Link>
          {loginState && (
            <NotificationsContainer
              onClick={() =>
                loginState ? convertToRead() : alert("로그인이 필요합니다.")
              }
            >
              {isRead === false ? <RedPointStyle /> : <NotificationsStyle />}
            </NotificationsContainer>
          )}
        </MiddleButtonContainer>
        {loginState ? (
          <UserProfile>
            <UserImgForm
              width={50}
              height={50}
              radius={50}
              URL={loginState ? data?.data.image : null}
              onClick={openModal}
            />
          </UserProfile>
        ) : (
          <Link to="/">
            <MoveLogin>Login</MoveLogin>
          </Link>
        )}
        {isModalOpen && (
          <Modal
            setModalOpen={setModalOpen}
            setAlarmSetting={setAlarmSetting}
          />
        )}
        {isRead && <Alarm setRead={setRead} />}
        {isAlarmSetting && <SetAlarm setAlarmSetting={setAlarmSetting} />}
      </HeaderBox>
    </HeaderContainer>
  );
};

export default Header;
