import React, {Component} from 'react';
import styled, {css} from 'react-emotion';
import Resizable from 're-resizable';
import CONSTS from './const';

const {marginColor, gutterColor, columnColor} = CONSTS;

const printWidthLabel = ({width}) => (Number.isInteger(width) ? width : width.toFixed(2));

const InlineBlock = styled.div`
    position: relative;
    flex: 1 1 ${(props) => 100 * props.width / props.view}%;
    height: 100%;
`;

const Container = styled(InlineBlock)`
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;

    &::before {
        content: '${printWidthLabel}';
        color: #797979;
        position: absolute;
        top: -56px;
        font-size: 10px;
        text-align: center;
        width: 100%;
    }

    &::after {
        content: '';
        color: blue;
        position: absolute;
        top: -36px;
        left: 0;
        font-size: 10px;
        border: 1px dashed #b9b9b9;
        border-bottom: unset;
        width: 100%;
        height: 8px;
    }
`;

const Column = styled(InlineBlock)`
    background: ${columnColor};

    &::before {
        content: '${printWidthLabel}';
        color: ${columnColor};
        position: absolute;
        top: -28px;
        font-size: 10px;
        text-align: center;
        width: 100%;
    }

    &::after {
        content: '';
        color: blue;
        position: absolute;
        top: -12px;
        left: 0;
        font-size: 10px;
        border: 1px dashed #b9b9b9;
        border-bottom: unset;
        width: 100%;
        height: 8px;
    }

`;

const Gutter = styled(InlineBlock)`
    background: ${gutterColor};

    &::before {
        content: '${printWidthLabel}';
        color: ${gutterColor};
        position: absolute;
        bottom: -26px;
        font-size: 10px;
        text-align: center;
        width: 100%;
    }

    &::after {
        content: '';
        color: blue;
        position: absolute;
        bottom: -10px;
        left: 0;
        font-size: 10px;
        border: 1px dashed #b9b9b9;
        border-top: unset;
        width: 100%;
        height: 8px;
    }

`;

const Margin = styled(InlineBlock)`
    background: ${marginColor};

    &::before {
        content: '${printWidthLabel}';
        color: ${marginColor};
        position: absolute;
        bottom: -26px;
        font-size: 10px;
        text-align: center;
        width: 100%;
    }

    &::after {
        content: '';
        color: blue;
        position: absolute;
        bottom: -10px;
        left: 0;
        font-size: 10px;
        border: 1px dashed #b9b9b9;
        border-top: unset;
        width: 100%;
        height: 8px;
    }
`;

const BG = styled.div`
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    position: relative;

    ${(props) => css`
        padding: 0 ${props.margin || 0}px;
    `}

    &::before {
        content: '${(props) => props.view.toFixed(2)}';
        color: #797979;
        position: absolute;
        bottom: -56px;
        font-size: 10px;
        text-align: center;
        width: 100%;
    }

    &::after {
        content: '';
        color: blue;
        position: absolute;
        bottom: -38px;
        left: 0;
        font-size: 10px;
        border: 1px dashed #b9b9b9;
        border-top: unset;
        width: 100%;
        height: 8px;
    }
`;

class Viewport extends Component {
    state = {
        // view, container, colWidth, gutterWidth, margin, colSize,
        ...this.props.data,
        width: this.props.data.view,
        height: 200,
    };

    render() {
        const {
            view, container, colWidth, gutterWidth, margin, colSize, width, height,
        } = this.state;

        const list = [];
        for (let i = 0; i < colSize; i++) {
            const gutter = <Gutter key={`gutter-${i}`} width={gutterWidth} view={container} />;
            const col = <Column key={`column-${i}`} width={colWidth} view={container} />;
            list.push(col);
            if (i + 1 < colSize) {
                list.push(gutter);
            }
        }

        return <Resizable
            size={{width, height}}
            onResizeStop={(_e, _direction, _ref, d) => {
                this.setState({
                    width: this.state.width + d.width,
                    height: this.state.height + d.height,
                });
            }}
        >
            <BG view={width} >
                <Margin width={margin} view={view} />
                <Container width={container} view={view}>
                    {list}
                </Container>
                <Margin width={margin} view={view} />
            </BG>
        </Resizable>;
    }
}

const ViewportContainer = styled.div`
    margin: 0 auto;
    padding: 60px 40px;

    &:hover {
        background: #f5f8ff;
    }
`;

export {ViewportContainer};
export default (props) => <ViewportContainer>
    <Viewport data={props} />
</ViewportContainer>;
