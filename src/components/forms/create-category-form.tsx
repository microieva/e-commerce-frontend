import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { IconButton, TextField, FormControl } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useCreateCategoryMutation } from '../../redux/api-queries/category-queries';
import { Category } from '../../@types/product';
import Loading from '../shared/loading';

interface Props {
    handleCancel: ()=>void
}

const CreateCategoryForm: FC<Props> = ({ handleCancel }: Props) => {

    const [ name, setName ] = useState<string>('');
    const [ image, setImage ] = useState<string>('');
   
    
    const [ newCategory, setNewCategory ] = useState<Partial<Category>>();

    const [ nameError, setNameError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ createCategory, {data, error, isLoading} ] = useCreateCategoryMutation();

    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);

    const nameRegex = new RegExp('^[a-zA-Z]+$');
    const imageRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNameError(!nameRegex.test(event.target.value));
        setName(event.target.value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setImageError(!imageRegex.test(event.target.value));
        setImage(event.target.value);
    }
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const obj = {
            name,
            images: image ? [image] : ["https://api.lorem.space/image/fashion?w=640&h=480&r=7943"]
        };
        setNewCategory(obj);
    }

    useEffect(()=> {
        const submit = async() => {
            if (newCategory) {
                await createCategory({ token: localStorage.getItem('token') || '', body: newCategory});
            }
        }
        submit();
    }, [newCategory]);

    useEffect(()=> {
        if (name.length>2 && !nameError) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [name, nameError])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='form-container' style={{margin: "auto auto 3rem auto", width:"50%"}}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Name"
                        name="name"
                        onChange={handleNameChange}
                        onBlur={()=>setNameError(false)}
                        required
                        helperText="Name must be letters only, min 3 characters"
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
                        onChange={handleImageChange}
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
                    <IconButton type ="submit" disabled={disabled}>
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