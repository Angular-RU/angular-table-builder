export function getValidHtmlBooleanAttribute(attribute: boolean): boolean {
    return typeof attribute === 'string' ? true : !!attribute;
}
