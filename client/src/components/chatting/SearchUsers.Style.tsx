import styled from "styled-components";

export const SearchUsersContainer = styled.form`
  z-index: 5;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  margin-top: 10px;
`;
export const SearchBar = styled.input`
  width: 90%;
  height: 30px;
  margin-left: 5%;
  background-color: #e1e1e1;
  border-radius: 100px;
  padding: 5%;
`;

export const SearchedUser = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const CreateNewChatButton = styled.button`
  background-color: #c0c0e9;
  padding: 10px;
  border-radius: 15px;
`;
