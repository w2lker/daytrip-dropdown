export function sendWarning(message: string): void {
    if (message === undefined) {
        throw new Error('Message is required to execute bonWarning function');
    }
    if (process.env.NODE_ENV === 'development' && console !== undefined) {
        console.warn(message);
    }
}
