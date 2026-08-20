export function solve_09_query_headers_status_contract() {
  const url = new URL(
    "https://example.com/api/user?name=Aryan&role=backendIntern"
  );

  const name = url.searchParams.get("name");
  const role = url.searchParams.get("role");

  const res = {
    statusCode: null,
    headers: {},
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    set(header, value) {
      this.headers[header] = value;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    }
  };

  res.status(200).set("Content-Type", "application/json").json({
      path: url.pathname,
      name,
      role
    });

  return res;

  return response;
}
