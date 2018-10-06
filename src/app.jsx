import React, {Component} from 'react';
import styled from 'react-emotion';
import 'normalize.css';
import GUI from './gui';
import grid from './grid';
import Data, {Consumer} from './data';
import Category from './category';
import Legend from './legend';

const BG = styled.div`
`;

const Info = styled.div`
    display: flex;
`;

const Section = styled.div`
    section {
        margin: 20px 40px;

        div + div {
            margin-top: 6px;
        }
    }

    h2 {
        margin: 0;
        padding: 10px 40px;
        width: 100%;
    }
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
                <div>Base Space Unit: {data.basePx}px</div>
                <div>Margin/Viewport: {data.margin}</div>
            </section>
        </UserData>;
    }

    render() {
        const {data, changeData} = this.props;
        const list = grid(data.basePx, data.column.size, data.margin, data.endpoints);

        const categories = list.map(([epTitle, min, max, l]) =>
            this.renderCateory(`${epTitle} (${min}, ${max}]`, l));

        return <BG>
            <Info>
                {this.renderUserData()}
                <LegendSection>
                    <h2>Legend</h2>
                    <section>
                        <Legend />
                    </section>
                </LegendSection>
            </Info>
            {categories}
            <GUI {...data} changeData={changeData} />
        </BG>;
    }
}

export default () => <Data>
    <Consumer>
        {({data, changeData}) => <App data={data} changeData={changeData} />}
    </Consumer>
</Data>;
