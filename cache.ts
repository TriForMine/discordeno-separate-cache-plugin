import {Encoder, Decoder} from "https://deno.land/x/cbor@v0.9.4/index.js";

const encoder = new Encoder({
    useRecords: false,
    largeBigIntToFloat: false,
});

const decoder = new Decoder({
    useRecords: false,
});

export function decode(data: Uint8Array) {
    return decoder.decode(data);
}

export function encode(data: any) {
    return encoder.encode(data);
}
