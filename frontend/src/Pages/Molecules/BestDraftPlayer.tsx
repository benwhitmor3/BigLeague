import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {Statistic, Tag} from 'antd';
import {StoreContext} from "../../models";
import {observer} from "mobx-react";
import {colour, suit_icon} from "../Utils/TableFunctions";

export const BestDraftPlayer: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)

        return (
            <div>
                {(store.User.league.bestDraftPlayer && store.User.league.draftingFranchise !== store.User.franchise) ?
                    <Statistic
                        className="ld ld-flip-v-in"
                        style={{
                            display: "block", marginLeft: 'auto', marginRight: 'auto',
                            padding: '10px',
                            boxShadow: "0px 0px 4px 0px #D0D8F3",
                            borderRadius: "4px",
                            marginTop: "15px",
                            textAlign: 'center',
                        }}
                        value={store.User.league.bestDraftPlayer.name}
                        valueStyle={{color: '#414141'}}
                        prefix={<Tag icon={suit_icon(store.User.league.bestDraftPlayer.suit)}
                                     color={colour(store.User.league.bestDraftPlayer.suit)}
                                     key={store.User.league.bestDraftPlayer.suit}>
                            {store.User.league.bestDraftPlayer.suit.toUpperCase()}
                        </Tag>}
                    />
                    : null}
            </div>
        );
    }
)

export default BestDraftPlayer;
