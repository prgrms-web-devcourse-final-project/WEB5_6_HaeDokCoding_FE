export function abvMap(input:string){
  if(!input) return ''
  switch (input) {
    case 'NON_ALCOHOLIC': return '논 알콜'
    case 'WEAK': return '약한 도수'
    case 'LIGHT': return '가벼운 도수'
    case 'MEDIUM': return '중간 도수'
    case 'STRONG': return '센 도수'
    case 'VERY_STRONG' : return '매우 센 도수'
  }
}