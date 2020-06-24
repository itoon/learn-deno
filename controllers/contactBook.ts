import MemberModel from "../models/MemberModel.ts";

// @desc GET all contacts
// @route GET /api/v1/members
export const getMembers = async ({ response } : { response : any }) =>{
  const result = await MemberModel.all();
  response.body = {
    success: true,
    data: result
  }
}

// @desc GET single contact
// @route GET /api/v1/members/:id
export const getMember = async ({params, response} : { params: {id: string}, response: any}) => {
    // dont connect DB
    // const member: Member | undefined = contactBook.find( m => m.id === params.id)
    // connect DB
    const member = await MemberModel.find(params.id);        
    if(member.length > 0){
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
  }

// @desc POST create contact
// @route POST /api/v1/members
export const addMember = async ({request, response} : { request:any, response: any}) =>{
  if(request.hasBody){
    const body = await request.body();
    const member = await MemberModel.create(body.value);    
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
}

// @desc PUT create contact
// @route PUT /api/v1/members/:id
export const updateMember = async ({params, request, response} : {params : {id:string}, request: any, response: any})=>{
  // const member = contactBook.find(m => m.id === params.id);  
  const member = await MemberModel.find(params.id);
  if(member.length > 0){
    if(request.hasBody){
      const body = await request.body();
      const updateData = body.value;
      // contactBook = contactBook.map(m => m.id === params.id ? {...m, ...updateData} : m);
      const result = await MemberModel.where('id', params.id).update({...updateData});
      response.status = 200;
      response.body = {
        success: true,
        data: result
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
}

// @desc DELETE create contact
// @route DELETE /api/v1/members/:id
export const deleteMember = async ({params, response}: {params: {id:string}, response: any}) =>{
  await MemberModel.deleteById(params.id);
  // contactBook = contactBook.filter(m => m.id !== params.id)  
  response.status = 200;
  response.body = {
    success: true,
    msg: 'Member removed'
  }
}