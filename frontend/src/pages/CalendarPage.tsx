// components/CalendarPage.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import type { Task } from '../redux/taskSlice';
import { fetchTasks } from '../redux/taskSlice';
import DatePicker from 'react-datepicker';
import { isSameDay, parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'; // Core datepicker styles

export default function CalendarPage() {
    const dispatch: AppDispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [tasksForSelectedDate, setTasksForSelectedDate] = useState<Task[]>([]);

    // Fetch tasks on component mount
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Filter tasks whenever selectedDate or tasks array changes
    useEffect(() => {
        const filteredTasks = tasks.filter(task =>
            task.dueDate ? isSameDay(parseISO(task.dueDate), selectedDate) : false
        );
        setTasksForSelectedDate(filteredTasks);
    }, [selectedDate, tasks]);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
        }
    };

    // Determines if a date should be highlighted based on existing tasks
    const highlightDatesWithTasks = (date: Date) => {
        const hasTask = tasks.some(task =>
            task.dueDate ? isSameDay(parseISO(task.dueDate), date) : false
        );
        return hasTask ? 'highlight-date' : '';
    };

    // --- Render States: Loading, Error, Content ---
    if (loading) {
        return (
            <div style={{ textAlign: 'center', color: '#4a5568', padding: '2rem' }}>
                Loading tasks...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>
                Error: {error}
            </div>
        );
    }

    // --- Inline Styles for Component Elements ---
    const styles = {
        pageContainer: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem',
        } as React.CSSProperties,
        header: {
            fontSize: '2.25rem',
            fontWeight: '800',
            color: '#6b21a8', // purple-800
            marginBottom: '1.5rem',
            textAlign: 'center',
        } as React.CSSProperties,
        subHeader: {
            fontSize: '1.125rem',
            color: '#4a5568', // gray-700
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '48rem',
            margin: '0 auto 2rem auto',
        } as React.CSSProperties,
        flexContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
        } as React.CSSProperties,
        calendarSection: {
            display: 'flex',
            justifyContent: 'center',
            padding: '1.5rem',
            backgroundColor: 'rgba(255,255,255,0)',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        } as React.CSSProperties,
        tasksSection: {
            padding: '1.5rem',
            backgroundColor: 'rgba(255,255,255,0)',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        } as React.CSSProperties,
        tasksHeader: {
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#8b5cf6', // purple-600
            marginBottom: '1rem',
        } as React.CSSProperties,
        tableContainer: {
            overflowX: 'auto',
        } as React.CSSProperties,
        table: {
            minWidth: '100%',
            backgroundColor: 'rgba(255,255,255,0)',
            border: '1px solid #e2e8f0', // gray-200
            borderRadius: '0.5rem',
        } as React.CSSProperties,
        tableHeader: {
            backgroundColor: 'rgba(255,255,255,0)', // purple-100
        } as React.CSSProperties,
        th: {
            padding: '0.75rem 1rem',
            textAlign: 'left',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#6b21a8', // purple-800
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        } as React.CSSProperties,
        td: {
            padding: '0.75rem 1rem',
            color: '#1f2937', // gray-800
        } as React.CSSProperties,
        descriptionTd: {
            padding: '0.75rem 1rem',
            color: '#6b7280', // gray-500
        } as React.CSSProperties,
        statusSpanBase: {
            padding: '0.25rem 0.5rem',
            display: 'inline-flex',
            fontSize: '0.75rem',
            lineHeight: '1.25rem',
            fontWeight: '600',
            borderRadius: '9999px', // full rounded
        } as React.CSSProperties,
        completedStatus: {
            backgroundColor: 'rgba(255,255,255,0)', // green-100
            color: '#065f46', // green-800
        } as React.CSSProperties,
        pendingStatus: {
            backgroundColor: 'rgba(255,255,255,0)', // yellow-100
            color: '#b45309', // amber-700
        } as React.CSSProperties,
        noTasksMessage: {
            color: '#6b7280', // gray-500
            fontStyle: 'italic',
            marginTop: '1rem',
        } as React.CSSProperties,
    };

    // --- Embedded CSS for react-datepicker customization and responsiveness ---
    const embeddedCss = `
        /* General resets for datepicker to ensure consistent styling */
        .react-datepicker {
            font-family: sans-serif !important;
            border: none !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
            display: block !important;
            width: 100% !important;
        }

        .react-datepicker__header {
            background-color: #f3e8ff !important; /* purple-100 */
            border-bottom: none !important;
            border-top-left-radius: 0.5rem !important;
            border-top-right-radius: 0.5rem !important;
            padding-top: 1rem !important;
        }

        .react-datepicker__current-month {
            font-size: 1.25rem !important;
            font-weight: bold !important;
            color: #5b21b6 !important; /* purple-800 */
            margin-bottom: 0.5rem !important;
        }

        .react-datepicker__navigation {
            top: 1rem !important;
        }

        .react-datepicker__navigation--previous {
            left: 1rem !important;
        }

        .react-datepicker__navigation--next {
            right: 1rem !important;
        }

        .react-datepicker__navigation-icon::before {
            border-color: #8b5cf6 !important; /* purple-600 */
        }

        .react-datepicker__month {
            padding: 0.5rem !important;
        }

        .react-datepicker__day-names {
            margin-bottom: 0.5rem !important;
        }

        .react-datepicker__day-name {
            color: #6b7280 !important; /* gray-500 */
            font-size: 0.75rem !important;
            font-weight: bold !important;
            margin: 0.25rem !important;
        }

        .react-datepicker__week {
            display: flex !important;
            justify-content: center !important;
        }

        .react-datepicker__day,
        .react-datepicker__time-name {
            color: #1f2937 !important; /* gray-800 */
            margin: 0.25rem !important;
            width: 2.25rem !important;
            height: 2.25rem !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            border-radius: 0.375rem !important;
            transition: background-color 0.2s ease-in-out !important;
        }

        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
            background-color: #8b5cf6 !important; /* purple-600 */
            color: white !important;
        }

        .react-datepicker__day--today {
            background-color: #e9d5ff !important; /* purple-200 */
            color: #4c1d95 !important; /* purple-900 */
            font-weight: 600 !important;
        }

        .react-datepicker__day--outside-month {
            color: #9ca3af !important; /* gray-400 */
        }

        .react-datepicker__day:hover {
            background-color: #f3e8ff !important; /* purple-100 */
            color: #5b21b6 !important; /* purple-800 */
        }

        /* Custom class for highlighting dates with tasks */
        .highlight-date {
            background-color: #d8b4fe !important; /* purple-300 */
            color: #4c1d95 !important; /* purple-900 */
            font-weight: bold !important;
            position: relative !important;
            overflow: hidden !important;
        }

        .highlight-date::after {
            content: '' !important;
            position: absolute !important;
            bottom: 0.25rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 0.25rem !important;
            height: 0.25rem !important;
            background-color: #5b21b6 !important; /* purple-800 */
            border-radius: 50% !important;
        }

        /* Ensure selected highlighted date is distinct */
        .react-datepicker__day--selected.highlight-date,
        .react-datepicker__day--keyboard-selected.highlight-date {
            background-color: #5b21b6 !important; /* purple-700 */
            color: white !important;
        }

        .react-datepicker__day--selected.highlight-date::after,
        .react-datepicker__day--keyboard-selected.highlight-date::after {
            background-color: white !important;
        }

        /* Responsive adjustments for flex container using media query */
        @media (min-width: 1024px) { /* Equivalent to lg: in Tailwind CSS */
            .flex-container-lg {
                flex-direction: row !important;
                gap: 3rem !important;
            }
            .lg-w-half {
                width: 50% !important;
            }
        }
    `;

    return (
        <div style={styles.pageContainer}>
            {/* Inject global styles for react-datepicker and custom classes */}
            <style dangerouslySetInnerHTML={{ __html: embeddedCss }} />

            <h2 style={styles.header}>Calender</h2>

            <div style={styles.flexContainer} className="flex-container-lg">
                {/* Calendar Section */}
                <div style={styles.calendarSection} className="lg-w-half">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        dayClassName={highlightDatesWithTasks}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                    />
                </div>

                {/* Tasks Table Section */}
                <div style={styles.tasksSection} className="lg-w-half">
                    <h3 style={styles.tasksHeader}>
                        Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h3>

                    {tasksForSelectedDate.length > 0 ? (
                        <div style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead style={styles.tableHeader}>
                                <tr>
                                    <th style={styles.th}>Title</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Due Time</th>
                                    <th style={styles.th}>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tasksForSelectedDate.map(task => (
                                    <tr key={task.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={styles.td}>{task.title}</td>
                                        <td style={styles.descriptionTd}>{task.description || 'N/A'}</td>
                                        <td style={styles.descriptionTd}>{task.dueTime || 'N/A'}</td>
                                        <td style={styles.td}>
                                                <span style={task.completed ? { ...styles.statusSpanBase, ...styles.completedStatus } : { ...styles.statusSpanBase, ...styles.pendingStatus }}>
                                                    {task.completed ? 'Completed' : 'Pending'}
                                                </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p style={styles.noTasksMessage}>No tasks due on this date.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
