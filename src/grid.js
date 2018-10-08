import _debug from 'debug';

const debug = _debug('grid');

function convertPercent(num, point = 2) {
    if (Number.isInteger(num)) {
        return num;
    } else {
        return num.toFixed(point);
    }
}

function run({
    columnSize: colSize,
    minBreakpoint, maxBreakpoint, basePx,
    marginInView,
}) {
    const table = [];

    let colScale = 0;
    let view = minBreakpoint;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        colScale++;

        const colWidth = basePx * colScale;
        const _colTol = colWidth * colSize;
        if (_colTol < minBreakpoint) continue;
        if (_colTol >= maxBreakpoint) break;

        let gutterScale = 0;
        let container;
        do {
            gutterScale++;
            const gutterWidth = basePx * gutterScale;
            container = colSize * colWidth + (colSize - 1) * gutterWidth;

            if (gutterWidth >= (colWidth / 2)) continue;

            view = container / (1 - 2 * marginInView);
            const margin = view * marginInView;

            if (view < minBreakpoint) continue;
            if (view > maxBreakpoint) break;

            table.push({
                colScale, gutterScale,
                container,
                colWidth,
                gutterWidth,
                margin,
                view,
                gutterRelCol: convertPercent(gutterWidth / colWidth),
                marginInView: convertPercent(100 * margin / view),
                contentInView: convertPercent(100 * container / view),
            });
        } while (container < maxBreakpoint);
    }

    return table;
}

const genBreakpointSpans = (breakpoints) => {
    const keys = Object.keys(breakpoints);
    const list = [];

    keys.forEach((key) => {
        list.push({key, start: breakpoints[key]});
    });
    list.sort((a, b) => {
        return a.start - b.start;
    });

    const spans = [];
    list.forEach(({key, start}, index) => {
        const next = list[index + 1];
        if (next === undefined) return;
        spans.push([start, next.start, key]);
    });
    return spans;
};

export default (basePx, columnSize, marginInView, breakpoints) => {
    const list = [];
    const spans = genBreakpointSpans(breakpoints);
    debug('spans=%O', spans);

    spans.forEach(([minBreakpoint, maxBreakpoint, epTitle]) => {
        const l = run({
            columnSize, minBreakpoint, maxBreakpoint, basePx,
            marginInView,
        });
        list.push([epTitle, minBreakpoint, maxBreakpoint, l]);
    });

    debug('list=%O', list);
    return list;
};
