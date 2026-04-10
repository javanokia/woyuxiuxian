export function numFilterTxt(str: string): string {
  const rev = str.split('').reverse().join('')
  const ret: string[] = []
  for (let i = 0; i < rev.length; i += 3) {
    ret.push(rev.slice(i, i + 3))
  }
  return ret.join(',').split('').reverse().join('')
}
