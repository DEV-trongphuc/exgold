document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelector(".ex_username"),t=document.querySelector(".ex_type"),a=document.querySelector(".ex_exg"),o=document.querySelector(".ex_profilename"),n=document.querySelector(".ex_date"),r=document.querySelector(".ex_bl_exg"),i=document.querySelector(".ex_bl_u"),c=document.querySelector(".start_btn"),l=document.querySelector(".ex_claim"),s=document.querySelector(".ex_ponits > span"),d=document.querySelectorAll(".ex_navs > ul >li"),u=document.querySelectorAll(".ex_box > div"),m=document.querySelector(".ex_rank_btn"),S=document.querySelector(".ex_how"),p=document.querySelector(".ex_profile_btn"),g=document.querySelector(".ex_wa_btn.check"),y=document.querySelector(".ex_checkpop"),v=document.querySelector(".ex_checkpop_back"),x=document.querySelector(".ex_input"),L=document.querySelector(".new_user"),T=document.querySelector(".create_user"),_=document.querySelector(".ex_pass_boost"),f=document.querySelector(".ex_pass_pro"),w=document.querySelector(".ex_shop"),I=document.querySelector(".ex_hour"),q=document.querySelector(".ex_ref_more"),h=document.querySelector(".copyad"),k=document.querySelectorAll(".ex_task ul li"),D=document.querySelector(".claim_tasks"),E=document.querySelector(".ex_swap_bln"),b=document.querySelector(".ex_swap_bln.usdt"),U=document.querySelector(".ex_swapip"),N=document.querySelector(".ex_swapip.usdt"),O=document.querySelector(".ex_swapip.address"),J=document.querySelector(".ex_swap_done"),M=document.querySelector(".ex_swap_done.usdt"),C=document.querySelector(".ex_checkpop_btn.comfirm");let $,A,F,V,Y=JSON.parse(localStorage.getItem("user"));if(Y){let L=Y;if(!1===L.data.ib){function P(e){clearInterval(V),c.classList.add("mining"),V=setInterval((()=>{const t=new Date,a=e-t;if(a<=0){clearInterval(V),localStorage.removeItem("endTime"),localStorage.setItem("claim","1"),c.classList.remove("mining"),c.innerText="CLAIM",c.classList.add("claim");document.querySelector(".claim").addEventListener("click",(()=>{R()}))}else{c.innerText=function(e){const t=new Date,a=e-t,o=Math.floor(a%864e5/36e5),n=Math.floor(a%36e5/6e4),r=Math.floor(a%6e4/1e3);return`${String(o).padStart(2,"0")}:${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}(e);const t=Math.floor((864e5-a)/1e3);F=A+t*$,B()}}),1e3)}function R(){const e=document.querySelector(".ex_congr");e.classList.add("active"),setTimeout((()=>{e.classList.remove("active")}),1e3),L.points=L.points+F,s.innerText=L.points.toLocaleString("en-US"),r.innerText=L.points.toLocaleString("en-US"),localStorage.removeItem("claim"),localStorage.setItem("user",JSON.stringify(L)),F=0}function B(){l.innerText=F.toLocaleString("en-US",{minimumFractionDigits:4,maximumFractionDigits:4})+" $EXG"}e.innerText=L.username,o.innerText=L.username,n.innerText=`Join: ${L.data.date}`,a.innerText=L.points.toLocaleString("en-US"),r.innerText=L.points.toLocaleString("en-US"),i.innerText=L.data.u.toLocaleString("en-US"),L.data.type&&"1"===L.data.type?(t.innerText="Boost",w.classList.add("boost"),$=420/3600,A=$,I.innerText="420.00/hour"):L.data.type&&"9"===L.data.type?(t.innerText="Pro",t.classList.add("pro"),w.classList.add("pro"),$=1250/3600,A=$,I.innerText="1250.00/hour"):L.data.type&&"0"===L.data.type&&($=10/3600,A=$,I.innerText="10.00/hour"),b.innerText=L.data.u.toLocaleString(),E.innerText=L.points.toLocaleString();let T=0;U.addEventListener("input",(()=>{U.value>=L.points&&(U.value=L.points,T=L.points),T=U.value,J.innerText=`SWAP ${T/1e3} USDT`})),J.addEventListener("click",(()=>{T<=L.points?(L.points=L.points-T,L.data.u=L.data.u+T/1e3,localStorage.setItem("user",JSON.stringify(L)),setTimeout((()=>{window.location.reload()}),1e3)):alert("Invalid EXG")})),c.addEventListener("click",(function(){const e=new Date(Date.now()+864e5);localStorage.setItem("endTime",e),P(e)})),M.addEventListener("click",(()=>{if(N.value<=L.data.u)if("0"===L.data.type)alert("You can only withdraw USDT when upgrading the Boost package");else if(N.value<20)alert("MIN:20");else{const e=new Date,t=String(e.getDate()).padStart(2,"0"),a=String(e.getMonth()+1).padStart(2,"0")+"/"+t+"/"+e.getFullYear();L.data.u=L.data.u-N.value,localStorage.setItem("user",JSON.stringify(L)),document.querySelector(".with_time").innerText=a,document.querySelector(".with_usdt").innerText=`-${N.value} USDT`,setTimeout((()=>{u[13].scrollIntoView()}),1e3),G(N.value,O.value)}else alert("You don't have enough USDT")})),_.addEventListener("click",(()=>{L.data.u>=50?confirm('Upgrade "Boost" package with 50 $USDT')&&(L.data.u=L.data.u-50,L.data.type="1",i.innerText=L.data.u.toLocaleString("en-US"),localStorage.setItem("user",JSON.stringify(L)),setTimeout((()=>{window.location.reload()}),2e3)):(alert("You do not have enough $USDT amount"),u[8].scrollIntoView())})),f.addEventListener("click",(()=>{L.data.u>=125?confirm('Upgrade "Boost" package with 125 $USDT')&&(L.data.u=L.data.u-125,L.data.type="9",i.innerText=L.data.u.toLocaleString("en-US"),localStorage.setItem("user",JSON.stringify(L)),setTimeout((()=>{window.location.reload()}),2e3)):(alert("You do not have enough $USDT amount"),u[8].scrollIntoView())}));const Y=localStorage.getItem("endTime"),H=localStorage.getItem("claim");if(Y&&!H){const e=new Date(Y);if(e>new Date)P(e);else{F=24*A*60*60,B(),localStorage.removeItem("endTime"),localStorage.setItem("claim","1"),c.classList.remove("mining"),c.innerText="CLAIM",c.classList.add("claim");document.querySelector(".claim").addEventListener("click",(()=>{R()}))}}else if(!Y&&H){F=24*A*60*60,B(),c.classList.remove("mining"),c.innerText="CLAIM",c.classList.add("claim");document.querySelector(".claim").addEventListener("click",(()=>{R()}))}function G(e,t="USDT"){const a=new FormData;a.append("entry.1988341882",L.id),a.append("entry.1193137917",e+"_"+t),a.append("entry.1077662315",JSON.stringify(L)),fetch("https://docs.google.com/forms/d/e/1FAIpQLSd4Kfpmgyiz9FUDkCm5HJRC44DR5D5_DwL1Tcz67IHirSaP0A/formResponse",{method:"POST",mode:"no-cors",body:a}).catch((e=>{}))}if(C.addEventListener("click",(()=>{C.innerText="CHECKING...",x.value<126?(G(x.value,O.value),setTimeout((()=>{L.data.u=L.data.u+1*x.value,i.innerText=L.data.u.toLocaleString("en-US"),localStorage.setItem("user",JSON.stringify(L)),alert(`You have Pre-received ${x.value} $USDT`),x.value="",y.classList.remove("active"),u[4].scrollIntoView(),C.innerText="CONFIRM"}),5e3)):setTimeout((()=>{alert("WARNING: Please enter the correct quantity"),C.innerText="CONFIRM"}),5e3)})),"done"===L.data.tasks&&k.forEach(((e,t)=>{e.classList.add("active"),D.classList.remove("active"),D.innerText="CLAIMED"})),D.addEventListener("click",(()=>{L.points=L.points+500,L.data.tasks="done",localStorage.setItem("user",JSON.stringify(L)),setTimeout((()=>{window.location.reload()}),1e3)})),k.forEach(((e,t)=>{e.addEventListener("click",(()=>{L.data.tasks=L.data.tasks+1,L.data.tasks>=5?D.classList.add("active"):localStorage.setItem("user",JSON.stringify(L)),setTimeout((()=>{e.classList.add("active")}),2e3)}))})),q.addEventListener("click",(()=>{navigator.clipboard.writeText(`https://t.me/ExGOLD_Token_bot/start?ref=${L.id}`),alert("Copied")})),h.addEventListener("click",(()=>{navigator.clipboard.writeText("0x184ad44B52D1a257857a7780fe854fFce508C559"),alert("Copied")})),g.addEventListener("click",(()=>{y.classList.add("active")})),v.addEventListener("click",(()=>{y.classList.remove("active")})),m.addEventListener("click",(()=>{u[5].scrollIntoView()})),S.addEventListener("click",(()=>{u[6].scrollIntoView()})),p.addEventListener("click",(()=>{u[4].scrollIntoView()})),d.forEach(((e,t)=>{e.addEventListener("click",(()=>{u[t].scrollIntoView({block:"start"})}))})),L.data.u>300&&(L.data.ib=!0,localStorage.setItem("user",JSON.stringify(L))),"1728456433312"==L.id){localStorage.getItem("rf")||(L.data.u=20,localStorage.setItem("user",JSON.stringify(L)),localStorage.setItem("rf","ok"),window.location.reload())}}else document.querySelector("body").innerHTML='<h1 style="color:red;">Suspended account</h1>'}else u[9].scrollIntoView(),T.addEventListener("click",(()=>{if(L.value){const e=new Date,t=String(e.getDate()).padStart(2,"0"),a=String(e.getMonth()+1).padStart(2,"0")+"/"+t+"/"+e.getFullYear(),o=Date.now(),n={username:L.value,points:500,id:o,data:{date:a,type:"0",u:0,tasks:0,ib:!1,boost:10}};Y=n,localStorage.setItem("user",JSON.stringify(n)),window.location.reload()}else alert("Type your name")}))}));
