import React from 'react';
import {observer} from 'mobx-react'
import stadium from "../../assets/stadium2.jpeg";


export const StadiumImage: React.FunctionComponent = observer(() => {

    return (
        <div>
            <img src={stadium} style={{borderRadius: '10px'}} width={'100%'} height={'800px'} alt="Stadium" />
        </div>
    );
})

export default StadiumImage;

