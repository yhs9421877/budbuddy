import React from "react";
import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto auto;
  flex-direction: column;
  width: 100%;
  /* height: 53%; */

  .shell {
    text-align: start;
    padding: 5px;
    overflow: hidden;
    position: relative;
  }

  .shell:hover {
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 7px 4px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    /* filter: grayscale(100%); */
  }

  .coverImg {
    object-fit: cover;
    width: 100%;
    height: 18vh;
    mix-blend-mode: darken;

    border: solid 2px rgb(0, 0, 0, 0.65);
  }

  .hide {
    width: 100%;
    height: 100%;
    color: WhiteSmoke;
    z-index: 2;

    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    visibility: hidden;

    transition: opacity 0.25s cubic-bezier(0.55, 1.17, 0.75, 0.53);
    opacity: 0;
  }

  .shell:hover > .hide {
    display: block;
    visibility: visible;
    opacity: 1;
  }

  .hide > .text {
    position: relative;
    top: 10%;
    margin: 10%;
    letter-spacing: 0.8vw;
    transition: background-color 0.1s cubic-bezier(0.55, 1.17, 0.75, 0.53);
  }

  .hide > .text:hover {
    background-color: ${(props) => props.theme.hoverColor};
    border-radius: ${(props) => props.theme.borderRadius};
  }

  .budName {
    margin-top: 0.1vw;
  }

  .date {
    font-size: 1.3vw;
  }
`;

const Bud = ({ src, budName, date }) => {
  return (
    <Layout>
      <div className="shell">
        <div className="hide">
          <div className="text">일지쓰기</div>
          <div className="text">앨범</div>
          <div className="text">일지목록</div>
        </div>
        <img className="coverImg" src={src} alt={`bg`} />
        <div className="budName">{budName}</div>
        <span className="date">{date}</span>
      </div>
    </Layout>
  );
};

export default Bud;