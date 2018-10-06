import React, {Component} from 'react';
import {set, cloneDeep} from 'lodash';

const debugChangeData = require('debug')('data:changeData');

const {Provider, Consumer} = React.createContext('light');

class UserData extends Component {
    state = {
        column: {
            size: 12,
        },
        // recommended value: 8 or 10. Unit: px
        basePx: 8,
        // % or px
        // marginReltoContainer: (1 / 20),
        // margin: '9.09%',
        margin: 4 / 100,
        endpoints: {
            xs: 0,
            // Small screen / phone
            s: 528,
            // Medium screen / tablet
            m: 768,
            // Large screen / desktop
            // l : 992,
            // l: 1056,
            // Extra large screen / wide desktop
            xl: 1200,
            // Extra extra large
            xxl: 1584,
        },

        // Optional
        // gutterWidth: 12,
        gutter: {
            width: 10,
        },
        container: {},
        sidePanel: {
        },
    };

    changeData = (path, value) => {
        const newState = cloneDeep(this.state);
        debugChangeData('path=%s, value=%s', path, value)
        set(newState, path, value);

        debugChangeData('newState=%O', newState)
        this.setState(newState);
    }

    render() {
        return <Provider value={{
            data: this.state,
            changeData: this.changeData,
        }}>
            {this.props.children}
        </Provider>;
    }
}

export {Consumer};

export default UserData;
