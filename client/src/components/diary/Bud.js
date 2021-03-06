import React from "react";
import styled from "styled-components";
import { empty } from "../../resources";
import { useNavigateSearch } from "../../modules/hooks";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  white-space: wrap;
  width: 100%;
  height: auto;

  padding-bottom: 1rem;

  .shell {
    width: 100%;
    height: fit-content;
    text-align: start;
    padding: 5px;
    overflow: hidden;
    position: relative;
  }

  .shell:hover {
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.3);
    box-shadow: 7px 4px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  .coverImg {
    object-fit: cover;
    width: 100%;
    height: 180px;
    mix-blend-mode: multiply;
    border: solid 2px rgb(0, 0, 0, 0.1);
  }

  .hide {
    width: 100%;
    height: fit-content;
    color: WhiteSmoke;
    z-index: 1;

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
    top: 1.6%;
    margin: 7%;
    letter-spacing: 0.3rem;
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
    font-size: ${(props) => props.theme.fontWritePageXSmall};
  }

  a {
    color: white;
  }
`;

const Bud = ({ className, src, budName, date, plant_id, setPopupInfo }) => {
  const navigateSearch = useNavigateSearch();

  const goToWrite = () => navigateSearch("/write", { name: `${encodeURI(budName)}`, plant_id: `${plant_id}` });
  const goToListByPlantId = () => navigateSearch("/list", { name: `${encodeURI(budName)}`, plant_id: `${plant_id}` });
  const goToIdAlbum = () => navigateSearch("/album", { name: `${encodeURI(budName)}` });

  const goToManageCalendarByPlantId = () => navigateSearch("/daily/record", { name: `${encodeURI(budName)}` });

  return (
    <Layout className={className}>
      <div className="shell">
        <div className="hide">
          <div className="text" onClick={goToWrite}>
            ????????????
          </div>
          <div className="text" onClick={goToListByPlantId}>
            ????????????
          </div>
          <div className="text" onClick={goToIdAlbum}>
            ??????
          </div>
          <div
            className="text"
            onClick={() => {
              setPopupInfo({ fn: "changeBudImage", plant_id, budName });
            }}>
            ?????? ?????? ??????
          </div>
          <div
            className="text"
            onClick={() => {
              setPopupInfo({ fn: "deleteBud", plant_id });
            }}>
            ????????? ??????
          </div>
          <div className="text" onClick={goToManageCalendarByPlantId}>
            ?????? ?????????
          </div>
        </div>
        <img className="coverImg" src={src || empty.journal} alt={`bg`} />
        <div className="budName">{budName}</div>
        <span className="date">{date}</span>
      </div>
    </Layout>
  );
};

export default Bud;
