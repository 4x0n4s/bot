import { request } from 'undici';

export async function ImageToB64(imageURL: string) {
    return Buffer.from(await (await request(imageURL)).body.arrayBuffer()).toString('base64');
}