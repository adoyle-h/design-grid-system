import React from 'react';
import styled from 'react-emotion';

const BG = styled.div`
    margin: 20px 40px;
`;

const links = [
    ['Responsive layout grid', 'https://material.io/design/layout/responsive-layout-grid.html'],
    ['The 8-Point Grid System', 'https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632'],
];

export default () => <BG>
    <p>
        This is a tool to preview grid system for design.
        <br />
        It will calculate based your Column Size, Base Unit, Margin/Viewport Value and Endpoints, and generate a set of solutions for different endpoints.
    </p>

    <p>
        Read these articles for reference:
        <ul>
            {links.map(([name, url]) => <li>
                <a href={url}>{name}</a>
            </li>)}
        </ul>
    </p>
</BG>;
