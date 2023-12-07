import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, TextField, FormControl, FormLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextareaAutosize } from '@mui/base';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

import { useCreateProductMutation, useUpdateProductMutation } from '../redux/api-queries/product-queries';
import { useGetCategoriesQuery } from '../redux/api-queries/category-queries';

import { Category, Product, ProductRequest } from '../@types/product';


const CreateProductForm: FC = () => {

    const [ formData, setFormData ] = useState<Product | undefined>(undefined);

    const [ title, setTitle ] = useState<string | undefined>(undefined);
    const [ price, setPrice ] = useState<string | undefined>(undefined);
    const [ description, setDescription ] = useState<string | undefined>(undefined);
    const [ image, setImage ] = useState<string | undefined>(formData?.images[0]);
    const [ categoryName, setCategoryName ] = useState<string>("");
    const [ categoryId, setCategoryId ] = useState<string | undefined>(undefined);

    const [ newProduct, setNewProduct ] = useState<Partial<Product>>({});
    const { data: ctgrs } = useGetCategoriesQuery(localStorage.getItem('token') || '');
    const [ categories, setCategories ] = useState<Category[] | undefined>();

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ createProduct, {data, error} ] = useCreateProductMutation();

    const [ err, setErr ] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(false);
    const [ isNewProduct, setIsNewProduct ] = useState<boolean | undefined>();
    const goBack = useNavigate();

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newProduct = {
            title,
            price: Number(price),
            description,
            categoryId: categoryId,
            images: formData ? formData.images : ['https://i.imgur.com/RLnJJyQ.jpeg']
        };
        setNewProduct(newProduct);
        //onClose();
        console.log('HANDLE SUBMIT newProduct: ', newProduct);
    }

    useEffect(()=> {
        ctgrs && setCategories(ctgrs);
    }, [newProduct]);

    useEffect(()=> {
        const categoryObj = categories && categories.find((c: Category) => c.name === categoryName);
        categoryObj && setCategoryId(categoryObj._id);
    }, [categories]);

    useEffect(()=> {
        if (newProduct) {
            validate();
        }
        //console.log('err after validate() ? ', err);
        const submit = async() => {
            if (!err) {
                try {
                    if (newProduct !== undefined) {
                        console.log('newProduct: ', newProduct)
                        await createProduct({ token: localStorage.getItem('token') || '', body: newProduct});
                        console.log('error from api hook :', error);
                        console.log('data from api hook :', data);
                        //!error && goBack('/');
                    }
                } catch (error: any) {
                    setErr(true);
                    console.log('error from catch: ', error)
                }
            } else {
                setErr(true);
            }
        }
        submit();
        console.log('EFFECT [isNewProduct] addedProduct: ', newProduct);
    }, [newProduct]);

    const validate = () => {
        //setErr(titleError && priceError && descriptionError);
    }

    const onEdit = () => {
        setDisabled(false);
    }
    const onCancel = () => {
        /*if (!product) {
            goBack('/');
        } else {
            formData && setTitle(formData.title);
            formData && setPrice(formData.price.toString());
            formData && setDescription(formData.description);
            formData && setImage(formData.images[0]);
            formData && setCategoryName(formData.category.name);
    
            setDisabled(true);
        }*/
        goBack("/");
    }

    return (
        <div className='form-container' style={{margin: "0 0 0 2rem"}}>
            <form onSubmit={handleSubmit} ref={formRef}>
                <FormControl fullWidth>
                    <TextField
                        disabled={disabled}
                        fullWidth
                        variant="standard"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        helperText="Title is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: titleError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiFormLabel-asterisk': {
                                visibility: !disabled ? 'visible' : 'hidden',
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
                        disabled={disabled}
                        fullWidth
                        variant="standard"
                        label="Price"
                        name="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        helperText="Price is required"
                        sx={{
                            '& .MuiFormHelperText-root': {
                              visibility: priceError ? 'visible' : 'hidden',
                              transition: 'visibility 0.2s ease-in',
                            },
                            '& .MuiFormLabel-asterisk': {
                                visibility: !disabled ? 'visible' : 'hidden',
                            },
                            '& .MuiInputBase-root.MuiInput-root:before': { 
                                borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                            }
                        }}
                        onFocus={()=>setPriceError(false)}
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel 
                        style={{  
                            color: disabled ? "darkgrey" : "#3d3d3d",
                            fontSize: "13px",
                            marginBottom: "0.5rem" 
                        }}
                    >
                        Description
                    </FormLabel>
                    <TextareaAutosize
                        disabled={disabled}
                        name="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                        onFocus={()=>setDescriptionError(false)}
                    />
                </FormControl>
                <FormControl fullWidth>
                </FormControl> 
              
                    <>
                        <FormControl fullWidth>
                            <TextField
                                disabled={disabled}
                                fullWidth
                                variant="standard"
                                label="Image"
                                name="image"
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                sx={{
                                    '& .MuiFormHelperText-root': {
                                      visibility: imageError ? 'visible' : 'hidden',
                                      transition: 'visibility 0.2s ease-in',
                                    },
                                    '& .MuiFormLabel-asterisk': {
                                        visibility: !disabled ? 'visible' : 'hidden',
                                    },
                                    '& .MuiInputBase-root.MuiInput-root:before': { 
                                        borderBottom: disabled ? '1px darkgrey dotted' : 'none',
                                    }
                                }}
                                onFocus={()=> setImageError(false)}
                            />
                        </FormControl> 
                        <FormControl variant="standard" fullWidth>
                            <FormLabel 
                                style={{  
                                    color: disabled ? "darkgrey" : "#3d3d3d",
                                    fontSize: "13px"
                                }}
                            >
                                Category
                            </FormLabel>
                            <Select
                                disabled={disabled}
                                value={categoryName}
                                onChange={(e: SelectChangeEvent) => setCategoryName(e.target.value as string)}
                                label="Category"
                            >
                                {ctgrs && ctgrs.map((ctgry: Category)=> {
                                    return <MenuItem key={ctgry._id} value={ctgry.name}>{ctgry.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </> 
                    
                        <>
                            { disabled && 
                                <div className='btn-group'>
                                    <IconButton onClick={()=> onEdit()}>
                                        <EditNoteOutlinedIcon/>
                                    </IconButton>
                                </div>
                            }
                            { !disabled && 
                                <div className='btn-group'>    
                                    {/* <IconButton type="submit" onClick={()=> setIsNewProduct(true)}>
                                        <PlaylistAddOutlinedIcon />
                                    </IconButton> */}
                                    <IconButton type ="submit" onClick={()=> setIsNewProduct(true)}>
                                        <PlaylistAddCheckOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={()=> onCancel()}>
                                        <CancelOutlinedIcon/>
                                    </IconButton>
                                </div> 
                            }
                        </> 
                    
            </form> 
        </div>
    
    );
}

export default CreateProductForm;