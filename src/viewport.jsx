import React from 'react';
import styled, {css} from 'react-emotion';
import CONSTS from './const';

const {marginColor, gutterColor, columnColor} = CONSTS;

const InlineBlock = styled.span`
    position: relative;
    width: ${(props) => props.width}px;
    display: inline-block;
    height: 100%;
`;

const Container = styled(InlineBlock)`
    white-space: nowrap;

    &::before {
        content: '${(props) => props.width}';
        color: #797979;
        position: absolute;
        top: -56px;
        font-size: 10px;
        text-align: center;
        width: ${(props) => props.width}px;
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
        width: ${(props) => props.width - 2}px;
        height: 8px;
    }
`;

const Column = styled(InlineBlock)`
    background: ${columnColor};

    &::before {
        content: '${(props) => props.width}';
        color: ${columnColor};
        position: absolute;
        top: -28px;
        font-size: 10px;
        text-align: center;
        width: ${(props) => props.width}px;
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
        width: ${(props) => props.width - 2}px;
        height: 8px;
    }

`;

const Gutter = styled(InlineBlock)`
    background: ${gutterColor};

    &::before {
        content: '${(props) => props.width}';
        color: ${gutterColor};
        position: absolute;
        bottom: -26px;
        font-size: 10px;
        text-align: center;
        width: ${(props) => props.width}px;
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
        width: ${(props) => props.width - 2}px;
        height: 8px;
    }

`;

const ViewportContainer = styled.div`
    margin: 0 auto;
    padding: 60px 40px;

    &:hover {
        background: #f5f8ff;
    }
`;

const ViewportC = styled.div`
    margin: 0 auto;
    width: ${(props) => props.width}px;
`;

const Margin = styled(InlineBlock)`
    background: ${marginColor};

    &::before {
        content: '${(props) => props.width}';
        color: ${marginColor};
        position: absolute;
        bottom: -26px;
        font-size: 10px;
        text-align: center;
        width: ${(props) => props.width}px;
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
        width: ${(props) => props.width - 2}px;
        height: 8px;
    }
`;

const _dBG = (props) => css`
    height: ${props.height || 200}px;
    padding: 0 ${props.margin || 0}px;
`;

const BG = styled.span`
    display: inline-block;
    position: relative;

    &::before {
        content: '${(props) => props.width}';
        color: #797979;
        position: absolute;
        bottom: -56px;
        font-size: 10px;
        text-align: center;
        width: ${(props) => props.width}px;
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
        width: ${(props) => props.width - 2}px;
        height: 8px;
    }

    ${_dBG}
`;

const Viewport = ({
    view, container, colWidth, gutterWidth, margin, colSize,
}) => {
    const list = [];
    for (let i = 0; i < colSize; i++) {
        const gutter = <Gutter key={`gutter-${i}`} width={gutterWidth} />;
        const col = <Column key={`column-${i}`} width={colWidth} />;
        list.push(col);
        if (i + 1 < colSize) {
            list.push(gutter);
        }
    }

    return <ViewportContainer>
        <ViewportC width={view}>
            <BG width={view}>
                <Margin width={margin} />
                <Container width={container}>
                    {list}
                </Container>
                <Margin width={margin} />
            </BG>
        </ViewportC>
    </ViewportContainer>;
};

export {ViewportContainer};
export default Viewport;
