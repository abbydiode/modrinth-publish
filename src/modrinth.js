import Fetch from 'node-fetch';
import File from 'fs';
import Path from 'path';
import FormData from 'form-data';

const baseUrl = 'https://api.modrinth.com/v2';
const headers = {};
headers['User-Agent'] = `abbydiode/modrinth-publish`;

export default class Modrinth {
    static SetToken = token => headers['Authorization'] = token;

    static CreateVersion = async (metadata, filePath) => {
        const form = new FormData();
        form.append('data', JSON.stringify(metadata));
        form.append('file', File.createReadStream(filePath), Path.parse(filePath).base);
        const response = await Fetch(`${baseUrl}/version`, {
            method: 'POST',
            headers: headers,
            body: form
        });
        return response.ok;
    };
};