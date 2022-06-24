import browser, {Browser} from './browser';
import console, {Console} from './console';
import data, { Data } from './data';
import file, { File } from './file';
import formatter, { Formatter } from './formatter';
import functionModule, { FunctionModule } from './function';
import performance, {Performance} from './performance';
import system, {System} from './system';

interface DataHooksExtended extends Data {
    decrypt: (input: string) => string;
    privateKeyFound: boolean;
}

export class Util {
    browser: Browser = browser
    console: Console = console
    data: DataHooksExtended = data as DataHooksExtended
    file: File = file
    formatter: Formatter = formatter
    function: FunctionModule = functionModule
    perfomance: Performance = performance
    system: System = system
}

export default new Util()