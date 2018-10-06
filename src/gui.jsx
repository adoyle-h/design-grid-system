import React from 'react';
import * as dg from 'dis-gui';

const addEndpoint = (changeData) => (ep) => {
    // changeData(`endpoints.${ep}`);
};

const renderEndpoints = (endpoints, changeData) => {
    const keys = Object.keys(endpoints);
    return keys.map((key) => <dg.Number
        key={key}
        label={key}
        value={endpoints[key]}
        onChange={(val) => changeData(`endpoints.${key}`, val)}
    />);
};

export default ({column, basePx, margin, endpoints, changeData}) => <dg.GUI expanded={false} >
    <dg.Text label="Parameters" />
    <dg.Number label="Column Size" value={column.size} onChange={(val) => changeData('column.size', val)} />
    <dg.Select
        label="Base Unit"
        value={basePx}
        options={Array.from(new Array(25), (_, index) => index + 2)}
        onChange={(val) => changeData('basePx', val)}
    />
    <dg.Number label="Margin/Viewport" value={margin} onChange={(val) => changeData('margin', val)} />
    <dg.Folder label="Endpoints" expanded >
        {renderEndpoints(endpoints, changeData)}
        <dg.Button
            label="Add Endpoint"
            onClick={addEndpoint(changeData)}
        />
    </dg.Folder>
</dg.GUI>;
