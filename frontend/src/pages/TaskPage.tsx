// src/pages/TaskPage.tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchTasks } from '../redux/taskSlice';

export default function TaskPage() {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div>
            <h2>My Tasks</h2>
            {loading && <p>Loading...</p>}
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>
                        {task.title} - {task.completed ? '✅' : '❌'}
                    </p>
                </div>
            ))}
        </div>
    );
}
