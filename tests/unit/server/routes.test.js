import {
    jest,
    expect,
    describe,
    test,
    beforeEach
} from '@jest/globals';
import config from '../../../server/config.js'
import {
    Controller
} from '../../../server/controller.js';
import {
    handler
} from '../../../server/routes.js'
import TestUtil from '../_util/testUtil.js';
const {
    pages,
    location,
    constants: {
        CONTENT_TYPE
    }
} = config

describe('Routes - test site for API response', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
    })

    test('GET / should redirect to home page', async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'GET'
        params.request.url = '/'

        await handler(...params.values())
        expect(params.response.writeHead).toBeCalledWith(
            302, {
                'Location': location.home
            }
        )
        expect(params.response.end).toHaveBeenCalled()
    })

    test(`GET /home should response with ${pages.homeHTML} file stream`, async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'GET'
        params.request.url = '/home'
        const mockFileStream = TestUtil.generateReadableSteam(['data'])
        jest.spyOn(
            Controller.prototype,
            "getFileStream",
        ).mockResolvedValue({
            stream: mockFileStream
        })

        jest.spyOn(
            mockFileStream,
            "pipe",
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    })

    test(`GET /controller should response with ${pages.controllerHTML} file stream`, async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'GET'
        params.request.url = '/controller'
        const mockFileStream = TestUtil.generateReadableSteam(['data'])

        jest.spyOn(
            Controller.prototype,
            "getFileStream",
        ).mockResolvedValue({
            stream: mockFileStream
        })

        jest.spyOn(
            mockFileStream,
            "pipe",
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(pages.controllerHTML)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    })

    test(`GET /index.html - should response with file stream`, async () => {
        const params = TestUtil.defaultHandlerParams()
        const filename = '/index.html'
        params.request.method = 'GET'
        params.request.url = `${filename}`
        const mockFileStream = TestUtil.generateReadableSteam(['data'])
        const expectedType = '.html'

        jest.spyOn(
            Controller.prototype,
            "getFileStream",
        ).mockResolvedValue({
            stream: mockFileStream,
            type: expectedType
        })

        jest.spyOn(
            mockFileStream,
            "pipe",
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(filename)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
        expect(params.response.writeHead).toHaveBeenCalledWith(
            200, {
                'Content-Type': CONTENT_TYPE[expectedType]
            }
        )
    })

    test(`GET /file.ext - should response with file stream`, async () => {
        const params = TestUtil.defaultHandlerParams()
        const filename = '/file.ext'
        params.request.method = 'GET'
        params.request.url = `${filename}`
        const mockFileStream = TestUtil.generateReadableSteam(['data'])
        const expectedType = '.ext'

        jest.spyOn(
            Controller.prototype,
            "getFileStream",
        ).mockResolvedValue({
            stream: mockFileStream,
            type: expectedType
        })

        jest.spyOn(
            mockFileStream,
            "pipe",
        ).mockReturnValue()

        await handler(...params.values())

        expect(Controller.prototype.getFileStream).toBeCalledWith(filename)
        expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
        expect(params.response.writeHead).not.toHaveBeenCalled()
    })

    test(`POST /unknown - given an inexistent route it should response with 404`, async () => {
        const params = TestUtil.defaultHandlerParams()
        params.request.method = 'POST'
        params.request.url = `/unknown`

        await handler(...params.values())

        expect(params.response.writeHead).toHaveBeenCalledWith(404)
        expect(params.response.end).toHaveBeenCalled()
    })

    describe('exceptions', () => {
        test(`shoud response with 404 when file dosen't exist`, async () => {
            const params = TestUtil.defaultHandlerParams()
            params.request.method = 'GET'
            params.request.url = `/index.png`

            jest.spyOn(
                Controller.prototype,
                "getFileStream"
            ).mockRejectedValue(new Error('Error: ENOENT file not found'))

            await handler(...params.values())

            expect(params.response.writeHead).toHaveBeenCalledWith(404)
            expect(params.response.end).toHaveBeenCalled()
        })

        test(`shoud response with 500 when caught an error `, async () => {
            const params = TestUtil.defaultHandlerParams()
            params.request.method = 'GET'
            params.request.url = `/index.png`

            jest.spyOn(
                Controller.prototype,
                "getFileStream"
            ).mockRejectedValue(new Error('Error:'))

            await handler(...params.values())

            expect(params.response.writeHead).toHaveBeenCalledWith(500)
            expect(params.response.end).toHaveBeenCalled()
        })
    })
})