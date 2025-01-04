// src/components/KnowledgeGraphManager.jsx

import React, { useState } from "react";
import {
  Upload,
  Link as LinkIcon,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Globe
} from "lucide-react";

export default function KnowledgeGraphManager() {
  const [resources, setResources] = useState([
    {
      id: 1,
      type: "file",
      name: "egyptian_kings.pdf",
      status: "processed",
      progress: 100,
      entities: 45,
      relationships: 78,
      date: "2024-03-15",
      error: null
    },
    {
      id: 2,
      type: "link",
      name: "https://example.com/ancient-egypt-article",
      status: "processing",
      progress: 60,
      entities: 12,
      relationships: 15,
      date: "2024-03-16",
      error: null
    },
    {
      id: 3,
      type: "file",
      name: "pyramid_construction.docx",
      status: "error",
      progress: 30,
      entities: 0,
      relationships: 0,
      date: "2024-03-16",
      error: "Failed to parse document structure"
    }
  ]);

  const [showUpload, setShowUpload] = useState(false);
  const [newLink, setNewLink] = useState("");

  function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (file) {
      setResources([...resources, {
        id: resources.length + 1,
        type: "file",
        name: file.name,
        status: "processing",
        progress: 0,
        entities: 0,
        relationships: 0,
        date: new Date().toISOString().split("T")[0],
        error: null
      }]);
      setShowUpload(false);
    }
  }

  function handleAddLink() {
    if (newLink.trim()) {
      setResources([...resources, {
        id: resources.length + 1,
        type: "link",
        name: newLink,
        status: "processing",
        progress: 0,
        entities: 0,
        relationships: 0,
        date: new Date().toISOString().split("T")[0],
        error: null
      }]);
      setNewLink("");
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Graph Manager</h1>
          <p className="text-gray-600">
            Add and manage resources for your knowledge graph
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
          <button
            onClick={() => setShowUpload("link")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <LinkIcon className="w-4 h-4" />
            Add Link
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload === true && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
            <p className="text-gray-600 mb-4">
              Supported formats: PDF, DOCX, TXT, CSV
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.txt,.csv"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showUpload === "link" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Link</h2>
            <p className="text-gray-600 mb-4">
              Enter the URL of the resource to add
            </p>
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="https://example.com/article"
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLink}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      <div className="grid grid-cols-1 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="border rounded-md p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {resource.type === "file" ? (
                  <FileText className="w-8 h-8 text-blue-500" />
                ) : (
                  <Globe className="w-8 h-8 text-green-500" />
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-1">{resource.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Added: {resource.date}</span>
                    <span>•</span>
                    <span>Entities: {resource.entities}</span>
                    <span>•</span>
                    <span>Relationships: {resource.relationships}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {resource.status === "processed" && (
                  <span className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Processed
                  </span>
                )}
                {resource.status === "processing" && (
                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1 text-sm text-blue-600">
                      <Clock className="w-4 h-4" />
                      Processing
                    </span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${resource.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {resource.status === "error" && (
                  <span className="flex items-center gap-1 text-sm text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    {resource.error}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Database Stats */}
      <div className="border p-4 rounded-md">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Knowledge Graph Statistics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold">{resources.length}</h4>
            <p className="text-gray-600">Total Resources</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold">
              {resources.reduce((sum, r) => sum + r.entities, 0)}
            </h4>
            <p className="text-gray-600">Total Entities</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold">
              {resources.reduce((sum, r) => sum + r.relationships, 0)}
            </h4>
            <p className="text-gray-600">Total Relationships</p>
          </div>
        </div>
      </div>
    </div>
  );
}
