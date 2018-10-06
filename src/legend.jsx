import React from 'react';
import styled, {css} from 'react-emotion';
import CONSTS from './const';

const {marginColor, gutterColor, columnColor} = CONSTS;

const BG = styled.div``;
const Item = styled.span`
    display: inline-block;
    width: 80px;
    height: 22px;
    margin-right: 10px;
    background: #77a2de;
    vertical-align: middle;
`;

const Margin = styled(Item)`
    background: ${marginColor};
`;

const Gutter = styled(Item)`
    background: ${gutterColor};
`;

const Column = styled(Item)`
    background: ${columnColor};
`;

export default () => <BG>
    <div><Column />Column</div>
    <div><Margin />Margin</div>
    <div><Gutter />Gutter</div>
</BG>;
