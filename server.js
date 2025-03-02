const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// In-memory data store
let items = [
  { id: 1, name: "Item 1", description: "First item" },
  { id: 2, name: "Item 2", description: "Second item" }
];

// Render Frontend Page
app.get("/", (req, res) => {
  res.render("index", { items });
});

// API: Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// API: Get a single item by ID
app.get("/api/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// API: Add a new item
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  const newItem = { id: items.length + 1, name, description };
  items.push(newItem);
  res.json({ message: "Item added successfully", item: newItem });
});

// API: Update an item
app.put("/api/items/:id", (req, res) => {
  const { name, description } = req.body;
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.name = name;
  item.description = description;
  res.json({ message: "Item updated successfully", item });
});

// API: Delete an item
app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(index, 1);
  res.json({ message: "Item deleted successfully" });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
