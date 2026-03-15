import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getBookById } from '../controllers/books.controller.js';
import { bookService } from '../services/books.service.js';

test('getBookById controller returns 200 for existing book', async () => {
    const mockBook = { id: 1, title: 'Test Book', author: 'Test Author' };
    
    // Mock the service
    mock.method(bookService, 'getBookById', async () => Promise.resolve(mockBook));

    const req = {
        url: '/books/1'
    } as any;
    
    let responseData: any;
    const res = {
        setHeader: () => {},
        statusCode: 0,
        end: (data: string) => {
            responseData = JSON.parse(data);
        }
    } as any;

    await getBookById(req, res);
    
    assert.strictEqual(res.statusCode, 200);
    assert.deepStrictEqual(responseData.result, mockBook);
});
