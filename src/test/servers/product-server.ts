import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {mockProducts} from '../../shared/mock-products';

export const handlers = [
  rest.get('https://e-commerce-api-atbv.onrender.com/api/v1/products', (req, res, ctx) =>{
    return res(ctx.json(mockProducts))
  }),
  rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/products/:productId`, (req, res, ctx) =>{
    const { productId } = req.params;
    const mockProduct = mockProducts.find(p=> p._id === productId)

    if (mockProduct) {
      return res(
        ctx.json(mockProduct)
        )
      } else {
      return res(
        ctx.json("Product Not Found")
        )
      }
    }), 
    rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/products/search/`, (req, res, ctx) =>{
      const title = req.url.searchParams.get('title');
      let queryResult = [...mockProducts]

      if (title) {
        queryResult = queryResult.filter((p) => p.title.toLowerCase().includes(title.toString().toLowerCase()));
      }
      return res(
        ctx.json(queryResult)
      )
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
