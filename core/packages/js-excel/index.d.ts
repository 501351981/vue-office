export interface Options {
    minColLength?: number;
    showContextmenu?: boolean;
}

export interface JsExcelPreview {
    preview: (src: string | ArrayBuffer | Blob) => Promise<any>;
    save: (fileName?: string) => void;
    setOptions: (options: Options) => void;
    setRequestOptions: (requestOptions?: any) => void;
    destroy: ()=> void;
}
declare const jsPreviewExcel: {
    init: (container: HTMLElement, options?: Options, requestOptions?: any) => JsExcelPreview;
};
export default  jsPreviewExcel;