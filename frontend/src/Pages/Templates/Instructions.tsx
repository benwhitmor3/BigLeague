import React from 'react';
import {observer} from 'mobx-react'
import {Typography, Divider, Card, Col, Row, List, Tag, Image} from 'antd';
import PlayerDistribution from "../../assets/PlayerDistribution.png"
import DevelopmentDistribution from "../../assets/DevelopmentDistribution.png"
import Actions from "../../assets/Actions.png"
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

    const suits = [
        {
            suit: "Club", pv: 16, description: "Support the team’s star, aiding spades on the field. Each spade on" +
                " a team receives a +1 bonus for each club on the team."
        },
        {
            suit: "Diamond",
            pv: 17,
            description: "Fill gaps in a team, and are at their best when they fill a unique " +
                "role on the team. A team with just 1 diamond player gets a +2 bonus, and that bonus is reduced by one" +
                " for each additional diamond on the team."
        },
        {
            suit: "Heart",
            pv: 15,
            description: "Find their glory in the success of the team, and play with everything " +
                "they have. Each heart adds one point to the PV of each non-heart on the team. "
        },
        {
            suit: "Spade", pv: 18, description: "Typically highly skilled players who tend to dominate the " +
                "game but don’t mix well with other spades. Each spade on a team subtracts one point from the " +
                "PV of each other spade on the team."
        },
    ];


    return (
        <div>
            <Card style={{...{width: '100%'}}}>
                <Typography style={{fontSize: '15px'}}>
                    <Title level={3}>The Big League Rulebook</Title>
                    Congratulations, you are now the owner of a major sports franchise! You will
                    be responsible for making every decision facing your franchise, from where to locate to whom to
                    draft. In this section is a basic introduction to the game. At the end, some additional notes
                    and strategy suggestions will be discussed. The Big League is a game of entrepreneurship,
                    economics, and statistical acumen. As an owner, you will need to put together a team that is
                    both dominant on the field and profitable. It is no easy task, but it should be said at the
                    start that while this game appears at first glance to be overly complicated, it gets smaller the
                    more you play it. As managers, you will need to field a team of five players acquired through
                    the draft and free agency. You will also have the option to build a rotation of up to three
                    players who can be substituted in when your starting players falter. To support these players,
                    you will also hire a coach whose special attributes bring additional benefits, and you’ll select
                    a General Manager who orients your franchise to a specific long-run strategy. Once set, your team
                    will play against each other in a 7-game series. You will also be responsible for managing
                    your franchise’s finances and resources. This means building a stadium, setting ticket prices, and
                    selecting actions which can produce a wide range of benefits from upgrading your stadium to
                    improving your players. On the financial side, you will also have to negotiate contracts with
                    players and maintain your stadium. In total, 10 seasons can be played, hundreds of players will
                    come through the ranks, and billions of dollars will be made. Good luck!
                    <Divider/>
                    <Title level={4}>Cities</Title>
                    <Paragraph>
                        Franchises can choose to locate in one of 20 markets:
                    </Paragraph>
                    <Row gutter={[0, 0]}>
                        <List
                            grid={{gutter: 16, column: 5}}
                            dataSource={cities}
                            renderItem={city => (
                                <List.Item>
                                    <Tag style={{color: "#000000", fontSize: '14px'}} color="#D0E0F0">{city.city}</Tag>
                                </List.Item>
                            )}
                        />
                    </Row>
                    Each market has a City Value which contributes to a franchise’s Fan Base. Cities are randomly
                    assigned a value between 5 and 12.
                    <Divider/>
                    <Title level={4}>Stadiums</Title>
                    To play, teams need stadiums. Stadiums can be built in any of the listed cities and can be built
                    to any size. When building a new stadium, franchises must determine the number of regular seats the
                    stadium will hold and how many luxury boxes will be available. These choices can be changed
                    after the stadium is built but are editable at an extra cost.
                    <Title level={5}>Construction Costs</Title>
                    The cost to construct a new stadium is $15,000 per regular seat and $500,000 per luxury box:
                    <div style={{textAlign: 'center', margin: '10px', fontStyle: 'italic'}}>
                            <Text> Construction Cost = $15,000 ∗ StadiumSeats + $500,000 ∗ StadiumBoxes</Text>
                        </div>
                    At the start of a season, franchises can choose to change seats or luxury boxes to their already built
                    stadium. Additional seats cost $20,000 each, while additional luxury boxes cost $1,000,000 each.
                    It costs $5,000 to remove a seat, and $250,000 to remove a luxury box.
                    <Title level={5}>Grade and Renovation Costs</Title>
                    <Paragraph style={{marginBottom: '10px'}}>
                        A new stadium starts off with a grade of 20 and loses one point each season. Stadium grades are
                        an important component of demand for tickets to games. A higher stadium score draws more fans to
                        games. The stadium score can be increased through upgrades constructed by spending an action.
                    </Paragraph>
                    <Paragraph>
                        Stadiums can be renovated and returned to their highest grade. The cost of
                        renovation is determined by the following formula:
                        <div style={{textAlign: 'center', margin: '10px', fontStyle: 'italic'}}>
                            <Text> Renovation Cost = $20,000,000 ∗ ln(MaxGrade - CurrentGrade)</Text>
                        </div>
                        Where ln is the natural log. The effect of renovation is to set the current grade back to its
                        max grade, returning the stadium to a grade of 20 plus whatever other bonuses have previously
                        been applied to the stadium.
                    </Paragraph>
                    <Title level={5}>Upkeep</Title>
                    Stadiums degrade over time, which is not only reflected in the decay of the stadium grade, but
                    also in the need to pay upkeep costs:
                    <div style={{textAlign: 'center', margin: '10px', fontStyle: 'italic'}}>
                            <Text> Upkeep Cost = $200 ∗ StadiumSeats + $20,000 ∗ StadiumBoxes + $200,000 ∗ StadiumGrade</Text>
                        </div>
                    <Divider/>
                    <Title level={4}>General Managers</Title>
                    <Paragraph>
                        GMs play a similar role for a Big League franchise as they do in other professional sports, they
                        set the tone and mission of the franchise. Unlike other hires, owners do not need to worry about
                        the market for GMs. Instead, at the start of each season, owners simply choose which GM trait
                        they are setting for their franchise. Those traits are as follows:
                    </Paragraph>
                    <ul>
                        <li>
                            <Text><Text strong>Facilitator:</Text> Gives the franchise two additional actions for the
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
                    <Divider/>
                    <Title level={4}>Players</Title>
                    <Paragraph>
                        Each team will need to field a minimum of <Text underline>five</Text> starting players, with the
                        option of fielding three additional players known as rotation players. Each player is
                        accompanied by three statistics: age, player value, suit
                    </Paragraph>
                    <Title level={5}>Age and Retirement</Title>
                    <Paragraph>
                        A player’s age can range from 18 to 30 and impacts their development. Most players will enter
                        the game at the age of 18 to 22, but in the first season they will be older. All players retire
                        after age 30 or when their player value drops below 8.
                    </Paragraph>
                    <Title level={5}>Player Value</Title>
                    <Paragraph>
                        Player Value (PV) is the player’s average score per game before any adjustments are made.
                        The player’s actual score in each game will be determined randomly, according to the normal
                        distribution, with the given mean and a standard deviation of 9. For a PV of 15, the score
                        distribution will look like this:
                        <div style={{textAlign: 'center', marginBottom: '20px'}}>
                            <Image
                                width={'100vh'}
                                src={PlayerDistribution}
                            ></Image>
                        </div>
                        Owners will only have access to an Estimated Player Value (EPV).
                        The <Text style={{fontStyle: 'italic'}}> Scouter </Text> GM will provide an additional
                        Scouted Estimated Player Value (S EPV). Owners can also infer EPV using historical values
                        from the player history table.
                    </Paragraph>
                    <Title level={5}>Suit</Title>
                    <Paragraph>
                        Each player is generated based on their suit with a standard deviation of 3. When mixed
                        in different ways, these suits give a bonus to a team's score, know as the Suit Bonus.
                        A player will be generated with one of four suits:
                    </Paragraph>
                    <List
                        style={{textAlign: 'center'}}
                        grid={{gutter: 16, column: 4}}
                        dataSource={suits}
                        renderItem={suit => (
                            <List.Item>
                                <Tag style={{marginBottom: '5px'}} icon={suit_icon(suit.suit)} color={colour(suit.suit)}
                                     key={suit.suit}>
                                    {suit.suit.toUpperCase()}
                                </Tag>
                                <br/>
                                <Text strong>Mean PV: </Text>
                                <Text> {suit.pv}</Text>
                                <br/>
                                <Text strong>Description: </Text>
                                <Text> {suit.description}</Text>
                            </List.Item>
                        )}
                    />
                    Only the suits of the five starting players are taken into consideration when determining bonuses or
                    penalties, and those bonuses or penalties are applied to the team for the entire season, regardless
                    of substitutions. The maximum total bonus for suits is 9, while the minimum is -20.
                    <Title level={5}>Player Development</Title>
                    <Paragraph>
                        After each season, a player develops, which could mean growth or decay in PV. Their development
                        is
                        drawn from the normal distribution, with an age-adjusted mean and a standard deviation of one.
                        Noting first that the convention N(0,1) represents the standard normal distribution with a mean
                        of
                        zero and a standard deviation of one, the following table describes the base rates of
                        development:
                    </Paragraph>
                    <div style={{marginBottom: '20px'}}>
                        <Row>
                            <Col style={{textAlign: 'center'}} offset={10}>
                                <Row><Text strong>Ages</Text></Row>
                                <Row><Text>18 – 20</Text></Row>
                                <Row><Text>21 – 23</Text></Row>
                                <Row><Text>24 – 26</Text></Row>
                                <Row><Text>27 – 30</Text></Row>
                            </Col>
                            <Col style={{textAlign: 'center'}} offset={2}>
                                <Row><Text strong>Development Distribution</Text></Row>
                                <Row><Text> N(1,1)</Text></Row>
                                <Row><Text>N(0,1)</Text></Row>
                                <Row><Text>N(-1,1)</Text></Row>
                                <Row><Text>N(-2,1)</Text></Row>
                            </Col>
                        </Row>
                    </div>
                    <Paragraph>
                        What this means is that players develop randomly. A 19-year-old player is expected to improve in
                        player value by 1 for the next season, but it is possible for them to improve by more or even
                        decay.
                        These distributions can be altered using the <Text
                        style={{fontStyle: 'italic'}}> Trainer </Text> General Manager. Below is a table
                        giving the odds of each outcome based on the distribution:
                    </Paragraph>
                    <div style={{textAlign: 'center'}}>
                        <Image
                            width={'70vh'}
                            src={DevelopmentDistribution}
                        ></Image>
                    </div>
                    <Divider/>
                    <Title level={4}>Teams</Title>
                    <Title level={5}>Scoring</Title>
                    Your team will consist of five starting players and up to three bench players. Your score in a
                    particular game will be determined by calculating the individual contributions of the five starting
                    players and adding them together with bonuses. All players have a standard deviation of 9.
                    <Title level={5}>Rotation and Substitution</Title>
                    Your team can consist of up to three rotation players, though owners can opt to field fewer.
                    These players will only enter a game if a starting player performs at two standard deviations
                    or more below their player value. When that is the case, your coach will substitute in the best
                    scoring bench player, followed by the second and third best scoring players if allowed.
                    <Divider/>
                    <Title level={4}>Coaching</Title>
                    <Paragraph>
                        Each team is required to hire a coach from the pool of available coaches. Each coach is
                        different, and has two of eight possible attributes which modify your team’s performance. Those
                        attributes are listed in the table below:
                    </Paragraph>
                    <ul>
                        <li>
                            <Text><Text strong>Clutch: </Text> Adds +6 to the score in all losing games</Text>
                        </li>
                        <li>
                            <Text><Text strong>Fame: </Text> Adds a +5 bonus to your fan index</Text>
                        </li>
                        <li>
                            <Text><Text strong>Focus:</Text> Reduces the S.D. for each player to 2</Text>
                        </li>
                        <li>
                            <Text><Text strong>Guts:</Text> Increases the S.D. for each player by 5</Text>
                        </li>
                        <li>
                            <Text><Text strong>Road:</Text> Negates the opponents home-field advantage</Text>
                        </li>
                        <li>
                            <Text><Text strong>Substitution:</Text> Calls in a rotation player at 1 S.D. below expected
                                value</Text>
                        </li>
                        <li>
                            <Text><Text strong>Teamwork:</Text> Adds +3 to sum of player values for all games</Text>
                        </li>
                        <li>
                            <Text><Text strong>Underdog:</Text> Adds 40% of difference in starter PVs when an
                                underdog</Text>
                        </li>
                    </ul>
                    <Divider/>
                    <Title level={4}>Player Contracts</Title>
                    Whenever you sign a new player, you will need to negotiate a contract with them. Contracts consist
                    of three elements: salary, length, and clauses. Players grade the contract offered to them based on
                    these elements.
                    <Title level={5}>Estimated Player Value</Title>
                    Each player is given an EPV based on the following:
                    <div style={{textAlign: 'center', margin: '10px', fontStyle: 'italic'}}>
                        <Text>EPV = PV + ε</Text>
                    </div>
                    Where PV is the player’s true Player Value, or the average points per game they will score on their
                    own, and ε is a random error term, drawn from a normal distribution with a mean of 0 and standard
                    deviation of 3. The <Text style={{fontStyle: 'italic'}}> Scouter </Text> GM reduces the standard
                    deviation of this error term to 2 with its S EPV. This is, essentially, an estimate of the players
                    skills. It is rarely exact but is correct on average.
                    <Title level={5}>Clauses</Title>
                    There are three different clauses that can be inserted into player contracts.
                    <ul>
                        <li>
                            <Text><Text strong>Team Option: </Text> allows the team to terminate a player’s contract at
                                the beginning of a season,
                                even if that contract was supposed to continue.</Text>
                        </li>
                        <li>
                            <Text><Text strong>Player Option: </Text> allows a player to choose to terminate their
                                contract with a team and become a free agent. If the option is in effect, the player
                                will leave the team if their salary is less than 75% of the average for their
                                EPV.</Text>
                        </li>
                        <li>
                            <Text><Text strong>Renewal Clause:</Text> allows the team to re-sign a player after their
                                contract ends for the same salary for one additional year. Teams can choose to make this
                                clause repeatable, meaning the team could force a re-sign each year indefinitely. A
                                renewal clause cannot override a player option. If a player has an option, and chooses
                                to leave, nothing can stop that from happening.</Text>
                        </li>
                    </ul>
                    <Title level={5}>Player's Contract Grades</Title>
                    <Paragraph>
                        Players will grade the contracts offered to them based on the terms. To calculate the grade,
                        follow
                        the following procedure:
                    </Paragraph>
                    <ul>
                        <li>Take the annual salary offered and divide by 1 million.</li>
                        <li>Multiply that number by the length of the contract plus one.</li>
                        <li>Divide that number by the player’s EPV.</li>
                        <li>Subtract 1 point for each year of the contract that the team option is active.</li>
                        <li>Add 1⁄2 point for each year of the contract the player has an option to leave.</li>
                        <li>Subtract 1 points for a non-repeat renewal clause.</li>
                        <li>Subtract 2 points for a repeat renewal clause.</li>
                        <li>Add 1 point for each year over the age of 26.</li>
                        <li>Add 2 points if the team has the <Text style={{fontStyle: 'italic'}}> Recruiter </Text> GM.</li>
                    </ul>
                    <Paragraph>
                        The Big League Player's Association (BLPA) mandates that all player contracts have a minimum
                        grade of 5 at the time the contract is signed. This minimum applied to both drafted players and
                        players signed in free agency. Once the contract is signed, it is enforced by law and cannot be
                        violated in any way. The Draft will be conducted per league rules. When a team drafts a player,
                        they are free to write any contract they please so long as it complies with BLPA mandates. You
                        must sign every player that you draft.
                    </Paragraph>
                    <Title level={5}>Free Agents</Title>
                    Players whose draft contracts end, or who are not drafted, become Free Agents and can be signed by
                    any team in the league. Teams bid for Free Agents in an open market each season by offering complete
                    contracts. The player will always select the contract with the highest grade.
                    <Divider/>
                    <Title level={4}>Actions</Title>
                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <Image
                            width={'120vh'}
                            src={Actions}
                        ></Image>
                    </div>
                    <Divider/>
                    <Title level={4}>Fan Index</Title>
                    A franchise’s Fan Index is a determinant in almost every aspect of their revenue. The Fan Index is
                    calculated in two steps. First, you calculate your fan base for the current season and for the
                    previous season. The Fan Base is determined as follows:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>FanBase = (2 ∗ CityValue) + PointsPerGame + Wins - Losses + (3 ∗ Championships)</Text>
                    </div>
                    Then the Fan Index is determined as follows:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>FanIndex𝑡 = 0.7 ∗ FanBase𝑡 + 0.4 ∗ FanIndex𝑡-1</Text>
                    </div>
                    Where ‘t’ is the season in question. The Fan Index in season 0 is 70.
                    <Divider/>
                    <Title level={4}>Advertising</Title>
                    <Paragraph>
                        Franchises can boost their brand through advertising, which results in higher and more elastic
                        demand for their games and merchandise. A franchise builds an advertising score by spending
                        money on campaigns. The table below outlines the cost of additional advertising points:
                    </Paragraph>
                    <div style={{marginBottom: '20px'}}>
                        <Row>
                            <Col style={{textAlign: 'center'}} offset={10}>
                                <Row><Text strong>Point</Text></Row>
                                <Row><Text>1</Text></Row>
                                <Row><Text>2</Text></Row>
                                <Row><Text>3</Text></Row>
                                <Row><Text>4</Text></Row>
                                <Row><Text>5</Text></Row>
                                <Row><Text>6</Text></Row>
                                <Row><Text>7</Text></Row>
                                <Row><Text>8</Text></Row>
                                <Row><Text>9</Text></Row>
                                <Row><Text>10</Text></Row>
                            </Col>
                            <Col style={{textAlign: 'center'}} offset={2}>
                                <Row><Text strong>Total Cost</Text></Row>
                                <Row><Text>$1 million</Text></Row>
                                <Row><Text>$2 million</Text></Row>
                                <Row><Text>$4 million</Text></Row>
                                <Row><Text>$8 million</Text></Row>
                                <Row><Text>$16 million</Text></Row>
                                <Row><Text>$32 million</Text></Row>
                                <Row><Text>$64 million</Text></Row>
                                <Row><Text>$128 million</Text></Row>
                                <Row><Text>$256 million</Text></Row>
                                <Row><Text>$512 million</Text></Row>
                            </Col>
                        </Row>
                    </div>
                    <Divider/>
                    <Title level={4}>Revenue</Title>
                    There are several sources of revenue for franchises, each of which is described below.
                    <Title level={5}>Ticket Sales</Title>
                    Franchises must choose the price of their tickets at the start of each season. This price cannot be
                    changed during or after the season is played. The number of tickets purchased per home game is
                    determined by the following demand curve:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>Demand per Home Game = (15∗Advertising + 200) ∗ (6∗Advertising + 2∗FanIndex +
                            3∗StadiumGrade − Price)</Text>
                    </div>
                    Despite its complex appearance, this demand curve is a simple linear one, and should be easy to
                    manipulate for those adept in the art of economics. When setting your ticket price, it is important
                    to remember that all the costs associated with the stadium and its upkeep have already been paid.
                    Your goal, then, is to maximize the revenue generated from ticket sales. That revenue is calculated
                    simply as price times quantity, or in the mathematical parlance below:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>Revenue per Home Game = Price ∗ (15∗Advertising + 200) ∗ (6∗Advertising + 2∗FanIndex +
                            3∗StadiumGrade − Price)</Text>
                    </div>
                    <Title level={5}>Luxury Boxes</Title>
                    Franchises must also choose the price of their luxury boxes at the start of each season. Unlike
                    regular
                    seats, luxury boxes are purchased and priced for the entire season, including the playoffs. The
                    demand for luxury boxes is given by this inverse demand function:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>Demand for Luxury Boxes = ((Advertising ∗ FanIndex𝑡−1 ∗ CityValue) / 10) – ((Price ∗
                            CityValue) / 10,000)
                        </Text>
                    </div>
                    As with regular tickets, you cannot sell more luxury boxes than are available in your stadium, no
                    matter what price you set, and it may not always be wise to sell them all. Unlike regular tickets,
                    there is no missing information when it comes to calculating Luxury Box revenue. The Fan Index from
                    the previous season is known precisely, as is the City Value, and the advertising score is selected
                    at the same time as this price is set. So, your goal is simply to maximize the revenue:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>Revenue from Luxury Boxes = Price ∗ ((Advertising ∗ FanIndex𝑡−1 ∗ CityValue) / 10) –
                            ((Price ∗
                            CityValue) / 10,000)
                        </Text>
                    </div>
                    It is worth mentioning again that luxury boxes are sold by the season, not by the game. So, the
                    equation above describes the total season revenue from luxury box sales.
                    <Title level={5}>Merchandise</Title>
                    Merchandise revenue is based on two factors: your fan index and your advertising score. Revenue from
                    merchandise is calculated as follows:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>Merchandise Revenue = 50,000 ∗ Advertising ∗ FanIndex𝑡
                        </Text>
                    </div>
                    <Title level={5}>TV Contract</Title>
                    Television contracts are negotiated league-wide and must be renewed every year. The total league
                    contract is determined by the following equations:
                    <div style={{textAlign: 'center', margin: '20px', fontStyle: 'italic'}}>
                        <Text>
                            Nolly Scull Idealized Standard = (Games Played / 2) / (Games Played ** 0.5)
                            <br/>
                            Competitiveness = Actual Standard Deviation / Nolly Scull Idealized Standard
                            <br/>
                            TV Revenue = (ΣLeagueFanIndex𝑡−1 / Competitiveness) * 1,000,000
                        </Text>
                    </div>
                    This means that the competitiveness of the league has large implications for the television
                    contract. The more competitive the league the larger the contract. TV Revenue is shared evenly by
                    all franchises. For the first season, a contract of $70 million per franchise has been awarded.
                    <Divider/>
                    <Title level={4}>Costs</Title>
                    There are six categories in which costs fall into, most of which have already been described
                    above.
                    <Title level={5}>Stadium Construction</Title>
                    Most stadium construction costs are incurred in the first season of the game when a franchise builds
                    their stadium. In later seasons, the costs of adding and removing seats/luxury boxes or the cost of
                    renovating a stadium will appear in this category.
                    <Title level={5}>Stadium Upkeep</Title>
                    These costs will reflect the formula for stadium upkeep described above.
                    <Title level={5}>Operating Costs</Title>
                    Every season, each franchise will face $50,000,000 in operating costs regardless of their other
                    circumstances. This amount reflects the standard costs of operating, including staff,
                    travel, and other operations. This cost cannot be avoided and does not fluctuate.
                    <Title level={5}>Advertising Costs</Title>
                    These costs will reflect the advertising points selected by a franchise as described above.
                    <Title level={5}>Salaries</Title>
                    This category includes the salaries paid to all players signed to the team. Players who do not play
                    in a season still must be paid the full amount of their contract.
                    <Title level={5}>Action Costs</Title>
                    Of the 22 available actions, 21 have associated costs, which will be added together in this
                    category. The costs of each action are described in the table above.
                </Typography>
            </Card>
        </div>
    );
})

export default Instructions;