import React, {Component} from 'react';
import {reduce, get, set, cloneDeep} from 'lodash';
import _debug from 'debug';

const debugChangeData = _debug('data:changeData');

const {Provider, Consumer} = React.createContext('light');

class UserData extends Component {
    constructor(props) {
        super(props);

        const state = {
            column: {
                size: null,
            },
            // recommended value: 8 or 10. Unit: px
            basePx: null,
            // % or px
            margin: null,
            breakpoints: {},

            // Optional
            // gutterWidth: 12,
            gutter: {
                width: 10,
            },
            container: {},
            sidePanel: {
            },
        };

        const params = new URLSearchParams(window.location.search);
        state.column.size = parseInt(params.get('columnSize')) || 12;
        state.basePx = parseInt(params.get('basePx')) || 8;
        state.margin = Number.parseFloat(params.get('margin'));
        if (isNaN(state.margin)) state.margin = 0.04;

        const breakpointsStr = params.get('breakpoints');
        if (breakpointsStr) {
            const {breakpoints} = state;
            const arr = breakpointsStr.split(',');
            arr.forEach((item) => {
                if (!item) return;
                const [key, val] = item.split('__');
                const value = parseInt(val);
                if (!isNaN(value)) {
                    breakpoints[key] = value;
                }
            });
        } else {
            state.breakpoints = {
                xs: 0,
                // Small screen / phone
                s: 528,
                // Medium screen / tablet
                m: 768,
                // Large screen / desktop
                // l : 992,
                l: 1056,
                // Extra large screen / wide desktop
                xl: 1200,
                // Extra extra large
                xxl: 1584,
            };
        }

        this.state = state;
    }

    saveURL = (state) => {
        const params = new URLSearchParams();
        params.append('columnSize', state.column.size);
        params.append('basePx', state.basePx);
        params.append('margin', state.margin);
        params.append('breakpoints', reduce(state.breakpoints, (arr, val, key) => {
            arr.push(`${key}__${val}`);
            return arr;
        }, []).join(','));

        if (window.history.replaceState) {
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }
    }

    changeData = (path, value) => {
        if (get(this.state, path) === value) return;
        const newState = cloneDeep(this.state);
        debugChangeData('path=%s, value=%s', path, value);
        set(newState, path, value);

        debugChangeData('newState=%O', newState);
        this.saveURL(newState);
        this.setState(newState);
    }

    render() {
        return <Provider value={{
            data: this.state,
            changeData: this.changeData,
            saveURL: this.saveURL,
        }}>
            {this.props.children}
        </Provider>;
    }
}

export {Consumer};

export default UserData;
