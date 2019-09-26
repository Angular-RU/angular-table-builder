export function isFirefox(userAgent: string = null): boolean {
    return (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
}
