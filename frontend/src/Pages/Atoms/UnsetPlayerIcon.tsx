import React from 'react';
import {observer} from 'mobx-react'


export const UnsetPlayerIcon: React.FunctionComponent = observer(() => {

    return (
        <svg xmlSpace="preserve"
             className="ld ld-bounce-in"
             style={{animationDuration: "5s"}}
             viewBox="0 0 100 100"
             xmlns="http://www.w3.org/2000/svg"
             width="50px" height="50px">
            <g>
                <path fill="#f5e6c8"
                      d="M60.688 89.375H39.313c-8.595 0-15.563-6.968-15.563-15.563V70c0-13.876 11.249-25.125 25.125-25.125h2.25C65.001 44.875 76.25 56.124 76.25 70v3.813c0 8.594-6.968 15.562-15.562 15.562z">
                </path>
                <circle fill="#f5e6c8" r="21.25" cy="31.875" cx="50"></circle>
            </g>
            <g>
                <circle stroke-miterlimit="10" stroke-width="4" stroke="#000" fill="#fff" r="14.738" cy="69.814"
                        cx="69.793"></circle>
            </g>
            <g>
                <path fill="#666" d="M63.147 71.813h-.5a2 2 0 0 1 0-4h.5a2 2 0 0 1 0 4z"></path>
            </g>
            <g>
                <path fill="#666" d="M70.197 71.813h-.708a2 2 0 0 1 0-4h.708a2 2 0 0 1 0 4z"></path>
            </g>
            <g>
                <path fill="#666" d="M76.938 71.813h-.5a2 2 0 0 1 0-4h.5a2 2 0 0 1 0 4z"></path>
            </g>
        </svg>
    );
})

export default UnsetPlayerIcon;


