
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themes = ['dark','light','blue'];
const themeIcons = {
    dark:  '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>',
    light: '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>',
    blue:  '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>'
};
function applyTheme(t){
    document.body.setAttribute('data-theme',t);
    themeIcon.innerHTML=themeIcons[t];
    localStorage.setItem('dsa-theme',t);
}
applyTheme(localStorage.getItem('dsa-theme')||'dark');
themeToggle.addEventListener('click',()=>{
    const cur=localStorage.getItem('dsa-theme')||'dark';
    applyTheme(themes[(themes.indexOf(cur)+1)%themes.length]);
});


document.getElementById('navHamburger').addEventListener('click',()=>{
    document.getElementById('navLinks').classList.toggle('open');
});
document.addEventListener('click',(e)=>{
    if(!e.target.closest('nav')) document.getElementById('navLinks').classList.remove('open');
});


function toggleOp(id){
    const content=document.getElementById('content-'+id);
    const icon=document.getElementById('icon-'+id);
    const header=content.previousElementSibling;
    if(!content) return;
    content.classList.toggle('show');
    if(icon) icon.classList.toggle('rotate');
    if(header) header.classList.toggle('active');
}


function switchCode(event,group,lang){
    const tabs=event.target.closest('.language-tabs');
    tabs.querySelectorAll('.lang-tab').forEach(t=>t.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll(`[data-group="${group}"]`).forEach(el=>el.classList.remove('active'));
    const target=document.querySelector(`[data-group="${group}"][data-lang="${lang}"]`);
    if(target) target.classList.add('active');
}


function copyCode(button){
    const pre=button.closest('.code-block').querySelector('pre');
    navigator.clipboard.writeText(pre.innerText||pre.textContent);
    button.textContent='Copied!';
    setTimeout(()=>button.textContent='Copy',2000);
}


const ALGO_KEY='graph';
const L2_KEY=`${ALGO_KEY}_l2_unlocked`;
const L3_KEY=`${ALGO_KEY}_l3_unlocked`;
const modal=document.getElementById('quizModal');
const modalMsg=document.getElementById('modalMsg');
const startQuizBtn=document.getElementById('startQuiz');
const cancelBtn=document.getElementById('cancelBtn');

function updateLevelButtons(){
    const l2=localStorage.getItem(L2_KEY)==='true';
    const l3=localStorage.getItem(L3_KEY)==='true';
    const btnL2=document.getElementById('l2');
    const btnL3=document.getElementById('l3');
    if(l2){btnL2.style.borderColor='var(--primary-green)';btnL2.style.background='rgba(16,185,129,0.15)';btnL2.style.color='var(--primary-green)';}
    if(l3){btnL3.style.borderColor='var(--primary-green)';btnL3.style.background='rgba(16,185,129,0.15)';btnL3.style.color='var(--primary-green)';}
}

document.getElementById('l2').addEventListener('click',()=>{
    if(localStorage.getItem(L2_KEY)==='true'){window.location.href='graph_l2.html';return;}
    modalMsg.textContent='Pass the Level 1 Quiz to unlock Level 2 and continue your Graph journey.';
    modal.style.display='flex';
    startQuizBtn.onclick=()=>window.location.href='quiz.html?id=graph-l1';
});
document.getElementById('l3').addEventListener('click',()=>{
    const l2=localStorage.getItem(L2_KEY)==='true';
    const l3=localStorage.getItem(L3_KEY)==='true';
    if(l3){window.location.href='graph_l3.html';return;}
    if(!l2){modalMsg.textContent='Complete Level 1 first before accessing Level 3.';}
    else{modalMsg.textContent='Pass the Level 2 Quiz to unlock Level 3.';startQuizBtn.onclick=()=>window.location.href='quiz.html?id=graph-l2';}
    modal.style.display='flex';
    if(!l2) startQuizBtn.onclick=()=>window.location.href='quiz.html?id=graph-l1';
});
cancelBtn.addEventListener('click',()=>modal.style.display='none');
window.addEventListener('click',e=>{if(e.target===modal) modal.style.display='none';});

window.addEventListener('load',()=>{
    applyTheme(localStorage.getItem('dsa-theme')||'dark');
    updateLevelButtons();
});
