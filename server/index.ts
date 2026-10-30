import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
dotenv.config();
const app=express(), PORT=Number(process.env.API_PORT||4000), TOKEN=process.env.ADMIN_TOKEN;
const dir=path.resolve('data'), OF=path.join(dir,'orders.json'), FF=path.join(dir,'feedback.json');
fs.mkdirSync(dir,{recursive:true}); for(const f of [OF,FF]) if(!fs.existsSync(f)) fs.writeFileSync(f,'[]\n');
app.use(express.json({limit:'100kb'}));
const read=(f:string)=>{try{return JSON.parse(fs.readFileSync(f,'utf8'))}catch{return []}};
const write=(f:string,d:unknown)=>{const t=f+'.tmp';fs.writeFileSync(t,JSON.stringify(d,null,2));fs.renameSync(t,f)};
function admin(req:express.Request,res:express.Response,next:express.NextFunction){if(!TOKEN)return res.status(503).json({error:'Set ADMIN_TOKEN in .env'});const a=Buffer.from(req.header('x-admin-token')||''),b=Buffer.from(TOKEN);if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return res.status(401).json({error:'Unauthorized'});next()}
app.get('/api/health',(_q,r)=>r.json({ok:true,service:'TREVNIXO API',mode:'college-demo'}));
app.post('/api/orders',(req,res)=>{const o=req.body;if(!o||typeof o.orderId!=='string'||!o.customer||!Array.isArray(o.items)||!Number.isFinite(o.total))return res.status(400).json({error:'Invalid order payload'});if(!/^[A-Z0-9-]{5,40}$/.test(o.orderId)||!/^[6-9]\d{9}$/.test(String(o.customer.mobile||''))||!/^\d{6}$/.test(String(o.customer.pincode||'')))return res.status(400).json({error:'Invalid order or delivery details'});const orders=read(OF);if(orders.some((x:any)=>x.orderId===o.orderId))return res.json({ok:true,duplicate:true,orderId:o.orderId});const isDemoPaid=o.paymentMethod==='Demo Online Payment (Simulated)'&&o.paymentStatus==='DEMO PAID — NOT REAL';orders.unshift({...o,status:'Confirmed',paymentStatus:isDemoPaid?'DEMO PAID — NOT REAL':'Pending/Cash on Delivery',savedAt:new Date().toISOString()});write(OF,orders);res.status(201).json({ok:true,orderId:o.orderId})});
app.post('/api/feedback',(req,res)=>{const f=req.body;if(!f||typeof f.message!=='string'||f.message.trim().length<3)return res.status(400).json({error:'Invalid feedback'});const a=read(FF);a.unshift({...f,id:f.id||crypto.randomUUID(),savedAt:new Date().toISOString()});write(FF,a);res.status(201).json({ok:true})});
app.get('/api/admin/orders',admin,(_q,r)=>r.json({orders:read(OF)}));
app.patch('/api/admin/orders/:id',admin,(req,res)=>{const allowed=['Confirmed','Processing','Shipped','Delivered','Cancelled'];if(!allowed.includes(req.body?.status))return res.status(400).json({error:'Invalid status'});const a=read(OF),i=a.findIndex((o:any)=>o.orderId===req.params.id);if(i<0)return res.status(404).json({error:'Order not found'});a[i].status=req.body.status;a[i].updatedAt=new Date().toISOString();write(OF,a);res.json({ok:true,order:a[i]})});
app.get('/api/admin/feedback',admin,(_q,r)=>r.json({feedback:read(FF)}));
const distDir = path.resolve('dist');
app.use(express.static(distDir));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  const indexFile = path.join(distDir, 'index.html');
  if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
  return res.status(404).send('TREVNIXO frontend build not found.');
});
app.listen(Number(process.env.PORT || PORT),()=>console.log(`TREVNIXO web service running`));
