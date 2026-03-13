import { Routes, Route, Navigate } from "react-router-dom";
import { RecipeList } from "./features/recipes/RecipeList";
import { RecipeDetailPage } from "./features/recipes/RecipeDetailPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Recipe Book</h1>
      </header>
      <main className="mx-auto max-w-6xl px-8 py-8">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
