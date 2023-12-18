import { AxiosResponse, AxiosError } from "axios";
import {
  getUserInfo,
  getUserFeed,
  patchUserNickname,
  patchUserIntro,
  postUserEmail,
  postUserCode,
  patchUserPassword,
  getPetInfo,
  deletePetInfo,
} from "../services/userInfoService";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../atoms";
import { feedDataType, infoType } from "../types/userInfoType";
import { useNavigate } from "react-router-dom";

// 유저 정보 가져오기
export const useGetUserInfo = (
  memberId: number,
  setUserData: React.Dispatch<React.SetStateAction<infoType | undefined>>,
) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return getUserInfo(memberId, token);
    },
    onSuccess: (res: AxiosResponse) => {
      setUserData(res.data);
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 유저 피드 가져오기
export const useGetUserFeed = (
  memberId: number,
  endPoint: string,
  setFeedData: React.Dispatch<React.SetStateAction<feedDataType[] | undefined>>,
) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return getUserFeed(memberId, endPoint, token);
    },
    onSuccess: (res: AxiosResponse) => {
      setFeedData(res.data.data);
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 닉네임 변경
export const usePatchUserNickname = (newNickname: string) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return patchUserNickname(newNickname, token);
    },
    onSuccess: () => {
      alert("닉네임 변경완료");
    },
    onError: (err: AxiosError<any>) => {
      if (err.response !== undefined) {
        alert(err.response.data.message);
        console.log(err.response.data);
      }
    },
  });
};

// 소개글 변경
export const usePatchUserIntro = (newMyIntro: string) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return patchUserIntro(newMyIntro, token);
    },
    onSuccess: () => {
      alert("소개글 변경완료");
    },
    onError: (err: AxiosError<any>) => {
      if (err.response !== undefined) {
        alert(err.response.data.message);
        console.log(err);
      }
    },
  });
};

// 비밀번호 변경 인증코드 메일보내기
export const usePostUserEmail = (email: string) => {
  return useMutation({
    mutationFn: async () => {
      return postUserEmail(email);
    },
    onSuccess: () => {
      alert("이메일로 인증코드를 보내드렸습니다.");
    },
    onError: (err: AxiosError<any>) => {
      console.log(err);
    },
  });
};

// 비밀번호 변경 인증코드 보내기
export const usePostUserCode = (
  email: string,
  authNum: number,
  setCodeCheck: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return useMutation({
    mutationFn: async () => {
      return postUserCode(email, authNum);
    },
    onSuccess: () => {
      alert("인증을 완료했습니다.");
      setCodeCheck(true);
    },
    onError: (err: AxiosError<any>) => {
      console.log(err);
    },
  });
};

// 비밀번호 변경하기 버튼
export const usePatchUserPassword = (password: string, pwConfirm: string) => {
  return useMutation({
    mutationFn: async () => {
      return patchUserPassword(password, pwConfirm);
    },
    onSuccess: () => {
      alert("비밀번호를 변경했습니다. 다시 로그인을해야 합니다.");
    },
    onError: (err: AxiosError<any>) => {
      console.log(err);
    },
  });
};

// 펫프로필 정보
export const useGetPetInfo = (petId: string, memberId: number) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return getPetInfo(petId, memberId, token);
    },
    onSuccess: (res) => {
      console.log(res);
      return res.data;
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

//펫정보 삭제
export const useDeletePetInfo = (petId: string) => {
  const token = useRecoilValue(tokenAtom);
  const navigator = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return deletePetInfo(petId, token);
    },
    onSuccess: () => {
      navigator("/user");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
