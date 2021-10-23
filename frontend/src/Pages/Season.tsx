import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Spin} from 'antd';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import SeasonSimButton from "./Molecules/SeasonSimButton";
import SeasonTable from "./Organisms/SeasonTable";


export const Season: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User == undefined || store.User.franchise == undefined) return <Spin size="large"/>;
        return (
            <div>
                <SeasonSimButton/>
                <SeasonTable/>
            </div>
        );
    }
)

export default Season;