"use strict";(self.webpackChunktodo=self.webpackChunktodo||[]).push([[4],{973:function(e,t,n){n.d(t,{Z:function(){return a}});n(791);var r={modal:"Modal_modal__1mttd",modal__content:"Modal_modal__content__lAVmq",active:"Modal_active__38XaT"},o=n(184),a=function(e){var t=e.active,n=e.setActive,a=e.children;return(0,o.jsx)("div",{className:t?"".concat(r.modal," ").concat(r.active):" ".concat(r.modal),onClick:function(){return n(!1)},children:(0,o.jsx)("div",{className:t?"".concat(r.modal__content," ").concat(r.active):"".concat(r.modal__content," ").concat(r.Purple),onClick:function(e){return e.stopPropagation()},children:a})})}},4:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var r=n(791),o=n(885),a="ProjectPage_Project__XmlWJ",c="ProjectPage_ProjectPage__pLuM1",i="ProjectPage_ProjectPage__Button__hl-Un",l="ProjectPage_Projects__Z9NtH",s="ProjectPage_ProjectPage__form__F2ZF-",u=n(973),d=n(184);function j(e){var t=e.title;return(0,d.jsx)("div",{className:a,children:(0,d.jsx)("h1",{children:t})})}var _=r.memo(j),m=n(87),P=function(e){var t=e.ProjectData,n=e.ProjectCreator,a=(0,r.useState)(!1),j=(0,o.Z)(a,2),P=j[0],v=j[1];function f(){var e=(0,r.useState)(""),a=(0,o.Z)(e,2),c=a[0],i=a[1],l=(0,r.useState)(!1),u=(0,o.Z)(l,2),j=u[0],_=u[1];return(0,d.jsxs)("form",{className:s,onSubmit:function(e){return function(e){e.preventDefault(),t.every((function(e){return e.name!==c}))?(n(c,t.length+1),v(!1)):_(!0)}(e)},children:[(0,d.jsx)("input",{style:{border:j?"1px solid red":"none"},value:c,pattern:"[A-Za-z0-9]+",title:"Only english alphabet",onChange:function(e){i(e.target.value)},type:"text",placeholder:"Name Project"}),(0,d.jsx)("button",{disabled:!c,children:"Save"}),j&&(0,d.jsx)("p",{style:{color:"white",fontSize:"1.2rem",borderBottom:"1px solid red"},children:"Only unique project names"})]})}return(0,d.jsxs)("section",{className:c,children:[(0,d.jsx)("div",{className:i,children:(0,d.jsx)("button",{onClick:function(){return v(!0)},children:"Create Project"})}),(0,d.jsx)("div",{className:l,children:t.map((function(e){return(0,d.jsx)(m.rU,{to:e.name,children:(0,d.jsx)(_,{title:e.name},e.id)},e.id)}))}),(0,d.jsx)(u.Z,{active:P,setActive:v,children:(0,d.jsx)(f,{})})]})},v=r.memo(P),f=n(101),h=n(874),x=r.memo((0,f.$j)((function(e){return{ProjectData:e.ProjectPage.ProjectData}}),{ProjectCreator:h.S2})((function(e){var t=e.ProjectData,n=e.ProjectCreator;return(0,d.jsx)(v,{ProjectData:t,ProjectCreator:n})})))}}]);
//# sourceMappingURL=4.3a435357.chunk.js.map