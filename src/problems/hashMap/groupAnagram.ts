/*
Exercício 4 — Group Anagrams
LeetCode 49 — Medium

Enunciado:
Dado um array de strings `strs`, agrupe os anagramas juntos.
Você pode retornar a resposta em qualquer ordem.

Exemplo 1:
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

Exemplo 2:
Input: strs = [""]
Output: [[""]]

Exemplo 3:
Input: strs = ["a"]
Output: [["a"]]

Restrições:
- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- `strs[i]` consiste em letras minúsculas em inglês

Follow-ups:
1. Como você identificaria que duas strings pertencem ao mesmo grupo?
2. Dá para usar a string ordenada como chave de um map?
3. Como resolver sem ordenar, usando frequência de letras?
4. Qual a diferença de complexidade entre usar sort e usar contador de 26 letras?
*/

const strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"]
const strs2 = [""]
const strs3 = ["a"]

function validateAnagram(strA: string, strB: string):boolean {
    const seenMap = new Map<string, number>

    if (strA.length !== strB.length) return false

    for (let i = 0; i < strA.length; i++) {
        seenMap.set(strA[i], (seenMap.get(strA[i]) || 0) + 1)
        seenMap.set(strB[i], (seenMap.get(strB[i]) || 0) - 1)
    }

    for (const [, value] of seenMap) {
        if (value !== 0) return false
    }

    return true
}

//iterate through string array once for each string in array.
//how to stop duplicates?
function groupAnagramBruteforce (strs: string[]): Array<string[]> {
    const used = new Array<boolean>(strs.length).fill(false)
    const result: string[][] = []

    for (let i = 0; i < strs.length; i++) {
        if (used[i]) continue

        const currentGroup: string[] =[strs[i]]
        used[i] = true

        for (let j = 0; j < strs.length; j++) {
            if (i === j) continue
            if (used[j]) continue

            if (validateAnagram(strs[i], strs[j])) {
                currentGroup.push(strs[j])
                used[j] = true
            }
        }

        result.push(currentGroup)
    }

    return result
}


/*
the idea:

time complexity down!!!!!

eliminate the internal for loop.
we could try to translate each string to a key, used in a map.
for each key, the values are the original strings.

final time complexity expected: O(n * m log m) loop through array of strings once, and for each string, sort it.

*/
function groupAnagramHashmap(strs: string[]): string[][] {
    const groupsMap = new Map<string, string[]>()

    for (const string of strs) {
        const sortedString = string.split("").sort().join("")

        const currentGroup = groupsMap.get(sortedString) || []
        currentGroup.push(string)

        groupsMap.set(sortedString, currentGroup)
    }

    return Array.from(groupsMap.values())
}

//elimate sorting, use an array as key

/*
time complexity after use of array:
go through array once * for each string, go through each letter once generating its key (counter of letters, basically a hashmap)

O(n * m) better than the sorting algorithm O(n * m log m)

*/
function groupAnagramHashmapNoSort(strs: string[]): string[][] {
    const groupsMap = new Map<string, string[]>()

    for (const string of strs) {
        const letterCounter = Array<number>(26).fill(0)

        for (let i = 0; i < string.length; i++) {
            const letterCounterIndex = string.charCodeAt(i) - "a".charCodeAt(0)

            letterCounter[letterCounterIndex]++
        }

        //in js/ts arrays are compared by reference, not by content, so they are only equal when its the same object
        // let a = [0,0,1]
        // let b = [0,0,1]
        // a === b -> false
        // need to convert to string, because each key is considered a different array in memory

        const key = letterCounter.join("-")
        console.log(key)
        
        const currentGroup = groupsMap.get(key) || []
        currentGroup.push(string)

        groupsMap.set(key, currentGroup)
    }

    return Array.from(groupsMap.values())
}

function main() {
    console.log(groupAnagramBruteforce(strs1))
    console.log(groupAnagramHashmap(strs1))
    console.log(groupAnagramHashmapNoSort(strs1))
}

main()