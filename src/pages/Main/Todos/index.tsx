import { Button, Pagination, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { deleteTodo, fetchTodos, ITodo } from '../../../service'
import { StyledTodos } from './style'
import { IoIosAddCircleOutline } from 'react-icons/io'
import Todo from '../../../component/Todo/Todo'
import Modal, { ACTION_TYPES } from '../../../component/Todo/Modal'

function Todos() {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [actionType, setActionType] = useState<string>("")
    const [editTodo, setEditTodo] = useState<ITodo>()
    const purePage: number = 7
    const getTodos = async () => {
        setLoading(true)
        const allTodos = await fetchTodos()
        if (allTodos) {
            setTodos(allTodos as ITodo[])
            setLoading(false)
        }
        setLoading(false)
    }
    const openAddModal = () => {
        setActionType(ACTION_TYPES.CREATE)
        setModalVisible(true)
    }
    const openEditModal = (todo: ITodo) => {
        setEditTodo(todo)
        setActionType(ACTION_TYPES.UPDATE)
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
        setActionType("")
    }

    const todoDelete = async (todoId?: string) => {
        const result = await deleteTodo(todoId)
        if (result) {
            let filteredTodos = todos.filter((todo: ITodo) => todo.id !== todoId)
            console.log(filteredTodos);
            setTodos(filteredTodos);
        }
    }
    const handleChangePage = (event: any, newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        getTodos()
    }, [])
    return (
        <StyledTodos>
            {loading ? <Typography>Loading...</Typography> : (
                <>
                    {
                        modalVisible ? <Modal visibility={modalVisible} modalHandle={closeModal} actionType={actionType} defaultData={editTodo} refetch={getTodos} /> : null
                    }
                    <div className="header">
                        <Typography variant="h6">Todos <strong>{todos?.length}</strong></Typography>
                        <Button variant="contained" startIcon={<IoIosAddCircleOutline />} onClick={openAddModal}>
                            Create Todo
                        </Button>
                    </div>
                    <div className="content">
                        {
                            todos?.slice((currentPage - 1) * purePage, currentPage * purePage).map((todo, index) => {
                                return <Todo key={index} data={todo} handleEdit={() => openEditModal(todo)} handleDelete={() => todoDelete(todo.id)} />
                            })
                        }
                    </div>
                    {
                        todos?.length > purePage ? (
                            <Pagination
                                count={Math.ceil(todos?.length / purePage)}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="primary"
                                shape="rounded"
                            />

                        ) : null
                    }
                </>
            )}

        </StyledTodos>
    )
}

export default Todos