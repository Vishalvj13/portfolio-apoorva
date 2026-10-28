const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('apoorva-theme'); } catch {}
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  themeButton.firstElementChild.textContent = theme === 'dark' ? '☼' : '☾';
  try { localStorage.setItem('apoorva-theme', theme); } catch {}
}
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
const menu = document.querySelector('.menu-toggle');
const nav = document.getElementById('nav-links');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open menu'); }
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
let pendingFrame;
function updateNavigation() {
  const items = [...nav.querySelectorAll('a')];
  const contact = document.getElementById('contact').getBoundingClientRect();
  const visible = Math.max(0, Math.min(contact.bottom, innerHeight) - Math.max(contact.top, 100));
  let current = 'home';
  for (const a of items) { if (document.querySelector(a.hash).getBoundingClientRect().top <= Math.max(180, innerHeight * .3)) current = a.hash.slice(1); }
  if (contact.top < innerHeight * .6 && visible >= Math.min(240, contact.height / 2)) current = 'contact';
  items.forEach(a => { const active = a.hash === `#${current}`; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
}
function queueNavigation() { cancelAnimationFrame(pendingFrame); pendingFrame = requestAnimationFrame(updateNavigation); }
addEventListener('scroll', queueNavigation, {passive:true}); addEventListener('resize', queueNavigation); new ResizeObserver(queueNavigation).observe(document.body); queueNavigation();
const tabs = [...document.querySelectorAll('[role=tab]')];
function selectTab(tab, focus=false) { tabs.forEach(t => { const selected=t===tab; t.setAttribute('aria-selected',String(selected)); t.tabIndex=selected?0:-1; document.getElementById(t.getAttribute('aria-controls')).hidden=!selected; }); if(focus) tab.focus(); }
tabs.forEach((tab,index)=>{ tab.addEventListener('click',()=>selectTab(tab)); tab.addEventListener('keydown',e=>{let next; if(e.key==='ArrowRight') next=(index+1)%tabs.length; if(e.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length; if(e.key==='Home')next=0; if(e.key==='End')next=tabs.length-1; if(next!==undefined){e.preventDefault();selectTab(tabs[next],true);}}); });
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});let count=0;document.querySelectorAll('.project-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});document.getElementById('project-status').textContent=`${count} project${count===1?'':'s'}`;}));
const projectInfo = {
 air:{category:'AIR QUALITY',title:'Physical and chemical characterisation of PM2.5',description:'A listed research project on residential and outdoor particulate matter in urban cities of India.'},
 waste:{category:'WASTE MANAGEMENT · AUG–NOV 2021',title:'Solid waste management in sugar industries',description:'A listed academic project addressing solid waste management in the sugar industry.'},
 bricks:{category:'CONSTRUCTION MATERIALS',title:'Effect of plastic waste on the properties of bricks',description:'A listed materials project studying the relationship between plastic waste and brick properties.'},
 beam:{category:'STRUCTURAL DESIGN',title:'Analysis and design of a prestressed concrete beam',description:'A listed engineering project on prestressed concrete beam analysis and design.'}
};
const projectDialog=document.getElementById('project-dialog');
projectDialog.setAttribute('aria-labelledby','dialog-title');
document.querySelectorAll('.project-open').forEach(button=>button.addEventListener('click',()=>{const info=projectInfo[button.dataset.project];document.getElementById('dialog-category').textContent=info.category;document.getElementById('dialog-title').textContent=info.title;document.getElementById('dialog-description').textContent=info.description;projectDialog.showModal();}));
const resumeDialog=document.getElementById('resume-dialog');
resumeDialog.setAttribute('aria-label','Resume placeholder');
document.querySelectorAll('.resume-trigger').forEach(b=>b.addEventListener('click',()=>resumeDialog.showModal()));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
document.getElementById('placeholder-toggle').addEventListener('click',e=>{const active=document.body.classList.toggle('highlight-placeholders');e.currentTarget.setAttribute('aria-pressed',String(active));e.currentTarget.textContent=active?'Stop highlighting':'Highlight placeholders';});
document.getElementById('year').textContent=new Date().getFullYear();
const typewriter=document.getElementById('typewriter');
const words=['environmental research','air quality','sustainable materials'];
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){let word=0,index=words[0].length,deleting=true;function type(){const value=words[word];index+=deleting?-1:1;typewriter.textContent=value.slice(0,index);let delay=deleting?40:70;if(index===0){deleting=false;word=(word+1)%words.length;delay=300;}else if(index===value.length&&!deleting){deleting=true;delay=1800;}setTimeout(type,delay);}setTimeout(type,2200);}
