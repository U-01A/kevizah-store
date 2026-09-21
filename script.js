const SOLD_OUT=true;
const state={inCart:false};
const $=id=>document.getElementById(id);
const cart=$('cart'),overlay=$('overlay'),count=$('cart-count'),empty=$('empty-cart'),item=$('cart-item'),summary=$('cart-summary');
localStorage.removeItem('kevizah-cart');

function render(){
  count.textContent='0';
  empty.hidden=false;
  item.hidden=true;
  summary.hidden=true;
}
function openCart(){
  cart.classList.add('open');
  cart.setAttribute('aria-hidden','false');
  overlay.hidden=false;
  document.body.style.overflow='hidden';
}
function closeCart(){
  cart.classList.remove('open');
  cart.setAttribute('aria-hidden','true');
  overlay.hidden=true;
  document.body.style.overflow='';
}

document.querySelectorAll('.thumb').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active'));
  button.classList.add('active');
  $('main-image').src=button.dataset.image;
  $('main-image').alt=button.dataset.alt;
}));

$('open-cart').addEventListener('click',openCart);
$('close-cart').addEventListener('click',closeCart);
$('continue-shopping').addEventListener('click',closeCart);
overlay.addEventListener('click',closeCart);
$('remove-item').addEventListener('click',render);
$('checkout').addEventListener('click',event=>event.preventDefault());
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCart()});
render();

if(document.modelContext?.registerTool){
  document.modelContext.registerTool({
    name:'view_bag',
    title:'View shopping bag',
    description:'Read the current Kevizah shopping bag.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},
    annotations:{readOnlyHint:true,untrustedContentHint:false},
    execute(){return{items:[],delivery:0,total:0,status:SOLD_OUT?'The hoodie is sold out.':null}}
  }).catch(()=>{});
}
