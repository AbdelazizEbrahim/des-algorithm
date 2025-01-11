"use client";

import { useState } from "react";
import axios from "axios";

export default function DESForm() {
  const [action, setAction] = useState("encrypt");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      const response = await axios.post("/api/des", {
        action,
        text,
        key,
      });
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full transition-all duration-500 transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          DES Encryption/Decryption
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Action */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Action
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-md text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
          </div>

          {/* Input Text */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border-2 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter text to encrypt/decrypt"
            />
          </div>

          {/* Input Key */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Key
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter secret key"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              {action === "encrypt" ? "Encrypt" : "Decrypt"}
            </button>
          </div>
        </form>

        {/* Result Section */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 text-green-800 rounded-md border-2 border-green-200 shadow-sm">
            <h4 className="font-medium">Result:</h4>
            <p className="break-all">{result}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-800 rounded-md border-2 border-red-200 shadow-sm">
            <h4 className="font-medium">Error:</h4>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

