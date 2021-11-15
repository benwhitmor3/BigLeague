import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {StoreContext} from "../models";
import {observer} from "mobx-react";
import SeasonSimButton from "./Molecules/SeasonSimButton";
import SeasonTable from "./Organisms/SeasonTable";
import Loading from "./Molecules/Loading";


export const Season: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        if (store.User?.franchise == null)
            return <Loading/>
        else
            return (
            <div>
                <SeasonSimButton/>
                <SeasonTable/>
            </div>
        );
    }
)

export default Season;