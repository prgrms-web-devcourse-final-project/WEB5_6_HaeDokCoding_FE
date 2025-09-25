export async function setPreLoginPath(path: string) {
  await fetch('/api/set-pre-login-path', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }), // 인자로 받은 path 사용
  });
}
