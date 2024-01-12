import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockOrders } from '../../shared/mock-orders';
import { mockOrderItems } from '../../shared/mock-items';
import { token, adminToken } from '../../shared/mock-auth';

export const handlers = [
  rest.get('https://e-commerce-api-atbv.onrender.com/api/v1/orders', (req, res, ctx) =>{
    const reqToken = (req.headers.get('authorization'))?.toString().match(token);
    if (reqToken) {
        return res(ctx.json(mockOrders));
    } else {
        return res(ctx.json({msg: "Unauthorized"}))
    }
  }),
  rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/orders/user/:userId`, (req, res, ctx) =>{
    const { userId } = req.params;
    const reqToken = (req.headers.get('authorization'))?.toString().match(token);
    const orders = mockOrders.filter(order=> order.userId === userId)

        if (orders && reqToken) {
            return res(
                ctx.json(orders)
            )
        } else {
            return res(
                ctx.json("Order Not Found")
            )
        }
    }), 
    rest.get(`https://e-commerce-api-atbv.onrender.com/api/v1/orders/items/:orderId`, (req, res, ctx) =>{
        const { orderId } = req.params;
        const reqToken = (req.headers.get('authorization'))?.toString().match(token);
        const mockItems = mockOrderItems.filter(item=> item.orderId === orderId)

        if (reqToken && mockItems) {
            return res(ctx.json(mockItems))
        } 
    }),
    rest.post('https://e-commerce-api-atbv.onrender.com/api/v1/orders/checkout/:userId', async (req, res, ctx) => {
        const orderRequest = await req.json(); 
        const reqToken = (req.headers.get('authorization'))?.toString().match(token);

        if (orderRequest && reqToken) {
            return res(ctx.json(true));
        }
    }),
    rest.put('https://e-commerce-api-atbv.onrender.com/api/v1/orders/order/:orderId', async (req, res, ctx) => {
      const { orderId } = req.params;
      const reqToken = (req.headers.get('authorization'))?.toString().match(token);
      const updates = await req.json();
      const mockOrderToUpdate = mockOrders.find(order=> order._id === orderId);

      if (reqToken && updates) {
          return res(
            ctx.json({...mockOrderToUpdate, paid: updates.paid})
          );
      }
    }),
    rest.delete('https://e-commerce-api-atbv.onrender.com/api/v1/orders/:orderId', async (req, res, ctx)=>{
      const { orderId } = req.params;
      const reqToken = (req.headers.get('authorization'))?.toString().match(token);

      if(mockOrders.find(order=> order._id === orderId) && reqToken) {
        return res(
          ctx.json(true)
        )
      } else {
        return res(
          ctx.json(false)
        )
      }
  
    }),
    rest.delete('https://e-commerce-api-atbv.onrender.com/api/v1/orders/user/:userId', async (req, res, ctx)=>{
      const { userId } = req.params;
      const reqToken = (req.headers.get('authorization'))?.toString().match(token);

      if(mockOrders.find(order=> order.userId === userId) && reqToken) {
        return res(ctx.json(true))
      } else {
        return res(ctx.json(false))
      }
  
    }),
    rest.delete('https://e-commerce-api-atbv.onrender.com/api/v1/orders/orders', async (req, res, ctx)=>{
        const reqToken = (req.headers.get('authorization'))?.toString().match(adminToken);

        if (reqToken) {
            return res(ctx.json({msg: "Orders deleted"}))
        } else {
            return res(ctx.json(false))
        }
    })
]

const server = setupServer(...handlers);
export default server;
