/*eslint-disable*/
import {renderAsync} from 'docx-preview';

const defaultOptions = {
    ignoreLastRenderedPageBreak: false
};

function getData(src, options = {}) {
    if (typeof src === 'string') {
        return fetchDocx(src, options);
    }
    return Promise.resolve(src);
}

function fetchDocx(src, options) {
    return fetch(src, options).then(res => {
        if (res.status !== 200) {
            return Promise.reject(res);
        }
        return res;
    });
}

function render(data, container, options = {}) {
    if (!data) {
        container.innerHTML = '';
        return Promise.resolve();
    }
    let blob;
    if (data instanceof Blob) {
        blob = data;
    } else if (data instanceof Response) {
        blob = data.blob();
    } else if (data instanceof ArrayBuffer) {
        blob = new Blob([data]);
    }
    return renderAsync(blob, container, container, {...defaultOptions, ...options});
}

export default {
    getData,
    render
};