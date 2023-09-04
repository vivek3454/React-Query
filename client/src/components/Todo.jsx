import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Todo = () => {
    const [todo, setTodo] = useState('');
    const queryClient = useQueryClient()

    const createTodo = (todo) => {
        return () => axios.post('http://localhost:8000/todo/create', { title: todo })
    }

    const todoMutation = useMutation(createTodo(todo), {
        onSuccess: () => {
            queryClient.invalidateQueries(['todo']);
            console.log('Success');
        },
        onError: (error) => {
            console.log('Error', error);
        }
    })

    return (
        <div>
            <input onChange={(e) => setTodo(e.target.value)} value={todo} type="text" />
            <button onClick={() => todoMutation.mutate()} style={{ cursor: 'pointer' }}>Create</button>
        </div>
    )
}

export default Todo