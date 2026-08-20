import http from "node:http";
export function solve_08_native_http_routing_core() {
  const routes = {
    "/": "Home",
    "/about": "About",
    "/users": "Users",
  };

  const server = http.createServer((req, res) => {
    const response = routes[req.url];

    if (response) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });

      res.end(response);
      return;
    }

    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("Not Found");
  });

  return {
    server,
    routes,
  };
}
