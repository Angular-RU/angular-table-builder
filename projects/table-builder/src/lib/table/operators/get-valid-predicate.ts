export function getValidPredicate<T>(leftPredicate: T, rightPredicate: T): T {
    return leftPredicate === null ? rightPredicate : leftPredicate;
}
