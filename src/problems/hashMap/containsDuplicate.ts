export = {}
/*
Exercício 3 — Contains Duplicate
LeetCode 217 — Easy

Enunciado:
Dado um array de inteiros `nums`, retorne `true` se algum valor aparecer
pelo menos duas vezes no array, e `false` se todos os elementos forem distintos.

Exemplo 1:
Input: nums = [1, 2, 3, 1]
Output: true

Exemplo 2:
Input: nums = [1, 2, 3, 4]
Output: false

Exemplo 3:
Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
Output: true

Restrições:
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

Follow-ups:
1. Como você resolveria primeiro com brute force?
2. Dá para resolver ordenando o array antes?
3. Qual estrutura de dados permite detectar duplicatas em tempo linear?
4. Como mudaria a solução se, em vez de só dizer se existe duplicata, você tivesse que retornar qual elemento repete?
*/

let nums1 = [1, 2, 3, 1]
let nums2 = [1, 2, 3, 4]
let nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]


/*
time comple. O(nˆ2) // loop the entire array once for each number in array
space: O(1) constant, no variables used. No new data structures

*/
function containsDuplicateBruteforce(nums:number[]): boolean {
    for (let i = 0; i < nums.length; i++){
        const currentNumber = nums[i]

        for (let j = 0; j < nums.length; j++) {
            if (i === j) {
                continue
            }

            if (currentNumber === nums[j]) {
                return true
            }
        }
    }

    return false
}


/*
time: O(n log n + n) -> O(n log n) comparison sorting
space: O(1) no new vars
*/
function containsDuplicateOrdered(nums:number[]): boolean {
    nums.sort((a, b) => a-b)

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i+1]) return true
    }

    return false
}

/*
time: O(2n) -> O(n)
space: O(n)

*/
function containsDuplicateHashmap(nums:number[]): boolean {
    const counter = new Map<number, number>

    for (const char of nums) {
        counter.set(char, (counter.get(char)||0) + 1)
    }

    for (const [key, value] of counter) {
        if (value !== 1) console.log('repete o valor: ', key)
    }
    
    return false
}



function main() {
    console.log(containsDuplicateBruteforce(nums1))
    console.log(containsDuplicateOrdered(nums2))
    console.log(containsDuplicateHashmap(nums3))
}

main()