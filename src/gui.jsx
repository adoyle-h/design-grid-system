import React from 'react';
import * as dg from 'dis-gui';

const addEndpoint = (changeData) => (ep) => {
    changeData(`endpoints.${ep}`);
};

const renderEndpoints = (endpoints, changeData) => {
    const keys = Object.keys(endpoints);
    return keys.map((key) => <dg.Number
        key={key}
        label={key}
        value={endpoints[key]}
        onChange={() => changeData()}
    />);
};

export default ({column, basePx, margin, endpoints, changeData}) => <dg.GUI expanded={false} >
    <dg.Text label="Parameters" />
    <dg.Number label="column size" value={column.size} onChange={(val) => changeData('column.size', val)} />
    <dg.Number label="basePx" value={basePx} min={2} max={20} step={basePx} onChange={(val) => changeData('basePx', val)} />
    <dg.Number label="margin" value={margin} onChange={(val) => changeData('margin', val)} />
    {renderEndpoints(endpoints, changeData)}
    <dg.Button
        label="Add Endpoint"
        onClick={addEndpoint(changeData)}
    />
</dg.GUI>;
