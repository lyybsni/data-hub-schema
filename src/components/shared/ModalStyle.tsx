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
  max-height: 45%;
  overflow-y: scroll;

  .modal-input-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 25px 10px;
  }
  
  h3 {
    padding-left: 10px;
    margin: 6px;
  }
`;