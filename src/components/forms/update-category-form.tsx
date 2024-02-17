import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { IconButton, TextField, FormControl } from '@mui/material';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
//import { useUpdateCategoryMutation } from '../../redux/api-queries/category-queries';
import { Category } from '../../@types/product';
import Loading from '../shared/loading';
import { SnackBarContext } from '../../contexts/snackbar';
import { TypeSnackBarContext } from '../../@types/types';

interface Props {
    category: Category
}

const UpdateCategoryForm: FC<Props> = ({ category }: Props) => {

    const [ name, setName ] = useState<string>(category.name);
    const [ image, setImage ] = useState<string>(category.image);
   
    const [ updates, setUpdates ] = useState<Partial<Category>>();

    const [ nameError, setNameError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    //const [ updateCategory, {data, error, isLoading} ] = useUpdateCategoryMutation();
    const [ allowToSubmit, setAllowToSubmit ] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement>(null);
    const valuesRef = useRef<Category>(category);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
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
        setUpdates(obj);
    }

    const handleCancel = () => {
        setName(category.name);
        setImage(category.image);

        setDisabled(true);
    }

    useEffect(()=> {
        const submit = async() => {
            if (updates) {
                try {
                    //await updateCategory({ token: localStorage.getItem('token') || '', body: updates});
                    setSnackBar({message: "Changes saved", open: true})
                } catch (error) {
                    setSnackBar({message: error as string, open: true})
                }
            }
        }
        submit();
    }, [updates]);

    useEffect(()=> {
        if (disabled) {
            setNameError(false);
            setImageError(false);
        }
    }, [disabled]);

    useEffect(()=> {
        const prevValues= {
            name: valuesRef.current.name,
            image: valuesRef.current.image,
        }
        const currentValues = {
            name,
            image
        }
        const prev = Object.values(prevValues).toString();
        const curr = Object.values(currentValues).toString();
        const isError = nameError || imageError;
 
        if (prev !== curr && !isError) {
            setAllowToSubmit(true);
        } else {
            setAllowToSubmit(false);
        }
    }, [[name, image]]);

    // if (isLoading) {
    //     return <Loading />
    // }

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
                    <IconButton type ="submit" disabled={!allowToSubmit}>
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

export default UpdateCategoryForm;