import {rest} from 'msw';
import {setupServer} from 'msw/node';

import {mockProducts} from '../../shared/mock-products';


export const handlers = [
  rest.get('https://api.escuelajs.co/api/v1/products', (req, res, ctx) =>{
    return res(ctx.json(mockProducts))
  }),
  rest.get(`https://api.escuelajs.co/api/v1/products/:id`, (req, res, ctx) =>{
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
    rest.get(`https://api.escuelajs.co/api/v1/products/title=:title`, (req, res, ctx) =>{
      const {title} = req.params
      const queryResult = mockProducts.filter(p =>p.title.toLowerCase().includes(title.toString()));
      
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
    rest.post('https://api.escuelajs.co/api/v1/products/', async (req, res, ctx) => {
      const body = await req.json();
      return res(
        ctx.status(200),
        ctx.json({ ...body, id: 11 }),
      );
    }),
    rest.put('https://api.escuelajs.co/api/v1/products/:id', async (req, res, ctx) => {
      const { id } = req.params;
      const body = await req.json()
      const mockProductToUpdate = mockProducts.find(p=> p._id === id)
      return res(
        ctx.status(200),
        ctx.json({...mockProductToUpdate, title: body.title}),
      );
    }),
    rest.delete('https://api.escuelajs.co/api/v1/products/:id', async (req, res, ctx)=>{
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
