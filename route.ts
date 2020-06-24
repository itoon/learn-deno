import { Router } from "https://deno.land/x/oak/mod.ts";
import { getMembers, getMember, addMember, updateMember, deleteMember } from "./controllers/contactBook.ts";

const router = new Router();

router.get('/api/v1/members', getMembers)
      .get('/api/v1/members/:id', getMember)
      .post('/api/v1/members', addMember)
      .put('/api/v1/members/:id', updateMember)
      .delete('/api/v1/members/:id', deleteMember);


// router.get('/api/v1/products', getProducts)
//       .get('/api/v1/products/:id', getProduct)
//       .post('/api/v1/products', addProduct)
//       .put('/api/v1/products/:id', updateProduct)
//       .delete('/api/v1/products/:id', deleteProduct);
export default router;