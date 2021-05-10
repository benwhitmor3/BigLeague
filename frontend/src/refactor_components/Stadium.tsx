import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {StoreContext} from "../models";
import {useForm} from "react-hook-form";
import {Select} from "./Select";
import {Alert} from "antd";
import CSS from "csstype";

type stadiumConfig = {
    stadium_name: string;
    seats: number;
    boxes: number;
    city: string;
    total: number;
    franchise: string;
};


export const Stadium: React.FunctionComponent = observer(() => {

        const store = useContext(StoreContext)
        const {register, handleSubmit, errors} = useForm<stadiumConfig>();
        const onSubmit = handleSubmit(({stadium_name, seats, boxes, city, total, franchise}: stadiumConfig) => {
            console.log(stadium_name, seats, boxes, city, total, franchise);
            store.mutateUpdateStadium({
                "stadiumInput": {
                    "stadiumName": stadium_name,
                    "seats": seats,
                    "boxes": boxes,
                    "grade": 20,
                    "maxGrade": 20,
                    "homeFieldAdvantage": 0,
                    "cityId": city,
                    "franchiseId": franchise
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
        franchise
      }
    }
            `,
        undefined
            )
        });

        const [seats, setSeats] = useState<number>(0);
        const [boxes, setBoxes] = useState<number>(0);
        const [total, setTotal] = useState<number>(0);
        const [city, setCity] = useState<string>(store.User.franchise.league.citySet[0].id);
        let options = store.User.franchise.league.citySet.map((city: any) => {
                return {value: city.id, label: city.city}
            }
        )


        useEffect(() => {
            setTotal((seats * 15000) + (boxes * 500000));
        }, [seats, boxes]);


        const formStyles: CSS.Properties = {
            backgroundColor: '#d4380d',
            display: "block",
            border: '0px',
            margin: '10px',
            borderRadius: '4px',
            padding: '0.5rem',
            fontSize: '14px',
            color: '#fff2e8',
        };

        const buttonStyles: CSS.Properties = {
            backgroundColor: '#ad2102',
            margin: '5px',
            marginLeft: '10px',
            border: '0px',
            borderRadius: '12px',
            fontSize: '14px',
            color: '#fff2e8',
            width: '20vh',
            padding: '8px',
        };

        if (store.User == undefined) return <div>loading</div>;
        else {
            return (
                <form onSubmit={onSubmit}>
                    <label>Stadium Name</label>
                    <input name="stadium_name" style={formStyles} ref={register({
                        required: {
                            value: true,
                            message: "Stadium name is a required field",
                        },
                        maxLength: {
                            value: 20,
                            message: 'Max stadium name length is 20',
                        },
                    })}/>

                    <label>Seats</label>
                    <input name="seats" type="number" style={formStyles} onChange={event => {
                        setSeats(event.target.valueAsNumber)
                    }} ref={register({
                        required: {
                            value: true,
                            message: "Seats is a required field",
                        },
                        min: {
                            value: 1,
                            message: 'At least 1 seat is required',
                        },
                    })}/>

                    <label>Boxes</label>
                    <input name="boxes" type="number" style={formStyles} onChange={event => {
                        setBoxes(event.target.valueAsNumber)
                    }} ref={register({
                        required: {
                            value: true,
                            message: "Boxes is a required field",
                        },
                        min: {
                            value: 1,
                            message: 'At least 1 box is required',
                        },
                    })}/>

                    <label style={{marginRight: '10px'}}>City</label>
                    <input name="city" style={{display: "none"}} value={city} ref={register({})}/>
                    <Select options={options} value={city}
                           onChange={(city: string) => setCity(city)}/>

                    <input name="total" type="number" style={{display: "none"}} value={total} ref={register({})}/>
                    <h4 style={{marginTop: '10px'}}>{total ? 'Construction Cost: $' + +total / 1000000 + ' million' : ''}</h4>

                    <input name="franchise" style={{display: "none"}} value={store.User.franchise.id} ref={register({})}/>

                    <input type="submit" style={buttonStyles} value="Build Stadium"/>

                    <br/> {errors.stadium_name && <Alert message={errors.stadium_name.message} type="error" closable/>}
                    <br/>
                    <br/> {errors.seats && <Alert message={errors.seats.message} type="error" closable/>}
                    <br/>
                    <br/> {errors.boxes && <Alert message={errors.boxes.message} type="error" closable/>}
                    <br/>

                </form>
            );
        }
    }
)

export default Stadium;
