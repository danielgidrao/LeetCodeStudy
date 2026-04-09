export {};
/*
Exercise 1 — Two Sum
LeetCode 1 — Easy

Main pattern:
- Hash Map
Problem statement:
Given an array of integers `nums` and an integer `target`,
return the indices of the two numbers such that they add up to `target`.

Rules:
- You may assume that each input has exactly one solution.
- You may not use the same element twice.
- You can return the answer in any order.

Example 1:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Example 2:
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Example 3:
Input: nums = [3, 3], target = 6
Output: [0, 1]

Template:
function twoSum(nums: number[], target: number): number[] {
    
}
*/

/*

nums, target -> 2 numbers (a+b = target)

    1.   
[2, 7, 11, 15]
target = 9

1- bruteforce
iterate through array for each element of array, checking if a + b = target
O(nˆ2), iterates through array once for each array element. (n * n)



*/

const nums = [2, 9, 11, 15]
const target = 11

function twoSumBruteforce(nums: number[], target: number): number[] {
    //O(1) space complexity, we only create the i and j variables. Constant memory usage.

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i,j]
            }
        }
    }
    return []
}

/*
2- Hashmap

Hashmap
data structure with key/value

----HASHMAP---
[1, 2]
[2, 3]
search O(1) time comp
insert...
delete...

COLISION

[2, 7, 11, 15]
target = 9



time comp.: O(n) cicle through the array once
space : O(n) map the array to hashmap.

*/

function twoSumHashmap(nums: number[], target: number): number[] {
    const seen = new Map<number, number>()

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];

        if (seen.has(complement)){
            return [seen.get(complement)!, i]
        }

        seen.set(nums[i], i)
    }

    return []
}


/*

L.          R
[2, 7, 11, 15]
target = 9

*/

function twoSumTwoPointers(nums: number[], target: number): number[] {
    let left = 0;
    let right = nums.length - 1; //start at end of array

    while (left < right) {
        let sum = nums[left] + nums[right]

        if (sum === target){
            return [left, right]
        }

        if (sum > target) {
            right --
        } else {
            left ++
        }

    }

    return []
}


function main() {

    console.log(twoSumBruteforce(nums, target))
    console.log(twoSumHashmap(nums, target))
    console.log(twoSumTwoPointers(nums, target))

}
main();
