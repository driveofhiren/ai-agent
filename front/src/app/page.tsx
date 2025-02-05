"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [height, setHeight] = useState("155");
    const [weight, setWeight] = useState("67");
    const [goal, setGoal] = useState("lose weight");
    const [exerciseFrequency, setExerciseFrequency] = useState("4 times/week");
    const [dietPreference, setDietPreference] = useState("veg");
    const [otherRestrictions, setOtherRestrictions] = useState("desk job");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const { data } = await axios.post("http://localhost:5000/prompt", {
          height,
          weight,
          goal,
          exerciseFrequency,
          dietPreference,
          otherRestrictions,
      });

      setResponse(data.response);
  } catch (error) {
      setResponse("Error: ");
  } finally {
      setLoading(false);
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">AI Diet & Lifestyle Planner app</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
            <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
            />
            <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
            />
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Goal (e.g., lose 15 kg)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
            />
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Exercise Frequency (e.g., 3 times/week)"
                value={exerciseFrequency}
                onChange={(e) => setExerciseFrequency(e.target.value)}
                required
            />
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Diet Preference (e.g., Mediterranean)"
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value)}
                required
            />
            <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows={2}
                placeholder="Other Restrictions/Considerations"
                value={otherRestrictions}
                onChange={(e) => setOtherRestrictions(e.target.value)}
            />

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate"}
            </button>
        </form>

        {response && (
            <div className="mt-6 w-full max-w-md p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Response:</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{response}</p> {/* Added whitespace-pre-wrap */}
            </div>
        )}
    </div>
);
}