import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const port = 8000;
const app = new Application();
const router = new Router();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});


app.use(router.routes());
app.use(router.allowedMethods());

interface Member {
  id: string,
  name: string,
  email: string,
  phoneNumber: string
}

let contactBook : Member[] = [
  {
    id: "1",
    name: "Songklod",
    email: "itoon.sit@gmail.com",
    phoneNumber: "0846549189"
  },
  {
    id: "2",
    name: "Name2",
    email: "name2@gmail.com",
    phoneNumber: "098857637"
  },
  {
    id: "3",
    name: "Name3",
    email: "name3@gmail.com",
    phoneNumber: "870988576"
  }
]

// @desc GET all contacts
router.get('/api/v1/members', ({ response } : { response : any }) =>{
    response.body = {
      success: true,
      data: contactBook
    }
});

// @desc GET member by id
router.get('/api/v1/members/:id', ({params, response} : { params: {id: string}, response: any}) =>{
  const member: Member | undefined = contactBook.find( m => m.id === params.id)
  if(member){
    response.status = 200;
    response.body = {
      success: true,
      data: member
    }
  }else{
    response.status = 404;
    response.body = {
      success: false,
      msg: "No member id"
    }
  }
});

// @desc POST insert member to contact book
router.post('/api/v1/members', async ({request, response} : { request:any, response: any}) =>{
  if(request.hasBody){
    const body = await request.body();
    const member: Member = body.value;
    contactBook.push(member);
    response.status = 201;
    response.body = {
      success: true,
      data: member
    }
  }else{
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data input"
    }
  }  
});

// @desc PUT update data by id
router.put('/api/v1/members/:id', async ({params, request, response} : {params : {id:string}, request: any, response: any})=>{
  const member = contactBook.find(m => m.id === params.id);
  if(member){
    if(request.hasBody){
      const body = await request.body();
      const updateData = body.value;
      contactBook = contactBook.map(m => m.id === params.id ? {...m, ...updateData} : m);
      response.status = 200;
      response.body = {
        success: true,
        data: contactBook
      }
    }else{
      response.status = 400;
      response.body = {
        success: false,
        msg: "No data input"
      }
    }
  }else{
    response.status = 404;
    response.body = {
      success: false,
      msg: "No member id"
    }
  }
});

//@desc DELETE delete contact by id
router.delete('/api/v1/members/:id', ({params, response}: {params: {id:string}, response: any}) =>{
  contactBook = contactBook.filter(m => m.id !== params.id)  
  response.status = 200;
  response.body = {
    success: true,
    msg: 'Member removed'
  }
});

await app.listen({ port: port });