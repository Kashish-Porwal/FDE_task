import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import axios from 'axios';

const nodeColors = {
    "Journal Entry": "#f87171",
    "Billing Document": "#60a5fa",
    "Sales Order": "#4ade80",
    "Outbound Delivery": "#fbbf24"
};

const GraphCanvas = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/graph');
                // react-force-graph uses links instead of edges
                setGraphData({
                    nodes: res.data.nodes,
                    links: res.data.edges
                });
            } catch (err) {
                console.error("Error fetching graph data:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="graph-container">
            <ForceGraph3D
                ref={graphRef}
                graphData={graphData}
                backgroundColor="#0f172a"
                nodeLabel={(node) => `
          <div class="glass p-3 rounded-xl">
             <strong class="text-blue-400">${node.type}</strong><br/>
             ${Object.entries(node.details).map(([k, v]) => `<span>${k}: ${v}</span><br/>`).join('')}
          </div>
        `}
                nodeColor={(node) => nodeColors[node.type] || '#ffffff'}
                nodeRelSize={6}
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}
                onNodeClick={(node) => {
                    // Aim at node from outside
                    const distance = 40;
                    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

                    graphRef.current.cameraPosition(
                        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
                        node,
                        3000
                    );
                }}
            />
        </div>
    );
};

export default GraphCanvas;
