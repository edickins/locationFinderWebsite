export function simpleHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const charCode = str.charCodeAt(i);
    hash += charCode;
  }
  return hash;
}

export function prefixHash(prefix: string, str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const charCode = str.charCodeAt(i);
    hash += charCode;
  }

  return prefix + hash;
}
