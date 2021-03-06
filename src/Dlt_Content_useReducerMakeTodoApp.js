import { useReducer, useRef } from 'react';

/**
 * useState
 * 1. Init state: 0
 * 2. Action: Up (state+1), Down (state-1)
 * 
 * useReducer
 * 1. Init state: 0
 * 2. Action: Up (state+1), Down (state-1)
 * 3. Reducer
 * 4. Dispatch
 *  
 */

// Init state
const initState = {
    job: '',
    jobs: []
}
// Action
const SET_JOB = 'set_job';
const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';
const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}
const addJob = payload => {
    return {
        type: ADD_JOB,
        payload
    }
}
const deleteJob = payload => {
    return {
        type: DELETE_JOB,
        payload
    }
}
// Reducer
const reducer = (state, action) => {

    let newState;

    switch (action.type) {
        case SET_JOB:
            newState = {
                ...state,
                job: action.payload
            }
            break;
        case ADD_JOB:
            newState = {
                ...state,
                jobs: [
                    ...state.jobs,
                    action.payload
                ]
            }
            break;
        case DELETE_JOB:
            const newJobs = [...state.jobs]
            newJobs.splice(action.payload, 1);
            newState = {
                ...state,
                jobs: newJobs
            }
            break;
        default:
            throw new Error('Invalid action.')
    }

    return newState;
}

function Content() {
    const [state, dispatch] = useReducer(reducer, initState);

    const inputRef = useRef();

    const { job, jobs } = state;

    const handleSubmit = () => {
        dispatch(addJob(job));
        dispatch(setJob(''));
        inputRef.current.focus();
    }

    return (
        <div>
            <h1>TodoApp with Producer</h1>
            <input
                type="text"
                placeholder="Enter todo..."
                value={job}
                onChange={e => {
                    dispatch(setJob(e.target.value))
                }}
                ref={inputRef}
            />
            <button
                onClick={handleSubmit}
            >Add</button>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        {job}
                        <span
                            onClick={() => dispatch(deleteJob(index))}
                        >&times;</span>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Content;