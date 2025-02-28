// Way 1: basic and popular way
// Time Complexity: O(n)
// Space Complexity: O(1)
function sum_to_n_a(n: number): number {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

// Way 2: mathematical way
// Time Complexity: O(1)
// Space Complexity: O(1)
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2
}

// Way 3: recursive way
// Time Complexity: O(log n)
// Space Complexity: O(1)
function sum_to_n_c(n: number): number {
  return sum_divide(1, n)
}

function sum_divide(start: number, end: number): number {
  if (start === end) {
    return start
  }

  const mid = Math.floor((start + end) / 2)

  return sum_divide(start, mid) + sum_divide(mid + 1, end)
}

console.log(sum_to_n_a(12)) // 78
console.log(sum_to_n_b(12)) // 78;
console.log(sum_to_n_c(12)) // 78;

export { sum_to_n_a, sum_to_n_b, sum_to_n_c }
