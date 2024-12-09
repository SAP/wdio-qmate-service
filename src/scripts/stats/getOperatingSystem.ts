import * as os from 'os';

export function getOperatingSystemType(): string {
    return os.type();
}

export function getOperatingSystemRelease(): string {
    return os.release();
}

export function getOperatingSystemVersion(): string {
    return os.version();
}