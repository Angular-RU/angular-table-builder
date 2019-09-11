import { WebWorkerThread } from './worker-thread.interface';
import { Any } from '../interfaces/table-builder.internal';
export declare class WebWorkerThreadService implements WebWorkerThread {
    private readonly workerFunctionToUrlMap;
    private readonly promiseToWorkerMap;
    private static createWorkerUrl;
    run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T>;
    runUrl(url: string, data?: Any): Promise<Any>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<Any>): Worker;
    private createPromiseForWorker;
    private getOrCreateWorkerUrl;
    private createPromiseCleaner;
    private removePromise;
}
