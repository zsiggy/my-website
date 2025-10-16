require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Formspree configuration from environment variables
const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes should come before static file serving
// Formspree proxy endpoint - keeps your form ID private
app.post("/api/contact", async (req, res) => {
  try {
    // Check if Formspree form ID is configured
    if (!FORMSPREE_FORM_ID) {
      console.error("FORMSPREE_FORM_ID environment variable is not set");
      return res.status(500).json({ 
        error: "Server configuration error. Please contact the administrator." 
      });
    }

    console.log("Request body:", req.body); // Debug log
    
    const { name, email, message, _gotcha } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Missing required fields: name, email, and message are required" 
      });
    }

    // Forward to Formspree
    const formspreeResponse = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _gotcha // Include honeypot field
      })
    });

    if (formspreeResponse.ok) {
      res.json({ success: true, message: "Message sent successfully!" });
    } else {
      const errorData = await formspreeResponse.json().catch(() => ({}));
      res.status(formspreeResponse.status).json({
        error: errorData.errors?.[0]?.message || "Failed to send message"
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Routes for pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/test", (req, res) => {
  console.log("Test route hit Backend");
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
