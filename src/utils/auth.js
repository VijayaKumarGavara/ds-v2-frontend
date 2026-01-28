export function getAuth() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || !role) return null;
  return { token, role };
}
