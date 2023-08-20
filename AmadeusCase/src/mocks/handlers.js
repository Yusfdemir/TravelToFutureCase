import { rest } from 'msw'
import {tickets} from './data'

export const handlers = [
    
  rest.get('/tickets',(req,res,ctx)=>{
    const from=req.url.searchParams.get('from');
    const to=req.url.searchParams.get('to');
    const departureDate=req.url.searchParams.get('departureDate');
    const returnDate=req.url.searchParams.get('returnDate');

    if(from){
      tickets=tickets.filter(ticket => ticket.from.toLowerCase().localeCompare(from.toLowerCase())==0); 
    }

    if(to){
      tickets=tickets.filter(ticket => ticket.to.toLowerCase().localeCompare(to.toLowerCase())==0)
      }
    
    if(departureDate){
      tickets=tickets.filter(ticket => ticket.departureDate.toLowerCase().localeCompare(departureDate.toLowerCase())==0)
    }
    if(returnDate){
      tickets=tickets.filter(ticket => ticket.returnDate.toLowerCase().localeCompare(returnDate.toLowerCase())==0)
    }
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        data:tickets,
      })
    )
  }),  
]