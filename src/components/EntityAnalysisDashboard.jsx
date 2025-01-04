// src/components/EntityAnalysisDashboard.jsx

import React, { useState } from "react";
import {
  History,
  Book,
  FileText,
  AlertTriangle,
  CheckCircle,
  Edit,
  Plus,
  X,
  Network
} from "lucide-react";

export default function EntityAnalysisDashboard() {
  const [selectedTab, setSelectedTab] = useState("summary");

  const entityData = {
    id: "djoser-01",
    currentName: "Nebjeriket Djoser",
    aliases: [
      { name: "Djoser", source: "Contemporary inscriptions", confidence: 0.95 },
      { name: "Zoser", source: "Greek translations", confidence: 0.85 }
    ],
    title: "Pharaoh",
    period: "Old Kingdom",
    reign: "c. 2670–2650 BC",
    facts: [
      { text: "Son of King Khas Akemwi", confidence: 0.95 },
      { text: "Began the period known as the Old Kingdom", confidence: 0.9 },
      { text: "Moved capital to Memphis", confidence: 0.95 },
      { text: "Built the stepped pyramid at Saqqara", confidence: 0.98 }
    ],
    knowledgeGraph: {
      nodes: [
        { id: 1, label: "Djoser", type: "mainEntity" },
        { id: 2, label: "Khas Akemwi", type: "person" },
        { id: 3, label: "Imhotep", type: "person" },
        { id: 4, label: "Stepped Pyramid", type: "structure" },
        { id: 5, label: "Memphis", type: "location" }
      ],
      edges: [
        { from: 1, to: 2, label: "son of", confidence: 0.95 },
        { from: 1, to: 3, label: "employed", confidence: 0.92 },
        { from: 1, to: 4, label: "commissioned", confidence: 0.98 },
        { from: 3, to: 4, label: "designed", confidence: 0.95 },
        { from: 1, to: 5, label: "ruled from", confidence: 0.9 }
      ]
    }
  };

  const tabs = [
    { id: "summary", label: "Summary", Icon: CheckCircle },
    { id: "aliases", label: "Aliases", Icon: Plus },
    { id: "timeline", label: "Timeline", Icon: History },
    { id: "graph", label: "Knowledge Graph", Icon: Network },
    { id: "audit", label: "Audit Trail", Icon: AlertTriangle }
  ];

  function renderSummary() {
    return (
      <div className="border p-4 rounded-md col-span-2">
        <h2 className="font-bold text-lg mb-4">Entity Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Confirmed Facts</h3>
            <ul className="space-y-2">
              {entityData.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                  <div>
                    <span>{fact.text}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({Math.round(fact.confidence * 100)}% confidence)
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Information</h3>
            <div className="space-y-2">
              <div className="p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Title:</span> {entityData.title}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Period:</span> {entityData.period}
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Reign:</span> {entityData.reign}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderAliases() {
    return (
      <div className="border p-4 rounded-md col-span-2">
        <h2 className="font-bold text-lg mb-4">Name Variations & Aliases</h2>
        <div className="space-y-4">
          {entityData.aliases.map((alias) => (
            <div key={alias.name} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{alias.name}</h3>
                  <p className="text-sm text-gray-600">Source: {alias.source}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    alias.confidence > 0.9
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {Math.round(alias.confidence * 100)}% confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderKnowledgeGraph() {
    const width = 800;
    const height = 600;
    const nodeRadius = 30;

    const nodePositions = {};
    entityData.knowledgeGraph.nodes.forEach((node, index) => {
      const angle = (index / entityData.knowledgeGraph.nodes.length) * 2 * Math.PI;
      const radius = node.type === "mainEntity" ? 0 : 200;
      nodePositions[node.id] = {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius
      };
    });

    return (
      <div className="border p-4 rounded-md col-span-2">
        <h2 className="font-bold text-lg mb-4">Knowledge Graph</h2>
        <div className="h-[600px] relative border rounded-lg bg-gray-50 overflow-auto">
          <svg width={width} height={height}>
            {entityData.knowledgeGraph.edges.map((edge, i) => {
              const source = nodePositions[edge.from];
              const target = nodePositions[edge.to];
              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;
              return (
                <g key={`edge-${i}`}>
                  <line
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="#ccc"
                    strokeWidth={2}
                    strokeOpacity={edge.confidence}
                  />
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    dy="-5"
                    fontSize="12"
                    fill="#666"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}
            {entityData.knowledgeGraph.nodes.map((node) => {
              const pos = nodePositions[node.id];
              return (
                <g key={`node-${node.id}`} transform={`translate(${pos.x},${pos.y})`}>
                  <circle
                    r={node.type === "mainEntity" ? nodeRadius * 1.2 : nodeRadius}
                    fill={
                      node.type === "mainEntity"
                        ? "#8884d8"
                        : node.type === "person"
                        ? "#82ca9d"
                        : node.type === "structure"
                        ? "#ffc658"
                        : "#ff8042"
                    }
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fill="white"
                    fontSize="12"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  function renderTimeline() {
    return (
      <div className="border p-4 rounded-md col-span-2">
        <h2 className="font-bold text-lg mb-4">Historical Timeline</h2>
        <div className="relative pl-4">
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200" />
          <div className="space-y-8">
            {entityData.facts.map((fact, idx) => (
              <div key={idx} className="ml-8 relative">
                <div className="absolute -left-10 top-1.5 w-3 h-3 rounded-full bg-blue-500" />
                <div className="pb-4">
                  <p className="text-gray-600">{fact.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-sm px-2 py-1 rounded ${
                        fact.confidence > 0.9
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {Math.round(fact.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderAudit() {
    return (
      <div className="border p-4 rounded-md col-span-2">
        <h2 className="font-bold text-lg mb-4">Information Extraction Audit Trail</h2>
        <div className="space-y-6">
          {entityData.facts.map((fact, idx) => (
            <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  Fact Extraction
                </span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    fact.confidence > 0.9
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {Math.round(fact.confidence * 100)}% confidence
                </span>
              </div>
              <p className="text-gray-800 font-mono text-sm">"{fact.text}"</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderContent() {
    switch (selectedTab) {
      case "summary":
        return renderSummary();
      case "aliases":
        return renderAliases();
      case "timeline":
        return renderTimeline();
      case "graph":
        return renderKnowledgeGraph();
      case "audit":
        return renderAudit();
      default:
        return renderSummary();
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{entityData.currentName}</h1>
          <p className="text-gray-600">
            {entityData.aliases.length} known name variations • {entityData.reign}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-3 py-1 bg-purple-100 rounded-full text-purple-800 font-medium">
            {entityData.title}
          </span>
          <span className="px-3 py-1 bg-blue-100 rounded-full text-blue-800 font-medium">
            {entityData.period}
          </span>
        </div>
      </div>

      <div className="flex gap-4 border-b mb-4">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`flex items-center gap-2 pb-2 px-3 ${
              selectedTab === id
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-600"
            }`}
            onClick={() => setSelectedTab(id)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderContent()}
      </div>
    </div>
  );
}
