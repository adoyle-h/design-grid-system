const debug = require('debug')('grid');

function convertPercent(num, point = 2) {
    if (Number.isInteger(num)) {
        return num;
    } else {
        return num.toFixed(point);
    }
}

function run({
    columnSize: colSize,
    minEndpoint, maxEndpoint, basePx,
    marginInView,
}) {
    const table = [];

    let colScale = 0;
    let view = minEndpoint;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        colScale++;

        const colWidth = basePx * colScale;
        const _colTol = colWidth * colSize;
        if (_colTol < minEndpoint) continue;
        if (_colTol >= maxEndpoint) break;

        let gutterScale = 0;
        let container;
        do {
            gutterScale++;
            const gutterWidth = basePx * gutterScale;
            container = colSize * colWidth + (colSize - 1) * gutterWidth;

            if (gutterWidth >= (colWidth / 2)) continue;

            view = container / (1 - 2 * marginInView);
            const margin = view * marginInView;

            if (view < minEndpoint) continue;
            if (view > maxEndpoint) break;

            table.push({
                colScale, gutterScale,
                container,
                colWidth,
                gutterWidth,
                margin: convertPercent(margin),
                view: convertPercent(view),
                gutterRelCol: convertPercent(gutterWidth / colWidth),
                marginInView: convertPercent(100 * margin / view),
                contentInView: convertPercent(100 * container / view),
            });
        } while (container < maxEndpoint);
    }

    return table;
}

const genEndpointSpans = (endpoints) => {
    const keys = Object.keys(endpoints);
    const list = [];

    keys.forEach((key) => {
        list.push({key, start: endpoints[key]});
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

export default (basePx, columnSize, marginInView, endpoints) => {
    const list = [];
    const spans = genEndpointSpans(endpoints);
    debug('spans=%O', spans);

    spans.forEach(([minEndpoint, maxEndpoint, epTitle]) => {
        const l = run({
            columnSize, minEndpoint, maxEndpoint, basePx,
            marginInView,
        });
        list.push([epTitle, minEndpoint, maxEndpoint, l]);
    });

    debug('list=%O', list);
    return list;
};
