import e from"postcss-selector-parser";function t(e){if(!e.nodes.length)return void e.remove();const t=e.nodes.filter((e=>"comment"===e.type));t.length===e.nodes.length&&e.replaceWith(...t)}function n(e){const n=e.parent,o=n.index(e);if(o){t(n.cloneBefore().removeAll().append(n.nodes.slice(0,o)))}return n.before(e),n}function o(e,t){if(t<2)throw new Error("n must be greater than 1");if(e.length<2)throw new Error("s must be greater than 1");if(Math.pow(e.length,t)>1e4)throw new Error("Too many combinations when trying to resolve a nested selector with lists, reduce the complexity of your selectors");const n=[];for(let e=0;e<t;e++)n[e]=0;const o=[];for(;;){const r=[];for(let s=t-1;s>=0;s--){let t=n[s];if(t>=e.length){if(t=0,n[s]=0,0===s)return o;n[s-1]+=1}r[s]=e[t]}o.push(r),n[n.length-1]++}}const r=e.pseudo({value:":is"});function s(e){const t=e.nodes.filter((e=>"tag"===e.type));t.length>1&&t.slice(1).forEach((e=>{const t=r.clone();e.replaceWith(t),t.append(e)}))}function c(t,n){let o=[],r=!1;const c=[...t.nodes];for(let t=0;t<c.length+1;t++){const l=c[t];if(l&&"combinator"!==l.type)"nesting"===l.type&&(r=!0),o.push(l);else{if(r){o=[];continue}if(o.length>1){const t=e.selector();o[0].replaceWith(t),o.slice(1).forEach((e=>{e.remove()})),o.forEach((e=>{t.append(e)})),a(t),n&&s(t),t.replaceWith(...t.nodes)}o=[]}}}function a(e){e.nodes.sort(((e,t)=>l(e.value,e.type)-l(t.value,t.type)))}function l(e,t){return"pseudo"===t&&e&&0===e.indexOf("::")?i.pseudoElement:i[t]}const i={universal:0,tag:1,id:2,class:3,attribute:4,selector:5,pseudo:6,pseudoElement:7,string:8,root:9,comment:10,nesting:9999};function p(t){const n=t.map((t=>e().astSync(t))).map((e=>u(e))),o=n[0];for(let e=1;e<n.length;e++)if(o.a!==n[e].a||o.b!==n[e].b||o.c!==n[e].c)return!1;return!0}function u(t){let n=0,o=0,r=0;if("universal"==t.type)return{a:0,b:0,c:0};if("id"===t.type)n+=1;else if("tag"===t.type)r+=1;else if("class"===t.type)o+=1;else if("attribute"===t.type)o+=1;else if("pseudo"===t.type&&0===t.value.indexOf("::"))r+=1;else if("pseudo"===t.type)switch(t.value){case":after":case":before":r+=1;break;case":is":case":has":case":not":if(t.nodes&&t.nodes.length>0){let e={a:0,b:0,c:0};t.nodes.forEach((t=>{const n=u(t);n.a>e.a?e=n:n.a<e.a||(n.b>e.b?e=n:n.b<e.b||n.c>e.c&&(e=n))})),n+=e.a,o+=e.b,r+=e.c}break;case"where":break;case":nth-child":case":nth-last-child":{const s=t.nodes.findIndex((e=>{e.value}));if(s>-1){const c=u(e.selector({nodes:t.nodes.slice(s+1),value:""}));n+=c.a,o+=c.b,r+=c.c}else n+=n,o+=o,r+=r}break;default:o+=1}else t.nodes&&t.nodes.length>0&&t.nodes.forEach((e=>{const t=u(e);n+=t.a,o+=t.b,r+=t.c}));return{a:n,b:o,c:r}}function d(t,n,r){let l=[];l=p(t)||r.noIsPseudoSelector?t.map((t=>e().astSync(t))):[e().astSync(`:is(${t.join(",")})`)];let i=[];for(let t=0;t<n.length;t++){const p=n[t];let u=1,d=[],g=0;if(e().astSync(p).walkNesting((()=>{g++})),g>1&&l.length>1)d=o(l,g),u=d.length;else{u=l.length;for(let e=0;e<l.length;e++){d.push([]);for(let t=0;t<g;t++)d[e].push(l[e])}}for(let t=0;t<u;t++){let n=0;const o=e().astSync(p);o.walk((o=>{if("nesting"!==o.type)return;let l=d[t][n];n++,"root"===l.type&&1===l.nodes.length&&(l=l.nodes[0]);const i=e().astSync(`:is(${l.toString()})`),p=f(l.nodes[0]),u=h(l.nodes[0]),g=f(o),b=h(o);if(p&&g)return void o.replaceWith(l.clone());if((p||u)&&(g||b)){const e=o.parent;return p&&"selector"===l.type?o.replaceWith(l.clone().nodes[0]):o.replaceWith(...l.clone().nodes),void(e&&e.nodes.length>1&&(a(e),r.noIsPseudoSelector||s(e)))}if(p){const e=o.parent;return o.replaceWith(l.clone().nodes[0]),void(e&&c(e,!r.noIsPseudoSelector))}if(u){const e=o.parent;return o.replaceWith(...l.clone().nodes),void(e&&c(e,!r.noIsPseudoSelector))}if(m(o)){const e=o.parent;return o.replaceWith(...l.clone().nodes),void(e&&c(e,!r.noIsPseudoSelector))}if(y(o)){const e=o.parent;return o.replaceWith(...l.clone().nodes),void(e&&c(e,!r.noIsPseudoSelector))}const v=o.parent;r.noIsPseudoSelector?o.replaceWith(...l.clone().nodes):o.replaceWith(...i.clone().nodes),v&&c(v,!r.noIsPseudoSelector)})),i.push(o.toString())}}return i}function f(e){return"combinator"!==e.type&&!(e.parent&&e.parent.nodes.length>1)}function h(e,t=null){if(f(e))return!1;if(!e.parent)return!1;if(!!e.parent.nodes.find((e=>"combinator"===e.type||"comment"===e.type)))return!1;return!(!!e.parent.nodes.find((e=>"nesting"===e.type))&&t&&!h(t))}function m(e){if(!e.parent)return!1;if(0!==e.parent.nodes.indexOf(e))return!1;for(let t=1;t<e.parent.nodes.length;t++)if("combinator"===e.parent.nodes[t].type&&" "!==e.parent.nodes[t].value&&">"!==e.parent.nodes[t].value)return!1;return!0}function y(e){if(f(e))return!0;if(!e.parent)return!1;for(let t=0;t<e.parent.nodes.length;t++)if("nesting"!==!e.parent.nodes[t].type&&(e.parent.nodes[t].prev()||e.parent.nodes[t].next())){if(e.parent.nodes[t].prev()&&"combinator"!==e.parent.nodes[t].prev().type)return!1;if(e.parent.nodes[t].next()&&"combinator"!==e.parent.nodes[t].next().type)return!1}return!0}const g=e=>{let t=[],n="",o=!1,r=0,s=!1,c=!1;for(let a of e)c?c=!1:"\\"===a?c=!0:s?a===s&&(s=!1):'"'===a||"'"===a?s=a:"("===a?r+=1:")"===a?r>0&&(r-=1):0===r&&","===a&&(o=!0),o?(""!==n&&t.push(n.trim()),n="",o=!1):n+=a;return t.push(n.trim()),t};var b=["container","document","media","supports"];function v(e){const o=n(e);var r,s;e.params=(r=o.params,s=e.params,g(r).map((e=>g(s).map((t=>`${e} and ${t}`)).join(", "))).join(", ")),t(o)}function S(e,o){e.each((e=>{(e=>"rule"===e.type&&"rule"===Object(e.parent).type&&e.selectors.every((e=>0===e.trim().indexOf("&")&&-1===e.indexOf("|"))))(e)?function(e,o){const r=n(e);e.selectors=d(r.selectors,e.selectors,o),("rule"===e.type&&"rule"===r.type&&e.selector===r.selector||"atrule"===e.type&&"atrule"===r.type&&e.params===r.params)&&e.append(...r.nodes),t(r)}(e,o):(e=>"atrule"===e.type&&"nest"===e.name&&"rule"===Object(e.parent).type&&g(e.params).every((e=>e.split("&").length>=2&&-1===e.indexOf("|"))))(e)?function(e,o,r){const s=n(e),c=s.clone().removeAll().append(e.nodes);e.replaceWith(c),c.selectors=d(s.selectors,g(e.params),r),t(s),o(c,r)}(e,S,o):(e=>"atrule"===e.type&&b.includes(e.name)&&"rule"===Object(e.parent).type)(e)?function(e,o,r){const s=n(e),c=s.clone().removeAll().append(e.nodes);e.append(c),t(s),o(c,r)}(e,S,o):(e=>"atrule"===e.type&&b.includes(e.name)&&"atrule"===Object(e.parent).type&&e.name===e.parent.name)(e)&&v(e),Object(e.nodes).length&&S(e,o)}))}function W(e){const t=Object(e).noIsPseudoSelector||!1;return{postcssPlugin:"postcss-nesting",Rule(e){S(e,{noIsPseudoSelector:t})}}}W.postcss=!0;export{W as default};
