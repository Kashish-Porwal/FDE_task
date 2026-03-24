Order-to-Cash Intelligence Graph
Overview

This project is a graph-based business intelligence tool that turns fragmented Order-to-Cash records into a connected, explorable relationship graph. It allows users to visualize how business entities such as sales orders, outbound deliveries, billing documents, and journal entries are related, and query those relationships using a conversational AI interface.

The goal of the system is to make it easier to:

trace end-to-end business document flow
inspect linked entities and metadata
detect incomplete or broken flows
ask natural language questions grounded in the dataset
Architecture

The application uses a simple full-stack architecture:

Frontend: React + Vite
Backend: Node.js + Express
Graph visualization: react-force-graph-3d
LLM integration: Gemini API
Data storage: in-memory structured dataset loaded from local data files
Flow
The backend loads and structures the business dataset into graph-friendly nodes and edges
The frontend fetches this graph through /api/graph
The graph is rendered as an interactive 3D relationship map
User queries are sent from the chat UI to /api/chat
The backend uses Gemini with dataset-grounded context and guardrails to generate responses
The response is shown in natural language in the frontend
Graph Modelling

The dataset is modeled as a graph with:

Nodes

Each business entity is represented as a node, for example:

Sales Order
Outbound Delivery
Billing Document
Journal Entry

Each node contains:

unique identifier
entity type
metadata/details relevant to that entity
Edges

Edges represent business relationships between entities, such as:

Sales Order → Outbound Delivery
Outbound Delivery → Billing Document
Billing Document → Journal Entry

This graph-based design makes multi-step tracing much easier than navigating isolated tables.

Database / Storage Choice

For this implementation, I used local in-memory structured data instead of a full database.

Why
the dataset size for the assessment was manageable
this kept the implementation lightweight and fast
it reduced setup complexity and allowed more time to focus on graph modeling, UI, and LLM integration
Tradeoff

For a production-scale version, I would move to:

a relational database for normalized record storage
and/or a graph database such as Neo4j for more advanced graph traversal and querying
LLM Prompting Strategy

The conversational layer is designed to answer only from the provided dataset and graph context.

Strategy
user prompt is received in /api/chat
relevant dataset/graph context is prepared on the backend
Gemini is prompted to answer only from the available business data
if the information is not present, the assistant is instructed to say so clearly
the system avoids unsupported or fabricated answers
Prompt design goals
grounded answers
business-style concise responses
no hallucinations
strict dataset scope
Guardrails

Guardrails were added to ensure the chatbot remains domain-restricted.

Guardrail behavior
unrelated prompts are rejected
general knowledge / creative / off-topic prompts are not answered
if the requested information is not found in the dataset, the system responds transparently
responses are limited to Order-to-Cash business entities and relationships in the provided dataset

Example guardrail response:

This system is designed to answer questions related to the provided business dataset only.

UI / Product Design Decisions

The interface was redesigned to make the product self-explanatory on first open.

Key UX decisions:

a clear hero title and subtitle explaining the use case
insight cards to summarize the dataset
legend for node types
onboarding guidance
suggested prompts in the AI panel
premium dark enterprise-style layout

The goal was to ensure a recruiter or evaluator could understand the project quickly without additional explanation.

Deployment

The project is deployed as:

Frontend: static deployment
Backend: Render web service

The frontend connects to the backend using environment variables.

Environment Variables

Backend example:

GEMINI_API_KEY=your_key_here
FRONTEND_URL=your_frontend_url

Frontend example:

VITE_API_URL=your_backend_url


## AI Coding Session Logs

AI-assisted development prompts and iteration logs are included in the `ai-logs/` folder.
