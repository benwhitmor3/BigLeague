import React from 'react';
import {observer} from 'mobx-react'
import {Typography, Divider, Card} from 'antd';
import {cardStyles} from "./Create/CreateStyles";

const {Title, Paragraph, Text} = Typography;

export const StaffInfo: React.FunctionComponent = observer(() => {

    return (
        <div>
            <Card style={{...{cardStyles}, ...{width: '100%'}}}>
            <Typography>
                <Title level={2}>GMs</Title>
                <Paragraph>
                    GMs play a similar role for a Big League franchise as they do in other professional sports, they set the
                    tone and mission of the franchise. Unlike other hires, owners do not need to worry about the market
                    for GMs. Instead, at the start of each season, owners simply choose which GM trait they are setting
                    for their franchise. Those traits are as follows:
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            <Text><Text strong>Facilitator:</Text> Gives the team two additional actions for the season</Text>
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
                <Title level={2}>Coaches</Title>
                <Paragraph>
                    Each team is required to hire a coach from the pool of available coaches. Each coach is different,
                    and has two of eight possible attributes which modify your team’s performance. Those attributes are
                    as follows:
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
            </Typography>
            </Card>
        </div>
    );
})

export default StaffInfo;