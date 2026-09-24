import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {eventState, filterEvents, validateEvent, localClock, eventDateLabel, sessionHighlight, nextSession, sortedSessions} from "../src/lib/events.ts";
const session = {date:"2026-09-26",startTime:"10:00",endTime:"12:00"};
const base = {id:"test",slug:"test",status:"published",featured:false,title:"Oficina de cerâmica",subtitle:"Argila",body:"Argila",category:"Oficinas",sessions:[session]};
const filters={q:"",category:"",period:"ativos"};
test("São Paulo timezone and exact session boundaries",()=>{
 assert.equal(localClock(new Date("2026-09-27T01:00:00Z")).date,"2026-09-26");
 assert.equal(eventState(base,new Date("2026-09-26T12:59:00Z")),"upcoming");
 assert.equal(eventState(base,new Date("2026-09-26T13:00:00Z")),"ongoing");
 assert.equal(eventState(base,new Date("2026-09-26T15:00:00Z")),"ended");
 const noTime={...base,sessions:[{date:session.date}]};
 assert.equal(eventState(noTime,new Date("2026-09-27T02:59:00Z")),"ongoing");
 assert.equal(eventState(noTime,new Date("2026-09-27T03:00:00Z")),"ended");
});
test("separate weekends remain ongoing during gaps, highlight next real session",()=>{
 const event={...base,sessions:[{...session,date:"2026-10-03"},session,{...session,date:"2026-10-10"}]};
 const gap=new Date("2026-09-30T15:00:00Z");
 assert.equal(eventState(event,gap),"ongoing");
 assert.equal(nextSession(event,gap).date,"2026-10-03");
 assert.match(sessionHighlight(event,gap),/^Próxima sessão:/);
 assert.equal(eventDateLabel(event),"3 datas");
 assert.match(sessionHighlight(event,new Date("2026-10-03T14:00:00Z")),/^Agora:/);
 assert.equal(eventState(event,new Date("2026-10-10T15:00:00Z")),"ended");
 assert.equal(sessionHighlight(event,new Date("2026-10-11")),undefined);
 assert.equal(sortedSessions(event)[0].date,session.date);
});
test("different card summaries for single, consecutive and repeated dates",()=>{
 assert.match(eventDateLabel(base),/10:00 às 12:00/);
 const consecutive={...base,sessions:[session,{...session,date:"2026-09-27"}]};
 assert.match(eventDateLabel(consecutive),/26.* a 27/);
 const two={...base,sessions:[session,{...session,startTime:"14:00",endTime:"16:00"}]};
 assert.match(eventDateLabel(two),/2 horários/);
 assert.equal(nextSession(two,new Date("2026-09-26T16:00:00Z")).startTime,"14:00");
 // Last starting session is not necessarily the last ending one.
 assert.equal(eventState({...base,sessions:[{...session,endTime:"22:00"},{...session,startTime:"11:00"}]},new Date("2026-09-26T20:00:00Z")),"ongoing");
});
test("each period has precise membership and default hides inactive events",()=>{
 const records=[base,{...base,id:"future",sessions:[{...session,date:"2026-10-10"}]},{...base,id:"past",sessions:[{...session,date:"2025-01-01"}]},{...base,eventStatus:"cancelled"},{...base,eventStatus:"postponed"}];
 const now=new Date("2026-09-26T14:00:00Z");
 for(const [period,count] of [["ativos",2],["proximos",1],["em-andamento",1],["encerrados",1],["todos",5]]) assert.equal(filterEvents(records,{...filters,period},now).length,count,period);
 assert.equal(filterEvents(records,{...filters,q:"CERAMICA",category:"Oficinas"},now).length,2);
 assert.equal(filterEvents(records,{...filters,category:"Música"},now).length,0);
});
test("validation rejects invalid or duplicate sessions and unsafe contacts",()=>{
 for(const sessions of [[],[{...session,date:"2026-02-30"}],[{...session,endTime:"09:00"}],[{...session,startTime:"25:00"}],[session,session]]) assert.ok(validateEvent({...base,sessions}).length);
 assert.ok(validateEvent({...base,admission:"other"}).length);
 assert.ok(validateEvent({...base,website:"javascript:alert(1)"}).length);
 assert.deepEqual(validateEvent(base),[]);
 for(const record of JSON.parse(fs.readFileSync("src/data/events.json","utf8"))) {
  assert.deepEqual(validateEvent(record),[],record.slug);
  for(const field of ["price","priceText","registrationUrl","registrationLabel","startDate","endDate","shortDescription","description","venueBusinessSlug"]) assert.ok(!(field in record),field);
 }
});
