export function fileIs(path: string, ...items: string[]): boolean {
    if (items) {
        for (var index = 0; index < items.length; index++) {
            if (path.endsWith(items[index].toLowerCase())) {
                return true;
            }
        }
    }
    return false;
}

export function getFileNameWithoutExtension(path: string) {
    let parts = path.split(".");
    parts.pop();
    if (parts.length > 1) {
        if (parts[parts.length - 1] === "spec") {
            parts.pop();
        }
        if (parts[parts.length - 1] === "ng") {
            parts.pop();
        }
    }
    return parts.join(".");
}