import React from 'react';
import * as dg from 'dis-gui';

const addBreakpoint = (_changeData) => (_ep) => {
    // changeData(`breakpoints.${ep}`);
};

const renderBreakpoints = (breakpoints, changeData) => {
    const keys = Object.keys(breakpoints);
    return keys.map((key) => <dg.Number
        key={key}
        label={key}
        value={breakpoints[key]}
        onChange={(val) => changeData(`breakpoints.${key}`, val)}
    />);
};

export default ({
    column, basePx, margin, breakpoints, changeData,
}) => <dg.GUI expanded={false} >
    <dg.Text label="Parameters" />
    <dg.Number label="Column Size" value={column.size} onChange={(val) => changeData('column.size', val)} />
    <dg.Select
        label="Base Unit"
        value={basePx}
        options={Array.from(new Array(25), (_, index) => index + 2)}
        onChange={(val) => changeData('basePx', val)}
    />
    <dg.Number label="Margin/Viewport" value={margin} onChange={(val) => changeData('margin', val)} />
    <dg.Folder label="Breakpoints" expanded >
        {renderBreakpoints(breakpoints, changeData)}
        {/*
        <dg.Button
            label="Add Breakpoint"
            onClick={addBreakpoint(changeData)}
        />
        */}
    </dg.Folder>
</dg.GUI>;
