import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import fallbackRender from "./components/ErrorBoundary";
const Todo = React.lazy(() => import("./components/Todo"));
function App() {
  const { data, isLoading } = useQuery(['todo'], async () => await axios.get('http://localhost:8000/todo'));

  return (
    <div style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px auto' }}>
      <ErrorBoundary fallbackRender={fallbackRender} onReset={() => {window.location.reload();}}>
        <Suspense fallback={<h2>🌀 Loading...</h2>}>
          <Todo />
        </Suspense>
      </ErrorBoundary>
      {isLoading ?
        <h1>Loading...</h1>
        : <div style={{ width: '100%' }}>
          {data?.data?.todos?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </div>}
    </div>
  )
}

export default App
