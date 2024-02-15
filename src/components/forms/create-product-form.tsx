import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl, MenuItem, InputLabel, FormHelperText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useCreateProductMutation } from '../../redux/api-queries/product-queries';
import { useGetCategoriesQuery } from '../../redux/api-queries/category-queries';

import { Category, Product } from '../../@types/product';
import Loading from '../shared/loading';


const CreateProductForm: FC = () => {

    const [ title, setTitle ] = useState<string>('');
    const [ price, setPrice ] = useState<string>('');
    const [ description, setDescription ] = useState<string>('');
    const [ image, setImage ] = useState<string>('');
    const [ categoryName, setCategoryName ] = useState<string>('');
    const [ categoryId, setCategoryId ] = useState<string | undefined>(undefined);
    
    const [ newProduct, setNewProduct ] = useState<Partial<Product>>();
    const { data: ctgrs } = useGetCategoriesQuery(localStorage.getItem('token') || '');

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);
    const [ categoryError, setCategoryError ] = useState<boolean>(false);

    const [ createProduct, {data, error, isLoading} ] = useCreateProductMutation();

    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(true);
    const navigate = useNavigate();

    const priceRegex = new RegExp('^[0-9.,]+$');
    const imageRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setTitleError(event.target.value.length<3);
        setTitle(event.target.value);
    }
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPriceError(!priceRegex.test(event.target.value))
        setPrice(event.target.value);
    }
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescriptionError(event.target.value.length === 0);
        setDescription(event.target.value);
    }
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setImageError(!imageRegex.test(event.target.value));
        setImage(event.target.value);
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setCategoryError(!event.target.value)
        setCategoryName(event.target.value);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const obj = {
            title,
            price: Number(price?.replace(/,/g, '.')),
            description,
            categoryId,
            images: image ? [image] : ["https://cdn.pixabay.com/photo/2015/05/22/05/52/cat-778315_1280.jpg"]
        };
        setNewProduct(obj);
    }

    useEffect(()=> {
        const categoryObj = ctgrs && ctgrs.find((c: Category) => c.name === categoryName);
        categoryObj && setCategoryId(categoryObj._id);
    }, [categoryName]);

    useEffect(()=> {
        const submit = async() => {
            if (newProduct) {
                await createProduct({ token: localStorage.getItem('token') || '', body: newProduct});
            }
        }
        submit();
    }, [newProduct]);

    useEffect(()=> {
        if (
            title !== '' && !titleError &&
            price !== '' && 
            !priceError && 
            //image !== '' && 
            //!imageError &&
            description !== '' &&
            categoryName !== ''
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [title, titleError, description, price, priceError, categoryName])

    useEffect(()=> {
        data && !isLoading && navigate(`/products/${data._id}`);
    }, [data])

    if (isLoading) {
        return (
            <div className='form-container'>
                <Loading />
            </div>
        )
    }

    return (
    <div className='form-container product-form'>
        <form onSubmit={handleSubmit} ref={formRef}>
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    variant="standard"
                    label="Title"
                    name="title"
                    onChange={handleTitleChange}
                    onBlur={()=>setTitleError(false)}
                    required
                    helperText="Title min 3 characters"
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
                    onChange={handlePriceChange}
                    onBlur={()=>setPriceError(false)}
                    required
                    helperText={price === '' ? "Price is required": "Price must be a number"}
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
                    type="text"
                    variant="standard"
                    name="description"
                    helperText="Description is required"
                    onChange={handleDescriptionChange}
                    onBlur={()=>setDescriptionError(description.length<1)}
                    required
                    sx={{
                        '& .MuiFormHelperText-root': {
                            visibility: descriptionError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
                        },
                        '& .MuiInputBase-root.MuiInput-root:before': { 
                            borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                        }
                    }}
                    onFocus={()=>setDescriptionError(false)} 
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
                    onFocus={()=>setImageError(false)} 
                />
            </FormControl> 
            <FormControl variant="standard" fullWidth>
                <InputLabel required id="category-label">Category</InputLabel>
                <Select
                    required
                    value={'' || categoryName}
                    onChange={handleCategoryChange}
                    onBlur={(event)=> setCategoryError(!event.target.value)}
                    label="Category"
                >
                    {ctgrs && ctgrs.map((ctgry: Category)=> {
                        return <MenuItem key={ctgry._id} value={ctgry.name}>{ctgry.name}</MenuItem>
                    })}
                </Select>
                {categoryError && <FormHelperText>Category is required</FormHelperText>}
            </FormControl>
            <div className='btn-group' style={{marginTop: "2rem"}}>
                <IconButton type ="submit" disabled={disabled}>
                    <BackupOutlinedIcon/>
                </IconButton>
            </div>
        </form> 
    </div>
    );
}

export default CreateProductForm;