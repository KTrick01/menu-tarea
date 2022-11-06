import{r as n,e as M,f as L,o as s,c as a,F as q,g as B,a as t,d as v,h as p,v as f,i as g,b as G,w as F,t as x}from"./index.9f4b444d.js";import{a as c}from"./axios.91e25212.js";const R={class:"main__section"},S=t("h1",null,"Listado de Ciudades",-1),A={key:0,class:"lds-facebook"},j=t("div",null,null,-1),z=t("div",null,null,-1),H=t("div",null,null,-1),J=[j,z,H],K={key:1,class:"data__table"},O=t("div",{class:"table__labels"},[t("p",null,"ID"),t("p",null,"Descripcion"),t("p",null,"Eliminar"),t("p",null,"Modificar")],-1),P=["onClick"],Q=t("i",{class:"fa-solid fa-trash"},null,-1),W=[Q],X=["onClick"],Y=t("i",{class:"fa-solid fa-pen-to-square"},null,-1),Z=[Y],tt=t("h1",null,"Nueva Ciudad",-1),et=t("h3",null,"Guardado",-1),lt=t("i",{class:"fa-solid fa-check"},null,-1),ot=[et,lt],nt={class:"new-data__container"},st={key:0,class:"error"},at=t("h3",null,"Rellena todos los campos",-1),it=[at],ut={class:"btn-table-container"},dt=t("i",{class:"fa-solid fa-house"},null,-1),ct=t("i",{class:"fa-solid fa-plus"},null,-1),rt=[ct],ft={__name:"CiudadesView",setup(_t){const i=n(""),u=n(null),h=n(null),y=n(null),w=n(!1);M();const d=n(null),r=n(null),b=n(),m=n(),k=n([]);async function _(){const o=await c.get("http://localhost:5000/ciudades");k.value=o.data,console.log(o.data)}async function D(o){try{await c.delete(`http://localhost:5000/ciudades/${o}`),_()}catch(e){console.log(e)}}async function V(o){try{await c.put(`http://localhost:5000/ciudades/${o}`,{descripcionCiu:r.value,idciudad:d.value}),_()}catch(e){console.log(e)}}function N(o,e){b.value.style.animation="enter .5s both",d.value=o,r.value=e}async function C(){try{const o=await c.get("http://localhost:5000/idciudad");i.value=o.data[0].id,console.log()}catch(o){console.log(o)}}async function $(){if(i.value&&u.value){h.value=!1;try{await c.post("http://localhost:5000/ciudades",{idciudad:i.value,descripcionCiu:u.value}),w.value=!0,_()}catch(o){console.log(o)}}else h.value=!0,console.log("Error")}function T(){setTimeout(()=>{C(),u.value="",y.value.style.animation="saveLeave .5s both"},300)}return C(),_(),(o,e)=>{const I=L("router-link");return s(),a("section",R,[S,k.value.length?(s(),a("div",K,[O,(s(!0),a(q,null,B(k.value,(l,U)=>(s(),a("div",{class:"table__row",key:U},[t("p",null,x(l.idciudad),1),t("p",null,x(l.descripcionCiu),1),t("button",{title:"Eliminar",class:"link__button row__button",onClick:E=>D(l.idciudad)},W,8,P),t("button",{title:"Modificar",class:"link__button row__button",onClick:E=>N(l.idciudad,l.descripcionCiu)},Z,8,X)]))),128)),t("div",{class:"modify",ref_key:"modifyTab",ref:b},[t("label",null,[v(" ID "),p(t("input",{type:"text","onUpdate:modelValue":e[0]||(e[0]=l=>d.value=l)},null,512),[[f,d.value]])]),t("label",null,[v(" Descripcion "),p(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=l=>r.value=l)},null,512),[[f,r.value]])]),t("button",{class:"link__button",onClick:e[2]||(e[2]=l=>V(d.value))}," Guardar "),t("button",{class:"link__button",onClick:e[3]||(e[3]=l=>b.value.style.animation="leave .5s forwards")}," Cancelar ")],512),t("section",{class:"newEntry",ref_key:"newTab",ref:m},[tt,w.value?(s(),a("div",{key:0,class:"guardado",ref_key:"saveMsg",ref:y,onAnimationend:T},ot,544)):g("",!0),t("div",nt,[t("label",null,[v(" ID "),p(t("input",{type:"text","onUpdate:modelValue":e[4]||(e[4]=l=>i.value=l),required:""},null,512),[[f,i.value]])]),t("label",null,[v(" Descripcion "),p(t("input",{type:"text","onUpdate:modelValue":e[5]||(e[5]=l=>u.value=l),required:""},null,512),[[f,u.value]])]),t("button",{class:"link__button",onClick:$},"Guardar"),t("button",{class:"link__button",onClick:e[6]||(e[6]=l=>m.value.style.animation="leaveNew .5s forwards")}," Cancelar "),h.value?(s(),a("div",st,it)):g("",!0)])],512)])):(s(),a("div",A,J)),t("div",ut,[G(I,{title:"Inicio",to:"/",class:"link__button btn-table home"},{default:F(()=>[dt]),_:1}),t("button",{onClick:e[7]||(e[7]=l=>m.value.style.animation="enterNew .5s forwards"),title:"Nuevo registro",class:"link__button btn-table new"},rt)])])}}};export{ft as default};
