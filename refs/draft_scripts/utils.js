const createCharFreqObj = () => Array.from({length:26}).map((_, i)=> String.fromCharCode(97 + i)).reduce((a, b) => ({...a, [b]: 0}), {})

const o = createCharFreqObj()

console.log(o)