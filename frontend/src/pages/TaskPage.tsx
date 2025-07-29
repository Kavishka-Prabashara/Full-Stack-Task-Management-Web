import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchTasks, addTask } from '../redux/taskSlice';

export default function TaskPage() {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useAppSelector((state) => state.tasks);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            dispatch(addTask({ title: newTaskTitle, description: newTaskDescription })); // Pass an object
            setNewTaskTitle('');
            setNewTaskDescription(''); // Clear the description input as well
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">📋 My Tasks</h2>

            {/* Input field */}
            <div className="flex gap-2 justify-center mb-6">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter a new task"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                />
                <input
                    type="text"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Enter a Description"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            {loading && <p className="text-blue-600 text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="p-4 border rounded shadow-sm bg-white">
                        <p className="text-gray-800 text-lg font-semibold">{task.title}</p>
                        {task.description && (
                            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                        )}
                        <span
                            className={`inline-block mt-2 text-xl ${
                                task.completed ? 'text-green-500' : 'text-red-400'
                            }`}
                        >
                {task.completed ? '✅ Completed' : '❌ Not Completed'}
            </span>
                    </div>
                ))}
            </div>

        </div>
    );
}
