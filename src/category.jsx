import React, {Component} from 'react';
import styled from 'react-emotion';
import Viewport, {ViewportContainer} from './viewport';

const CategoryBG = styled.div`
    height: 100%;

    & > header {
        width: 100%;
        background: #daffff;
        padding: 10px 40px;

        h2 {
            margin: 0;
        }

        & > div {
            margin-top: 8px;
        }
    }
`;

const CategoryInnerBG = styled.div`
    margin: 30px 0;
    height: 100%;
    display: flex;
    flex-direction: column;

    ${ViewportContainer} + ${ViewportContainer} {
        margin-top: 20px;
    }
`;

const Header = styled.header`
    position: relative;

    &:hover {
        cursor: pointer;
        color: blue;
    }
`;

const HideButton = styled.span`
    margin-left: 20px;
`;

class Category extends Component {
    state = {
        hide: true,
    }

    render() {
        const {data, title, list} = this.props;
        const {hide} = this.state;
        const size = list.length;

        let button, inner, hideClick;
        if (hide) {
            hideClick = () => this.setState({hide: false});
            button = <HideButton onClick={hideClick}>[show]</HideButton>;
        } else {
            hideClick = () => this.setState({hide: true});
            button = <HideButton onClick={hideClick}>[hide]</HideButton>;

            inner = <CategoryInnerBG>
                {list.map((item) => <Viewport
                    key={`vp-${item.colWidth}-${item.gutterWidth}-${item.margin}`}
                    colSize={data.column.size}
                    {...item}
                />)}
                {!size && <ViewportContainer>Not found appropriate solution</ViewportContainer>}
            </CategoryInnerBG>
        }

        return <CategoryBG>
            <Header onClick={hideClick}>
                <h2>{title}</h2>
                <div>
                    {`${size} solutions`}
                </div>
            </Header>
            {inner}
        </CategoryBG>;
    }
}

export default Category;
