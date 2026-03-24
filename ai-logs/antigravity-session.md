Use the latest available Gemini 3.1 Pro model for this project.
# Forward Deployed Engineer - Task Details

Graph-Based Data Modeling and Query System

---

## Overview

In real-world business systems, data is spread across multiple tables : orders, deliveries, invoices, and payments, without a clear way to trace how they connect.

In this assignment, you will unify this fragmented data into a graph and build a system that allows users to explore and query these relationships using natural language.

---

## What You Are Building

You are building a **context graph system with an LLM-powered query interface**. Below is a sample interface for reference:


At a high level:

- The dataset is converted into a **graph of interconnected entities**
- This graph is **visualized in a UI**
- A **chat interface sits alongside the graph**
- The user asks questions in natural language
- The system translates those questions into **structured queries (such as SQL) dynamically**
- The system executes those queries and returns **data-backed answers in natural language**

This is not a static Q&A system. The LLM should interpret user queries, generate structured queries dynamically, and return data-backed answers.

---

## Dataset

First, please download this dataset:

https://drive.google.com/file/d/1UqaLbFaveV-3MEuiUrzKydhKmkeC1iAL/view?usp=sharing

The dataset includes entities such as:

### Core Flow

- Orders
- Deliveries
- Invoices
- Payments

### Supporting Entities

- Customers
- Products
- Address

You are free to preprocess, normalize, or restructure the dataset as required.

---

## Functional Requirements

### 1. Graph Construction

Ingest the dataset and construct a graph representation.

You must define:

- Nodes representing business entities
- Edges representing relationships between entities

Examples of relationships:

- Purchase Order → Purchase Order Item
- Delivery → Plant
- Purchase Order Item → Material
- Customer → Delivery

The focus is on how you model the system, not just loading data.

---

### 2. Graph Visualization

Build an interface that allows users to explore the graph.

The interface should support:

- Expanding nodes
- Inspecting node metadata
- Viewing relationships between entities

A simple and clean implementation is sufficient.

You may use any visualization library of your choice.

---

### 3. Conversational Query Interface

Build a chat interface that allows users to query the system.

The system should:

- Accept natural language queries
- Translate queries into structured operations on the graph or underlying data
- Return accurate and relevant responses

The responses must be grounded in the dataset and not generated without data backing.

---

### 4. Example Queries

Your system should be capable of answering questions such as:

a. Which products are associated with the highest number of billing documents?

b. Trace the full flow of a given billing document (Sales Order → Delivery → Billing → Journal Entry)

c. Identify sales orders that have broken or incomplete flows (e.g. delivered but not billed, billed without delivery)

You are encouraged to go beyond these examples and explore additional meaningful queries based on your understanding of the dataset.

---

### 5. Guardrails

The system must restrict queries to the dataset and domain.

It should appropriately handle or reject unrelated prompts such as:

- General knowledge questions
- Creative writing requests
- Irrelevant topics

Example response:

"This system is designed to answer questions related to the provided dataset only."

This is an important evaluation criterion.

---

## Optional Extensions (Bonus)

- Natural language to SQL or graph query translation
- Highlighting nodes referenced in responses
- Semantic or hybrid search over entities
- Streaming responses from the LLM
- Conversation memory
- Graph clustering or advanced graph analysis

Depth in one or two functionalities is preferred over implementing many superficially.

Make this project look like a premium, modern, production-grade product demo — not a basic student assignment.

I have already shared the full assessment details and requirements with you. Based on that, focus on delivering the strongest possible implementation quality, especially in UI, UX, information hierarchy, and overall product feel.

What I want from you:

1. Create a highly polished and modern interface with a clean dark theme, glassmorphism / soft-elevation style, excellent spacing, refined typography, elegant cards, smooth hover states, subtle animations, and a premium enterprise-AI dashboard feel.

2. The graph visualization should look visually impressive and interactive:
- clean node-link layout
- smooth pan and zoom
- expandable nodes
- node highlighting on selection
- edge emphasis on hover
- metadata drawer / floating detail panel
- color-coded entity types
- visually balanced clustering
- professional graph controls and legend

3. The chat panel should feel like a real AI copilot:
- modern docked side panel
- polished message bubbles
- loading / thinking states
- query suggestions
- grounded answers only
- ability to reference or highlight related nodes from the graph
- elegant empty state
- clear error and guardrail responses

4. The entire experience should feel like an enterprise intelligence tool used by operations / finance / supply-chain teams. Prioritize clarity, trust, readability, and visual sophistication.

5. Add strong dashboard-quality UI elements where relevant:
- summary stats cards
- entity counters
- flow health indicators
- broken flow alerts
- top connected products / customers
- filters and search
- mini insights panels

