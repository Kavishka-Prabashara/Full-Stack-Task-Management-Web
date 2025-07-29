import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchTasks, addTask, updateTask, deleteTask } from '../redux/taskSlice';

export default function TaskPage() {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useAppSelector((state) => state.tasks);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>(null); // Consider defining a proper type for selectedTask

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const resetForm = () => {
        setSelectedTask(null);
        setTaskTitle('');
        setTaskDescription('');
        setCompleted(false);
    };

    const handleAddTask = () => {
        if (taskTitle.trim() !== '') {
            dispatch(addTask({ title: taskTitle, description: taskDescription }));
            resetForm();
        }
    };

    const handleSelect = (task: any) => {
        setSelectedTask(task);
        setTaskTitle(task.title);
        setTaskDescription(task.description || '');
        setCompleted(task.completed);
    };

    const handleUpdate = () => {
        if (selectedTask) {
            dispatch(updateTask({
                ...selectedTask,
                title: taskTitle,
                description: taskDescription,
                completed
            }));
            resetForm();
        }
    };

    const handleDelete = () => {
        if (selectedTask) {
            dispatch(deleteTask(selectedTask.id)); // Ensure selectedTask.id is a number here
            resetForm();
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">📋 My Tasks</h2>

            <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center mb-6 items-center">
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="border border-white rounded-lg px-4 py-2 w-full max-w-md"
                />
                <input
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Enter task description"
                    className="border border-white rounded-lg px-4 py-2 w-full max-w-md"
                />
                <label className="text-white flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <span>Completed</span>
                </label>
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={!!selectedTask}
                >
                    Add
                </button>
                <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    disabled={!selectedTask}
                >
                    Update
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    disabled={!selectedTask}
                >
                    Delete
                </button>
                {selectedTask && (
                    <button
                        onClick={resetForm}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {loading && <p className="text-blue-600 text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full border border-white shadow-sm rounded bg-transparent">
                    <thead>
                    <tr className="bg-transparent text-white text-left">
                        <th className="px-4 py-2 border-b">ID</th>
                        <th className="px-4 py-2 border-b">Title</th>
                        <th className="px-4 py-2 border-b">Description</th>
                        <th className="px-4 py-2 border-b">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task.id}
                            onClick={() => handleSelect(task)}
                            className="hover:bg-gray-50/30 cursor-pointer"
                        >
                            <td className="px-4 py-2 border-b border-white">{task.id}</td>
                            <td className="px-4 py-2 border-b border-white font-semibold text-white">
                                {task.title}
                            </td>
                            <td className="px-4 py-2 border-b border-white text-white">
                                {task.description || '-'}
                            </td>
                            <td className="px-4 py-2 border-b border-white">
                                    <span className={`text-xl ${task.completed ? 'text-green-500' : 'text-red-400'}`}>
                                        {task.completed ? '✅ Completed' : '❌ Not Completed'}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
