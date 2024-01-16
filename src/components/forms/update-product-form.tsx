import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl, MenuItem, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useUpdateProductMutation } from '../../redux/api-queries/product-queries';
import { useGetCategoriesQuery } from '../../redux/api-queries/category-queries';

import { Category, Product } from '../../@types/product';
import Loading from '../shared/loading';
import { formatUiPrice } from '../../shared/formatUiPrice';

interface Props {
    product: Product,
    admin?: boolean
}

const UpdateProductForm: FC<Props> = ({ product, admin }) => {

    const [ title, setTitle ] = useState<string>(product.title);
    const [ price, setPrice ] = useState<string>(formatUiPrice(product.price));
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
            price: Number(price.replace(/,/g, '.')),
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
                await updateProduct({ token: localStorage.getItem('token') || '', body: updates, productId: product?._id});
            }
        }
        submit();
    }, [updates]);

    useEffect(()=> {
        if (data) {
            !isLoading && navigate(`/products/${data._id}`);
            setPrice(data.price.toString());
            setDisabled(true);
        }
        error && setErr(Boolean(error));
    }, [data, error]);

    useEffect(()=> {
        if (!admin) {
            setDisabled(true);
        }
    }, [admin])

    const validate = (obj: any) => {
        //setErr(titleError && priceError && descriptionError);
        //temporary : 
        const foundUndefined = Object.values(obj).some(value => value === undefined);
        setErr(foundUndefined);
    }

    const onCancel =() => {
        setTitle(product.title);
        setPrice(formatUiPrice(product.price));
        setDescription(product.description);
        setImage(product.images[0]);
        setCategoryName(product.category.name);
        setErr(false);
        setDisabled(true);
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <form className='form-container product-form' onSubmit={handleSubmit} ref={formRef}>
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    variant="standard"
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required={admin}
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
                    onChange={(e) => setPrice(e.target.value)}
                    required={admin}
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
                    required={admin}
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
                {
                    admin ? 
                    <>
                        <InputLabel required id="category-label" disabled={disabled}>Category</InputLabel>
                        <Select
                            required
                            disabled={disabled}
                            onChange={(e: SelectChangeEvent) => setCategoryName(e.target.value)}
                            label="Category"
                            value={categoryName}
                        >
                            {ctgrs && ctgrs.map((ctgry: Category)=> {
                                return <MenuItem key={ctgry._id} value={ctgry.name}>{ctgry.name}</MenuItem>
                            })}
                        </Select>
                    </>
                    :
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Category"
                        name="category"
                        type="text"
                        value={categoryName}
                        disabled
                    />
                }
                
            </FormControl>
            <div className='btn-group'>  
                { admin && 
                    <>
                        { disabled && 
                            <IconButton type ="button" onClick={()=> setDisabled(false)}>
                                <EditNoteIcon />
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
                                <IconButton type ="button" onClick={()=> onCancel()}>
                                    <HighlightOffIcon/>
                                </IconButton> 
                            </>
                        }
                    </>   
                }
                
            </div>
        </form> 
    );
}

export default UpdateProductForm;