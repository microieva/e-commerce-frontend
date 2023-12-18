import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {mockProducts} from '../../shared/mock-products';
import { Product } from '../../@types/product';


export const handlers = [
  rest.get('https://e-commerce-api-atbv.onrender.com/api/v1/products', (req, res, ctx) =>{
    return res(ctx.json(mockProducts))
  }),
  rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/products/:id`, (req, res, ctx) =>{
    const { id } = req.params;
    const mockProduct = mockProducts.find(p=> p._id === id)

    if(mockProduct) {
      return res(
        ctx.json(mockProduct)
        )
      } else {
      return res(
        ctx.json("Product Not Found")
        )
      }
    }), 
    rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/products/title=:title`, (req, res, ctx) =>{
      const urlSearchParams = new URLSearchParams(req.url.search); 
      const title = urlSearchParams.get('title'); 
      let queryResult: Omit<Product, "categoryId">[] = []

      if (title) {
        queryResult = mockProducts.filter(p =>p.title.toLowerCase().includes(title?.toString()));
      }
      
      if(title && queryResult.length>0) {
        return res(
          ctx.json(queryResult)
        )
      } else {
        return res(
          ctx.json("Product Not Found")
        )
      }
    }),
    rest.post('https://e-commerce-api-atbv.onrender.com/api/v1/products', async (req, res, ctx) => {
      const body = await req.json();
      const response = {
        ...body,
        _id: "11"
      }
      return res(
        ctx.status(200),
        ctx.json(response),
      );
    }),
    rest.put('https://e-commerce-api-atbv.onrender.com/api/v1/products/:id', async (req, res, ctx) => {
      const { id } = req.params;
      const body = await req.json()
      const mockProductToUpdate = mockProducts.find(p=> p._id === id)
      return res(
        ctx.status(200),
        ctx.json({...mockProductToUpdate, title: body.title}),
      );
    }),
    rest.delete('https://e-commerce-api-atbv.onrender.com/api/v1/products/:id', async (req, res, ctx)=>{
      const { id } = req.params;
      if(mockProducts.find(p=> p._id === id)) {
        return res(
          ctx.json(true)
        )
      } else {
        return res(
          ctx.json(false)
        )
      }
  
    }),
]

const server = setupServer(...handlers);
export default server;
