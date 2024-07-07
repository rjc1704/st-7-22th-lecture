export type SignUpStateType = {
  email: string;
  pw: string;
  nickname: string;
};
export type LoginStateType = Omit<SignUpStateType, "nickname">;
