import {css} from "@emotion/css";

export const modalStyle = css`
  display: flex;
  flex-direction: column;
  margin: 15%;
  background: rgb(255, 250, 250);
  border: 2px solid grey;
  border-radius: 5px;
  padding: 10px;
  
  // TODO: the overflow should not be in this place
  max-height: 70%;

  h3 {
    padding-left: 10px;
    margin: 6px;
  }
`;