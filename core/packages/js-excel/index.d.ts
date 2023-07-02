export interface Options {
    minColLength?: number;
    showContextmenu?: boolean;
}

export interface JsExcelPreview {
    preview: (src: string) => Promise<any>,
    setOptions: (options: Options) => void,
    setRequestOptions: (requestOptions?: any) => void,
    destroy: ()=> void,
}
declare const jsPreviewExcel: {
    init: (container: HTMLElement, options?: Options, requestOptions?: any) => JsExcelPreview;
};
export default  jsPreviewExcel;