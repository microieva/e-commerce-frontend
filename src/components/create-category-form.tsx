import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useCreateCategoryMutation } from '../redux/api-queries/category-queries';

import { Category } from '../@types/product';
import Loading from './loading';

interface Props {
    handleCancel: ()=>void
}

const CreateCategoryForm: FC<Props> = ({handleCancel}: Props) => {

    const [ name, setName ] = useState<string | undefined>(undefined);
    const [ image, setImage ] = useState<string | undefined>(undefined);
   
    
    const [ newCategory, setNewCategory ] = useState<Partial<Category>>();

    const [ nameError, setNameError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ createCategory, {data, error, isLoading} ] = useCreateCategoryMutation();

    const [ err, setErr ] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);
    const navigate = useNavigate();

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const obj = {
            name,
            images: image ? [image] : ["https://api.lorem.space/image/fashion?w=640&h=480&r=7943"]
        };
        validate(obj);
        !err && setNewCategory(obj);
    }

    useEffect(() => {
        const obj = {
            name,
            images: image ? [image] : ["https://api.lorem.space/image/fashion?w=640&h=480&r=7943"]
        };
        validate(obj);
        err && setDisabled(false);
    }, [ name, image ])

    useEffect(()=> {
        const submit = async() => {
            if (newCategory) {
                await createCategory({ token: localStorage.getItem('token') || '', body: newCategory});
            }
        }
        submit();
    }, [newCategory]);

    useEffect(()=> {
        if (data) {
            //!isLoading && navigate(`/products/${data._id}`);
            console.log('created?')
        }
        error && setErr(Boolean(error));
    }, [data, error])

    const validate = (obj: any) => {
        //setErr(titleError && priceError && descriptionError);
        //temporary : 
        const foundUndefined = Object.values(obj).some(value => value === undefined);
        setErr(foundUndefined);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='form-container' style={{margin: "0", width:"50%"}}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Name"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                        helperText="Name is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: nameError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setNameError(false)} 
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Image"
                        name="image"
                        type="text"
                        helperText="Image must be a valid internet link"
                        onChange={(e) => setImage(e.target.value)}
                        sx={{
                            '& .MuiFormHelperText-root': {
                            visibility: imageError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=> setImageError(false)}
                    />
                </FormControl> 
                <div className='btn-group'>
                    <IconButton type ="submit" disabled={err}>
                        <BackupOutlinedIcon/>
                    </IconButton>
                    <IconButton type ="button" onClick={handleCancel}>
                        <HighlightOffIcon/>
                    </IconButton> 
                </div>
            </form> 
        </div>
    
    );
}

export default CreateCategoryForm;