6. Ensure the app has a very strong first impression:
- beautiful landing state
- meaningful default graph view
- realistic sample prompts
- polished onboarding hints
- smooth transitions
- responsive layout
- attention to micro-interactions

7. Avoid making it look generic, template-based, or hackathon-level. It should feel curated, sharp, modern, and impressive enough to stand out in a hiring evaluation.

8. Wherever possible, make the product demo visually tell a story:
- business flow visibility
- traceability
- anomaly detection
- relationship exploration
- AI-assisted investigation

9. Use thoughtful visual design decisions:
- premium dark color palette
- restrained accent colors
- strong contrast for readability
- consistent iconography
- modern charts/indicators if helpful
- no clutter

10. Write the code in a clean, modular, maintainable way so the final result is both technically strong and visually outstanding.

Important:
Do not just satisfy the functional requirements. Optimize for “wow factor” while keeping the product professional, believable, and useful.
Make it look like something a top startup or enterprise AI company would demo to clients.



Redesign the product experience so that the app becomes self-explanatory within the first 10–15 seconds of opening it.

Right now, the UI may look visually clean, but a first-time viewer cannot immediately understand:
- what the project does
- what problem it solves
- what they are supposed to do
- how the graph and AI panel work together

I want the product to feel like a premium enterprise intelligence tool for tracing and investigating Order-to-Cash business process flows — not just a graph with a chatbox.

Goals:
- make the product instantly understandable
- improve storytelling through the interface
- make the app recruiter-friendly and demo-ready
- keep the UI modern, premium, and polished
- prioritize clarity over minimalism

What needs to change:

1. Add a clear product header / hero section at the top of the app that explains in one line what this system does.

2. Add a short supporting subtitle and description that explain the purpose in simple business language:
- visualize business document flow
- inspect connected entities
- detect incomplete or broken flows
- ask natural language questions grounded in the dataset

3. Add a small onboarding / “how to use” panel visible on first load so users know exactly how to interact with the system.

4. Add summary insight cards above or beside the graph so the dataset feels meaningful immediately.
Examples:
- Total Entities
- Total Relationships
- Document Types
- Broken Flows
- Top Connected Documents

5. Add a visible legend for node colors so users can instantly understand what each node type represents.

6. Add default example questions in the chat panel so the use case becomes obvious immediately.

7. Improve the default graph state so it feels intentional and informative, not just like an empty or unexplained graph view.
Examples:
- highlighted sample flow
- labels for key entities
- annotation like “Interactive Order-to-Cash relationship map”

8. Add clearer section titles and labels throughout the UI, such as:
- Relationship Graph
- AI Copilot
- Entity Details
- Flow Insights
- Dataset Overview

9. Make the graph and chat feel connected.
If possible, when a user asks a question, visually reference or highlight the relevant nodes or mention that the answer is based on graph relationships.

10. Keep the UI premium and modern, but make sure the app explains itself through hierarchy, copy, layout, labels, and onboarding.

Important:
The final experience should not rely on verbal explanation from me.
A recruiter or evaluator should understand the use case, workflow, and value of the project just by opening it.

Use the following exact UX copy in the UI wherever appropriate:

Hero title:
Order-to-Cash Intelligence Graph

Hero subtitle:
Trace relationships across sales orders, deliveries, billing documents, and journal entries through an interactive graph and AI-assisted analysis.

Short description:
This system helps users explore business document flow, inspect connected entities, detect incomplete process chains, and ask natural language questions grounded in the dataset.

Onboarding / how it works:
How to use
1. Explore the relationship graph
2. Click a node to inspect entity details
3. Follow links to trace document flow
4. Ask questions in the AI copilot panel

Helper text above graph:
Interactive business relationship map

Helper text near graph controls:
Zoom, pan, and select nodes to investigate how documents move through the order-to-cash process.

Chat panel heading:
AI Copilot for Process Investigation

Chat panel subtext:
Ask grounded questions about orders, deliveries, billing documents, and journal entries.

Suggested prompts:
- Trace the full flow of billing document 91150187
- Find the journal entry linked to billing document 91150187
- Show incomplete order-to-cash flows
- Which entities are most connected in this graph?
- Summarize the path from sales order to journal entry

Insight cards:
- Total Entities
- Total Relationships
- Document Types
- Broken Flows
- Top Connected Documents

Legend title:
Entity Types

Legend labels:
- Sales Order
- Outbound Delivery
- Billing Document
- Journal Entry

Empty/default state text:
Start by exploring the graph or use a sample prompt to investigate a business document flow.

Final expectation:
Make the interface feel self-explanatory, product-like, recruiter-friendly, and suitable for a polished enterprise AI demo.
