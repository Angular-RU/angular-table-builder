export function getScrollLineHeight(): number {
    let result: number;
    const iframe: HTMLIFrameElement = document.createElement('iframe');
    iframe.src = '#';
    document.body.appendChild(iframe);
    const windowProxy: WindowProxy = iframe.contentWindow;
    const documentProxy: Document = windowProxy.document;

    documentProxy.open();
    documentProxy.write('<!DOCTYPE html><html><head></head><body><span>a</span></body></html>');
    documentProxy.close();

    const span: HTMLSpanElement = documentProxy.body.firstElementChild as HTMLSpanElement;
    result = span.offsetHeight;
    document.body.removeChild(iframe);
    return result;
}
