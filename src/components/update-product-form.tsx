import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useUpdateProductMutation } from '../redux/api-queries/product-queries';
import { useGetCategoriesQuery } from '../redux/api-queries/category-queries';

import { Category, Product } from '../@types/product';
import Loading from './loading';

interface Props {
    product: Product,
    admin?: boolean
}

const UpdateProductForm: FC<Props> = ({ product }) => {
    
    const [ title, setTitle ] = useState<string>(product.title);
    const [ price, setPrice ] = useState<number>(product.price);
    const [ description, setDescription ] = useState<string>(product.description);
    const [ image, setImage ] = useState<string>(product.images[0]);
    const [ categoryName, setCategoryName ] = useState<string>(product.category.name);
    const [ categoryId, setCategoryId ] = useState<string>(product.category._id);
    
    const [ updates, setUpdates ] = useState<Partial<Product>>();
    const { data: ctgrs } = useGetCategoriesQuery(localStorage.getItem('token') || '');

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ updateProduct, {data, error, isLoading} ] = useUpdateProductMutation();

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
        !err && setUpdates(obj);
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
            if (updates) {
                await updateProduct({ token: localStorage.getItem('token') || '', body: updates, _id: product?._id});
            }
        }
        submit();
    }, [updates]);

    useEffect(()=> {
        if (data) {
            !isLoading && navigate(`/products/${data._id}`);
            setDisabled(true);
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        disabled={disabled}
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
                        value={price}
                        onChange={(e) => setPrice(+e.target.value)}
                        required
                        disabled={disabled}
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
                        value={description}
                        helperText="Description is required"
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                        disabled={disabled}
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
                        value={image}
                        disabled={disabled}
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
                    <InputLabel required id="category-label" disabled={disabled}>Category</InputLabel>
                    <Select
                        required
                        disabled={disabled}
                        onChange={(e: SelectChangeEvent) => setCategoryName(e.target.value as string)}
                        label="Category"
                        value={categoryName}
                    >
                        {ctgrs && ctgrs.map((ctgry: Category)=> {
                            return <MenuItem key={ctgry._id} value={ctgry.name}>{ctgry.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div className='btn-group'>   
                    { disabled && 
                        <IconButton type ="button" onClick={()=> setDisabled(false)}>
                            <PlaylistAddCheckIcon />
                        </IconButton>
                    }
                    {
                        !disabled && 
                        <>
                             <IconButton 
                            type ="submit" 
                            disabled={err}
                            >
                                <BackupOutlinedIcon/>
                            </IconButton> 
                            <IconButton type ="button" onClick={()=> setDisabled(true)}>
                                <HighlightOffIcon/>
                            </IconButton> 
                        </>
                    }
                </div>
            </form> 
        </div>
    
    );
}

export default UpdateProductForm;