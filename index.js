const http = require("http");
const { URL } = require("url");
const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("./controllers/itemController");

// Create server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split("/").pop();

  // Routing
  if (req.method === "GET" && url.pathname === "/items") {
    await getItems(req, res);
  } else if (req.method === "GET" && /^\/items\/\d+$/.test(url.pathname)) {
    await getItemById(req, res, id);
  } else if (req.method === "POST" && url.pathname === "/items") {
    await createItem(req, res);
  } else if (req.method === "PUT" && /^\/items\/\d+$/.test(url.pathname)) {
    await updateItem(req, res, id);
  } else if (req.method === "DELETE" && /^\/items\/\d+$/.test(url.pathname)) {
    await deleteItem(req, res, id);
  } else {
    sendResponse(res, 404, { error: "Not found" });
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
