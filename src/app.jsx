import React, {Component} from 'react';
import styled from 'react-emotion';
import 'normalize.css';
import GUI from './gui';
import grid from './grid';
import Data, {Consumer} from './data';
import Category from './category';
import Legend from './legend';
import Rules from './rules';
import Intro from './intro';
import {Section} from './styles/com';

import './styles/global.css';

const BG = styled.div`
`;

const Info = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const UserData = styled(Section)`
    h2 {
        background: #c2e1ff;
    }
`;

const LegendSection = styled(Section)`
    h2 {
        background: #c2caff;
    }
`;

const RulesSection = styled(Section)`
    flex: 1 1;

    h2 {
        background: #7bbcfb;
    }
`;

const IntroSection = styled(Section)`
    flex: 1 1 100%;

    h2 {
        background: #e1ffd0;

        a {
            text-decoration: none;
            color: initial;
        }
    }
`;

class App extends Component {
    renderCateory(title, list) {
        const {data} = this.props;
        return <Category
            data={data}
            key={title}
            title={title}
            list={list}
        />;
    }

    renderUserData() {
        const {data} = this.props;
        return <UserData>
            <h2>User Settings</h2>
            <section>
                <div>Column Size: {data.column.size}</div>
                <div>Base Unit: {data.basePx}px</div>
                <div>Margin/Viewport: {data.margin}</div>
            </section>
        </UserData>;
    }

    render() {
        const {data, changeData} = this.props;
        const list = grid(data.basePx, data.column.size, data.margin, data.breakpoints);

        const categories = list.map(([epTitle, min, max, l]) =>
            this.renderCateory(`${epTitle} (${min}, ${max}]`, l));

        return <BG>
            <Info>
                <IntroSection>
                    <h2><a href="/">Design Grid System</a></h2>
                    <Intro />
                </IntroSection>
                {this.renderUserData()}
                <LegendSection>
                    <h2>Legend</h2>
                    <section><Legend /></section>
                </LegendSection>
                <RulesSection>
                    <h2>Rules</h2>
                    <section><Rules /></section>
                </RulesSection>
            </Info>
            {categories}
            <GUI {...data} changeData={changeData} />
        </BG>;
    }
}

export default () => <Data>
    <Consumer>
        {(data) => <App {...data} />}
    </Consumer>
</Data>;
