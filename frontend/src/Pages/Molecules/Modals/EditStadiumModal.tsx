import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Modal, Space, Button} from 'antd';
import {observer} from "mobx-react";
import {StoreContext} from "../../../models";
import {useForm} from "react-hook-form";
import {buttonStyles, formStyles, inputStyles, labelStyles} from "../Create/CreateStyles";

interface IVisible {
    editStadiumVisible: boolean;
    setEditStadiumVisible: (visible: boolean) => void;
}

type stadiumConfig = {
    seats: number;
    boxes: number;
};

export const EditStadiumModal: React.FunctionComponent<IVisible> = observer(({editStadiumVisible, setEditStadiumVisible}: IVisible) => {

        const store = useContext(StoreContext)
        const {register, handleSubmit, errors} = useForm<stadiumConfig>();
        const [seats, setSeats] = useState<number>(store.User.franchise.stadium.seats);
        const [boxes, setBoxes] = useState<number>(store.User.franchise.stadium.boxes);
        const [total, setTotal] = useState<any>(0);

        // get franchise season set and filter to most current season
        const [season, setSeason] = useState<any>(store.User.franchise.seasonSet.filter(function (season: any) {
            return season.season === store.User.franchise.seasonSet[store.User.franchise.seasonSet.length - 1].season;
        })[0]);

        useEffect(() => {
            // renovation cost
            let newTotal = 20000000 * Math.log((store.User.franchise.stadium.maxGrade - store.User.franchise.stadium.grade) + 1);
            // adding seats cost
            if (seats > store.User.franchise.stadium.seats) {
                newTotal += ((seats - store.User.franchise.stadium.seats) * 20000)
            }
            // removing seats cost
            if (store.User.franchise.stadium.seats > seats) {
                newTotal += ((store.User.franchise.stadium.seats - seats) * 5000)
            }
            // adding boxes cost
            if (boxes > store.User.franchise.stadium.boxes) {
                newTotal += ((boxes - store.User.franchise.stadium.boxes) * 1000000)
            }
            // removing boxes cost
            if (store.User.franchise.stadium.boxes > boxes) {
                newTotal += ((store.User.franchise.stadium.boxes - boxes) * 250000)
            }

            setTotal(newTotal)

        }, [seats, boxes]);


        const onSubmit = handleSubmit(({seats, boxes}: stadiumConfig) => {
            store.mutateUpdateStadium({
                    "stadiumInput": {
                        "stadiumName": store.User.franchise.stadium.stadiumName,
                        "seats": seats,
                        "boxes": boxes,
                        "grade": store.User.franchise.stadium.maxGrade,
                        "maxGrade": store.User.franchise.stadium.maxGrade,
                        "homeFieldAdvantage": 0,
                        "cityId": store.User.franchise.stadium.city.id,
                        "franchiseId": store.User.franchise.id
                    },
                },
                `
                stadium{
                    __typename
                    id
                    stadiumName
                    seats
                    boxes
                    grade
                    maxGrade
                    homeFieldAdvantage
                    city{
                        __typename
                        id
                        city
                    }
                    franchise{
                        __typename
                        id
                        league{
                            __typename
                            id
                            franchiseSet{
                                __typename
                                id
                                stadium{
                                    __typename
                                    id
                                }
                            }
                        }
                    }
                }
                `,
                undefined
            ).then(() => store.mutateUpdateSeason({
                    "seasonInput": {
                        'franchiseId': season.franchise.id,
                        'season': season.season,
                        'ready': false,
                        'wins': season.wins,
                        'losses': season.losses,
                        'ppg': season.ppg,
                        'std': season.std,
                        'championships': season.championships,
                        'bonuses': season.bonuses,
                        'penalties': season.penalties,
                        'fanBase': season.fanBase,
                        'fanIndex': season.fanIndex,
                        'advertising': season.advertising,
                        'ticketPrice': season.ticketPrice,
                        'ticketsSold': season.ticketsSold,
                        'boxPrice': season.boxPrice,
                        'boxesSold': season.boxesSold,
                        'revenue': season.revenue,
                        'expenses': (season.expenses + total),
                    },
                },
                `
                        __typename
                        season{
                          __typename
                          id
                          franchise{
                            __typename
                            id
                            seasonSet{
                              __typename
                              id
                              season
                              ready
                              wins
                              losses
                              ppg
                              std
                              championships
                              bonuses
                              penalties
                              fanBase
                              fanIndex
                              advertising
                              ticketPrice
                              ticketsSold
                              boxPrice
                              boxesSold
                              revenue
                              expenses
                            }
                          }
                        }
                `,
                undefined
            ))
            setTotal(0)
            setEditStadiumVisible(false);
        });

        return (
            <div>
                <Modal
                    centered
                    closable={false}
                    visible={editStadiumVisible}
                    // onOk={() =>
                    //     onSubmit()
                    // }
                    // onCancel={() => setEditStadiumVisible(false)}
                    footer={[
                        <Button key={1} style={{...buttonStyles, ...{width: '100px'}}} onClick={() => setEditStadiumVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key={2} style={{...buttonStyles, ...{width: '100px'}}} onClick={() => onSubmit()}>
                            Confirm
                        </Button>,
                    ]}
                    width={'600px'}
                >
                    <form style={formStyles} onSubmit={onSubmit}>
                        <Space direction="vertical">

                            <label style={labelStyles}>Seats</label>
                            <input name="seats" type="number" style={inputStyles}
                                   defaultValue={store.User.franchise.stadium.seats}
                                   onChange={event => {
                                       setSeats(event.target.valueAsNumber)
                                   }}
                                   ref={register({
                                       required: {
                                           value: true,
                                           message: "Seats is a required field",
                                       },
                                       min: {
                                           value: 1,
                                           message: 'At least 1 seat is required',
                                       },
                                   })}/>

                            <label style={labelStyles}>Boxes</label>
                            <input name="boxes" type="number" style={inputStyles}
                                   defaultValue={store.User.franchise.stadium.boxes}
                                   onChange={event => {
                                       setBoxes(event.target.valueAsNumber)
                                   }}
                                   ref={register({
                                       required: {
                                           value: true,
                                           message: "Boxes is a required field",
                                       },
                                       min: {
                                           value: 1,
                                           message: 'At least 1 box is required',
                                       },
                                   })}/>

                            <label style={labelStyles}>Current Grade</label>
                            <span>{store.User.franchise.stadium.grade}</span>
                            <label style={labelStyles}>Renovated Grade</label>
                            <span>{store.User.franchise.stadium.maxGrade}</span>
                            <h3>{total
                                ?
                                'Renovation Cost: $' + (total / 1000000).toFixed(3) + ' million'
                                :
                                'Renovation Cost: $0'}</h3>
                        </Space>
                    </form>
                </Modal>

            </div>
        );
    }
)

export default EditStadiumModal;