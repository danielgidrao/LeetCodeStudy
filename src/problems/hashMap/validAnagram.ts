export {}

/*
Exercício 2 — Valid Anagram
LeetCode 242 — Easy

Enunciado:
Dadas duas strings `s` e `t`, retorne `true` se `t` for um anagrama de `s`,
e `false` caso contrário.

Um anagrama é uma palavra formada reorganizando as letras de outra palavra,
usando exatamente os mesmos caracteres e a mesma quantidade de ocorrências.

Exemplo 1:
Input: s = "anagram", t = "nagaram"
Output: true

Exemplo 2:
Input: s = "rat", t = "car"
Output: false

Restrições:
- 1 <= s.length, t.length <= 5 * 10^4
- `s` e `t` consistem apenas de letras minúsculas em inglês
*/

interface validAnagramProps{
    s: string,
    t: string
}

/*
1. BRUTEFORCE
time compl. O(nˆ2) //cycle through an entire string for each letter of other
space compl. O(n) //used boolean array

  i
R A T

T A R

used = [false, false, true]

*/

const s = "rat"
const t = "tar"

function validAnagramBruteforce({s, t}: validAnagramProps): boolean {
    if (s.length !== t.length) return false

    const used: boolean[] = new Array(s.length).fill(false)

    for (let i = 0; i < s.length; i++) {
        let found = false;

        for (let j = 0; j < s.length; j++) {
            if ((s[i] === t[j]) && (used[j] === false)) {
                used[j] = true;
                found = true;
                break
            }
        }

        if (!found) {
            return false
        }
    }

    return true
}

function validAnagramOrdered({s,t}: validAnagramProps): boolean {
    if (s.length !== t.length) return false

    const sortedS = s.split("").sort().join("")
    const sortedT = t.split("").sort().join("")

    return sortedS === sortedT
}

//helper func are map equal
function areMapEqual(map1: Map<string, number>, map2: Map<string, number>) {
    if (map1.size !== map2.size) return false

    for (const [key, value] of map1) {
        if (!map2.has(key) || map2.get(key) !== value) return false
    }

    return true
}

function validAnagramHashmap({s,t}: validAnagramProps): boolean {
    if (s.length !== t.length) return false

    const sMap = new Map<string, number>
    const tMap = new Map<string, number>

    for (const char of s) {
        sMap.set(char, (sMap.get(char) || 0) + 1)
    }

    for (const char of t) {
        tMap.set(char, (tMap.get(char) || 0) + 1)
    }

    return areMapEqual(sMap, tMap)
}

/*
complexidade tempo: O(2n) -> O(n)

complexidade espaço: O(1) criar mapa do tamanho de n mas no máximo tera 26 chaves

*/
function validAnagram1Hashmap({s,t}: validAnagramProps): boolean {
    if (s.length !== t.length) return false

    const letterCounterMap = new Map<string, number>

    for (let i = 0; i < t.length; i++) {
        letterCounterMap.set(s[i], (letterCounterMap.get(s[i]) || 0) + 1)
        letterCounterMap.set(t[i], (letterCounterMap.get(t[i]) || 0) - 1)
    }

    for (const [, value] of letterCounterMap) {
        if (value !== 0) return false
    }

    return true
}

//funcao pra ter complexidade espacial const
function validAnagramArray({s,t}: validAnagramProps): boolean {
    if (s.length !== t.length) return false

    let counter: number[] = new Array(26).fill(0)//usar como contador inves do map, como tem espaço limitado de 26char

    for (let i = 0; i < s.length;  i++) {
        const sLetterIndex = s.charCodeAt(i) - "a".charCodeAt(0)
        const tLetterIndex = t.charCodeAt(i) - "a".charCodeAt(0)

        counter[sLetterIndex]++
        counter[tLetterIndex]--
    }

    for (const value of counter) {
        if (value !== 0) return false
    }

    return true
}


function main() {
    console.log(validAnagramBruteforce({s,t}))
    console.log(validAnagramOrdered({s,t}))
    console.log(validAnagramHashmap({s,t}))
    console.log(validAnagram1Hashmap({s,t}))
    console.log(validAnagramArray({s,t}))
}

main()