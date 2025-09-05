
export async function example(name: string): Promise<string> {

  // make a string that's 16 megs
  const size = 16_000_000;
  const s = 'a'.repeat(size)

  // log the size of the string
  console.log(`Generated string of size ${s.length} bytes`);

  // sleep for 1 hour
  await new Promise((resolve) => setTimeout(resolve, 60 * 1000 * 60));

  return "hi";
}
  