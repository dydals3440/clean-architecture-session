export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  return response.json();
}
