// 분수 매핑 
const FRAC_MAP: Record<string, number> = {
  '¼': 8, 
  '½': 15, 
  '¾': 23, 
  '⅓': 10, 
  '⅔': 20, 
  '⅕': 6, 
  '⅖': 12, 
  '⅗': 18, 
  '⅘': 24, 
  '⅙': 5, 
  '⅚': 25, 
  '⅛': 4,
  '⅜': 11, 
  '⅝': 19, 
  '⅞': 26, 
};

// 정규식 분리 용 class
const FRAC_CLASS = Object.keys(FRAC_MAP).join('');

export function ozToMl(input: string): number | '' {
  if (!input) return '';

  const trimmed = input.trim();

  // 혼합 분수: "1 ⅔", "2 ½"
  const mixed = trimmed.match(new RegExp(`^(\\d+)\\s*([${FRAC_CLASS}])$`));
  if (mixed) {
    const whole = Number(mixed[1]);
    const frac = FRAC_MAP[mixed[2]] ?? 0;
    return whole * 30 + frac;
  }

  // 분수 단독: "⅔", "½"
  if (FRAC_MAP[trimmed] != null) {
    return FRAC_MAP[trimmed];
  }

  // 순수 숫자: "1", "2"
  if (!isNaN(Number(trimmed))) {
    return Number(trimmed) * 30;
  }

  return '';
}
