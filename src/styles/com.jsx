import styled from 'react-emotion';

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


export {Section};
