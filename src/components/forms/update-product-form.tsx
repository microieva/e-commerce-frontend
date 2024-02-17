import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
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
import { TypeSnackBarContext } from '../../@types/types';
import { SnackBarContext } from '../../contexts/snackbar';

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
    const [ categoryError, setCategoryError ] = useState<boolean>(false);
    const [ allowToSubmit, setAllowToSubmit ] = useState<boolean>(false);

    const [ updateProduct, {data, error, isLoading} ] = useUpdateProductMutation();

    const formRef = useRef<HTMLFormElement>(null);
    const valuesRef = useRef<Product>(product);
    const { setSnackBar } = useContext(SnackBarContext) as TypeSnackBarContext;
    const [ disabled, setDisabled ] = useState<boolean>(true);
    const navigate = useNavigate();

    const priceRegex = new RegExp('^[0-9.,]+$');
    const imageRegex = new RegExp('^(https?|ftp)://[^\s/$.?#].[^\s]*');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
        setTitleError(event.target.value === '' || event.target.value.length<3);
        setTitle(event.target.value);
    }

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPriceError(!priceRegex.test(event.target.value) || event.target.value === '' );
        setPrice(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescriptionError(event.target.value === '');
        setDescription(event.target.value);
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setImageError(!imageRegex.test(event.target.value));
        if (event.target.value === '') {
            setImageError(false);
        }
        setImage(event.target.value);
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        const prevCategoryName = valuesRef.current.category.name;
        setCategoryError(event.target.value === prevCategoryName);
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
        setUpdates(obj);
    }
    useEffect(() => {
        valuesRef.current = product;
    });

    useEffect(()=> {
        if (disabled) {
            setTitleError(false);
            setPriceError(false);
            setImageError(false);
            setDescriptionError(false);
            setCategoryError(false);
        }
    }, [disabled]);

    useEffect(()=> {
        const prevValues= {
            title: valuesRef.current.title,
            price:  valuesRef.current.price,
            image: valuesRef.current.images[0],
            description: valuesRef.current.description,
            categoryName: valuesRef.current.category.name
        }
        const currentValues = {
            title,
            price: Number(price),
            image,
            description,
            categoryName
        }
        const prev = Object.values(prevValues).toString();
        const curr = Object.values(currentValues).toString();
        const isError = priceError || imageError || titleError || descriptionError || categoryError;
 
        if (prev !== curr && !isError) {
            setAllowToSubmit(true);
        } else {
            setAllowToSubmit(false);
        }
    }, [[title, description, price, image, categoryName]]);

    useEffect(()=> {
        const categoryObj = ctgrs && ctgrs.find((c: Category) => c.name === categoryName);
        categoryObj && setCategoryId(categoryObj._id);
    }, [categoryName]);

    useEffect(()=> {
        const submit = async() => {
            if (updates) {
                try {
                    await updateProduct({ token: localStorage.getItem('token') || '', body: updates, productId: product?._id});
                    setSnackBar({message:"Information saved", open: true});
                } catch (error) {
                    setSnackBar({message: error as string, open: true});
                }
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
    }, [data]);

    const onCancel =() => {
        setTitle(product.title);
        setPrice(formatUiPrice(product.price));
        setDescription(product.description);
        setImage(product.images[0]);
        setCategoryName(product.category.name);
        setDisabled(true);
    }

    if (isLoading) {
        return <Loading />
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
                    helperText={title === '' ? "Title is required": "Title min 3 characters"}
                    value={title}
                    onChange={handleTitleChange}
                    required={admin}
                    disabled={disabled}
                    onBlur={()=>setTitleError(title.length<3)}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            visibility: titleError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
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
                    onChange={handlePriceChange}
                    onBlur={()=>price && setPriceError(!priceRegex.test(price) || price === '')}
                    required={admin}
                    disabled={disabled}
                    helperText={price === '' ? "Price is required": "Price must be a number"}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            visibility: priceError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
                        }
                    }}
                />
            </FormControl>
                <FormControl fullWidth>
                <TextField
                    label="Description"
                    variant="standard"
                    name="description"
                    value={description}
                    helperText="Description is required"
                    onChange={handleDescriptionChange}
                    required={admin}
                    disabled={disabled}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            visibility: descriptionError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
                        }
                    }}
                />
            </FormControl>
            { admin && !disabled && 
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
                        onChange={handleImageChange}
                        onBlur={()=>image && setImageError(!imageRegex.test(image))}
                        sx={{
                            '& .MuiFormHelperText-root': {
                            visibility: imageError ? 'visible' : 'hidden',
                            transition: 'visibility 0.2s ease-in',
                            }
                        }}
                    />
                </FormControl> 
            }
            <FormControl variant="standard" fullWidth>
                {
                    admin ? 
                    <>
                        <InputLabel required id="category-label" disabled={disabled}>Category</InputLabel>
                        <Select
                            required
                            disabled={disabled}
                            onChange={handleCategoryChange}
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
            <div className='btn-group' style={{marginTop: "2rem"}}>  
                { admin && 
                    <>
                     { disabled ?
                            <IconButton type ="button" onClick={()=> setDisabled(false)}>
                                <EditNoteIcon />
                            </IconButton>

                        :
                            <>
                                <IconButton 
                                    type ="submit" 
                                    disabled={!allowToSubmit}
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
    </div>
    );
}

export default UpdateProductForm;