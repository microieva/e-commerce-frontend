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

import { Category, Product } from '../@types/product';

interface Props {
    product?: Product,
    admin?: boolean
}

const ProductForm: FC<Props> = ({ product, admin }) => { // UpdateProductForm

    const [ formData, setFormData ] = useState<Product | undefined>(product);

    const [ title, setTitle ] = useState<string | undefined>(formData?.title);
    const [ price, setPrice ] = useState<string | undefined>(formData?.price.toString());
    const [ description, setDescription ] = useState<string | undefined>(formData?.description);
    const [ image, setImage ] = useState<string | undefined>(formData?.images[0]);
    const [ categoryName, setCategoryName ] = useState<string | undefined>(formData?.category.name);
    const [ categoryId, setCategoryId ] = useState<string | undefined>(formData?.category._id);

    const [ newProduct, setNewProduct ] = useState<Partial<Product>>({});
    const { data } = useGetCategoriesQuery(localStorage.getItem('token') || '');
    const [ categories, setCategories ] = useState<Category[] | undefined>();

    const [ titleError, setTitleError ] = useState<boolean>(false);
    const [ priceError, setPriceError ] = useState<boolean>(false);
    const [ descriptionError, setDescriptionError ] = useState<boolean>(false);
    const [ imageError, setImageError ] = useState<boolean>(false);

    const [ createProduct, {data: addedProduct} ] = useCreateProductMutation();
    const [ updateProduct ] = useUpdateProductMutation();
    const [ err, setErr ] = useState<boolean>(true);
    const formRef = useRef<HTMLFormElement>(null);
    const [ disabled, setDisabled ] = useState<boolean>(Boolean(product));
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
        console.log('HANDLE SUBMIT addedProduct: ', addedProduct);
    }

    useEffect(()=> {
        // const handleStorage = () => {
        //     setToken(localStorage.getItem('token') || '');
        //  }
        console.log('EFFECT [newProduct productdata] addedProduct: ', addedProduct);
        data && setCategories(data);
        product && setFormData(product);

        //window.addEventListener('storage', handleStorage)
        //return () => window.removeEventListener('storage', handleStorage)

    }, [newProduct, product ]);

    useEffect(()=> {
        console.log('EFFECT [categoryName categories] categories: ', categories);
        const categoryObj = categories && categories.find((c: Category) => c.name === categoryName);
        categoryObj && setCategoryId(categoryObj._id);
    }, [categories]);

    useEffect(()=> {
        if (newProduct) {
            validate();
        }
        const submit = async() => {
            if (!err) {
                try {
                    //if (newProduct !== null) {
                        const addedProduct = await createProduct({ token: localStorage.getItem('token') || '', body: newProduct});
                        console.log('ADDED PRODUCT : ', addedProduct)
                        goBack('/');
                    //}
                } catch (error: any) {
                    setErr(true);
                }
            } else if (!err && !isNewProduct) {
                try {
                    const _id = product?._id;
                    const payload = newProduct && await updateProduct({_id, ...newProduct}).unwrap();
                    payload && setFormData(payload);  
                    setDisabled(true);
                } catch (error: any) {
                    setErr(true);
                }
            } else {
                setErr(true);
            }
        }
        submit();
        console.log('EFFECT [isNewProduct] addedProduct: ', newProduct);
    }, [newProduct]);

    const validate = () => {
        setErr(titleError && priceError && descriptionError);
    }

    const onEdit = () => {
        setDisabled(false);
    }
    const onCancel = () => {
        if (!product) {
            goBack('/');
        } else {
            formData && setTitle(formData.title);
            formData && setPrice(formData.price.toString());
            formData && setDescription(formData.description);
            formData && setImage(formData.images[0]);
            formData && setCategoryName(formData.category.name);
    
            setDisabled(true);
        }
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
                { admin ? 
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
                                {data && data.map((ctgry: Category)=> {
                                    return <MenuItem key={ctgry._id} value={ctgry.name}>{ctgry.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </> 
                    :
                    <>
                        <FormLabel 
                            style={{  
                                color: "darkgrey",
                                fontSize: "13px",
                                marginBottom: "0.5rem"
                            }}
                        >
                            Category
                        </FormLabel>
                        <div style={{color: "darkgrey"}}>{categoryName}</div>
                    </>}
                    { admin && 
                        <>
                            { product && disabled && 
                                <div className='btn-group'>
                                    <IconButton onClick={()=> onEdit()}>
                                        <EditNoteOutlinedIcon/>
                                    </IconButton>
                                </div>
                            }
                            { product && !disabled && 
                                <div className='btn-group'>    
                                    {/* <IconButton type="submit" onClick={()=> setIsNewProduct(true)}>
                                        <PlaylistAddOutlinedIcon />
                                    </IconButton> */}
                                    <IconButton type ="submit" onClick={()=> setIsNewProduct(false)}>
                                        <PlaylistAddCheckOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={()=> onCancel()}>
                                        <CancelOutlinedIcon/>
                                    </IconButton>
                                </div> 
                            }
                            { !product && 
                                <div className="btn-group">
                                    <IconButton type="submit" onClick={()=> setIsNewProduct(true)}>
                                        <BackupOutlinedIcon />  
                                    </IconButton>
                                    <IconButton onClick={()=> onCancel()}>
                                        <CancelOutlinedIcon/>
                                    </IconButton>  
                                </div>
                            }
                        </> 
                    }
            </form> 
        </div>
    
    );
}

export default ProductForm;