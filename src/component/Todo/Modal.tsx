import { Backdrop, Box, Button, Fade, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { StyledTodoModal } from './style'
import { useForm, Controller } from "react-hook-form";
import { addTodo, ITodo, updateTodo } from '../../service';
import { useAppSelector } from '../../store/hooks';
import { LoadingButton } from '@mui/lab';

const modalStyle = {
    position: 'absolute',
    padding: "10px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 480,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
};
export const ACTION_TYPES = {
    CREATE: "create",
    UPDATE: "update",
}
interface IProps {
    actionType: string;
    modalHandle: () => void;
    refetch: () => void;
    visibility: boolean
    defaultData?: ITodo
}
function Modal(props: IProps) {
    const { actionType, modalHandle, visibility, defaultData, refetch } = props
    const { handleSubmit, control } = useForm();
    const [loading, setLoading] = useState<boolean>(false)
    const user = useAppSelector(state => state.account)
    const defaultValue = actionType === ACTION_TYPES.UPDATE ? { title: defaultData?.title, description: defaultData?.description } : { title: "", description: "" };



    const onSubmit = async (data: any) => {
        setLoading(true)
        if (actionType === ACTION_TYPES.CREATE) {
            const todos = await addTodo({ title: data.title, description: data.description, userId: user.userId })
            if (todos) {
                refetch()
                setLoading(false)
                modalHandle()
            }
            else {
                setLoading(false)
            }
        } else {
            const todo = await updateTodo({ id: defaultData?.id, title: data.title, description: data.description, userId: defaultData?.userId })
            if (todo) {
                refetch()
                setLoading(false)
                modalHandle()
            }
            else {
                setLoading(false)
            }
        }
    }


    return (
        <StyledTodoModal
            keepMounted
            open={visibility}
            onClose={modalHandle}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <Fade in={visibility}>
                <Box sx={modalStyle}>
                    <div
                        className="modal_head"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '16px',
                        }}>
                        <h3>
                            {actionType === ACTION_TYPES.CREATE
                                ? 'Create new Todo'
                                : 'Update Todo'}
                        </h3>
                        <IoMdClose size={25} color="grey" onClick={modalHandle} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={defaultValue.title}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="Title"
                                            variant="outlined"
                                            value={value}
                                            autoComplete="off"
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            sx={{ width: '100%' }}
                                        />
                                    )}
                                    rules={{
                                        required: "Title required",

                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue={defaultValue.description}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            label="Description"
                                            variant="outlined"
                                            value={value}
                                            multiline
                                            rows={6}
                                            maxRows={10}
                                            onChange={onChange}
                                            error={!!error}
                                            helperText={error ? error.message : null}
                                            sx={{ width: '100%' }}
                                        />
                                    )}
                                    rules={{
                                        required: "Description required",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <LoadingButton loading={loading} type="submit" variant="contained" color="primary">
                                    Create
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>

                </Box>
            </Fade>
        </StyledTodoModal>
    )
}

export default Modal