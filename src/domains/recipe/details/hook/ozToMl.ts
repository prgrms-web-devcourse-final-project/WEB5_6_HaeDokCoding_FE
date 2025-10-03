// 유니코드 분수 매핑 (소수점 대신 정수 ml로 변환)
const FRAC_MAP: Record<string, number> = {
  '¼': 8, // 0.25 * 30
  '½': 15, // 0.5 * 30
  '¾': 23, // 0.75 * 30
  '⅓': 10, // 1/3 * 30 ≈ 10
  '⅔': 20, // 2/3 * 30 ≈ 20
  '⅕': 6, // 1/5 * 30
  '⅖': 12, // 2/5 * 30
  '⅗': 18, // 3/5 * 30
  '⅘': 24, // 4/5 * 30
  '⅙': 5, // 1/6 * 30
  '⅚': 25, // 5/6 * 30
  '⅛': 4, // 1/8 * 30
  '⅜': 11, // 3/8 * 30
  '⅝': 19, // 5/8 * 30
  '⅞': 26, // 7/8 * 30
};

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
