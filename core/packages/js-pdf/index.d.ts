export interface Options {
    staticFileUrl?: string;
    width?: number;
    data?: BinaryData;
    httpHeaders?: Object;
    withCredentials?: boolean;
    password?: string;
    length?: number;
    docBaseUrl?: string;
    cMapUrl?: string;
    cMapPacked?: boolean;
    CMapReaderFactory?: Object;
    useSystemFonts?: boolean;
}

export interface JsPdfPreview {
    preview: (src: string | ArrayBuffer | Blob) => Promise<any>;
    rerender: () => Promise<any>;
    save: (fileName?: string) => void;
    setOptions: (options: Options) => void;
    setRequestOptions: (requestOptions?: any) => void;
    destroy: ()=> void;
}
declare const jsPreviewPdf: {
    init: (container: HTMLElement, options?: Options, requestOptions?: any) => JsPdfPreview;
};
export default  jsPreviewPdf;