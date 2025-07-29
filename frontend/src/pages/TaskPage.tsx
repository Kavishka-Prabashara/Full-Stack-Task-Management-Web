import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchTasks, addTask } from '../redux/taskSlice';
import DashBoardWrapper from '../components/DashBoardWrapper';

export default function TaskPage() {
    const dispatch = useAppDispatch();
    const { tasks, loading, error } = useAppSelector((state) => state.tasks);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            dispatch(addTask(newTaskTitle));
            setNewTaskTitle('');
        }
    };

    return (
        <DashBoardWrapper>
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
                    <div key={task.id}>
                        <p className="text-gray-700 text-lg">{task.title}</p>
                        <span className={`text-xl ${task.completed ? 'text-green-500' : 'text-red-400'}`}>
                            {task.completed ? '✅' : '❌'}
                        </span>
                    </div>
                ))}
            </div>
        </DashBoardWrapper>
    );
}
