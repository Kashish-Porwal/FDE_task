// server/index.js
const express = require('express');
const cors = require('cors');
const { nodes, edges } = require('./data');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// API route to get full graph data
app.get('/api/graph', (req, res) => {
    res.json({ nodes, edges });
});

// API route for chat/queries
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    const query = message.toLowerCase();

    let response = "Hi! I can help you analyze the Order to Cash process. How can I assist you?";

    // Simple rule-based mock logic for demonstration
    if (query.includes("91150187") && query.includes("journal entry")) {
        const je = nodes.find(n => n.details.AccountingDocument === "9400635958");
        if (je) {
            response = `The journal entry number linked to billing document 91150187 is ${je.details.AccountingDocument}.`;
        }
    } else if (query.includes("billing")) {
        response = "I found one billing document (91150187) linked to a journal entry and a delivery.";
    } else if (query.includes("order")) {
        response = "The sales order 45001234 has been completed and delivered.";
    }

    res.json({ response });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
