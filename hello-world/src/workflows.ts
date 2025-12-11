
function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

export async function example(name: string): Promise<string> {

  const fibonacciTerm = 32;

  const result = fibonacci(fibonacciTerm);

  return result.toString();
}
  