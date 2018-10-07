import React from 'react';
import styled from 'react-emotion';

const BG = styled.div``;

/* eslint-disable max-len */

export default () => <BG>
    <ol>
        <li>Both widths of Column and Gutter should be multiple of the Base Unit.</li>
        <li>The width of Margin could be floating number. But designer should rounding it and use integral value for painting.</li>
        <li>The blank spaces distribution (it means Margin/Viewport) should keep consistent on different devices.</li>
        <li>Use the <a href="https://spec.fm/specifics/8-pt-grid">soft grid</a>, not hard grid.</li>
    </ol>
</BG>;
