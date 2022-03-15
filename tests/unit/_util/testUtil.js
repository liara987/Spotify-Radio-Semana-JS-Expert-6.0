import {
    jest
} from '@jest/globals';
import {
    Readable,
    Writable
} from 'stream';

export default class TestUtil {
    static generateReadableSteam(data) {
        return new Readable({
            read() {
                for (const item in data) {
                    this.push(item)
                }

                this.push(null)
            }
        })
    }

    static generateWritableSteam(onData) {
        return new Writable({
            write(chunck, enc, cb) {
                onData(chunck)
                cb(null, chunck)
            }
        })
    }

    static defaultHandlerParams() {
        const requestStream = TestUtil.generateReadableSteam(['requisition body'])
        const response = TestUtil.generateWritableSteam(() => {})
        const data = {
            request: Object.assign(requestStream, {
                headers: {},
                method: '',
                url: ''
            }),
            response: Object.assign(response, {
                writeHead: jest.fn(),
                end: jest.fn()
            })
        }

        return {
            values: () => Object.values(data),
            ...data
        }
    }
}