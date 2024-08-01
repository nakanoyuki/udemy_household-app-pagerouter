//日本円に変換する関数
export function formatAmount(amount: number): string {
  return amount.toLocaleString("ja-JP");
}
