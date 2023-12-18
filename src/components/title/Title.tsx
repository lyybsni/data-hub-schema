import React from "react";
import {Hint} from "../../pages/MappingExample/Hint";
import {css} from "@emotion/css";

export const TitleWithHint = (
    props: {
        title: string,
        article: string[]
    }
) => {
    return <div className={titleStyle}>
        <h3>{props.title}</h3>
        <Hint article={props.article}/>
    </div>
};

const titleStyle = css`
  display: flex; 
  flex-direction: row; 
  justify-content: center; 
  align-items: baseline`
;