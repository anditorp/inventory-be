const pool = require("../config/db");
const { sendResponse, parseRequestBody } = require("../utils/helpers");

// Get all items
const getItems = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    sendResponse(res, 200, result.rows);
  } catch (error) {
    sendResponse(res, 500, { error: "Database error" });
  }
};

// Get item by ID
const getItemById = async (req, res, id) => {
  try {
    const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      sendResponse(res, 200, result.rows[0]);
    } else {
      sendResponse(res, 404, { error: "Item not found" });
    }
  } catch (error) {
    sendResponse(res, 500, { error: "Database error" });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    const { name, description } = await parseRequestBody(req);
    const result = await pool.query(
      "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    sendResponse(res, 201, result.rows[0]);
  } catch (error) {
    sendResponse(res, 500, { error: "Database error" });
  }
};

// Update item
const updateItem = async (req, res, id) => {
  try {
    const { name, description } = await parseRequestBody(req);
    const result = await pool.query(
      "UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    if (result.rows.length > 0) {
      sendResponse(res, 200, result.rows[0]);
    } else {
      sendResponse(res, 404, { error: "Item not found" });
    }
  } catch (error) {
    sendResponse(res, 500, { error: "Database error" });
  }
};

// Delete item
const deleteItem = async (req, res, id) => {
  try {
    const result = await pool.query("DELETE FROM items WHERE id = $1", [id]);
    if (result.rowCount > 0) {
      sendResponse(res, 200, { message: "Item deleted" });
    } else {
      sendResponse(res, 404, { error: "Item not found" });
    }
  } catch (error) {
    sendResponse(res, 500, { error: "Database error" });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
