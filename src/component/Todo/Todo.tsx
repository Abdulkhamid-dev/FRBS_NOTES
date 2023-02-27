import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { StyledTodo } from './style'
import { MdOutlineDeleteOutline, MdModeEditOutline } from 'react-icons/md'
import { ITodo } from '../../service'
import { useAppSelector } from '../../store/hooks'
interface TodoProps {
    data: ITodo
    handleEdit?: () => void
    handleDelete?: () => void
}
function Todo({ data, handleEdit, handleDelete }: TodoProps) {
    const user = useAppSelector(state => state.account)

    return (
        <StyledTodo>

            <Grid container alignItems="center" justifyContent="space-between" spacing={2} columns={12}>
                <Grid item xs={12} sm={9}>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>{data?.title}</strong>
                    </Typography>
                    <Typography variant="body2">
                        {data?.description}
                    </Typography>
                </Grid>
                {
                    user.role === "admin" || user.userId === data.userId ? <Grid item xs={12} sm={2} sx={{ justifyContent: "space-around", display: "flex" }}>
                        <Button variant="contained" color="secondary" onClick={handleEdit}>
                            <MdModeEditOutline size={20} />
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            <MdOutlineDeleteOutline size={20} />
                        </Button>
                    </Grid> : null
                }

            </Grid>

            <div className="actions"></div>
        </StyledTodo>
    )
}

export default Todo