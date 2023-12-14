import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useCreateProductMutation } from '../../redux/api-queries/product-queries';
import { useGetCategoriesQuery } from '../../redux/api-queries/category-queries';

import { Category, Product } from '../../@types/product';
import Loading from '../shared/loading';


const CreateProductForm: FC = () => {

    const [ title, setTitle ] = useState<string | undefined>(undefined);
    const [ price, setPrice ] = useState<number | undefined>(undefined);
    const [ description, setDescription ] = useState<string | undefined>(undefined);
    const [ image, setImage ] = useState<string | undefined>(undefined);
    const [ categoryName, setCategoryName ] = useState<string>('');
    const [ categoryId, setCategoryId ] = useState<string | undefined>(undefined);
    
    const [ newProduct, setNewProduct ] = useState<Partial<Product>>();
    const { data: ctgrs } = useGetCategoriesQuery(localStorage.getItem('token') || '');

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ createProduct, {data, error, isLoading} ] = useCreateProductMutation();

    const [ err, setErr ] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);
    const navigate = useNavigate();

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const obj = {
            title,
            price,
            description,
            categoryId,
            images: image ? [image] : ["https://cdn.pixabay.com/photo/2015/05/22/05/52/cat-778315_1280.jpg"]
        };
        validate(obj);
        !err && setNewProduct(obj);
    }

    useEffect(()=> {
        const categoryObj = ctgrs && ctgrs.find((c: Category) => c.name === categoryName);
        categoryObj && setCategoryId(categoryObj._id);
    }, [categoryName]);

    useEffect(() => {
        const obj = {
            title,
            price,
            description,
            categoryId,
            images: image ? [image] : ["https://cdn.pixabay.com/photo/2015/05/22/05/52/cat-778315_1280.jpg"]
        };
        validate(obj);
        err && setDisabled(false);
    }, [ title, price, description, categoryId ])

    useEffect(()=> {
        const submit = async() => {
            if (newProduct) {
                await createProduct({ token: localStorage.getItem('token') || '', body: newProduct});
            }
        }
        submit();
    }, [newProduct]);

    useEffect(()=> {
        if (data) {
            !isLoading && navigate(`/products/${data._id}`);
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
        <div className='form-container' style={{margin: "0"}}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        helperText="Title is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: titleError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setTitleError(false)} 
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Price"
                        name="price"
                        type="text"
                        onChange={(e) => setPrice(+e.target.value)}
                        required
                        helperText="Price is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: priceError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setPriceError(false)}
                    />
                </FormControl>
                 <FormControl fullWidth>
                    <TextField
                        label="Description"
                        variant="standard"
                        name="description"
                        helperText="Description is required"
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                        onFocus={()=>setDescriptionError(false)}
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: descriptionError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
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
                <FormControl variant="standard" fullWidth>
                    <InputLabel required id="category-label">Category</InputLabel>
                    <Select
                        required
                        onChange={(e: SelectChangeEvent) => setCategoryName(e.target.value as string)}
                        label="Category"
                    >
                        {ctgrs && ctgrs.map((ctgry: Category)=> {
                            return <MenuItem key={ctgry._id} value={ctgry.name}>{ctgry.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div className='btn-group'>
                    <IconButton type ="submit" disabled={err}>
                        <BackupOutlinedIcon/>
                    </IconButton>
                </div>
            </form> 
        </div>
    
    );
}

export default CreateProductForm;