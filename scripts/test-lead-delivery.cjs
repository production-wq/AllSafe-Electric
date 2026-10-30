const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
let payload;
const source = ts.transpileModule(fs.readFileSync('app/actions/submit-estimate.ts','utf8'), { compilerOptions: { module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2022 } }).outputText;
const env = {};
const mod = {exports:{}};
vm.runInNewContext(source, {
 exports:mod.exports, require(name) {
  if(name==='next/headers') return {headers:async()=>new Headers({referer:'https://allsafehomeservice.com/outlet-gfci-repair/?email=private@example.com'})};
  if(name==='node:crypto') return require(name);
  if(name==='@/lib/attribution') return {attributionKeys:['gclid','gbraid','wbraid','utm_source','utm_medium','utm_campaign','utm_term','utm_content','landing_page']};
  if(name==='@/lib/business') return {business:{phone:{display:'(303) 648-1934'},email:{leads:'example@example.com',public:'example@example.com'}}};
  if(name==='@/lib/services') return {services:[]};
  if(name==='@/lib/cities') return {citySlugs:['parker-co']};
  throw Error(name);
 }, process:{env}, console:{info(){},error(){}}, File, FormData, Headers, AbortSignal, URL,
 fetch:async(_,init)=>{payload=JSON.parse(init.body);return {ok:true}},
});
function form(consent='granted') { const f=new FormData(); Object.entries({name:'Setup Test',phone:'2025550142',email:'test@example.com',zip:'80134',message:'Internal test only',submission_id:'AS-12345678-1234-1234-1234-123456789abc',measurement_consent:consent,gclid:'example-click',utm_campaign:'repair'}).forEach(([k,v])=>f.set(k,v));return f; }
(async()=>{
 const submit=mod.exports.submitEstimate;
 const missing=await submit({},form()); assert.equal(missing.ok,false); assert.equal(missing.values.name,'Setup Test');
 env.BRD_LEAD_LOG_WEBHOOK_URL='https://example.invalid/test';
 const first=await submit({},form()); assert.equal(first.ok,true);assert.equal(payload.gclid,'example-click');assert.equal(payload.is_test,false);assert.equal(payload.referer,'/outlet-gfci-repair/');
 const second=await submit({},form());assert.equal(first.leadId,second.leadId,'retry preserves deduplication ID');
 await submit({},form('denied'));assert.equal(payload.gclid,'');assert.equal(payload.utm_campaign,'');assert.equal(payload.measurement_consent,'denied');
 const invalid=form();invalid.set('zip','');assert.equal((await submit({},invalid)).ok,false);
 console.log('Lead delivery failure, attribution consent, input validation and retry ID tests passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
