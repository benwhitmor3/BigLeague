import React from 'react';
import {observer} from 'mobx-react'
import {Typography, Divider, Card, Row, List, Tag, Image} from 'antd';
import image from "../../assets/PlayerDistribution.png"
import {colour, suit_icon} from "../Utils/tablefunctions";

const {Title, Paragraph, Text} = Typography;

export const Instructions: React.FunctionComponent = observer(() => {

    const cities = [
        {city: "Los Angeles"},
        {city: "New York"},
        {city: "London"},
        {city: "Chicago"},
        {city: "San Francisco"},
        {city: "Washington"},
        {city: "Phoenix"},
        {city: "Indianapolis"},
        {city: "Philadelphia"},
        {city: "Houston"},
        {city: "Dallas"},
        {city: "Denver"},
        {city: "Boston"},
        {city: "Las Vegas"},
        {city: "Seattle"},
        {city: "Atlanta"},
        {city: "Miami"},
        {city: "Toronto"},
        {city: "Vancouver"},
        {city: "Detroit"},
    ];

    return (
        <div>
            <Card style={{...{width: '100%'}}}>
                <Typography style={{fontSize: '15px'}}>
                    <Title level={3}>The Big League Rulebook</Title>
                    Congratulations, you are now the owner of a major sports franchise! You will
                    be responsible for making every decision facing your team, from where to locate to whom to
                    draft. In this section is a basic introduction to the game. At the end, some additional notes
                    and strategy suggestions will be discussed. The Big League is a game of entrepreneurship,
                    economics, and statistical acumen. As an owner, you will need to put together a team that is
                    both dominant on the field and profitable. It is no easy task, but it should be said at the
                    start that while this game appears at first glance to be overly complicated, it gets smaller the
                    more you play it. As managers, you will need to field a team of five players acquired through
                    the draft and free agency. You will also have the option to build a rotation of up to three
                    players who can be substituted in when your starting players falter. To support these players,
                    you will also hire a coach whose special attributes bring additional benefits, and you’ll select
                    a General Manager who orients your team to a specific long-run strategy. Once set, your team
                    will play against each other in a 7-game series. You will also be responsible for managing
                    your team’s finances and resources. This means building a stadium, setting ticket prices, and
                    selecting actions which can produce a wide range of benefits from upgrading your stadium to
                    improving your players. On the financial side, you will also have to negotiate contracts with
                    players and maintain your stadium. In total, 10 seasons can be played, hundreds of players will
                    come through the ranks, and billions of dollars will be made. Good luck!
                    <Divider/>
                    <Title level={4}>Cities</Title>
                    Franchises can choose to locate in one of 20 markets:
                    <Row gutter={[0, 0]}>
                        <List
                            grid={{gutter: 16, column: 5}}
                            dataSource={cities}
                            renderItem={city => (
                                <List.Item>
                                    <Tag style={{color: "#000000", fontSize: '13px'}} color="#EFF5FA">{city.city}</Tag>
                                </List.Item>
                            )}
                        />
                    </Row>
                    Each market has a City Value (CV) which contributes to a team’s fan base. Cities are randomly
                    assigned a value between 5 and 12.
                    <Divider/>
                    <Title level={4}>Stadiums</Title>
                    To play, teams need stadiums. Stadiums can be built in any of the listed cities and can be built
                    to any size. When building a new stadium, teams must determine the number of regular seats the
                    stadium will hold and how many luxury boxes will be available. These choices can be changed
                    after the stadium is built but are editable at an extra cost.
                    <Title level={5}>Construction Costs</Title>
                    The cost to construct a new stadium is $15,000 per regular seat and $500,000 per luxury box. For
                    example, a 60,000-seat arena with 100 luxury boxes would cost $900,000,000 + $50,000,000 =
                    $950,000,000 to build. At the start of a season, franchises can choose to change seats or luxury
                    boxes to their already built stadium. Additional seats cost $20,000 each, while additional
                    luxury boxes cost $1,000,000 each. It costs $5,000 to remove a seat, and $250,000 to remove a
                    luxury box.
                    <Title level={5}>Grade and Renovation Costs</Title>
                    <Paragraph style={{marginBottom: '10px'}}>
                        A new stadium starts off with a grade of 20 and loses one point each season. Stadium grades are
                        an important component of demand for tickets to games. A higher stadium score draws more fans to
                        games. The stadium score can be increased through upgrades constructed by spending an action
                        (described later).
                    </Paragraph>
                    <Paragraph>
                        Stadiums can be renovated and returned to their highest grade. The cost of
                        renovation is determined by the following formula:
                        <Text style={{fontStyle: 'italic', fontSize: '15px'}}> $20,000,000 ∗ ln(Max Grade - Current
                            Grade). </Text>
                        The effect of renovation is to set the current grade back to its max grade, returning the
                        stadium to a grade of 20 plus whatever other bonuses have previously been applied to the
                        stadium.
                    </Paragraph>
                    <Title level={5}>Upkeep</Title>
                    Stadiums degrade over time, which is not only reflected in the decay of the stadium grade, but
                    also in the need to pay upkeep costs. The cost of operating the stadium is $200 per
                    seat, $20,000 per luxury box, and $200,000 per stadium grade.
                    <Divider/>
                    <Title level={4}>General Managers</Title>
                    <Paragraph>
                        GMs play a similar role for a Big League franchise as they do in other professional sports, they
                        set the tone and mission of the franchise. Unlike other hires, owners do not need to worry about
                        the market for GMs. Instead, at the start of each season, owners simply choose which GM trait
                        they are setting for their franchise. Those traits are as follows:
                    </Paragraph>
                    <Paragraph>
                        <ul>
                            <li>
                                <Text><Text strong>Facilitator:</Text> Gives the team two additional actions for the
                                    season</Text>
                            </li>
                            <li>
                                <Text><Text strong>Promoter: </Text> Unlocks all the Promotions actions</Text>
                            </li>
                            <li>
                                <Text><Text strong>Recruiter:</Text> Provides a +2 bonus to all player contracts</Text>
                            </li>
                            <li>
                                <Text><Text strong>Scouter:</Text> Unlocks S EPV (a reduced EPV error by 50%)</Text>
                            </li>
                            <li>
                                <Text><Text strong>Suitor:</Text> Disables all suit effects on players</Text>
                            </li>
                            <li>
                                <Text><Text strong>Trainer:</Text> Unlocks Personal Trainers actions and can train one
                                    player per action</Text>
                            </li>
                        </ul>
                    </Paragraph>
                    <Divider/>
                    <Title level={4}>Players</Title>
                    <Paragraph>
                        Each team will need to field a minimum of <Text underline>five</Text> starting players, with the
                        option of fielding
                        three additional players known as the rotation players. Each player is accompanied by three
                        statistics: <Tag color="#A0A6A4">age</Tag>, <Tag color="#A0A6A4">player value</Tag>, and <Tag
                        color="#A0A6A4">suit</Tag>
                    </Paragraph>
                    <Title level={4}>Age and Retirement</Title>
                    <Paragraph>
                        A player’s age can range from 18 to 30 and impacts their development. Most players will enter
                        the game at the age of 18 to 22, but in the first season they will be older. All players retire
                        after age 30 or when their player value drops below 8.
                    </Paragraph>
                    <Title level={4}>Player Value</Title>
                    <Paragraph>
                        The player value (PV) is the player’s average score per game before any adjustments are made.
                        The player’s actual score in each game will be determined randomly, according to the normal
                        distribution, with the given mean and a standard deviation of 9. For a PV of 15, the score
                        distribution will look like this:
                        <div style={{textAlign: 'center', margin: '10px'}}>
                            <Image
                                width={'100vh'}
                                src={image}
                            ></Image>
                        </div>
                        The player value will never be known precisely to anyone. Owners will only have access to an
                        estimated player value (EPV) made with 3 standard deviation error. The Scouter GM will allow
                        access to a scouted estimated player value (S EPV) made with 2 standard deviation error. They
                        can also infer using historical EPV values from the player history table.
                    </Paragraph>
                    <Title level={4}>Suit</Title>
                    Each player also comes with a suit:
                    <Text> </Text>
                    <Tag icon={suit_icon("heart")} color={colour("heart")} key={"heart"}>
                        {"heart".toUpperCase()}
                    </Tag>
                    <Tag icon={suit_icon("spade")} color={colour("spade")} key={"spade"}>
                        {"spade".toUpperCase()}
                    </Tag>
                    <Tag icon={suit_icon("diamond")} color={colour("diamond")} key={"diamond"}>
                        {"diamond".toUpperCase()}
                    </Tag>
                    <Tag icon={suit_icon("club")} color={colour("club")} key={"club"}>
                        {"club".toUpperCase()}
                    </Tag>
                    <Paragraph>
                        Each player is generated with a mean PV based on their suit and a standard deviation of 3.
                        their suit with a standard deviation of 3. These suits, when mixed in different ways,
                        impact the performance of the players on the team. Those impacts are as follows:
                    </Paragraph>
                </Typography>
            </Card>
        </div>
    );
})

export default Instructions;