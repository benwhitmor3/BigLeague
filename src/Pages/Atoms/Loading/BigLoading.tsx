import React from 'react';
import {observer} from "mobx-react";

interface IAnimation {
    animation: string;
}

export const BigLoading: React.FunctionComponent<IAnimation> = observer(({animation}: IAnimation) => {


        return (
            <div className="overlay"
                 style={{
                     opacity: '1',
                     width: '80%',
                     height: '100%',
                     zIndex: 100,
                     top: '20%',
                     left: '10%',
                     position: 'fixed',
                     textAlign: 'center',
                 }}>
                {/*CLUB*/}
                <svg className={animation} style={{animationDuration: "1s"}} viewBox="0 0 100 100"
                     xmlns="http://www.w3.org/2000/svg"
                     width="20%" height="60%">
                    <g fill="#61DAFB">
                        <path strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="3.5"
                              stroke="#333" fill="#63d13c"
                              d="M71 39.094c-3.355 0-6.502.877-9.237 2.403C66.165 38.017 69 32.641 69 26.594c0-10.493-8.507-19-19-19-10.494 0-19 8.507-19 19 0 6.047 2.835 11.423 7.237 14.903A18.9 18.9 0 0 0 29 39.094c-10.494 0-19 8.507-19 19s8.507 19 19 19c5.33 0 10.14-2.201 13.591-5.736L36.14 92.407h27.455l-6.491-21.386c3.469 3.727 8.403 6.073 13.897 6.073 10.493 0 19-8.507 19-19s-8.508-19-19.001-19z"></path>
                    </g>
                </svg>
                {/*DIAMOND*/}
                <svg className={animation} style={{animationDuration: "1.1s"}} viewBox="0 0 100 100" y="0" x="0"
                     xmlns="http://www.w3.org/2000/svg"
                     width="20%" height="60%">
                    <g fill="#61DAFB">
                        <path strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="3.5"
                              stroke="#333" fill="#3097ff"
                              d="M78.484 50L50 90.692 21.516 50 50 9.307z"></path>
                    </g>
                </svg>
                {/*HEART*/}
                <svg className={animation} style={{animationDuration: "1.2s"}} viewBox="0 0 100 100" y="0" x="0"
                     xmlns="http://www.w3.org/2000/svg"
                     width="20%" height="60%">
                    <g fill="#61DAFB">
                        <path strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="3.5"
                              stroke="#333" fill="#ff3f43"
                              d="M87.5,40.4C87.5,68.1,50,87.5,50,87.5S12.5,68.1,12.5,40.4S50,13,50,39.4C50,13.4,87.5,12.7,87.5,40.4z"></path>
                    </g>
                </svg>
                {/*SPADE*/}
                <svg className={animation} style={{animationDuration: "1.3s"}} viewBox="0 0 100 100" y="0" x="0"
                     xmlns="http://www.w3.org/2000/svg"
                     width="20%" height="60%">
                    <g fill="#61DAFB">
                        <path strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="3.5"
                              stroke="#333" fill="#FFD447"
                              d="M50 9.307S10 35.761 10 57.852v.265c0 11.046 8.954 20 20 20h0c5.698 0 9.467-2.556 13.038-6.335.759-.503 2.073-.021 1.712 1.023l-6.195 17.888h22.89L55.25 72.505c-.361-1.044.953-1.825 1.712-1.023 3.572 3.779 7.34 6.335 13.038 6.335h0c11.046 0 20-8.954 20-20v-.265C90 35.761 50 9.307 50 9.307z"></path>
                    </g>
                </svg>
            </div>
        );
    }
)

export default BigLoading;

