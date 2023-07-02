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
    preview: (src: string) => Promise<any>,
    setOptions: (options: Options) => void,
    setRequestOptions: (requestOptions?: any) => void,
    destroy: ()=> void,
}
declare const jsPreviewPdf: {
    init: (container: HTMLElement, options?: Options, requestOptions?: any) => JsPdfPreview;
};
export default  jsPreviewPdf;