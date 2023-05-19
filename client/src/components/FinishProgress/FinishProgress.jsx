import React from "react";
import "./FinishProgress.css";
import * as TiIcons from "react-icons/ti";

let FinishProgress = ({ number }) => {
  return (
    <div className="FinishProgress">
      <div className="Finish-Account-Header">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/marbelladb-ee6df.appspot.com/o/Logo.png?alt=media&token=af753207-9ec2-404f-9912-3aa776192663"
          alt="Logo"
          className="Finish-Logo-Image"
        />
        <div className="Finish-Purchase-Progress">
          <div className="Progress-1">
            <div className="Progress-Lines">
              {number === 1 ? (
                <span className="Progress-Circle-Active">1</span>
              ) : (
                <span className="Progress-Circle">
                  <TiIcons.TiTick />
                </span>
              )}
              <hr className="Progress-Line" />
            </div>
            <h5
              className={
                number === 1 ? "Progress-Text-Active" : "Progress-Text"
              }
            >
              INFORMACION
            </h5>
          </div>
          <div className="Progress-2">
            <div className="Progress-Lines">
              <hr className="Progress-Line-Left" />
              {number === 2 ? (
                <span className="Progress-Circle-Active">2</span>
              ) : (
                <span className="Progress-Circle">
                  {number === 1 ? "2" : <TiIcons.TiTick />}
                </span>
              )}
              <hr className="Progress-Line" />
            </div>
            <h5
              className={
                number === 2 ? "Progress-Text-Active" : "Progress-Text"
              }
            >
              ENVIO
            </h5>
          </div>
          <div className="Progress-2">
            <div className="Progress-Lines">
              <hr className="Progress-Line-Left" />
              <span
                className={
                  number === 3 ? "Progress-Circle-Active" : "Progress-Circle"
                }
              >
                {number <= 3 ? "3" : <TiIcons.TiTick />}
              </span>
              <hr className="Progress-Line" />
            </div>
            <h5
              className={
                number === 3 ? "Progress-Text-Active" : "Progress-Text"
              }
            >
              PAGO
            </h5>
          </div>
          <div className="Progress-3">
            <div className="Progress-Lines">
              <hr className="Progress-Line-Left" />
              <span
                className={
                  number === 4 ? "Progress-Circle-Active" : "Progress-Circle"
                }
              >
                4
              </span>
            </div>
            <h5
              className={
                number === 4 ? "Progress-Text-Active" : "Progress-Text"
              }
            >
              COMPRA TERMINADA
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishProgress;
