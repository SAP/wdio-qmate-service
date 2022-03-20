import browser, {Browser} from './browser';
import console, {Console} from './console';
import file, { File } from './file';
import formatter, { Formatter } from './formatter';
import functionModule, { FunctionModule } from './function';
// import performance, {Performance} from './performance';
import system, {System} from './system';

export class Util {
    browser: Browser = browser
    console: Console = console
    file: File = file
    formatter: Formatter = formatter
    function: FunctionModule = functionModule
    // perfomance: Performance = performance
    system: System = system
}

export default new Util()