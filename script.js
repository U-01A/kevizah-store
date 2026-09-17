const state={inCart:localStorage.getItem('kevizah-cart')==='1'};
const $=id=>document.getElementById(id);
const cart=$('cart'),overlay=$('overlay'),count=$('cart-count'),empty=$('empty-cart'),item=$('cart-item'),summary=$('cart-summary'),toast=$('toast');
function render(){count.textContent=state.inCart?'1':'0';empty.hidden=state.inCart;item.hidden=!state.inCart;summary.hidden=!state.inCart}
function openCart(){cart.classList.add('open');cart.setAttribute('aria-hidden','false');overlay.hidden=false;document.body.style.overflow='hidden'}
function closeCart(){cart.classList.remove('open');cart.setAttribute('aria-hidden','true');overlay.hidden=true;document.body.style.overflow=''}
function setCart(value){state.inCart=value;localStorage.setItem('kevizah-cart',value?'1':'0');render()}
document.querySelectorAll('.thumb').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.thumb').forEach(t=>t.classList.remove('active'));button.classList.add('active');$('main-image').src=button.dataset.image;$('main-image').alt=button.dataset.alt}));
$('add-to-cart').addEventListener('click',()=>{setCart(true);toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);openCart()});
$('open-cart').addEventListener('click',openCart);$('close-cart').addEventListener('click',closeCart);$('continue-shopping').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);$('remove-item').addEventListener('click',()=>setCart(false));
const STRIPE_CHECKOUT_URL='https://buy.stripe.com/8x29ATcep9recfzd5ubV600';
$('checkout').addEventListener('click',()=>{window.location.assign(STRIPE_CHECKOUT_URL)});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCart()});
render();

if(document.modelContext?.registerTool){
  document.modelContext.registerTool({name:'add_hoodie_to_bag',title:'Add hoodie to bag',description:'Add the white Kevizah relaxed-fit hoodie in size L to the shopping bag.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(){setCart(true);return{added:true,product:'Relaxed-Fit Pullover Hoodie',size:'L',total:23.49}}}).catch(()=>{});
  document.modelContext.registerTool({name:'view_bag',title:'View shopping bag',description:'Read the current Kevizah shopping bag.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:false},execute(){return{items:state.inCart?[{product:'Relaxed-Fit Pullover Hoodie',colour:'White',size:'L',quantity:1,price:23.49}]:[],delivery:0,total:state.inCart?23.49:0}}}).catch(()=>{});
}
