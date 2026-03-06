export function getPokemeonId(url: string) {
    return parseInt(url.split('/').at(-2)!, 10)
}